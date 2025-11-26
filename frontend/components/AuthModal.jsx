import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock, Loader2 } from 'lucide-react';
import { authService } from '../services/authService';

export const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' ou 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // États du formulaire
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setFullName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setError('');
    setShowPassword(false);
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    resetForm();
  };

  const validateForm = () => {
    if (!email || !password) {
      setError('Email et mot de passe requis');
      return false;
    }

    if (mode === 'register') {
      if (!username) {
        setError('Nom d\'utilisateur requis');
        return false;
      }
      if (username.length < 3) {
        setError('Le nom d\'utilisateur doit contenir au moins 3 caractères');
        return false;
      }
      if (password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email invalide');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (mode === 'register') {
        const registerData = {
          email,
          username,
          password,
        };

        await authService.register(registerData);

        // Auto-login après inscription
        const loginData = { email, password };
        await authService.login(loginData);

        const user = await authService.getCurrentUser();
        onAuthSuccess?.(user);
        onClose();
      } else {
        const loginData = { email, password };
        await authService.login(loginData);

        const user = await authService.getCurrentUser();
        onAuthSuccess?.(user);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    authService.initiateGoogleLogin();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full p-2 z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 flex flex-col items-center">
          {/* Titre */}
          <h2 className="text-4xl font-bold text-[#311b92] mb-2">C'est Parti !</h2>
          <p className="text-gray-500 text-sm mb-8">
            {mode === 'login' ? 'Connectez-vous pour continuer' : 'Créez votre compte'}
          </p>

          {/* Mode Login : Boutons OAuth et formulaire */}
          {mode === 'login' && (
            <>
              <div className="w-full space-y-3 mb-6">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border-2 border-gray-300 bg-white hover:bg-gray-50 transition-all text-gray-700 font-medium text-sm shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuer Avec Google
                </button>

                <button className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border-2 border-gray-300 bg-white hover:bg-gray-50 transition-all text-gray-700 font-medium text-sm shadow-sm">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continuer Avec Facebook
                </button>
              </div>

              <div className="w-full flex items-center gap-4 mb-6">
                <div className="h-px bg-gray-300 flex-1"></div>
                <span className="text-gray-400 text-sm font-medium">ou</span>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>

              {/* Message d'erreur */}
              {error && (
                <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Formulaire de connexion */}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">E-mail</label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eric@gmail.com"
                      className="w-full px-4 py-3.5 pl-11 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:ring-0 outline-none bg-white transition-all text-gray-800"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Mot de passe</label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 pl-11 pr-11 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:ring-0 outline-none bg-white transition-all text-gray-800"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 bg-[#3f51b5] hover:bg-[#303f9f] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader2 className="animate-spin" size={18} />}
                  Se Connecter
                </button>
              </form>

              <p className="text-gray-500 text-sm mt-6">
                Vous n'avez pas de compte?{' '}
                <button
                  onClick={toggleMode}
                  className="text-[#3f51b5] font-bold hover:underline"
                >
                  S'inscrire
                </button>
              </p>
            </>
          )}

          {/* Mode Register : Formulaire d'abord */}
          {mode === 'register' && (
            <>
              {/* Message d'erreur */}
              {error && (
                <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Nom complet</label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Eric Biaou"
                      className="w-full px-4 py-3.5 pl-11 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:ring-0 outline-none bg-white transition-all text-gray-800"
                      required
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Nom d'utilisateur</label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="eric_biaou"
                      className="w-full px-4 py-3.5 pl-11 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:ring-0 outline-none bg-white transition-all text-gray-800"
                      required
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">E-mail</label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eric@gmail.com"
                      className="w-full px-4 py-3.5 pl-11 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:ring-0 outline-none bg-white transition-all text-gray-800"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Mot de passe</label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 pl-11 pr-11 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:ring-0 outline-none bg-white transition-all text-gray-800"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 bg-[#3f51b5] hover:bg-[#303f9f] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader2 className="animate-spin" size={18} />}
                  S'inscrire
                </button>
              </form>

              <div className="w-full flex items-center gap-4 my-6">
                <div className="h-px bg-gray-300 flex-1"></div>
                <span className="text-gray-400 text-sm font-medium">ou</span>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>

              <p className="text-gray-500 text-sm">
                Vous de compte?{' '}
                <button
                  onClick={toggleMode}
                  className="text-[#3f51b5] font-bold hover:underline"
                >
                  Se Connecter
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
