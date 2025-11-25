import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INITIAL_PATTERN, RHYTHM_STYLES, PRESET_PATTERNS } from './constants';
import { RhythmPattern, RhythmStyle } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { GeneratorPanel } from './components/GeneratorPanel';
import { PlayerPanel } from './components/PlayerPanel';
import { AuthModal } from './components/AuthModal';
import { audioEngine } from './services/audioEngine';
import { generateRhythmPattern } from './services/geminiService';

const App: React.FC = () => {
  // Navigation & UI State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'player'
  const [showAuthModal, setShowAuthModal] = useState(true); // Show on load like mockup
  
  // Data State
  const [tracks, setTracks] = useState<RhythmPattern[]>(PRESET_PATTERNS);
  const [currentTrack, setCurrentTrack] = useState<RhythmPattern>(PRESET_PATTERNS[0]);
  
  // Generator State
  const [selectedStyle, setSelectedStyle] = useState<RhythmStyle>(RHYTHM_STYLES[0]);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [instrumentMode, setInstrumentMode] = useState(false);

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);

  // Audio Engine Refs
  const nextNoteTimeRef = useRef<number>(0);
  const currentStepRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);
  const lookahead = 25.0;
  const scheduleAheadTime = 0.1;

  // --- Audio Logic ---
  const initAudio = () => {
    audioEngine.init();
  };

  const nextNote = useCallback(() => {
    const secondsPerBeat = 60.0 / bpm;
    const secondsPerStep = secondsPerBeat / 4;
    nextNoteTimeRef.current += secondsPerStep;
    currentStepRef.current = (currentStepRef.current + 1) % 16;
  }, [bpm]);

  const scheduleNote = useCallback((stepNumber: number, time: number) => {
    currentTrack.tracks.forEach(track => {
      if (track.steps[stepNumber]) {
        audioEngine.playInstrument(track.instrument, time);
      }
    });
  }, [currentTrack]);

  const scheduler = useCallback(() => {
    if (!audioEngine['ctx']) return;
    while (nextNoteTimeRef.current < audioEngine['ctx'].currentTime + scheduleAheadTime) {
      scheduleNote(currentStepRef.current, nextNoteTimeRef.current);
      nextNote();
    }
    timerIDRef.current = window.setTimeout(scheduler, lookahead);
  }, [nextNote, scheduleNote]);

  useEffect(() => {
    if (isPlaying) {
      if (!audioEngine['ctx']) audioEngine.init();
      if (audioEngine['ctx']?.state === 'suspended') audioEngine['ctx'].resume();
      
      // If just starting, sync time
      if (timerIDRef.current === null) {
         currentStepRef.current = 0;
         nextNoteTimeRef.current = audioEngine['ctx']?.currentTime! + 0.05;
      }
      scheduler();
    } else {
      if (timerIDRef.current) {
        window.clearTimeout(timerIDRef.current);
        timerIDRef.current = null;
      }
    }
    return () => {
      if (timerIDRef.current) window.clearTimeout(timerIDRef.current);
    };
  }, [isPlaying, scheduler]);

  // Sync BPM when track changes
  useEffect(() => {
    if (currentTrack) {
      setBpm(currentTrack.bpm);
    }
  }, [currentTrack]);

  // --- Handlers ---

  const handleGenerate = async () => {
    initAudio();
    setIsGenerating(true);
    try {
      // 50/40 are default complexity/temp values for now
      const newTracks = await generateRhythmPattern(selectedStyle.name, prompt, 60, 40);
      
      const newPattern: RhythmPattern = {
        id: `gen-${Date.now()}`,
        name: prompt ? `Vibe: ${prompt}` : `${selectedStyle.name} AI`,
        description: `Généré avec Gemini - ${selectedStyle.name}`,
        bpm: selectedStyle.defaultBpm,
        tracks: newTracks,
        duration: "2:15",
        cover: selectedStyle.image
      };

      setTracks(prev => [newPattern, ...prev]);
      setCurrentTrack(newPattern);
      setCurrentView('player'); // Switch to player to hear result
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
      alert("Erreur de génération. Vérifiez la clé API.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayTrack = (track: RhythmPattern) => {
    if (currentTrack.id === track.id) {
      setIsPlaying(!isPlaying);
      if (currentView === 'home') setCurrentView('player');
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setCurrentView('player');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f3f4f6]" onClick={initAudio}>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} onChangeView={(v) => setCurrentView(v === 'home' ? 'home' : v)} />
        
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden p-6 gap-8">
          
          {/* Left Panel - Generator */}
          <div className="w-full md:w-1/2 lg:w-5/12 h-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden relative">
            <GeneratorPanel 
              selectedStyle={selectedStyle}
              onStyleSelect={setSelectedStyle}
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              instrumentMode={instrumentMode}
              setInstrumentMode={setInstrumentMode}
            />
          </div>

          {/* Right Panel - Content / Player */}
          <div className="hidden md:block w-full md:w-1/2 lg:w-7/12 h-full transition-all duration-300">
            <div className={`h-full rounded-3xl transition-all duration-300 ${currentView === 'player' ? 'bg-transparent' : 'bg-white p-8 shadow-sm border border-gray-100'}`}>
               <PlayerPanel 
                 viewMode={currentView === 'player' ? 'player' : 'list'}
                 onSwitchView={(v) => setCurrentView(v === 'player' ? 'player' : 'home')}
                 tracks={tracks}
                 currentTrack={currentTrack}
                 isPlaying={isPlaying}
                 onPlayTrack={handlePlayTrack}
                 onTogglePlay={() => setIsPlaying(!isPlaying)}
               />
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default App;