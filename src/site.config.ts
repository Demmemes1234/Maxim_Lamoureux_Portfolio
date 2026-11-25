/**
 * ─────────────────────────────────────────────────────────────
 *  SITE SETTINGS: your name, links and colour all live here.
 *  Edit the text between the quotes, save, and the whole site updates.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: 'Maxim Lamoureux',

  /** Short line shown under your name on the home page. */
  pitch:
    'Electrical Engineering student at McGill. I design power systems and hardware, and I write the code that runs them.',

  /** Smaller line under the pitch. */
  subtitle: 'B.Eng. Electrical Engineering, McGill University · 2nd year',

  /** Used in page titles, search results and LinkedIn previews. */
  description:
    'Portfolio of Maxim Lamoureux, Electrical Engineering student at McGill University: power electronics, PCB design, embedded systems and software projects.',

  /** What you're looking for. Shown on the home and contact pages. */
  lookingFor: 'Seeking engineering internships in hardware, power and embedded systems.',

  location: 'Montréal, QC',

  email: 'max.lamoureux212@hotmail.com',

  links: {
    linkedin: 'https://www.linkedin.com/in/maxim-lamoureux-2158a114a/',
    github: 'https://github.com/Demmemes1234',
  },

  /**
   * ACCENT COLOUR: the one colour used for links, buttons and highlights.
   * Any CSS colour works: '#E9735F' (salmon), '#2563EB' (blue), '#0F766E' (teal)...
   * Darker/lighter shades are generated automatically for readable text.
   */
  accent: '#E9735F',

  /** Files in the /public folder. Replace the files and keep the names. */
  resumeFile: '/resume.pdf',
  photo: '/profile.jpg',
  ogImage: '/og-image.png',
} as const;
