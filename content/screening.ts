/**
 * Screening facts that need Rohit's approval before they appear anywhere on the site. Both are on the résumé; flip
 * `approved` to publish them in the hero and in Education. Import this only from server components, so unapproved
 * values never reach the browser (content/site.ts is imported by client components and ships in their bundle).
 */
export const screening = {
  approved: { classYear: false, cgpa: false },
  classYear: { label: 'Class of 2029', mitwpu: 'Apr 2029', iitm: 'May 2029' },
  cgpa: '8.4',
} as const
