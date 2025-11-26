// Service d'authentification pour communiquer avec le backend

const API_BASE_URL = 'http://localhost:8000';

class AuthService {
  constructor() {
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  async register(data) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Inscription échouée');
    }

    return response.json();
  }

  async login(data) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Connexion échouée');
    }

    const tokens = await response.json();

    // Sauvegarder les tokens
    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);

    return tokens;
  }

  async getCurrentUser() {
    if (!this.accessToken) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Essayer de rafraîchir le token
        await this.refreshAccessToken();
        return this.getCurrentUser(); // Réessayer
      }
      throw new Error('Impossible de récupérer les infos utilisateur');
    }

    return response.json();
  }

  async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('Aucun refresh token disponible');
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: this.refreshToken }),
    });

    if (!response.ok) {
      this.logout();
      throw new Error('Rafraîchissement du token échoué');
    }

    const tokens = await response.json();
    this.accessToken = tokens.access_token;
    localStorage.setItem('access_token', tokens.access_token);
  }

  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isAuthenticated() {
    return !!this.accessToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  // OAuth Google
  initiateGoogleLogin() {
    window.location.href = `${API_BASE_URL}/oauth/google`;
  }
}

export const authService = new AuthService();
