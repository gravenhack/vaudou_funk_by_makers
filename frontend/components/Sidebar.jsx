import React from 'react';
import { Mic2, Compass, Headphones, Heart, BookOpen, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Sidebar = ({ currentView, onChangeView }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };
  const menuItems = [
    { id: 'generate', icon: Mic2, activeColor: 'text-white bg-green-500' },
    { id: 'explore', icon: Compass, activeColor: 'text-green-600' },
    { id: 'library', icon: Headphones, activeColor: 'text-green-600' },
    { id: 'favorites', icon: Heart, activeColor: 'text-green-600' },
    { id: 'lyrics', icon: BookOpen, activeColor: 'text-green-600' },
  ];

  return (
    <aside className="w-16 md:w-20 bg-white border-r border-gray-100 flex flex-col items-center py-6 gap-8 h-[calc(100vh-64px)] overflow-y-auto shrink-0 z-10">
      <div className="flex flex-col gap-6 w-full items-center">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => onChangeView(item.id === 'generate' ? 'home' : item.id)}
            className={`
              p-3 rounded-xl transition-all duration-200 group relative
              ${currentView === (item.id === 'generate' ? 'home' : item.id) 
                ? `${item.activeColor} shadow-lg shadow-green-500/20` 
                : 'text-gray-400 hover:text-green-500 hover:bg-gray-50'
              }
            `}
          >
            <item.icon size={24} strokeWidth={currentView === (item.id === 'generate' ? 'home' : item.id) ? 2.5 : 2} />
          </button>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-6 items-center w-full pb-4">
        <button className="text-gray-400 hover:text-gray-600 p-2"><Settings size={22} /></button>
        <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 p-2 transition-colors">
          <LogOut size={22} />
        </button>
      </div>
    </aside>
  );
};