from fastapi import APIRouter, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from bson import ObjectId
from datetime import datetime
from models import Token
from auth import auth_handler
from database import get_users_collection
from oauth_google import oauth
import os

router = APIRouter(prefix="/oauth", tags=["Google OAuth"])

@router.get("/google")
async def google_login(request: Request):
    """Initier la connexion avec Google"""
    redirect_uri = os.getenv('GOOGLE_REDIRECT_URI', 'http://localhost:8000/auth/google/callback')
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/google/callback")
async def google_callback(request: Request):
    """Callback après authentification Google"""
    try:
        # Récupérer le token d'accès de Google
        token = await oauth.google.authorize_access_token(request)

        # Récupérer les informations de l'utilisateur
        user_info = token.get('userinfo')

        if not user_info:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Impossible de récupérer les informations utilisateur"
            )

        # Extraire les données
        email = user_info.get('email')
        google_id = user_info.get('sub')
        name = user_info.get('name')
        picture = user_info.get('picture')

        if not email or not google_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email ou ID Google manquant"
            )

        users_collection = get_users_collection()

        # Vérifier si l'utilisateur existe déjà
        user = users_collection.find_one({"email": email})

        if user:
            # Mettre à jour les infos Google si nécessaire
            if not user.get('google_id'):
                users_collection.update_one(
                    {"_id": user["_id"]},
                    {
                        "$set": {
                            "google_id": google_id,
                            "picture": picture,
                            "updated_at": datetime.utcnow()
                        }
                    }
                )
        else:
            # Créer un nouveau compte
            username = email.split('@')[0]

            # Vérifier si le username existe déjà
            counter = 1
            original_username = username
            while users_collection.find_one({"username": username}):
                username = f"{original_username}{counter}"
                counter += 1

            user_dict = {
                "email": email,
                "username": username,
                "full_name": name,
                "google_id": google_id,
                "picture": picture,
                "password": None,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "is_active": True,
                "auth_provider": "google"
            }

            result = users_collection.insert_one(user_dict)
            user = users_collection.find_one({"_id": result.inserted_id})

        # Créer les tokens JWT
        token_data = {"sub": user["email"], "user_id": str(user["_id"])}
        access_token = auth_handler.create_access_token(token_data)
        refresh_token = auth_handler.create_refresh_token(token_data)

        # Redirection vers le frontend avec les tokens
        frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
        redirect_url = f"{frontend_url}/auth/callback?access_token={access_token}&refresh_token={refresh_token}"

        return RedirectResponse(url=redirect_url)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erreur lors de l'authentification Google: {str(e)}"
        )
