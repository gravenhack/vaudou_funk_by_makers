import React from 'react';
import { RHYTHM_STYLES } from '../constants';
import { Image, Code, Mic, ArrowRight } from 'lucide-react';

export const GeneratorPanel = ({
  selectedStyle,
  onStyleSelect,
  prompt,
  setPrompt,
  onGenerate,
  isGenerating,
  instrumentMode,
  setInstrumentMode
}) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto pr-2">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1f2937] mb-2 leading-tight">
          Génération <br /> 
          <span className="text-green-500">musicale par IA</span>
        </h2>
      </div>

      <div className="mb-8">
        <h3 className="text-[#8b5cf6] font-bold mb-4">La tendance</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
          {RHYTHM_STYLES.map(style => (
            <button
              key={style.id}
              onClick={() => onStyleSelect(style)}
              className={`
                flex-shrink-0 w-36 text-left group transition-all snap-start
                ${selectedStyle.id === style.id ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'}
              `}
            >
              <div className={`
                w-36 h-36 rounded-2xl overflow-hidden mb-3 shadow-md relative
                ${selectedStyle.id === style.id ? 'ring-4 ring-green-400' : ''}
              `}>
                <img src={style.image} alt={style.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {selectedStyle.id === style.id && (
                  <div className="absolute inset-0 bg-green-500/20 backdrop-blur-[1px]"></div>
                )}
              </div>
              <h4 className="font-bold text-gray-800 text-sm">{style.name}</h4>
              <p className="text-gray-400 text-xs truncate">{style.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-[#5b5b9f] font-bold mb-3">Lyrics / Vibe</h3>
          <div className="bg-[#f3f4f6] rounded-2xl p-4 border border-gray-200 focus-within:border-indigo-400 focus-within:bg-white transition-colors shadow-sm">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Quel lyric voulez-vous générer ?"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 mb-4 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && onGenerate()}
            />
            <div className="flex justify-between items-center text-gray-400">
              <div className="flex gap-4">
                <button className="hover:text-indigo-500 transition-colors"><Image size={20} /></button>
                <button className="hover:text-indigo-500 transition-colors"><Code size={20} /></button>
                <button className="hover:text-indigo-500 transition-colors"><Mic size={20} /></button>
              </div>
              <button 
                onClick={onGenerate}
                disabled={isGenerating}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors disabled:opacity-50"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
           <div>
             <h3 className="text-[#5b5b9f] font-bold">Style</h3>
             <p className="text-xs text-gray-500">{selectedStyle.name}</p>
           </div>
           
           <div className="flex items-center gap-3">
             <span className="text-sm text-gray-500">Instrument</span>
             <button 
               onClick={() => setInstrumentMode(!instrumentMode)}
               className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${instrumentMode ? 'bg-indigo-500' : 'bg-gray-300'}`}
             >
               <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${instrumentMode ? 'translate-x-6' : ''}`} />
             </button>
           </div>
        </div>

        <button 
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full py-4 bg-[#5c6bc0] hover:bg-[#3f51b5] text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait"
        >
          {isGenerating ? 'Génération en cours...' : 'Générer'}
        </button>
      </div>
    </div>
  );
};