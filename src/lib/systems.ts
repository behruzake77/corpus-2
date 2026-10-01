export type AnatomySystem = {
  id: string;
  name: string;
  latin: string;
  summary: string;
  detail: string;
  image: string;
  structures: number;
  lessons: number;
  clinical: string;
};

export const anatomySystems: AnatomySystem[] = [
  {
    id: "skeletal",
    name: "Skeletal System",
    latin: "Systema skeletale",
    summary: "Two hundred and six bones, articulated as a living architecture.",
    detail:
      "Map osteology, joints, and surface landmarks until you can reconstruct a skeleton from a single view.",
    image: "/images/system-skeletal.jpg",
    structures: 206,
    lessons: 28,
    clinical: "Fracture patterns · joint lines",
  },
  {
    id: "muscular",
    name: "Muscular System",
    latin: "Systema musculare",
    summary: "Origin, insertion, innervation — learned as function, not lists.",
    detail:
      "Layer superficial to deep. See how compartments explain weakness, gait, and surgical approaches.",
    image: "/images/system-muscular.jpg",
    structures: 640,
    lessons: 36,
    clinical: "Myotomes · compartment syndrome",
  },
  {
    id: "nervous",
    name: "Nervous System",
    latin: "Systema nervosum",
    summary: "Pathways you can trace from cortex to the last dermatome.",
    detail:
      "Cranial nerves, plexuses, and tracts presented as routes — so lesions become localizable, not memorized.",
    image: "/images/system-nervous.jpg",
    structures: 420,
    lessons: 41,
    clinical: "Lesion localization",
  },
  {
    id: "cardiovascular",
    name: "Cardiovascular System",
    latin: "Systema cardiovasculare",
    summary: "Heart, vessels, and the logic of circulation.",
    detail:
      "Chambers, valves, coronary territories, and the great vessels as a continuous map of perfusion.",
    image: "/images/system-cardiovascular.jpg",
    structures: 180,
    lessons: 24,
    clinical: "Coronary territories · pulses",
  },
  {
    id: "respiratory",
    name: "Respiratory System",
    latin: "Systema respiratorium",
    summary: "Airway, lobes, and the mechanics of breathing.",
    detail:
      "From nasal cavity to alveolus, with bronchopulmonary segments that matter on the ward.",
    image: "/images/system-respiratory.jpg",
    structures: 96,
    lessons: 18,
    clinical: "Lobar collapse · auscultation",
  },
  {
    id: "digestive",
    name: "Digestive System",
    latin: "Systema digestorium",
    summary: "Foregut to hindgut, with blood supply that explains disease.",
    detail:
      "Peritoneal relations, sphincter anatomy, and portal drainage — the spatial story behind abdominal findings.",
    image: "/images/system-digestive.jpg",
    structures: 150,
    lessons: 22,
    clinical: "Referred pain · portal flow",
  },
];

export const productMetrics = [
  { value: "12", label: "Anatomy systems" },
  { value: "240+", label: "Interactive lessons" },
  { value: "1,800", label: "Practice questions" },
  { value: "Per structure", label: "Mastery tracking" },
];
