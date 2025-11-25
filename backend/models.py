from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    """Modèle pour la création d'utilisateur"""
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    """Modèle pour la connexion"""
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    """Modèle de réponse utilisateur (sans mot de passe)"""
    id: str
    email: str
    username: str
    full_name: Optional[str] = None
    created_at: datetime
    is_active: bool = True
    google_id: Optional[str] = None
    picture: Optional[str] = None
    auth_provider: Optional[str] = None

class Token(BaseModel):
    """Modèle de token JWT"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    """Données contenues dans le token"""
    email: Optional[str] = None
    user_id: Optional[str] = None

class RefreshTokenRequest(BaseModel):
    """Modèle pour rafraîchir le token"""
    refresh_token: str