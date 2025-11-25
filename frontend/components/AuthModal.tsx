import React from 'react';
import { X, EyeOff, User, Mail, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#f8f9fa] rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Background gradient strip */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-white/50 rounded-full p-1"
        >
          <X size={20} />
        </button>

        <div className="p-8 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-[#311b92] mb-6">C'est Parti !</h2>
          
          <div className="w-full space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">Nom complet</label>
              <div className="relative group">
                <input 
                  type="text" 
                  defaultValue="Eric Biaou"
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white transition-all text-gray-800"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">E-mail</label>
              <div className="relative group">
                <input 
                  type="email" 
                  defaultValue="eric@gmail.com"
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white transition-all text-gray-800"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">Mot de passe</label>
              <div className="relative group">
                <input 
                  type="password" 
                  defaultValue="password123"
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white transition-all text-gray-800"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
              </div>
            </div>
          </div>

          <button className="w-full mt-8 bg-[#3f51b5] hover:bg-[#303f9f] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
            S'inscrire
          </button>

          <div className="w-full flex items-center gap-4 my-6">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-gray-400 text-sm font-medium">ou</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          <p className="text-gray-500 text-sm">
            Vous avez de compte? <button onClick={onClose} className="text-[#3f51b5] font-bold hover:underline">Se Connecter</button>
          </p>
        </div>
      </div>
    </div>
  );
};