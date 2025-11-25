import React from 'react';
import { Search, Bell, Globe, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-[#4a1d96] flex items-center justify-between px-4 md:px-6 shadow-md z-20 sticky top-0">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">VF</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-white font-bold text-sm leading-tight">Vaudoun-Funk</h1>
            <p className="text-purple-200 text-xs">AI Studio</p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search or enter website name" 
            className="w-full bg-white/10 text-white placeholder-purple-200 border border-purple-500/30 rounded-full py-2 px-10 text-sm focus:outline-none focus:bg-white/20 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-200 group-focus-within:text-white" size={16} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex gap-2">
           <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors shadow-lg shadow-green-900/20">
             Se Connecter
           </button>
           <button className="bg-white hover:bg-gray-100 text-purple-900 text-xs font-semibold px-4 py-1.5 rounded-full transition-colors">
             S'inscrire
           </button>
        </div>
        <div className="flex gap-2 text-white/80">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Bell size={18} /></button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Globe size={18} /></button>
        </div>
      </div>
    </header>
  );
};