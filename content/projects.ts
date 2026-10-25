import type { Project } from './types'

/**
 * Every claim here is traceable to the résumé, a public repository or a public page. SwiftDineOS and LevelUp are
 * private codebases: describe them at the level of the résumé and their public sites, never their internals,
 * unless the co-founder (SwiftDineOS) or the organisers (LevelUp) approve more.
 *
 * SwiftDineOS is the flagship. Its copy is Rohit's own account of the product, with each feature area and the
 * stack checked against the codebase's manifests and the public site. It describes capabilities and his part in
 * them, never adoption, customers or outcomes.
 */
export const projects: Project[] = [
  {
    slug: 'swiftdineos',
    name: 'SwiftDineOS',
    period: 'Jun 2026 – present',
    role: 'Co-founder',
    kind: 'Restaurant operating system',
    status: 'Live at swiftdineos.in',
    tagline: 'An AI-powered, cloud-based operating system for restaurants.',
    summary:
      'SwiftDineOS is a cloud-based restaurant operating system that unifies digital ordering, restaurant operations, customer intelligence, loyalty and business analytics in one platform. Rather than treating QR ordering as a standalone feature, I helped shape and develop an integrated product that connects customer interactions with restaurant workflows, customer retention and business performance.',
    contribution:
      'As co-founder, I drive product strategy and business development and work hands-on in full-stack product development, across the six areas of the platform below.',
    highlightsTitle: 'What I’ve helped build',
    highlights: [
      {
        title: 'Ordering & service',
        body: 'QR menus and ordering for table and counter service, waiter assistance, more than one order per table, and flexible checkout, including split bills.',
      },
      {
        title: 'Restaurant operations',
        body: 'Real-time table management and status tracking for managers, payment and cashier workflows, and kitchen order queues that link each order to fulfilment and service.',
      },
      {
        title: 'Customer intelligence & CRM',
        body: 'Customer profiles, a CRM and RFM-based customer tiers, to help restaurants understand buying behaviour, recognise returning customers and plan retention.',
      },
      {
        title: 'AI & loyalty',
        body: 'Loyalty and rewards, AI-assisted recommendations, and customer experiences that take the restaurant’s own context into account.',
      },
      {
        title: 'Business intelligence & growth',
        body: 'Analytics for owners that connect day-to-day operations and customer insight with the restaurant’s performance, to inform growth decisions.',
      },
      {
        title: 'End-to-end SaaS product development',
        body: 'Product strategy, feature planning, technical coordination and development across the customer, staff, restaurant-owner and platform-administration experiences.',
      },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Supabase', 'Prisma ORM'],
    live: { href: 'https://www.swiftdineos.in/', label: 'swiftdineos.in' },
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
    heroCrop: {
      alt: 'SwiftDineOS walkthrough: “One QR. The entire dining experience.” beside a table QR code.',
      caption: 'SwiftDineOS public walkthrough, step 1',
    },
    flagship: {
      label: 'Flagship',
      roleDetail: 'Co-founder, leading product strategy and full-stack product development',
      areasIntro: 'Six areas of one platform, designed around the same tables, orders and customers rather than as separate tools.',
      idea: {
        lead: 'One operating system, not a collection of disconnected tools.',
        body: 'SwiftDineOS connects digital ordering, restaurant operations, customer intelligence, loyalty and analytics, so a customer’s interactions can inform both the service happening now and the restaurant’s longer-term decisions.',
        loopLabel: 'The loop it’s designed around',
        loop: [
          { name: 'Order', detail: 'QR ordering at the table or counter' },
          { name: 'Service', detail: 'Kitchen, floor and cashier' },
          { name: 'Customer', detail: 'Profile, CRM and loyalty' },
          { name: 'Owner', detail: 'Analytics and growth decisions' },
          { name: 'Next visit', detail: 'Recommendations and rewards' },
        ],
      },
    },
  },
  {
    slug: 'levelup',
    name: 'LevelUp',
    period: 'Sep 2026',
    role: 'Lead developer',
    kind: 'Event registration and dashboard',
    team: 'A team I led, with designers creating the companion and badge art',
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
        body: 'Automated safeguards stop a pass scanned twice, even at the same moment, from recording attendance or awarding XP twice.',
      },
      {
        title: 'Progress players can see',
        body: 'XP, levels, companion evolution, badges and leaderboards make every player’s progress visible.',
      },
    ],
    stack: ['React', 'TypeScript', 'TanStack Start', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'SQL'],
    // /levelup itself is the signed-in player portal; /levelup/welcome is the public entry point.
    live: { href: 'https://squadup-levelup.vercel.app/levelup/welcome', label: 'squadup-levelup.vercel.app', cta: 'Visit the event site' },
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
    kind: 'Parking system with plate recognition',
    team: 'Second-year OOP and DBMS team project',
    tagline: 'Parking management with automated number-plate recognition, on a C++17 core.',
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
      {
        title: 'From gate to bill',
        body: 'Entry claims the first free slot; exit prices the stay with peak-hour and weekend rates and shows the fare with a payment QR code. A dashboard tracks occupancy, and every record is kept in CSV or MySQL.',
      },
    ],
    stack: ['Python', 'YOLOv8', 'OpenCV', 'EasyOCR', 'Streamlit', 'C++17', 'C', 'MySQL', 'CSV'],
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
        title: 'Coverage-aware panoramas',
        body: 'If a stored panorama fails, the client searches outward for outdoor coverage and reports the snapped position, so scoring stays fair.',
      },
    ],
    stack: ['FastAPI', 'Python', 'SQLite', 'REST APIs', 'React', 'TypeScript', 'Google Maps Platform', 'Vercel', 'Render'],
    // The live game (indiaguessr.vercel.app) is left out until its Street View rounds load again.
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
    status: 'Live, with 27 organisations listed',
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
    heroCrop: {
      alt: 'Leftovera: “Bridge the gap between surplus & scarcity” with buttons to find NGOs and for restaurants.',
      caption: 'Leftovera home page',
      tone: 'light',
    },
  },
]
