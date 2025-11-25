import React from 'react';
import { RhythmPattern } from '../types';
import { Play, Heart, MoreHorizontal, Pause, Shuffle, SkipBack, SkipForward, Repeat, Download, Volume2, ArrowLeft } from 'lucide-react';

interface PlayerPanelProps {
  viewMode: 'list' | 'player';
  tracks: RhythmPattern[];
  currentTrack: RhythmPattern | null;
  isPlaying: boolean;
  onPlayTrack: (track: RhythmPattern) => void;
  onTogglePlay: () => void;
  onSwitchView: (view: 'list' | 'player') => void;
}

export const PlayerPanel: React.FC<PlayerPanelProps> = ({
  viewMode,
  tracks,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onTogglePlay,
  onSwitchView
}) => {
  
  if (viewMode === 'list') {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1f2937] leading-snug">
            Générateur de musique par IA – <br/>
            <span className="text-green-500">Produisez des sons uniques</span> en quelques secondes.
          </h2>
          <p className="text-gray-500 text-sm mt-4 leading-relaxed max-w-lg">
            Choisissez un style, une atmosphère et laissez l'IA créer une musique 100% originale et libre de droits, prête à être utilisée dans vos projets.
          </p>
        </div>

        <h3 className="text-[#3f51b5] font-bold mb-4">Pour vous...</h3>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {tracks.map((track) => (
            <div 
              key={track.id}
              className={`
                flex items-center gap-4 p-3 rounded-xl transition-all border group
                ${currentTrack?.id === track.id ? 'bg-white border-green-200 shadow-md' : 'bg-white/60 border-transparent hover:bg-white hover:shadow-sm'}
              `}
            >
               <button 
                 onClick={() => onPlayTrack(track)}
                 className={`
                   w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0
                   ${currentTrack?.id === track.id && isPlaying ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500 group-hover:bg-green-100 group-hover:text-green-600'}
                 `}
               >
                 {currentTrack?.id === track.id && isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
               </button>
               
               <div className="flex-1 min-w-0" role="button" onClick={() => onPlayTrack(track)}>
                 <h4 className={`font-bold text-sm truncate ${currentTrack?.id === track.id ? 'text-green-700' : 'text-gray-800'}`}>
                   {track.name}
                 </h4>
                 <p className="text-xs text-gray-400 truncate">{track.description}</p>
               </div>

               <div className="text-xs font-mono text-gray-400 shrink-0">{track.duration || '2:30'}</div>
               <button className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors shrink-0"><Heart size={16} /></button>
               <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors shrink-0"><MoreHorizontal size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // PLAYER VIEW
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100 relative animate-in fade-in zoom-in-95 duration-300">
       <button 
         onClick={() => onSwitchView('list')} 
         className="absolute top-6 left-6 text-sm text-gray-500 hover:text-[#3f51b5] font-medium flex items-center gap-1 transition-colors group"
       >
         <div className="bg-gray-100 p-1.5 rounded-full group-hover:bg-indigo-50 transition-colors">
           <ArrowLeft size={16} />
         </div>
       </button>
       <h3 className="text-[#3f51b5] font-bold mb-8">En cours de lecture</h3>

       <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl shadow-green-900/10 mb-8 relative group">
         <img 
           src={currentTrack?.cover || tracks[0].cover} 
           alt="Cover" 
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
         />
       </div>

       <div className="text-center mb-8">
         <h2 className="text-2xl font-bold text-[#1f2937] mb-1">{currentTrack?.name || 'Sato'}</h2>
         <p className="text-gray-500 text-sm">{currentTrack?.description || 'Percussion traditionnelle'}</p>
       </div>

       <div className="w-full max-w-sm mb-2 flex justify-between text-xs text-gray-400 font-mono">
         <span>0:15</span>
         <span>{currentTrack?.duration || '2:45'}</span>
       </div>
       <div className="w-full max-w-sm h-1.5 bg-gray-200 rounded-full mb-8 relative cursor-pointer group">
          <div className="absolute top-0 left-0 h-full w-1/4 bg-green-500 rounded-full group-hover:bg-green-400 transition-colors"></div>
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform"></div>
       </div>

       <div className="flex items-center gap-8 mb-10">
         <button className="text-gray-400 hover:text-indigo-500 transition-colors"><Shuffle size={20} /></button>
         <button className="text-gray-600 hover:text-green-600 transition-colors"><SkipBack size={28} fill="currentColor" /></button>
         <button 
           onClick={onTogglePlay}
           className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-500/30 transition-transform active:scale-95"
         >
           {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
         </button>
         <button className="text-gray-600 hover:text-green-600 transition-colors"><SkipForward size={28} fill="currentColor" /></button>
         <button className="text-gray-400 hover:text-indigo-500 transition-colors"><Repeat size={20} /></button>
       </div>

       <div className="w-full max-w-sm flex items-center justify-between px-4">
          <button className="text-gray-400 hover:text-[#3f51b5] transition-colors"><Download size={20} /></button>
          
          <div className="flex items-center gap-2 w-32 group">
             <Volume2 size={16} className="text-gray-400 group-hover:text-gray-600" />
             <input type="range" className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer range-slider" />
          </div>

          <button className="text-gray-400 hover:text-red-500 transition-colors"><Heart size={20} /></button>
       </div>
    </div>
  );
};