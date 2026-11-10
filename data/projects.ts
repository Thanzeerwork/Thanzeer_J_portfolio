export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  n: string;
  title: string;
  client: string;
  year: string;
  category?: "Full-Stack Web & Frontends" | "Cross-Platform Mobile" | "Developer Tools & Systems";
  stack: string[];
  summary: string;
  role: string;
  challenge: string;
  solution: string;
  metrics: ProjectMetric[];
  deliverables: string[];
  featured: boolean;
  href?: string;
  liveUrl?: string;
  githubUrl?: string;
  accent: string;
  imageUrl?: string;
  content?: string;
  description?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "thanzeer-portfolio",
    n: "01",
    title: "Thanzeer J: Developer Portfolio & Headless CMS",
    client: "Personal Brand & Production Platform",
    year: "2026",
    category: "Full-Stack Web & Frontends",
    stack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Firebase Auth",
      "Cloud Firestore",
      "Cloudflare R2",
      "Three.js",
      "GSAP",
      "Lenis",
      "Tailwind CSS",
    ],
    summary:
      "Production-ready personal portfolio and headless CMS featuring dark/light theming, dynamic project showcases, and a secure internal REST API CMS for content and asset management.",
    role: "Full-Stack Developer & UI/UX Architect",
    challenge:
      "Building an architectural, tactile portfolio combining fluid typography and 3D physics with a secure admin dashboard and instant zero-egress asset delivery without compromising load performance.",
    solution:
      "Architected with Next.js 16 App Router and React 19. Engineered an authenticated admin suite powered by Firebase Auth and Cloud Firestore with Cloudflare R2 object storage, 3D physics lanyard, Lenis smooth scrolling, and complete Schema.org JSON-LD and llms.txt AEO optimization.",
    metrics: [
      { label: "Lighthouse Score", value: "98+" },
      { label: "Prerendered Routes", value: "40+" },
      { label: "Asset Storage", value: "Cloudflare R2" },
    ],
    deliverables: [
      "Next.js 16 App Router & Server Components Architecture",
      "Authenticated Admin CMS with Cloud Firestore",
      "Cloudflare R2 Zero-Egress Media Upload Pipelines",
      "Three.js 3D Physics Lanyard Badge Simulation",
      "Structured Schema.org JSON-LD Graph & AEO llms.txt Protocols",
    ],
    featured: true,
    href: "/work/thanzeer-portfolio",
    liveUrl: "https://thanzeer-j.is-a.dev/",
    githubUrl: "https://github.com/Thanzeerwork/Thanzeer_J_portfolio",
    accent: "#2f5bff",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/1794290064433-0c0c42e1-c6b0-4b38-a0a0-87bdb4651945.jpg",
    content: `
### Architecture Overview
An enterprise-grade personal portfolio and content management platform built from scratch with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**. Blending high-fidelity interactive physics with a secure headless administration portal.

### Key Engineering Achievements
- **High-Performance Core**: Built on Next.js 16 App Router and React 19 with static partial prerendering, delivering sub-second page loads and 98+ Lighthouse scores across 40+ routes.
- **Headless CMS & Media Engine**: Engineered an authenticated admin control center utilizing Firebase Authentication and Cloud Firestore for live project and blog CRUD operations, paired with Cloudflare R2 object storage via the AWS S3 SDK for zero-egress asset hosting.
- **Interactive 3D & Micro-interactions**: Integrated Three.js 3D physics for an interactive ID lanyard simulation, Lenis inertial smooth scrolling, a global ⌘K command palette, and a custom Terminal 404 block with ASCII numerals and CLI route diagnostics.
- **Search & AI Answer Engine Optimization (SEO/AEO)**: Comprehensive Schema.org JSON-LD structured data graph, dynamic XML sitemaps, and machine-readable \`llms.txt\` and \`llms-full.txt\` files for automated ingestion by AI agents (ChatGPT, Perplexity, Claude).
`,
  },
  {
    id: "ryphtech",
    n: "02",
    title: "RyphTech: Agency Portal & Headless CMS",
    client: "RyphTech · Live Brand Website",
    year: "2026",
    category: "Full-Stack Web & Frontends",
    stack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Radix UI / shadcn/ui",
      "Recharts",
      "Zod",
      "React Hook Form",
    ],
    summary:
      "Production-ready agency website featuring dark/light theming, dynamic project showcases, and a secure internal REST API CMS for content and asset management.",
    role: "Full-Stack Web Developer",
    challenge:
      "Creating an enterprise-grade agency digital portal communicating advanced technical capabilities with high visual fidelity, while providing a frictionless internal management workflow for dynamic portfolio exhibits and media assets.",
    solution:
      "Built a high-performance corporate portal and internal CMS using Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS. Engineered secure admin REST API endpoints for project lifecycle management, media uploads, and dynamic catalog exhibits with client analytics visualization.",
    metrics: [
      { label: "Deployment Status", value: "Live" },
      { label: "Responsive Layout", value: "100%" },
      { label: "Lighthouse Score", value: "98+" },
    ],
    deliverables: [
      "High-Performance Corporate Agency Portal",
      "Secure Admin REST API Endpoints",
      "Dynamic Portfolio & Catalog Management",
      "Radix UI & shadcn/ui Accessible Component System",
      "Client Analytics Visualization with Recharts",
    ],
    featured: true,
    href: "/work/ryphtech",
    liveUrl: "https://ryphtech.in/",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#2f5bff",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/ryphtech-live.png",
    content: `
### Project Summary
A production-ready agency website built for **RyphTech**, engineered with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

### Key Engineering Highlights
- **High-Performance Corporate Portal**: Engineered responsive modern component architecture with Radix UI primitives and shadcn/ui, featuring dark/light theming and smooth transitions.
- **Internal REST API CMS**: Developed robust backend API endpoints for project lifecycle management, image asset uploads, and catalog data updates.
- **Client Analytics Visualization**: Integrated Recharts for live telemetry and business analytics dashboards.
`,
  },
  {
    id: "ila-kochi",
    n: "03",
    title: "Ila Kochi: Restaurant & Reservation Web App",
    client: "Ila Kochi Hospitality",
    year: "2026",
    category: "Full-Stack Web & Frontends",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "GSAP + ScrollTrigger",
      "Three.js",
      "AWS S3 / Cloudflare R2",
      "Firebase",
    ],
    summary:
      "Experiential hospitality web app featuring cinematic vertical culinary reels, scroll-triggered animations, interactive dietary-filtered menus, and direct-to-WhatsApp booking integration.",
    role: "Frontend & Creative Developer",
    challenge:
      "Delivering high-bitrate vertical video backgrounds and scroll-triggered animations without layout shifts or mobile performance bottlenecks on mobile networks.",
    solution:
      "Crafted an immersive experiential web application using React 19, TypeScript, Tailwind CSS, GSAP ScrollTrigger, and Three.js. Engineered high-throughput Cloudflare R2 / AWS S3 media delivery pipelines and integrated a direct WhatsApp reservation and pre-order engine with dynamic dietary filtering.",
    metrics: [
      { label: "Media Pipeline", value: "0 Shift" },
      { label: "Animations", value: "GSAP 60FPS" },
      { label: "Conversion Flow", value: "WhatsApp API" },
    ],
    deliverables: [
      "Cinematic Vertical Culinary Video Reels",
      "GSAP ScrollTrigger Interactive Storytelling",
      "Interactive Dietary-Filtered Menu Catalog",
      "Direct-to-WhatsApp Booking & Pre-order Engine",
      "Zero-Layout-Shift Cloud Media Pipelines",
    ],
    featured: true,
    href: "/work/ila-kochi",
    liveUrl: "https://github.com/Thanzeerwork",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#e05d38",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/ila-kochi-live.jpg",
    content: `
### Project Summary
An experiential hospitality platform developed for **Ila Kochi**, celebrating culinary artistry through modern digital storytelling.

### Key Engineering Highlights
- **Cinematic Visual Experience**: Integrated vertical video reels and smooth 60fps GSAP ScrollTrigger timelines for ambient exploration.
- **Cloud Media Pipeline**: Utilized Cloudflare R2 and AWS S3 object storage for optimized video streaming and zero cumulative layout shift (CLS).
- **Direct WhatsApp Booking Engine**: Streamlined reservations and meal pre-orders directly to kitchen staff with dynamic dietary preference filters.
`,
  },
  {
    id: "lavender-aquafarm",
    n: "04",
    title: "Lavender Aquafarm: Specialized E-Commerce & Farm Management",
    client: "Lavender Ornamental Aquaculture Farm",
    year: "2026",
    category: "Full-Stack Web & Frontends",
    stack: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Supabase (Auth & PostgreSQL)",
      "Framer Motion",
      "OGL (WebGL 3D)",
      "React Router 7",
    ],
    summary:
      "E-commerce platform for an ornamental aquaculture farm featuring a custom 3D WebGL species visualizer, dynamic slide-out cart drawer, and a protected live stock management admin panel.",
    role: "Full-Stack E-Commerce Developer",
    challenge:
      "Enabling aquaculture buyers to inspect delicate aquatic species in 3D before ordering, while providing farm staff real-time inventory control over daily live fish stocks.",
    solution:
      "Developed an e-commerce and inventory portal with React 19, Supabase, and Tailwind CSS. Built an interactive 3D WebGL species visualizer using OGL and Framer Motion for cylindrical browsing, alongside a real-time admin portal for live inventory CRUD and order transitions.",
    metrics: [
      { label: "Visualizer", value: "3D WebGL" },
      { label: "Database", value: "Supabase Live" },
      { label: "Stock Sync", value: "Real-Time" },
    ],
    deliverables: [
      "Custom 3D WebGL Species Visualizer (OGL)",
      "Dynamic Slide-Out Cart & Checkout Drawer",
      "Role-Protected Inventory & Stock Admin Panel",
      "Supabase PostgreSQL Real-Time State Sync",
      "Customer Inquiry & Order Lifecycle Management",
    ],
    featured: false,
    href: "/work/lavender-aquafarm",
    liveUrl: "https://github.com/Thanzeerwork",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#8b5cf6",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/repairro-live.jpg",
    content: `
### Project Summary
A specialized e-commerce and live farm inventory management platform built for **Lavender Aquafarm**.

### Key Engineering Highlights
- **3D WebGL Species Visualizer**: Built with OGL and Framer Motion for fluid 3D product examination.
- **Supabase Real-Time Backend**: Instant sync across cart checkouts and administrative stock counts with PostgreSQL row-level security.
- **Admin Control Center**: Comprehensive stock management panel for tracking fish batches, pricing, and fulfillment statuses.
`,
  },
  {
    id: "cardamom-village",
    n: "05",
    title: "Cardamom Village: Agro-Tourism & Spice Showcase",
    client: "Cardamom Village Heritage Plantation",
    year: "2026",
    category: "Full-Stack Web & Frontends",
    stack: ["React 19", "Vite", "Tailwind CSS", "TypeScript", "HTML5"],
    summary:
      "Modern agricultural brand showcase highlighting plantation-to-doorstep traceability, spice catalog, and buyer contact channels.",
    role: "Frontend Web Developer",
    challenge:
      "Translating the rich sensory heritage of a high-altitude spice plantation into a digital narrative that convinces domestic and wholesale buyers of origin authenticity.",
    solution:
      "Developed a responsive brand presentation portal using React 19 and Tailwind CSS, focusing on farm-to-table storytelling, harvesting processes, transparent spice grading catalogs, and direct inquiry channels.",
    metrics: [
      { label: "Responsiveness", value: "100%" },
      { label: "Performance", value: "99/100" },
      { label: "Traceability", value: "Verified" },
    ],
    deliverables: [
      "Plantation-to-Doorstep Storytelling UI",
      "Interactive Spice Product Catalog & Grades",
      "Direct Buyer WhatsApp & Email Inquiry Funnels",
      "Fast-Loading Mobile-Optimized Asset Pipeline",
    ],
    featured: false,
    href: "/work/cardamom-village",
    liveUrl: "https://github.com/Thanzeerwork",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#10b981",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/student-portal-live.jpg",
    content: `
### Project Summary
A heritage brand showcase portal developed for **Cardamom Village**, illustrating plantation-to-doorstep spice harvesting and agro-tourism experiences.
`,
  },
  {
    id: "gulfwings3000",
    n: "06",
    title: "GulfWings3000: Digital Magazine & Publishing Portal",
    client: "GulfWings Media Network",
    year: "2026",
    category: "Full-Stack Web & Frontends",
    stack: [
      "React 19",
      "Vite",
      "React Router 7",
      "Supabase (Auth & PostgreSQL)",
      "react-pdf",
      "Tailwind CSS",
    ],
    summary:
      "Digital publishing portal featuring an in-browser PDF reader, issue archives, community event directory, and an editorial back-office console.",
    role: "Full-Stack Web Developer",
    challenge:
      "Providing a fast, fluid magazine reading experience on mobile and desktop without forcing users to download large PDF files, while giving editors a simple dashboard to publish editions.",
    solution:
      "Built a digital magazine publishing platform featuring an in-browser PDF reader with custom pagination, zoom, and fullscreen controls. Implemented Supabase-backed content management workflows enabling administrators to archive editions and organize community events.",
    metrics: [
      { label: "Reader Engine", value: "In-Browser PDF" },
      { label: "CMS Backend", value: "Supabase" },
      { label: "Event Directory", value: "Dynamic" },
    ],
    deliverables: [
      "In-Browser PDF Magazine Reader with Zoom & Flip",
      "Multi-Edition Archived Publication Catalog",
      "Community Events Calendar & Directory",
      "Editorial Back-Office Management Console",
    ],
    featured: false,
    href: "/work/gulfwings3000",
    liveUrl: "https://github.com/Thanzeerwork",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#0284c7",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/ryphtech-live.png",
    content: `
### Project Summary
A digital magazine publication portal designed for **GulfWings3000** featuring high-performance in-browser document rendering.
`,
  },
  {
    id: "futureself",
    n: "07",
    title: "FutureSelf: AI-Powered Career & Placement Readiness Ecosystem",
    client: "Career Intelligence & Placement Platform",
    year: "2026",
    category: "Cross-Platform Mobile",
    stack: [
      "React Native",
      "Expo (SDK 54)",
      "Firebase (Auth, Firestore, Storage)",
      "Google Gemini 1.5",
      "Genkit AI",
      "Judge0 REST API",
      "Monaco Editor",
      "Victory Native",
    ],
    summary:
      "A full-stack mobile platform leveraging LLMs and cloud runtimes to automate career guidance, personalized skill gap diagnostics, and coding assessments for college students and placement recruiters.",
    role: "AI & Mobile Application Engineer",
    challenge:
      "Students lack personalized career diagnostics and real-time coding assessments tailored to company placement drives, while placement officers struggle to evaluate candidate readiness at scale.",
    solution:
      "Implemented end-to-end LLM workflows leveraging Google Gemini API to analyze user performance data, identify skill deficiencies, and generate personalized learning roadmaps with Coursera/Udemy resource matching. Integrated a remote sandboxed code execution engine utilizing Monaco Editor and Judge0 API supporting JavaScript, Python, Java, and C++ with real-time test-case validation and execution feedback. Architected real-time analytics dashboards visualizing student readiness indices, peer benchmarks, and interview diagnostics using SVG radial gauges and Victory Native chart visualizations.",
    metrics: [
      { label: "AI Engine", value: "Gemini 1.5" },
      { label: "Execution Sandbox", value: "Judge0 API" },
      { label: "Supported Languages", value: "4 (JS, Py, Java, C++)" },
    ],
    deliverables: [
      "AI-Driven Skill Gap Diagnostic & Roadmap Generator",
      "Sandboxed Remote Code Runner with Monaco Editor",
      "Interactive Student Readiness Index & Peer Benchmarks",
      "Recruiter Evaluation Console & Interview Diagnostics",
    ],
    featured: false,
    href: "/work/futureself",
    liveUrl: "https://github.com/Thanzeerwork",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#6366f1",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/student-portal-live.jpg",
    content: `
### Project Summary
**FutureSelf** is a full-stack mobile intelligence ecosystem built with React Native and Expo that equips college students with automated career roadmaps and real-time coding benchmarks.

### Core Architecture & Innovations
- **Google Gemini 1.5 Integration**: Uses Genkit AI and Gemini LLM prompts to analyze academic and coding profiles, generating tailor-made curriculum modules with resource links.
- **Judge0 Remote Code Execution**: Runs user submissions securely against hidden test suites across C++, Java, Python, and JavaScript.
- **Victory Native Telemetry**: Visualizes skill gaps, performance percentiles, and interview readiness metrics with SVG radial meters.
`,
  },
  {
    id: "studyvault",
    n: "08",
    title: "StudyVault / YCET Portal: College ERP & Academic Analytics Platform",
    client: "Younus College of Engineering & Technology",
    year: "2025",
    category: "Cross-Platform Mobile",
    stack: [
      "React Native",
      "Expo",
      "React Navigation",
      "Firebase (Auth & Firestore)",
      "Supabase",
      "React Native Paper",
      "Victory Native / Chart Kit",
      "React Native Skia",
    ],
    summary:
      "A cross-platform academic ERP unifying operations for Students, Faculty, HODs, Placement Officers, and Admins. Handles live attendance marking, CIA mark computation, and placement drive tracking.",
    role: "Lead Mobile Developer & Systems Architect",
    challenge:
      "Academic data was fragmented across disconnected spreadsheets, making attendance roll-calling, marks entry, and placement qualification filtering tedious and error-prone.",
    solution:
      "Developed an enterprise College ERP mobile application with React Native and Firebase, supporting 5 user roles with dynamic role-based access control (RBAC). Implemented batch-write data pipelines for class-wide attendance marking and CIA grade computations, cutting faculty administrative logging time significantly. Constructed an interactive placement recruitment portal enabling placement coordinators to filter candidate databases by CGPA, department, and eligibility criteria in real time.",
    metrics: [
      { label: "User Roles", value: "5 RBAC Roles" },
      { label: "Logging Time", value: "-60% Cut" },
      { label: "Data Integrity", value: "100% Synced" },
    ],
    deliverables: [
      "Multi-Role Dynamic Role-Based Access Control (RBAC)",
      "Batch-Write Daily Attendance Marking System",
      "Automated CIA Assessment & Grade Computation Engine",
      "Real-Time CGPA & Eligibility Placement Drive Filter",
      "Centralized Educational Resources & Syllabus Repository",
    ],
    featured: false,
    href: "/work/studyvault",
    liveUrl: "https://github.com/Thanzeerwork",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#059669",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/student-portal-live.jpg",
    content: `
### Project Summary
An enterprise college ERP cross-platform mobile application deployed for **Younus College of Engineering and Technology (YCET)**.

### Architectural Breakdown
- **5-Tier Role-Based Access Control**: Dedicated mobile interfaces and permissions for Students, Faculty, HODs, Placement Officers, and Administrators.
- **Batch-Write Attendance Ledger**: Allows professors to mark 60+ students in seconds with offline queuing and atomic Firestore batch commits.
- **Placement Drive Filtering Engine**: Real-time multi-variable query engine allowing recruiters to instantly filter candidates by CGPA, backlogs, and branch.
`,
  },
  {
    id: "rationkart",
    n: "09",
    title: "RationKart: Digital Public Distribution System with Doorstep Delivery",
    client: "Civic Logistics & Public Distribution",
    year: "2026",
    category: "Cross-Platform Mobile",
    stack: [
      "React Native",
      "Expo (SDK 54/57)",
      "Expo Router (File-based)",
      "Firebase (Auth, Firestore, Cloud Storage)",
      "Expo Location",
      "React Native Reanimated",
    ],
    summary:
      "A multi-tenant civic mobile application digitizing the Indian Public Distribution System (PDS) across 4 roles: Customers (Cardholders), Fair Price Shop Merchants, Delivery Agents, and Government Admins.",
    role: "Lead Mobile Engineer",
    challenge:
      "Subsidized grain distribution faces severe physical queuing, lack of doorstep accessibility for disabled citizens, and lack of transparency in monthly commodity allocations.",
    solution:
      "Architected RationKart, a 4-role civic mobile application (Customer, Merchant, Delivery Agent, Government Admin) digitizing subsidized food grain distribution and home delivery using React Native and Expo. Engineered statutory entitlement calculation algorithms matching household ration card classifications (AAY, PHH, NPHH) to calculate monthly subsidized commodity quotas. Integrated end-to-end logistics with real-time Firestore synchronization, featuring turn-by-turn GPS navigation integration, batch inventory allocation, and OTP-authenticated delivery handoffs.",
    metrics: [
      { label: "Civic Roles", value: "4 Multi-Tenant" },
      { label: "PDS Quotas", value: "Algorithmic" },
      { label: "Delivery Security", value: "OTP Verified" },
    ],
    deliverables: [
      "Multi-Tenant 4-Role Architecture (Customer, Merchant, Agent, Admin)",
      "Statutory PDS Quota Calculation Engine (AAY / PHH / NPHH)",
      "Real-Time GPS Order Tracking & Route Navigation",
      "OTP-Authenticated Delivery Handoff Verification",
      "Merchant Fair Price Shop Inventory Allocation Dashboard",
    ],
    featured: false,
    href: "/work/rationkart",
    liveUrl: "https://github.com/Thanzeerwork",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#d97706",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/repairro-live.jpg",
    content: `
### Project Summary
**RationKart** is an end-to-end civic mobile platform modernizing the Indian Public Distribution System (PDS) with transparent quota calculation and doorstep delivery tracking.

### Core Features
- **Statutory Quota Calculator**: Dynamically translates ration card types (AAY, PHH, NPHH) into subsidized monthly allowances of rice, wheat, and kerosene.
- **Logistics Coordination**: Links merchant Fair Price Shops with delivery personnel through turn-by-turn routing and live order tracking.
- **Secure Handoffs**: Employs cryptographically secure OTP validation upon final delivery to eliminate distribution discrepancies.
`,
  },
  {
    id: "website-reaper",
    n: "10",
    title: "Website Reaper: Autonomous Full-Fidelity Web Scraper & Offline Packager",
    client: "Developer Tooling & Systems Architecture",
    year: "2026",
    category: "Developer Tools & Systems",
    stack: [
      "Node.js",
      "Express",
      "Puppeteer-Core (Chromium)",
      "Cheerio",
      "Wget",
      "PostCSS",
      "Server-Sent Events (SSE)",
      "Archiver",
    ],
    summary:
      "A high-speed hybrid website mirroring and runtime generation engine that extracts modern SPAs (Next.js, React, Nuxt) with complete DOM hydration, WebGL/3D assets, CSSOM keyframes, and packages them into self-contained offline bundles.",
    role: "Systems & Backend Architect",
    challenge:
      "Modern Single-Page Applications (SPAs) utilize client-side hydration, dynamic chunk loading, and WebGL runtimes that break completely when downloaded using traditional scrapers (curl, wget).",
    solution:
      "Architected an autonomous full-fidelity website cloning and offline packaging engine combining headless Chromium automation (puppeteer-core) and multi-threaded network mirroring. Engineered a 4-layer runtime immune shield that neutralizes React/Next.js hydration crashes, rewrites client-side fetch pipelines, and serves offline 3D WebGL/WASM assets with 100% fidelity. Built real-time telemetry and AST DOM pruning tools utilizing Server-Sent Events (SSE) and Cheerio, allowing users to inspect and selectively harvest modular sections of complex single-page apps.",
    metrics: [
      { label: "Immune Shield", value: "4-Layer Defense" },
      { label: "Asset Extraction", value: "DOM + WebGL + CSS" },
      { label: "Telemetry", value: "Real-Time SSE" },
    ],
    deliverables: [
      "Headless Chromium Automation & Full DOM Capture",
      "Hydration Crash Neutralizer & Client Fetch Rewriter",
      "Modular AST Pruning & Section Extractor (Cheerio)",
      "Real-Time Scraping Progress Stream via Server-Sent Events",
      "Self-Contained Offline Zip Packaging Engine (Archiver)",
    ],
    featured: true,
    href: "/work/website-reaper",
    liveUrl: "https://github.com/Thanzeerwork",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#ef4444",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/website-reaper-live.jpg",
    content: `
### Project Summary
**Website Reaper** is a high-speed hybrid website mirroring and runtime generation engine engineered with Node.js and Chromium automation.

### Technical Innovations
- **4-Layer Hydration Defense Shield**: Dynamically patches React/Next.js script payloads during capture, preventing runtime \`Hydration failed\` white-screens in offline environments.
- **Resource Graph Serialization**: Recursively resolves and rewrites CSSOM \`@import\`, \`url()\`, and dynamic JS chunk trees to relative offline paths.
- **Real-Time Telemetry via SSE**: Streams real-time asset capture metrics, memory usage, and packaging progress directly to the web client via Server-Sent Events.
`,
  },
  {
    id: "mealhub",
    n: "11",
    title: "MealHub: Digital Canteen Prebooking Platform",
    client: "Food Prebooking & Order Management",
    year: "2026",
    category: "Cross-Platform Mobile",
    stack: ["React Native", "React.js", "Firebase", "Supabase", "Tailwind CSS"],
    summary:
      "A canteen prebooking platform designed to eliminate waiting queues, communicate live food availability, and enable users to order meals in advance before reaching the counter.",
    role: "Full-Stack Application Developer",
    challenge:
      "College canteens become heavily crowded during breaks, causing long queues and stock uncertainty. The system required handling cart states, order queues, and admin availability controls.",
    solution:
      "Developed dual cross-platform mobile and responsive web applications with Firebase and Supabase integration, implementing structured menus, real-time item status, and advance ordering workflows.",
    metrics: [
      { label: "Queue Reduction", value: "70%" },
      { label: "Order Sync", value: "Real-Time" },
      { label: "Platforms", value: "Web + Mobile" },
    ],
    deliverables: [
      "Structured Food Categories & Menu",
      "Cart & Advance Prebooking System",
      "Real-Time Food Availability Status",
      "Admin Menu & Order Management",
    ],
    featured: true,
    href: "/work/mealhub",
    liveUrl: "https://github.com/Thanzeerwork",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#c65a3a",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/mealhub-live.jpg",
    content: `
### Project Summary
A canteen prebooking platform designed to eliminate waiting queues, communicate live food availability, and enable users to order meals in advance before reaching the counter.
`,
  },
  {
    id: "repairro",
    n: "12",
    title: "Repairro: Doorstep Repair & Service Logistics",
    client: "Local Repair Services Platform",
    year: "2026",
    category: "Cross-Platform Mobile",
    stack: ["React Native", "Node.js", "Cloud Firestore", "Express.js"],
    summary:
      "A mobile application coordinating the complete repair lifecycle from doorstep pickup to product inspection, estimate approval, servicing, and return delivery.",
    role: "Mobile & Product Developer",
    challenge:
      "Finding repair shops and transporting large appliances is inconvenient. The platform had to coordinate multi-party dependencies across customers, shops, and delivery partners.",
    solution:
      "Designed an end-to-end service lifecycle covering customer repair requests, shop inspection quotes, customer approval gateways, and weight-based logistics coordination.",
    metrics: [
      { label: "Lifecycle Stages", value: "6 Steps" },
      { label: "User Roles", value: "4 Roles" },
      { label: "Project Status", value: "In Dev" },
    ],
    deliverables: [
      "Customer & Shop Onboarding",
      "Product-Based Repair Requests",
      "Estimate & Approval Gateways",
      "Doorstep Pickup & Return Tracking",
    ],
    featured: true,
    href: "/work/repairro",
    liveUrl: "https://github.com/Thanzeerwork",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#8fa58a",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/repairro-live.jpg",
    content: `
### Project Summary
A mobile application coordinating the complete repair lifecycle from doorstep pickup to product inspection, estimate approval, servicing, and return delivery.
`,
  },
  {
    id: "student-portal",
    n: "13",
    title: "Student Management Portal: Unified Campus System",
    client: "Academic Software Architecture",
    year: "2025",
    category: "Cross-Platform Mobile",
    stack: ["React.js", "Node.js", "MongoDB", "Express.js", "REST APIs"],
    summary:
      "A unified role-based college management platform centralizing academic records, attendance, internal marks, study resources, and placement drive eligibility in one system.",
    role: "Full-Stack Web Developer",
    challenge:
      "Academic data was fragmented across disconnected spreadsheets, making attendance tracking, mark reviews, and placement qualification filtering tedious and error-prone.",
    solution:
      "Built a secure role-based web portal with dedicated interfaces for students, faculty, and placement officers, featuring CGPA-based placement filtering and analytics summaries.",
    metrics: [
      { label: "User Roles", value: "4 Types" },
      { label: "Core Modules", value: "10 Systems" },
      { label: "Data Integrity", value: "100%" },
    ],
    deliverables: [
      "Role-Based Access Control (RBAC)",
      "Attendance & Assessment Ledgers",
      "Placement Drive Eligibility Filter",
      "Centralized Educational Resources",
    ],
    featured: false,
    href: "/work/student-portal",
    liveUrl: "https://github.com/Thanzeerwork",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#2f4a57",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/student-portal-live.jpg",
  },
];
