import React from 'react';
import { Track } from '../types';

interface SequencerProps {
  tracks: Track[];
  currentStep: number;
  isPlaying: boolean;
  onToggleStep: (trackIndex: number, stepIndex: number) => void;
}

export const Sequencer: React.FC<SequencerProps> = ({
  tracks,
  currentStep,
  isPlaying,
  onToggleStep,
}) => {
  return (
    <div className="w-full bg-gray-900/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm shadow-2xl">
      <div className="flex flex-col gap-4">
        {/* Step Indicators (Top) */}
        <div className="flex gap-2 ml-36 mb-2">
           {Array.from({ length: 16 }).map((_, i) => (
             <div 
               key={i} 
               className={`flex-1 h-1 rounded-full transition-colors duration-75 ${
                 currentStep === i && isPlaying ? 'bg-yellow-400' : (i % 4 === 0 ? 'bg-gray-600' : 'bg-gray-800')
               }`}
             />
           ))}
        </div>

        {tracks.map((track, trackIndex) => (
          <div key={`${track.instrument}-${trackIndex}`} className="flex items-center gap-4">
            {/* Track Header */}
            <div className="w-32 flex flex-col justify-center">
              <span className="text-sm font-bold text-gray-200">{track.name}</span>
              <span className="text-xs text-gray-500">{track.instrument}</span>
            </div>

            {/* Steps Grid */}
            <div className="flex-1 flex gap-2">
              {track.steps.map((isActive, stepIndex) => {
                const isCurrent = currentStep === stepIndex;
                const isBeat = stepIndex % 4 === 0;
                
                return (
                  <button
                    key={stepIndex}
                    onClick={() => onToggleStep(trackIndex, stepIndex)}
                    className={`
                      flex-1 aspect-[4/5] rounded-md transition-all duration-100
                      border border-gray-700/50 relative overflow-hidden group
                      ${isActive ? track.color : 'bg-gray-800 hover:bg-gray-700'}
                      ${isCurrent && isPlaying ? 'brightness-150 shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105 z-10' : ''}
                      ${!isActive && isBeat ? 'bg-gray-800/80' : ''}
                    `}
                    title={`Pas ${stepIndex + 1}`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
