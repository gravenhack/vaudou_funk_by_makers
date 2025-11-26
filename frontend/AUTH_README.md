# 🔐 Système d'Authentification - Vaudoun-Funk

## 📁 Structure des fichiers

```
frontend/
├── services/
│   └── authService.js       # Service API pour l'authentification
├── contexts/
│   └── AuthContext.jsx      # Contexte React pour l'état utilisateur
└── components/
    └── AuthModal.jsx        # Modal de connexion/inscription
```

## 🎨 Design

Le design est basé sur les mockups dans `/images_frames/`:
- **login.png** - Modal de connexion avec OAuth Google/Facebook
- **Inscription.png** - Formulaire d'inscription

### Caractéristiques visuelles :
- **Titre**: "C'est Parti !" en violet foncé (#311b92)
- **Boutons OAuth**: Blancs avec bordure et icônes
- **Bouton principal**: Bleu (#3f51b5)
- **Champs**: Bordure 2px avec icônes à gauche
- **Toggle password**: Icône œil à droite

## 🚀 Utilisation

### 1. Envelopper l'app avec AuthProvider

```jsx
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Votre app */}
    </AuthProvider>
  );
}
```

### 2. Utiliser le hook useAuth

```jsx
import { useAuth } from './contexts/AuthContext';

function MonComposant() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Bonjour {user.full_name}</p>
      ) : (
        <button>Se connecter</button>
      )}
    </div>
  );
}
```

### 3. Afficher le modal d'authentification

```jsx
import { AuthModal } from './components/AuthModal';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { login } = useAuth();

  const handleAuthSuccess = (user) => {
    login(user);
    setShowAuthModal(false);
  };

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      <button onClick={() => setShowAuthModal(true)}>
        Se connecter
      </button>
    </>
  );
}
```

## 🔄 Flux d'authentification

### Inscription
1. Utilisateur remplit le formulaire (nom complet, email, mot de passe)
2. Appel à `authService.register(data)`
3. Auto-login après inscription réussie
4. Récupération des infos utilisateur
5. Callback `onAuthSuccess` avec les données utilisateur

### Connexion
1. Choix entre OAuth (Google/Facebook) ou email/password
2. **OAuth**: Redirection vers `/oauth/google` du backend
3. **Email**: Appel à `authService.login(data)`
4. Stockage des tokens JWT dans localStorage
5. Récupération des infos utilisateur
6. Callback `onAuthSuccess`

### Déconnexion
```jsx
const { logout } = useAuth();
logout(); // Supprime les tokens et réinitialise l'état
```

## 🛡️ Gestion des tokens

Les tokens JWT sont stockés dans `localStorage`:
- `access_token` - Token d'accès court terme
- `refresh_token` - Token de rafraîchissement long terme

Le service rafraîchit automatiquement l'access token quand il expire (401).

## 🎯 API Backend requise

Le service communique avec ces endpoints :

- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `GET /auth/me` - Infos utilisateur (requiert Bearer token)
- `POST /auth/refresh` - Rafraîchir le token
- `GET /oauth/google` - OAuth Google

## 📝 Variables d'environnement

Créez un fichier `.env.local` :

```env
VITE_API_URL=http://localhost:8000
```

## ✨ Fonctionnalités

- ✅ Inscription avec validation
- ✅ Connexion email/password
- ✅ OAuth Google (redirection)
- ✅ OAuth Facebook (UI seulement)
- ✅ Toggle mot de passe visible/caché
- ✅ Messages d'erreur
- ✅ Loading states
- ✅ Rafraîchissement automatique des tokens
- ✅ Persistance de session (localStorage)
- ✅ Design fidèle aux mockups

## 🎨 Personnalisation

### Couleurs principales
```css
--primary: #3f51b5;
--primary-dark: #303f9f;
--title: #311b92;
--error: #dc2626;
```

### Modifier le modal
Éditez `frontend/components/AuthModal.jsx`

### Modifier le service API
Éditez `frontend/services/authService.js`
