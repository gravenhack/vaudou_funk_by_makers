from fastapi import Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from auth import auth_handler

security = HTTPBearer()

async def verify_token(credentials: HTTPAuthorizationCredentials):
    """Middleware pour vérifier le token"""
    token = credentials.credentials
    
    try:
        payload = auth_handler.decode_token(token)
        auth_handler.verify_token_type(payload, "access")
        return payload
    except HTTPException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalide ou expiré",
            headers={"WWW-Authenticate": "Bearer"},
        )