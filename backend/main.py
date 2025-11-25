from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from routes.auth_routes import router as auth_router
from routes.google_auth_routes import router as google_auth_router
from database import db, create_indexes
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="API d'authentification",
    description="API REST avec authentification JWT",
    version="1.0.0"
)

# Configuration CORS pour Vue.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Event handlers
@app.on_event("startup")
async def startup_db_client():
    """Initialisation au démarrage"""
    db.connect_db()
    create_indexes()
    print("Application démarrée")

@app.on_event("shutdown")
async def shutdown_db_client():
    """Nettoyage à l'arrêt"""
    db.close_db()
    print("Application arrêtée")

# Routes
@app.get("/")
async def root():
    return {
        "message": "API d'authentification",
        "docs": "/docs",
        "status": "online"
    }

@app.get("/health")
async def health_check():
    """Vérification de l'état de l'API"""
    return {"status": "healthy"}

# Middleware de session pour OAuth
app.add_middleware(SessionMiddleware, secret_key=os.getenv("SECRET_KEY"))

# Inclure les routes d'authentification
app.include_router(auth_router)
app.include_router(google_auth_router)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="localhost",
        port=8000,
        reload=True
    )