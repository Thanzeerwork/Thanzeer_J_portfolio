export interface ServiceDetail {
  id: string;
  n: string;
  title: string;
  tagline: string;
  slug: string;
  summary: string;
  tags: string[];
  deliverables: string[];
  typicalTimeline: string;
  whatYouBring: string;
  whatIGetDone: string;
  bestSuitedFor: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    id: "web-dev",
    n: "01",
    title: "Web Development",
    tagline: "Modern, responsive websites and web applications.",
    slug: "web-development",
    summary:
      "I build responsive websites and web applications that balance functionality, usability, and visual consistency—from business sites to interactive web dashboards.",
    tags: ["React.js", "JavaScript", "Tailwind CSS", "Vite", "HTML5/CSS3"],
    deliverables: [
      "Responsive website development across all screen viewports",
      "Interactive, component-based user interfaces",
      "Frontend integration with backend APIs and services",
      "Clean semantic HTML5 structure with modern CSS styling",
      "Performance optimization, SEO setup, and website maintenance",
    ],
    typicalTimeline: "2 to 6 weeks depending on requirements",
    whatYouBring: "Project concept, brand assets, content outline, and wireframes",
    whatIGetDone: "A production-ready, responsive web application delivered with clean, maintainable code",
    bestSuitedFor: "Businesses, startups, and individuals needing dedicated websites, portals, or web tools.",
  },
  {
    id: "mobile-dev",
    n: "02",
    title: "Mobile Application Development",
    tagline: "Cross-platform mobile apps that make services accessible.",
    slug: "mobile-development",
    summary:
      "Developing practical mobile applications with React Native that simplify everyday activities, streamline service booking, and offer smooth user workflows.",
    tags: ["React Native", "React Navigation", "Mobile UI", "Firebase", "State Management"],
    deliverables: [
      "Cross-platform iOS and Android application builds",
      "Mobile user interface design and intuitive navigation flows",
      "Secure user registration and authentication systems",
      "Product and service management workflows",
      "Persistent state management and cloud database synchronization",
    ],
    typicalTimeline: "3 to 8 weeks depending on scope",
    whatYouBring: "App feature list, user journey requirements, and API endpoints",
    whatIGetDone: "A working cross-platform mobile application with seamless authentication and navigation",
    bestSuitedFor: "Service platforms, on-demand apps, booking solutions, and mobile-first utilities.",
  },
  {
    id: "backend-db",
    n: "03",
    title: "Backend & Database Integration",
    tagline: "Reliable data processing, secure APIs, and access control.",
    slug: "backend-database",
    summary:
      "Handling how applications process data, authenticate users, and communicate with modern databases like MongoDB, Firebase, and Supabase.",
    tags: ["Node.js", "Express.js", "MongoDB", "Firebase Auth", "Supabase", "REST APIs"],
    deliverables: [
      "RESTful API design and CRUD operation endpoints",
      "User authentication and role-based access control (RBAC)",
      "Database schema modeling for MongoDB, Firestore, and Supabase",
      "Robust data validation and error-handling pipelines",
      "Structured communication between frontend interfaces and databases",
    ],
    typicalTimeline: "2 to 4 weeks sprint",
    whatYouBring: "Data models, operational requirements, and access permission rules",
    whatIGetDone: "Secure, reliable backend services and database connections supporting the frontend",
    bestSuitedFor: "Applications requiring user accounts, multi-role permissions, and persistent data storage.",
  },
  {
    id: "product-dev",
    n: "04",
    title: "Product Development & Prototyping",
    tagline: "From problem definition to working software.",
    slug: "product-development",
    summary:
      "Transforming early-stage concepts into functional digital products through structured planning, user journey mapping, and iterative development.",
    tags: ["Requirements Analysis", "User Journeys", "Rapid Prototyping", "Full-Stack MVP"],
    deliverables: [
      "Comprehensive problem and user requirements identification",
      "Application architecture planning and user journey mapping",
      "Interactive MVP prototype ready for user feedback",
      "Modular codebase engineered for iterative expansion",
      "Complete documentation and deployment setup",
    ],
    typicalTimeline: "4 to 6 weeks for full MVP",
    whatYouBring: "Problem statement, target audience, and primary functional goals",
    whatIGetDone: "A complete, functional software product ready to test with real users",
    bestSuitedFor: "Founders, student teams, and organizations launching new digital initiatives.",
  },
];
