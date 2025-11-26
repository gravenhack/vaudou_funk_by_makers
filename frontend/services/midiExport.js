import { RhythmPattern } from '../types';

const INSTRUMENT_PITCHES: Record<string, number> = {
  'Bell': 67,     // Low Agogo
  'Shaker': 70,   // Maracas
  'HighDrum': 60, // Hi Bongo
  'LowDrum': 64   // Low Conga
};

export const exportToMidi = (pattern: RhythmPattern): Blob => {
  // Constants
  const HEADER_CHUNK_TYPE = [0x4d, 0x54, 0x68, 0x64]; // MThd
  const TRACK_CHUNK_TYPE = [0x4d, 0x54, 0x72, 0x6b];  // MTrk
  const TICKS_PER_QUARTER = 96;
  
  // Utilities
  const strToBytes = (s: string) => s.split('').map(c => c.charCodeAt(0));
  
  const numToBytes = (num: number, byteCount: number) => {
    const bytes = [];
    for (let i = byteCount - 1; i >= 0; i--) {
      bytes.push((num >> (8 * i)) & 0xFF);
    }
    return bytes;
  };

  const writeVarLength = (val: number) => {
    if (val === 0) return [0];
    const buffer = [];
    let temp = val;
    buffer.push(temp & 0x7F);
    while ((temp >>= 7)) {
      buffer.push((temp & 0x7F) | 0x80);
    }
    return buffer.reverse();
  };

  // 1. Header Chunk
  // Format 0 (single track), 1 track, 96 ticks/beat
  const header = [
    ...HEADER_CHUNK_TYPE,
    ...numToBytes(6, 4), // Length
    ...numToBytes(0, 2), // Format 0
    ...numToBytes(1, 2), // 1 Track
    ...numToBytes(TICKS_PER_QUARTER, 2)
  ];

  // 2. Track Data Construction
  let events: { tick: number, type: 'ON'|'OFF', note: number }[] = [];
  
  const ticksPerStep = TICKS_PER_QUARTER / 4; // 24 ticks per 16th note
  
  pattern.tracks.forEach(track => {
    const pitch = INSTRUMENT_PITCHES[track.instrument] || 60;
    track.steps.forEach((isActive, stepIndex) => {
      if (isActive) {
        const startTick = stepIndex * ticksPerStep;
        // Note length: short for percussion (half step)
        const endTick = startTick + 12; 
        
        events.push({ tick: startTick, type: 'ON', note: pitch });
        events.push({ tick: endTick, type: 'OFF', note: pitch });
      }
    });
  });

  // Sort events by tick
  events.sort((a, b) => a.tick - b.tick);

  // Build Track Event Bytes
  let trackData: number[] = [];
  let currentTick = 0;

  // Meta: Sequence Name
  trackData.push(0x00, 0xFF, 0x03, ...writeVarLength(pattern.name.length), ...strToBytes(pattern.name));

  // Meta: Tempo (Microseconds per beat)
  const tempoVal = Math.round(60000000 / pattern.bpm);
  trackData.push(0x00, 0xFF, 0x51, 0x03, ...numToBytes(tempoVal, 3));

  events.forEach(event => {
    const delta = event.tick - currentTick;
    currentTick = event.tick;
    
    trackData.push(...writeVarLength(delta));
    
    if (event.type === 'ON') {
      // Note On, Channel 10 (0x9), Velocity 100 (0x64)
      trackData.push(0x99, event.note, 0x64); 
    } else {
      // Note Off, Channel 10 (0x8), Velocity 0
      trackData.push(0x89, event.note, 0x00);
    }
  });

  // End of Track
  trackData.push(...writeVarLength(0), 0xFF, 0x2F, 0x00);

  // Track Chunk Finalization
  const trackChunk = [
    ...TRACK_CHUNK_TYPE,
    ...numToBytes(trackData.length, 4),
    ...trackData
  ];

  // Combine Header and Track
  const midiFile = new Uint8Array([...header, ...trackChunk]);
  return new Blob([midiFile], { type: 'audio/midi' });
};