import type { Project } from './types'

/**
 * Every claim here is traceable to the résumé, a public repository or a public page. SwiftDineOS and LevelUp are
 * private codebases: describe them at the level of the résumé and their public sites, never their internals,
 * unless the co-founder (SwiftDineOS) or the organisers (LevelUp) approve more.
 */
export const projects: Project[] = [
  {
    slug: 'swiftdineos',
    name: 'SwiftDineOS',
    period: 'Jun 2026 – present',
    role: 'Co-founder',
    kind: 'Restaurant operating system',
    place: 'Restaurant tables',
    status: 'Company · live site at swiftdineos.in',
    statusShort: 'Company · live site',
    tagline: 'An AI-powered operating system for restaurants.',
    summary:
      'One platform for the dining loop: QR ordering at the table, a live kitchen display, table and floor management, loyalty, CRM and analytics, with AI suggestions for guests and owners.',
    contribution:
      'I co-founded the company and drive product strategy and business development. I coordinate product development across QR ordering, real-time table management, CRM and analytics, and write code across the platform.',
    highlightsTitle: 'Product highlights',
    highlights: [
      {
        title: 'From QR code to kitchen',
        body: 'A guest scans the table’s code and orders from their phone; the order reaches the kitchen display the moment it is placed.',
      },
      {
        title: 'The table is never guessed',
        body: 'The QR code itself identifies the table, so guests never pick one, and everyone at the table shares one dining session.',
      },
      {
        title: 'AI where it helps',
        body: 'Add-on suggestions offered to each guest at the right moment, and a short list of growth moves for owners each week.',
      },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Prisma ORM'],
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
        caption: 'Step 1 of the public walkthrough: a guest scans the table’s QR code',
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
    demo: 'Order from table 7',
    heroCrop: {
      alt: 'SwiftDineOS walkthrough: “One QR. The entire dining experience.” beside a table QR code.',
      caption: 'SwiftDineOS public walkthrough, step 1',
    },
  },
  {
    slug: 'levelup',
    name: 'LevelUp',
    period: 'Sep 2026',
    role: 'Lead developer',
    kind: 'Event registration and dashboard',
    place: 'Event halls',
    status: 'Season 2026 · public welcome page and player portal online',
    statusShort: 'Season 2026',
    team: 'Team project with designers, who created the companion and badge art',
    tagline: 'Registration, check-in and a live dashboard for a game-development event.',
    summary:
      'Players register by choosing a Pokémon-inspired starter companion, then follow their XP, companion evolution, badges and leaderboards in a player dashboard. Volunteers check players in by scanning their digital pass, and organisers run sessions, onboarding, credentials and attendance from their own portal.',
    contribution:
      'Lead developer on the team, with substantial ownership of the build: the data model, account management, the organiser portal, the QR attendance flow and the test suites.',
    highlightsTitle: 'Highlights',
    highlights: [
      {
        title: 'Three portals, one event',
        body: 'Role-based portals for players, volunteers and organisers: onboarding, session management, credential management and attendance analytics.',
      },
      {
        title: 'Check-ins that count once',
        body: 'Automated safeguards stop a pass scanned twice, even at the same moment, from recording attendance or awarding XP twice. The simulation shows the idea.',
      },
      {
        title: 'Progress players can see',
        body: 'XP, levels, companion evolution, badges and leaderboards make every player’s progress visible.',
      },
    ],
    stack: ['React', 'TypeScript', 'TanStack Start', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'SQL'],
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
        caption: 'Registration: choosing a starter companion (art by the design team)',
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
    demo: 'Scan a player pass',
    heroCrop: {
      alt: 'LevelUp starter selection: three pixel-art companions beside a lake.',
      caption: 'LevelUp registration (art by the design team)',
    },
  },
  {
    slug: 'parkit',
    name: 'ParkIT',
    period: 'Feb – Oct 2026',
    role: 'Lead developer',
    kind: 'Number-plate parking system',
    place: 'Parking gates',
    status: 'Runs locally with a webcam · no hosted version',
    statusShort: 'Runs locally',
    team: 'Second-year OOP and DBMS team project',
    tagline: 'A camera-based parking system that reads number plates and bills automatically.',
    summary:
      'A webcam reads each vehicle’s number plate. The first read records entry and assigns a free slot; the next records exit and produces a bill, with peak-hour pricing, all from a Streamlit console.',
    problem:
      'A second-year OOP and DBMS project: replace a parking lot’s hand-kept entry and exit log with a camera, automatic slot allocation and billing.',
    contribution:
      'I wrote the original C program and the first YOLO + Streamlit version, then built the MySQL integration, OCR improvements, UI redesign and the C++17 rewrite with tests. A teammate contributed the peak-hour and weekend fee rule, the parking map, the QR receipt and Bharat-series plate support.',
    highlightsTitle: 'Engineering decisions',
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
    demo: 'Follow a number plate',
  },
  {
    slug: 'indiaguessr',
    name: 'IndiaGuessr',
    period: 'Jun 2026',
    role: 'Lead developer',
    kind: 'Street View geography game',
    place: 'City streets',
    status: 'Live · Street View map currently unavailable',
    statusShort: 'Live · map unavailable',
    tagline: 'A GeoGuessr-style game set on the streets of India and the world.',
    summary:
      'Drop into a Google Street View panorama, read the clues (road signs, architecture, language) and pin your guess on the map. 5 rounds, up to 5,000 points each, in India or World mode.',
    problem:
      'A semester-break project to learn full-stack development end to end: API design, data modelling, third-party integrations and deployment.',
    contribution:
      'Built end to end: the FastAPI backend, the React and TypeScript frontend, the tooling that builds and cleans the location dataset, and deployment across Vercel and Render.',
    highlightsTitle: 'Engineering decisions',
    highlights: [
      {
        title: 'Scoring that rewards precision',
        body: 'score = 5000 · e^(−d/k) over great-circle (Haversine) distance, with k = 200 km in India mode and 2,000 km in World mode.',
      },
      {
        title: 'Curated rounds, not random ones',
        body: 'Each game fills 5 category slots (urban, suburban, rural, highway, landmark) from verified locations, deduplicated by panorama and coordinates.',
      },
      {
        title: 'Handling Street View coverage gaps',
        body: 'If a stored panorama fails, the client searches outward for outdoor coverage and reports the snapped position, so scoring stays fair.',
      },
    ],
    stack: ['FastAPI', 'Python', 'SQLite', 'REST APIs', 'React', 'TypeScript', 'Google Maps Platform', 'Vercel', 'Render'],
    live: { href: 'https://indiaguessr.vercel.app/', label: 'indiaguessr.vercel.app' },
    notice: 'The live game’s Street View map is temporarily unavailable. The scoring demo here runs the same formula.',
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
    demo: 'Play with the scoring',
    heroCrop: {
      alt: 'IndiaGuessr: “Where in the world are you?” above the India Mode and World Mode cards.',
      caption: 'IndiaGuessr home page',
    },
  },
  {
    slug: 'leftovera',
    name: 'Leftovera',
    period: 'Jan 2026',
    role: 'Lead developer',
    kind: 'Food-donation NGO directory',
    place: 'Kitchens and NGOs',
    status: 'Live · 27 organisations listed',
    statusShort: 'Live',
    tagline: 'Helping restaurants find the NGOs that redistribute surplus food.',
    summary:
      'A discovery platform with a curated directory of 27 food-redistribution organisations across Indian cities, searchable by name and filterable by city and donation category, plus guidance for restaurants on donating safely.',
    problem:
      'Surplus food is often wasted not because businesses are unwilling to donate, but because they don’t know whom to contact or how to donate safely.',
    contribution:
      'Built and deployed the React single-page app: routing, directory search and filters, organisation profiles and the restaurant guidance pages.',
    highlightsTitle: 'Engineering decisions',
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
        caption: 'The home page at leftovera.vercel.app',
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
    demo: 'Filter the directory',
    heroCrop: {
      alt: 'Leftovera: “Bridge the gap between surplus & scarcity” with buttons to find NGOs and for restaurants.',
      caption: 'Leftovera home page',
      tone: 'light',
    },
  },
]
