export type Instrument = 'Bell' | 'Shaker' | 'HighDrum' | 'LowDrum';

export interface Track {
  instrument: Instrument;
  name: string;
  steps: boolean[]; // Array of 16 steps
  color: string;
}

export interface RhythmPattern {
  id?: string;
  name: string;
  description?: string;
  bpm: number;
  tracks: Track[];
  cover?: string;
  duration?: string;
  artist?: string;
}

export interface RhythmStyle {
  id: string;
  name: string;
  description: string;
  defaultBpm: number;
  image?: string;
}

export interface GenerationParams {
  style: string;
  complexity: number; // 0-100
  temperature: number; // 0-100 (Variability)
}