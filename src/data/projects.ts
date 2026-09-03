/* ------------------------------------------------------------------
   PROJETS — 100 % PROVISOIRE.
   Descriptions : une ligne, jamais un paragraphe.
   ------------------------------------------------------------------ */

export type VisualVariant =
  | 'arc'
  | 'field'
  | 'sphere'
  | 'bars'
  | 'nest'
  | 'grid'
  | 'monogram'

export type Project = {
  number: string
  slug: string
  title: string
  category: string
  year: string
  description: string
  tags: readonly string[]
  visual: VisualVariant
  ratio: string
}

export const featuredProject: Project = {
  number: '01',
  slug: 'projet-un',
  title: 'Projet un',
  category: 'Expérience digitale',
  year: '2026',
  description: 'Direction, design system, intégration.',
  tags: ['Direction artistique', 'Design system', 'Développement créatif'],
  visual: 'sphere',
  ratio: '16 / 9',
}

export const projects: readonly Project[] = [
  {
    number: '02',
    slug: 'projet-deux',
    title: 'Projet deux',
    category: 'Identité de marque',
    year: '2026',
    description: 'Identité et déploiement digital.',
    tags: ['Identité', 'Déploiement digital'],
    visual: 'arc',
    ratio: '4 / 5',
  },
  {
    number: '03',
    slug: 'projet-trois',
    title: 'Projet trois',
    category: 'Développement créatif',
    year: '2025',
    description: 'Scroll, typographie, interaction.',
    tags: ['React', 'Motion', 'WebGL'],
    visual: 'bars',
    ratio: '3 / 2',
  },
  {
    number: '04',
    slug: 'projet-quatre',
    title: 'Projet quatre',
    category: 'Direction artistique',
    year: '2025',
    description: 'Langage visuel et direction éditoriale.',
    tags: ['Direction', 'Éditorial'],
    visual: 'nest',
    ratio: '4 / 5',
  },
  {
    number: '05',
    slug: 'projet-cinq',
    title: 'Projet cinq',
    category: 'Design interactif',
    year: '2024',
    description: "Prototypes et système d'interaction.",
    tags: ['Prototypage', 'Design system'],
    visual: 'field',
    ratio: '3 / 2',
  },
]

export const archive: readonly {
  id: string
  label: string
  year: string
  visual: VisualVariant
}[] = [
  { id: 'a1', label: 'Typographie', year: '2026', visual: 'monogram' },
  { id: 'a2', label: 'Forme', year: '2026', visual: 'nest' },
  { id: 'a3', label: 'Mouvement', year: '2025', visual: 'arc' },
  { id: 'a4', label: 'Couleur', year: '2025', visual: 'sphere' },
  { id: 'a5', label: 'Grille', year: '2025', visual: 'grid' },
  { id: 'a6', label: 'Matière', year: '2024', visual: 'field' },
]
