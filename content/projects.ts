import type { Project } from './types'

/**
 * Every claim here is traceable to the resume, the public repository, the live site,
 * or (for private codebases) the local git history. Keep it that way when editing.
 */
export const projects: Project[] = [
  {
    slug: 'swiftdineos',
    name: 'SwiftDineOS',
    period: 'Jun 2026 – present',
    role: 'Co-founder',
    place: 'Restaurant tables',
    tagline: 'An AI-powered operating system for restaurants.',
    summary:
      'One platform for the whole dining loop: QR ordering at the table, a live kitchen display, table and floor management, loyalty, CRM and analytics, plus an AI assistant that answers questions from the restaurant’s own numbers.',
    problem:
      'Restaurants run on a patchwork: a POS here, a loyalty app there, spreadsheets everywhere. Owners learn what sold last week instead of what is selling now, and most guests order once and are never heard from again.',
    contribution:
      'I co-founded the company and drive product strategy and business development. I also build hands-on across the platform: ordering and table flows, payments and messaging integrations, authentication, and much of the day-to-day engineering.',
    highlights: [
      {
        title: 'Multi-tenant by design',
        body: 'Every restaurant’s data is tenant-scoped, with dedicated tests that fail closed on cross-tenant reads.',
      },
      {
        title: 'A floor that stays in sync',
        body: 'Orders, tables and staff views update over Server-Sent Events, so an order reaches the kitchen screen the moment it is placed.',
      },
      {
        title: 'Recommendations from real orders',
        body: 'Add-on suggestions come from market-basket analysis (support, confidence, lift) over each restaurant’s own order history, combined with weather signals.',
      },
      {
        title: 'Guarded money paths',
        body: 'Order placement, QR scans, loyalty claims and bill settlement are idempotent and covered by race-condition tests in CI.',
      },
    ],
    modules: [
      'QR ordering',
      'Kitchen display',
      'Table and floor management',
      'Loyalty and CRM',
      'Analytics',
      'SwiftAI assistant',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Supabase', 'LLM APIs', 'Vitest', 'Playwright', 'Vercel'],
    live: { href: 'https://www.swiftdineos.in/', label: 'swiftdineos.in' },
    source: { unavailable: 'Private codebase' },
    shots: [
      {
        src: '/work/swiftdine-home',
        widths: [640, 960, 1600],
        width: 1600,
        height: 1000,
        alt: 'SwiftDineOS landing page: “The AI Operating System for Restaurants”, beside a live order flowing from table 7 to the kitchen display.',
        caption: 'The landing page at swiftdineos.in',
      },
      {
        src: '/work/swiftdine-demo',
        widths: [640, 960, 1600],
        width: 1600,
        height: 1000,
        alt: 'SwiftDineOS interactive walkthrough, step 1 of 6: a guest scans the table QR code to open a shared dining session.',
        caption: 'Step 1 of the interactive walkthrough: a guest scans the table’s QR code',
      },
      {
        src: '/work/swiftdine-mobile',
        widths: [320, 520, 780],
        width: 780,
        height: 1350,
        alt: 'SwiftDineOS landing page on a phone.',
        caption: 'The landing page on a phone',
      },
    ],
    heroShot: '/work/swiftdine-demo',
  },
  {
    slug: 'levelup',
    name: 'LevelUp',
    period: 'Sep 2026',
    role: 'Lead developer',
    place: 'Event halls',
    tagline: 'A gamified event platform for a game-development programme.',
    summary:
      'Players choose a Pokémon-inspired starter companion that evolves as they earn XP. Volunteers check players in by scanning their digital pass, and organisers run sessions, rewards, leaderboards and credentials from a superadmin portal.',
    problem:
      'The organisers of LevelUp by SquadUp wanted signing up to feel like entering a game rather than filling out a Google Form, while still tracking attendance and progress reliably for every player.',
    contribution:
      'Lead developer on a team project, where design teammates supplied the companion and badge art. I wrote most of the code: the database schema and migrations, access control, account-management Edge Functions, the superadmin portal, the attendance flow and the test suites.',
    highlights: [
      {
        title: 'Authorisation lives in Postgres',
        body: 'Row-level security on every table; writes go through validated security-definer functions, so route guards are a convenience, not the boundary.',
      },
      {
        title: 'XP as an append-only ledger',
        body: 'Levels and evolutions are computed from transactions. Unique constraints and per-player advisory locks mean a pass scanned twice, even simultaneously, awards XP once.',
      },
      {
        title: 'A race condition, reproduced and fixed',
        body: 'A manual check-in racing a QR scan could double-award XP. All 3 completion paths now share one lock, covered by integration tests.',
      },
    ],
    stack: ['React', 'TypeScript', 'TanStack Start', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'SQL', 'Playwright'],
    // /levelup itself is the signed-in player portal; /levelup/welcome is the public entry point.
    live: { href: 'https://squadup-levelup.vercel.app/levelup/welcome', label: 'squadup-levelup.vercel.app' },
    source: { unavailable: 'Private repository' },
    shots: [
      {
        src: '/work/levelup-starter',
        widths: [640, 960, 1600],
        width: 1600,
        height: 1000,
        alt: 'LevelUp “Select starter” screen: 3 original pixel-art companions, Flamir, Aquen and Verdan, beside a lake.',
        caption: 'Choosing a starter companion, with art by the design team',
      },
      {
        src: '/work/levelup-login',
        widths: [640, 960, 1600],
        width: 1600,
        height: 1000,
        alt: 'LevelUp player portal sign-in in a pixel-art forest, listing companion, gym badge, side quest and rank features.',
        caption: 'The player portal sign-in',
      },
    ],
    heroShot: '/work/levelup-starter',
  },
  {
    slug: 'parkit',
    name: 'ParkIT',
    period: '2026',
    role: 'Lead developer',
    place: 'Parking gates',
    tagline: 'A camera-based parking system that reads number plates and bills automatically.',
    summary:
      'A webcam reads each vehicle’s number plate. The first read records entry and assigns a free slot; the next records exit and produces a bill, with peak-hour pricing, all from a Streamlit console.',
    problem:
      'A second-year OOP and DBMS project: replace a parking lot’s hand-kept entry and exit log with a camera, automatic slot allocation and billing.',
    contribution:
      'Lead developer on a second-year academic team project. I wrote the original C program and the first YOLO + Streamlit version, then built the MySQL integration, OCR improvements, UI redesign and the C++17 rewrite with tests.',
    highlights: [
      {
        title: 'Plate reads that have to agree',
        body: 'YOLOv8 finds the plate and EasyOCR reads it. A plate is accepted only after it wins across multiple frames, and reads are fitted to 8 Indian plate formats, including Bharat series.',
      },
      {
        title: 'An object-oriented C++17 core',
        body: 'Strategy pattern for fee rules, a repository pattern for CSV storage (with an optional MySQL build) and a transaction state machine, driven from Python over a JSON bridge.',
      },
      {
        title: 'No double-booked slots',
        body: 'In MySQL mode, stored procedures and triggers manage sessions, and slot claims use SELECT … FOR UPDATE, so two cars can never get the same slot.',
      },
    ],
    stack: ['Python', 'YOLOv8', 'OpenCV', 'EasyOCR', 'Streamlit', 'C++17', 'C', 'MySQL', 'CSV'],
    live: { unavailable: 'Runs locally and needs a webcam' },
    source: {
      href: 'https://github.com/RohitBhanose/parkinglotsystem/tree/parkinglotsystem-cpp',
      label: 'github.com/RohitBhanose/parkinglotsystem',
    },
    shots: [],
    diagram: 'parkit',
    heroCaption: 'The ParkIT pipeline. It runs locally with a webcam, so there’s no hosted demo.',
  },
  {
    slug: 'indiaguessr',
    name: 'IndiaGuessr',
    period: 'Jun 2026',
    role: 'Lead developer',
    place: 'City streets',
    tagline: 'A GeoGuessr-style game set on the streets of India and the world.',
    summary:
      'Drop into a Google Street View panorama, read the clues (road signs, architecture, language) and pin your guess on the map. 5 rounds, up to 5,000 points each, in India or World mode.',
    problem:
      'A semester-break project to learn full-stack development end to end: API design, data modelling, third-party integrations and deployment.',
    contribution:
      'Built end to end: the FastAPI backend, the React and TypeScript frontend, the tooling that builds and cleans the location dataset, and deployment across Vercel and Render.',
    highlights: [
      {
        title: 'Scoring that rewards precision',
        body: 'score = 5000 · e^(−d/k) over great-circle (Haversine) distance, with k = 200 km in India mode and 2,000 km in World mode.',
      },
      {
        title: 'Curated rounds, not random ones',
        body: 'Each game fills 5 category slots (urban, suburban, rural, highway, landmark) from verified locations, deduplicated by panorama and coordinates.',
      },
      {
        title: 'Fallbacks at every layer',
        body: 'If a stored panorama fails, the client searches outward for outdoor coverage and reports the snapped position, so scoring stays fair. Geocoding falls back to OpenStreetMap.',
      },
    ],
    stack: ['FastAPI', 'Python', 'SQLAlchemy', 'SQLite', 'React', 'TypeScript', 'Tailwind CSS', 'Google Maps Platform', 'Vercel', 'Render'],
    live: { href: 'https://indiaguessr.vercel.app/', label: 'indiaguessr.vercel.app' },
    source: { href: 'https://github.com/RohitBhanose/IndiaGuessr', label: 'github.com/RohitBhanose/IndiaGuessr' },
    shots: [
      {
        src: '/work/indiaguessr-home',
        widths: [640, 960, 1600],
        width: 1600,
        height: 1000,
        alt: 'IndiaGuessr home page: “Where in the world are you?” with India Mode and World Mode options.',
        caption: 'Choosing between India and World mode',
      },
    ],
    heroShot: '/work/indiaguessr-home',
  },
  {
    slug: 'leftovera',
    name: 'Leftovera',
    period: 'Jan 2026',
    role: 'Lead developer',
    place: 'Kitchens and NGOs',
    tagline: 'Helping restaurants find the NGOs that redistribute surplus food.',
    summary:
      'A discovery platform with a curated directory of 27 food-redistribution organisations across Indian cities, searchable by name and filterable by city and donation category, plus guidance for restaurants on donating safely.',
    problem:
      'Surplus food is often wasted not because businesses are unwilling to donate, but because they don’t know whom to contact or how to donate safely.',
    contribution:
      'Built and deployed the React single-page app: routing, directory search and filters, organisation profiles and the restaurant guidance pages.',
    highlights: [
      {
        title: 'Filters that follow the data',
        body: 'City and category options are derived from the dataset, so adding an organisation updates the filters automatically; search and filters combine in one memoised pass.',
      },
    ],
    stack: ['React', 'JavaScript', 'Vite', 'React Router', 'Tailwind CSS', 'Vercel'],
    live: { href: 'https://leftovera.vercel.app/', label: 'leftovera.vercel.app' },
    source: { href: 'https://github.com/RohitBhanose/leftovera', label: 'github.com/RohitBhanose/leftovera' },
    shots: [
      {
        src: '/work/leftovera-home',
        widths: [640, 960, 1600],
        width: 1600,
        height: 1000,
        alt: 'Leftovera home page: “Bridge the gap between surplus & scarcity”, with buttons to find NGOs and for restaurants.',
        caption: 'The home page, with the directory inset',
        tone: 'light',
      },
      {
        src: '/work/leftovera-directory',
        widths: [640, 960, 1600],
        width: 1600,
        height: 1000,
        alt: 'Leftovera directory with search, city and category filters above organisation cards.',
        caption: 'The directory, filterable by city and category',
        tone: 'light',
      },
    ],
    heroShot: '/work/leftovera-home',
  },
]

/** Smaller, older work kept from the previous site. */
export const archive = [
  {
    slug: 'student-manager',
    name: 'Student Manager',
    period: '2025',
    description: 'A Flask prototype to help students track attendance, CGPA and assignments.',
    stack: ['Python', 'Flask', 'SQLite', 'Bootstrap'],
    source: { href: 'https://github.com/RohitBhanose/Student-Manager-Project', label: 'github.com/RohitBhanose/Student-Manager-Project' },
  },
]
