import React from 'react';
import { Play, Square, RefreshCw, Download, Wand2 } from 'lucide-react';

export const ControlPanel= ({
  isPlaying,
  bpm,
  setBpm,
  onPlayPause,
  onGenerate,
  isGenerating,
  complexity,
  setComplexity,
  temperature,
  setTemperature,
  onClear,
  onExportMidi
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-gray-900/80 p-6 rounded-xl border border-gray-700 shadow-xl backdrop-blur-md">
      
      {/* Transport Controls */}
      <div className="md:col-span-3 flex items-center justify-center md:justify-start gap-4 border-r border-gray-700 pr-6">
        <button
          onClick={onPlayPause}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg
            ${isPlaying 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-900/20' 
              : 'bg-green-500 hover:bg-green-600 text-white shadow-green-900/20'
            }
          `}
        >
          {isPlaying ? <Square fill="currentColor" size={24} /> : <Play fill="currentColor" size={28} className="ml-1" />}
        </button>
        
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 font-medium tracking-wider">TEMPO</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={bpm}
              onChange={(e) => setBpm(Math.max(40, Math.min(240, Number(e.target.value))))}
              className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 w-16 text-center font-mono focus:outline-none focus:border-yellow-500"
            />
            <span className="text-gray-500 text-sm">BPM</span>
          </div>
        </div>
      </div>

      {/* AI Parameters */}
      <div className="md:col-span-6 flex flex-col justify-center gap-4 px-2">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <label className="text-xs text-yellow-500 font-bold uppercase">Complexité Groove</label>
              <span className="text-xs text-gray-400">{complexity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={complexity}
              onChange={(e) => setComplexity(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 hover:accent-yellow-400"
            />
          </div>
          
          <div className="flex-1">
             <div className="flex justify-between mb-1">
              <label className="text-xs text-purple-400 font-bold uppercase">Variations IA</label>
              <span className="text-xs text-gray-400">{temperature}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="md:col-span-3 flex flex-col justify-center gap-3 border-l border-gray-700 pl-6">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`
            flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all
            ${isGenerating 
              ? 'bg-gray-700 text-gray-400 cursor-wait' 
              : 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-gray-900 shadow-lg shadow-yellow-900/20'
            }
          `}
        >
          {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Wand2 size={18} />}
          {isGenerating ? 'Génération...' : 'Générer Rythme'}
        </button>

        <div className="flex gap-2">
           <button 
             onClick={onClear}
             className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-sm transition-colors border border-gray-600"
           >
             Effacer
           </button>
           <button 
             onClick={onExportMidi}
             className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-sm transition-colors border border-gray-600 flex items-center justify-center gap-1"
           >
             <Download size={14} /> MIDI
           </button>
        </div>
      </div>
    </div>
  );
};
