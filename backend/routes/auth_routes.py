from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from bson import ObjectId
from datetime import datetime
from models import UserCreate, UserLogin, UserResponse, Token, RefreshTokenRequest
from auth import auth_handler
from database import get_users_collection

router = APIRouter(prefix="/auth", tags=["Authentication"])
security = HTTPBearer()

# Helper function pour convertir ObjectId en string
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "username": user["username"],
        "full_name": user.get("full_name"),
        "created_at": user["created_at"],
        "is_active": user.get("is_active", True)
    }

@router.post("/register", response_model=dict, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate):
    """Inscription d'un nouvel utilisateur"""
    users_collection = get_users_collection()
    
    # Vérifier si l'email existe déjà
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un utilisateur avec cet email existe déjà"
        )
    
    # Vérifier si le username existe déjà
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ce nom d'utilisateur est déjà pris"
        )
    
    # Créer l'utilisateur
    user_dict = {
        "email": user.email,
        "username": user.username,
        "full_name": user.full_name,
        "password": auth_handler.get_password_hash(user.password),
        "created_at": datetime.utcnow(),
        "is_active": True
    }
    
    result = users_collection.insert_one(user_dict)
    
    return {
        "message": "Utilisateur créé avec succès",
        "user_id": str(result.inserted_id)
    }

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """Connexion d'un utilisateur"""
    users_collection = get_users_collection()
    
    # Trouver l'utilisateur par email
    user = users_collection.find_one({"email": credentials.email})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect"
        )
    
    # Vérifier le mot de passe
    if not auth_handler.verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect"
        )
    
    # Vérifier si le compte est actif
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Compte désactivé"
        )
    
    # Créer les tokens
    token_data = {"sub": user["email"], "user_id": str(user["_id"])}
    access_token = auth_handler.create_access_token(token_data)
    refresh_token = auth_handler.create_refresh_token(token_data)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/refresh", response_model=Token)
async def refresh_token(request: RefreshTokenRequest):
    """Rafraîchir l'access token avec le refresh token"""
    try:
        payload = auth_handler.decode_token(request.refresh_token)
        auth_handler.verify_token_type(payload, "refresh")
        
        # Créer de nouveaux tokens
        token_data = {"sub": payload["sub"], "user_id": payload["user_id"]}
        access_token = auth_handler.create_access_token(token_data)
        refresh_token = auth_handler.create_refresh_token(token_data)
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token invalide"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Récupérer les informations de l'utilisateur connecté"""
    token = credentials.credentials
    payload = auth_handler.decode_token(token)
    auth_handler.verify_token_type(payload, "access")
    
    users_collection = get_users_collection()
    user = users_collection.find_one({"_id": ObjectId(payload["user_id"])})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé"
        )
    
    return user_helper(user)

@router.post("/logout")
async def logout(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Déconnexion (côté client, suppression du token)"""
    return {"message": "Déconnexion réussie"}