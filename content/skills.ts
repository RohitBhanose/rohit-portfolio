import { projects } from './projects'
import { education, experience } from './experience'
import type { ProjectSlug, SkillGroup, SkillRef } from './types'

/**
 * Skills from the résumé, each linked to the work where it was used. Skills with nothing on this page to point at
 * are listed as "also familiar with", never dressed up as evidence.
 */
export const skillGroups: SkillGroup[] = [
  {
    name: 'Programming languages',
    skills: [
      { name: 'Python', usedIn: ['parkit', 'indiaguessr'] },
      { name: 'TypeScript', usedIn: ['swiftdineos', 'levelup', 'indiaguessr'] },
      { name: 'JavaScript', usedIn: ['leftovera'] },
      { name: 'C++', usedIn: ['parkit'] },
      { name: 'C', usedIn: ['parkit'] },
      { name: 'SQL', usedIn: ['levelup', 'parkit'] },
      { name: 'HTML & CSS', usedIn: ['leftovera', 'indiaguessr'] },
    ],
  },
  {
    name: 'Frontend development',
    skills: [
      { name: 'React', usedIn: ['swiftdineos', 'levelup', 'indiaguessr', 'leftovera'] },
      { name: 'Next.js', usedIn: ['swiftdineos'] },
      { name: 'Tailwind CSS', usedIn: ['swiftdineos', 'levelup', 'leftovera'] },
      { name: 'TanStack Start', usedIn: ['levelup'] },
      { name: 'Vite', usedIn: ['levelup', 'leftovera'] },
      { name: 'React Router', usedIn: ['leftovera'] },
      { name: 'Streamlit', usedIn: ['parkit'] },
    ],
  },
  {
    name: 'Backend and databases',
    skills: [
      { name: 'FastAPI', usedIn: ['indiaguessr'] },
      { name: 'REST APIs', usedIn: ['indiaguessr'] },
      { name: 'Supabase', usedIn: ['swiftdineos', 'levelup'] },
      { name: 'PostgreSQL', usedIn: ['levelup'] },
      { name: 'Prisma ORM', usedIn: ['swiftdineos'] },
      { name: 'MySQL', usedIn: ['parkit'] },
      { name: 'SQLite', usedIn: ['indiaguessr'] },
    ],
    familiar: ['Flask', 'MongoDB'],
  },
  {
    name: 'AI/ML and data science',
    skills: [
      { name: 'YOLOv8 (object detection)', usedIn: ['parkit'] },
      { name: 'OpenCV', usedIn: ['parkit'] },
      { name: 'EasyOCR', usedIn: ['parkit'] },
      { name: 'Deep learning for document extraction', usedIn: ['bizamica'] },
      { name: 'Statistics and mathematics for data science', usedIn: ['iitm'] },
    ],
    familiar: ['Hugging Face', 'Kaggle', 'Promptfoo'],
  },
  {
    name: 'Tools and platforms',
    skills: [
      { name: 'Git & GitHub', usedIn: ['parkit', 'indiaguessr', 'leftovera'] },
      { name: 'Vercel', usedIn: ['levelup', 'indiaguessr', 'leftovera'] },
      { name: 'Render', usedIn: ['indiaguessr'] },
      { name: 'Google Maps Platform', usedIn: ['indiaguessr'] },
    ],
    familiar: ['Docker', 'Linux'],
  },
]

const entries = [...experience, ...education]

/** Label and in-page anchor for a skill reference. */
export function reference(ref: SkillRef) {
  const project = projects.find((p) => p.slug === (ref as ProjectSlug))
  if (project) return { label: project.name, anchor: `#${project.slug}` }
  const entry = entries.find((e) => e.id === ref)
  if (!entry) throw new Error(`Unknown skill reference: ${ref}`)
  return { label: entry.org.name, anchor: `#${entry.id}` }
}

export const spokenLanguages = [
  { name: 'English', lang: 'en' },
  { name: 'Hindi', native: 'हिन्दी', lang: 'hi' },
  { name: 'Marathi', native: 'मराठी', lang: 'mr' },
  { name: 'German', native: 'Deutsch', lang: 'de' },
]
