// src/lib/dummy-data.ts

export type Level = "Beginner" | "Intermediate" | "Advanced" | "Elite (Nasional)";
export type Status = "Pending" | "Completed";

export interface Athlete {
  id: string;
  name: string;
  level: Level;
  birth_date: string;
  specialty: string;
}

export interface MasterProgram {
  id: string;
  title: string;
  description: string;
  target_level: Level;
}

export interface TimeTrial {
  id: string;
  athlete_id: string;
  stroke_type: "Freestyle" | "Butterfly" | "Backstroke" | "Breaststroke" | "IM";
  distance: number; // dalam meter
  time_ms: number; // dalam milidetik sesuai ERD
  trial_date: string;
  notes?: string;
}

export interface AssignedWorkout {
  id: string;
  athlete_id: string;
  program_id: string;
  scheduled_date: string;
  status: Status;
}

// ==========================================
// DUMMY DATA: LEVEL PEMBIBITAN NASIONAL
// ==========================================

export const athletes: Athlete[] = [
  {
    id: "ath-001",
    name: "Bima Arya 'The Torpedo' Wibowo",
    level: "Elite (Nasional)",
    birth_date: "2008-04-12",
    specialty: "Sprint Freestyle",
  },
  {
    id: "ath-002",
    name: "Rara Kirana",
    level: "Elite (Nasional)",
    birth_date: "2009-11-23",
    specialty: "100m/200m Butterfly",
  },
  {
    id: "ath-003",
    name: "Sakti Mahesa",
    level: "Advanced",
    birth_date: "2010-02-15",
    specialty: "200m Individual Medley (IM)",
  }
];

export const timeTrials: TimeTrial[] = [
  // Bima - Sprint Free (Spek Medali Emas PON)
  {
    id: "tt-101",
    athlete_id: "ath-001",
    stroke_type: "Freestyle",
    distance: 50,
    time_ms: 22850, // 22.85 detik
    trial_date: "2026-06-20",
    notes: "Start reaction time 0.62s. Breakout sempurna.",
  },
  {
    id: "tt-102",
    athlete_id: "ath-001",
    stroke_type: "Freestyle",
    distance: 100,
    time_ms: 50420, // 50.42 detik
    trial_date: "2026-06-22",
    notes: "Pacing 24.10 / 26.32. Teknik bernapas perlu ditahan di 10m terakhir.",
  },
  // Rara - Butterfly
  {
    id: "tt-103",
    athlete_id: "ath-002",
    stroke_type: "Butterfly",
    distance: 100,
    time_ms: 59800, // 59.80 detik (Sub 1-minute!)
    trial_date: "2026-06-20",
    notes: "Pecah rekor personal! Kaki dolphin mantap saat underwater.",
  },
  // Sakti - IM
  {
    id: "tt-104",
    athlete_id: "ath-003",
    stroke_type: "IM",
    distance: 200,
    time_ms: 125300, // 2:05.30 
    trial_date: "2026-06-21",
    notes: "Transisi Backstroke ke Breaststroke masih agak lambat (+0.8s drop).",
  }
];

export const masterPrograms: MasterProgram[] = [
  {
    id: "prog-901",
    title: "Lactate Tolerance Sprints (V02 Max)",
    description: "10 x 50m Sprint max effort @ 1:30 interval. Target detak jantung >180 bpm. Latihan untuk menembus ambang laktat di 15 meter terakhir.",
    target_level: "Elite (Nasional)",
  },
  {
    id: "prog-902",
    title: "Hypoxic Underwater Kicks",
    description: "20 x 25m Underwater Dolphin Kicks dengan fins. Bernapas hanya setiap 3 siklus. Membangun kapasitas paru-paru untuk breakout jarak jauh.",
    target_level: "Elite (Nasional)",
  },
  {
    id: "prog-801",
    title: "IM Transition Drills",
    description: "Fokus pada pergantian gaya. 8 x 100m (25 Fly -> 25 Back, dst). Pertahankan momentum saat turn di dinding.",
    target_level: "Advanced",
  }
];

export const assignedWorkouts: AssignedWorkout[] = [
  {
    id: "aw-001",
    athlete_id: "ath-001", // Bima
    program_id: "prog-901", // Lactate Sprints
    scheduled_date: "2026-06-26",
    status: "Pending",
  },
  {
    id: "aw-002",
    athlete_id: "ath-002", // Rara
    program_id: "prog-902", // Hypoxic
    scheduled_date: "2026-06-26",
    status: "Completed",
  },
  {
    id: "aw-003",
    athlete_id: "ath-003", // Sakti
    program_id: "prog-801", // IM Drills
    scheduled_date: "2026-06-27",
    status: "Pending",
  }
];