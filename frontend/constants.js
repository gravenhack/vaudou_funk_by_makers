// Mock images matching the Vaudoun vibe
const IMG_SATO = "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=600&auto=format&fit=crop";
const IMG_TCHINK = "https://www.memoireonline.com/12/21/12505/Sauvegarde-et-valorisation-du-patrimoine-immateriel-beninois-un-centre-de-promotion-des-rythmes-e15.png";
const IMG_FUNK = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop";
const IMG_ZINLI = "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=600&auto=format&fit=crop";

export const RHYTHM_STYLES = [
  {
    id: 'sato',
    name: 'Agbadja',
    description: 'Percussion traditionnelle vive',
    defaultBpm: 90,
    image: IMG_SATO
  },
  {
    id: 'tchinkoume',
    name: 'Tchinkoumé',
    description: 'Rythme de dance énergétique',
    defaultBpm: 115,
    image: IMG_TCHINK
  },
  {
    id: 'funk',
    name: 'Funk Fusion',
    description: 'Mélange moderne et groovy',
    defaultBpm: 120,
    image: IMG_FUNK
  },
  {
    id: 'zinli',
    name: 'Zinli',
    description: 'Tempo spirituel et mystique',
    defaultBpm: 100,
    image: IMG_ZINLI
  },
];

export const INITIAL_PATTERN = {
  id: 'new-1',
  name: 'Nouvelle Composition',
  description: 'Génération IA',
  bpm: 100,
  duration: '2:15',
  cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop",
  tracks: [],
};

export const PRESET_PATTERNS = [
  {
    id: 'p1',
    name: "Sato",
    description: "Percussion traditionnelle vive",
    bpm: 96,
    duration: "2:45",
    cover: IMG_SATO,
    artist: "Vaudoun Roots",
    tracks: [
      {
        instrument: "Bell",
        name: "Gankogui",
        color: "bg-yellow-500",
        steps: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, false, false]
      },
      {
        instrument: "Shaker",
        name: "Axatse",
        color: "bg-orange-400",
        steps: [true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, false]
      },
      {
        instrument: "HighDrum",
        name: "Kagan",
        color: "bg-red-500",
        steps: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false]
      },
      {
        instrument: "LowDrum",
        name: "Gungon",
        color: "bg-purple-600",
        steps: [true, false, false, false, true, false, false, false, true, false, false, true, false, false, false, true]
      }
    ]
  },
  {
    id: 'p2',
    name: "Tchinkoumé",
    description: "Rythme de dance énergétique",
    bpm: 110,
    duration: "3:05",
    cover: IMG_TCHINK,
    artist: "Savalou Vibes",
    tracks: [
      {
        instrument: "Bell",
        name: "Gankogui",
        color: "bg-yellow-500",
        steps: [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, true]
      },
      {
        instrument: "Shaker",
        name: "Axatse",
        color: "bg-orange-400",
        steps: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
      },
      {
        instrument: "HighDrum",
        name: "Kagan",
        color: "bg-red-500",
        steps: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true]
      },
      {
        instrument: "LowDrum",
        name: "Gungon",
        color: "bg-purple-600",
        steps: [true, false, true, false, false, true, false, false, true, false, true, false, false, true, true, false]
      }
    ]
  },
  {
    id: 'p3',
    name: "Funk Fusion",
    description: "Mélange moderne et groovy",
    bpm: 118,
    duration: "3:25",
    cover: IMG_FUNK,
    artist: "Cotonou City",
    tracks: [
      {
        instrument: "Bell",
        name: "Gankogui",
        color: "bg-yellow-500",
        steps: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]
      },
      {
        instrument: "Shaker",
        name: "Axatse",
        color: "bg-orange-400",
        steps: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]
      },
      {
        instrument: "HighDrum",
        name: "Kagan",
        color: "bg-red-500",
        steps: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false]
      },
      {
        instrument: "LowDrum",
        name: "Gungon",
        color: "bg-purple-600",
        steps: [true, false, false, false, true, false, false, true, true, false, false, false, true, false, false, true]
      }
    ]
  },
   {
    id: 'p4',
    name: "Zinli",
    description: "Tempo spirituel et mystique",
    bpm: 88,
    duration: "2:25",
    cover: IMG_ZINLI,
    artist: "Royal Abomey",
    tracks: [
      {
        instrument: "Bell",
        name: "Gankogui",
        color: "bg-yellow-500",
        steps: [true, false, true, false, false, false, true, false, true, false, false, false, true, false, true, false]
      },
      {
        instrument: "Shaker",
        name: "Axatse",
        color: "bg-orange-400",
        steps: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true]
      },
      {
        instrument: "HighDrum",
        name: "Kagan",
        color: "bg-red-500",
        steps: [false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, true]
      },
      {
        instrument: "LowDrum",
        name: "Gungon",
        color: "bg-purple-600",
        steps: [true, false, false, false, true, false, false, false, true, false, false, false, true, true, false, false]
      }
    ]
  }
];
