import { archive, projects } from './projects'
import type { ProjectSlug, SkillGroup, SkillRef } from './types'

/**
 * Skills from the resume, each pointing at the work where it was used. Skills without `usedIn`
 * are listed together on one line per group.
 */
export const skillGroups: SkillGroup[] = [
  {
    name: 'Languages',
    skills: [
      { name: 'Python', usedIn: ['parkit', 'indiaguessr', 'student-manager'] },
      { name: 'TypeScript', usedIn: ['swiftdineos', 'levelup', 'indiaguessr'] },
      { name: 'JavaScript', usedIn: ['leftovera'] },
      { name: 'C++', usedIn: ['parkit'] },
      { name: 'C', usedIn: ['parkit'] },
      { name: 'SQL', usedIn: ['levelup', 'parkit'] },
      { name: 'HTML & CSS' },
    ],
  },
  {
    name: 'AI, ML & vision',
    skills: [
      { name: 'YOLO', usedIn: ['parkit'] },
      { name: 'OpenCV', usedIn: ['parkit'] },
      { name: 'LLM APIs', usedIn: ['swiftdineos'] },
      { name: 'Document AI', usedIn: ['bizamica'] },
      { name: 'Hugging Face' },
      { name: 'Kaggle' },
      { name: 'Promptfoo' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React', usedIn: ['swiftdineos', 'levelup', 'indiaguessr', 'leftovera'] },
      { name: 'Next.js', usedIn: ['swiftdineos'] },
      { name: 'Tailwind CSS', usedIn: ['swiftdineos', 'levelup', 'indiaguessr', 'leftovera'] },
      { name: 'TanStack Start', usedIn: ['levelup'] },
      { name: 'Vite', usedIn: ['levelup', 'indiaguessr', 'leftovera'] },
      { name: 'Streamlit', usedIn: ['parkit'] },
    ],
  },
  {
    name: 'Backend & data',
    skills: [
      { name: 'PostgreSQL', usedIn: ['swiftdineos', 'levelup'] },
      { name: 'Supabase', usedIn: ['swiftdineos', 'levelup'] },
      { name: 'FastAPI', usedIn: ['indiaguessr'] },
      { name: 'Prisma ORM', usedIn: ['swiftdineos'] },
      { name: 'MySQL', usedIn: ['parkit'] },
      { name: 'SQLite', usedIn: ['indiaguessr', 'student-manager'] },
      { name: 'Flask', usedIn: ['student-manager'] },
      { name: 'MongoDB' },
    ],
  },
  {
    name: 'Tools & platforms',
    skills: [
      { name: 'Vercel', usedIn: ['swiftdineos', 'levelup', 'indiaguessr', 'leftovera'] },
      { name: 'Render', usedIn: ['indiaguessr'] },
      { name: 'Google Maps Platform', usedIn: ['indiaguessr'] },
      { name: 'Playwright', usedIn: ['swiftdineos', 'levelup'] },
      { name: 'Git & GitHub' },
      { name: 'Docker' },
      { name: 'Linux' },
    ],
  },
  {
    name: 'Growth',
    compact: true,
    skills: [
      { name: 'Meta Ads Manager', usedIn: ['aiera'] },
      { name: 'Meta Business Suite', usedIn: ['aiera'] },
      { name: 'Canva', usedIn: ['aiera'] },
      { name: 'Buffer', usedIn: ['aiera'] },
    ],
  },
]

const otherReferences: Record<Exclude<SkillRef, ProjectSlug>, { label: string; anchor: string }> = {
  'student-manager': { label: archive[0].name, anchor: `#${archive[0].slug}` },
  aiera: { label: 'Aiera Mindlabs', anchor: '#experience' },
  bizamica: { label: 'bizAmica', anchor: '#experience' },
}

/** Label and in-page anchor for a skill reference. Project names come from the projects themselves. */
export function reference(ref: SkillRef) {
  const project = projects.find((p) => p.slug === ref)
  return project ? { label: project.name, anchor: `#${project.slug}` } : otherReferences[ref as Exclude<SkillRef, ProjectSlug>]
}

export const spokenLanguages = [
  { name: 'English', lang: 'en' },
  { name: 'Hindi', native: 'हिन्दी', lang: 'hi' },
  { name: 'Marathi', native: 'मराठी', lang: 'mr' },
  { name: 'German', native: 'Deutsch', lang: 'de' },
]
