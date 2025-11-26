from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    client: MongoClient = None
    
    @classmethod
    def connect_db(cls):
        """Connexion à MongoDB"""
        try:
            mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017/")
            cls.client = MongoClient(mongodb_url)
            # Test de connexion
            cls.client.admin.command('ping')
            print("✅ Connexion à MongoDB réussie")
        except ConnectionFailure as e:
            print(f"❌ Erreur de connexion à MongoDB: {e}")
            raise
    
    @classmethod
    def close_db(cls):
        """Fermeture de la connexion"""
        if cls.client:
            cls.client.close()
            print("✅ Connexion MongoDB fermée")
    
    @classmethod
    def get_database(cls):
        """Récupère la base de données"""
        if cls.client is None:
            cls.connect_db()
        db_name = os.getenv("DATABASE_NAME", "auth_db")
        return cls.client[db_name]
    
    @classmethod
    def get_collection(cls, collection_name: str):
        """Récupère une collection spécifique"""
        db = cls.get_database()
        return db[collection_name]

# Instance globale
db = Database()

def get_users_collection():
    """Récupère la collection des utilisateurs"""
    return db.get_collection("users")

def create_indexes():
    """Crée les index nécessaires"""
    users = get_users_collection()
    # Index unique sur email et username
    users.create_index("email", unique=True)
    users.create_index("username", unique=True)
    print("✅ Index créés")