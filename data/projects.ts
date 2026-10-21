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
}

export const PROJECTS: Project[] = [
  {
    id: "ryphtech",
    n: "01",
    title: "RyphTech: Technology Brand & Web Platform",
    client: "RyphTech · Live Brand Website",
    year: "2026",
    stack: ["React.js", "JavaScript", "Tailwind CSS", "Vite"],
    summary:
      "A dedicated brand website establishing online presence for RyphTech, communicating technical identity, development capabilities, and digital solutions with a responsive, modern interface.",
    role: "Full-Stack Web Developer",
    challenge:
      "Creating a professional digital experience that effectively represents the RyphTech brand, communicates complex technical services clearly, and provides a foundation for online discovery.",
    solution:
      "Engineered a component-based frontend using React and Tailwind CSS, structuring services into accessible sections with intuitive navigation and responsive presentation across all devices.",
    metrics: [
      { label: "Deployment Status", value: "Live" },
      { label: "Responsive Layout", value: "100%" },
      { label: "Lighthouse Score", value: "98+" },
    ],
    deliverables: [
      "Brand Identity Presentation",
      "Interactive Service Showcase",
      "Responsive Multi-Device UI",
      "Production Deployment & Hosting",
    ],
    featured: true,
    href: "/work/ryphtech",
    liveUrl: "https://ryphtech.in/",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#2f5bff",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/ryphtech-live.png",
  },
  {
    id: "mealhub",
    n: "02",
    title: "MealHub: Digital Canteen Prebooking Platform",
    client: "Food Prebooking & Order Management",
    year: "2026",
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
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#c65a3a",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/mealhub-live.jpg",
  },
  {
    id: "repairro",
    n: "03",
    title: "Repairro: Doorstep Repair & Service Logistics",
    client: "Local Repair Services Platform",
    year: "2026",
    stack: ["React Native", "Node.js", "Cloud Firestore", "Express.js"],
    summary:
      "A mobile application coordinating the complete repair lifecycle from doorstep pickup to product inspection, estimate approval, servicing, and return delivery.",
    role: "Mobile & Product Developer",
    challenge:
      "Finding repair shops and transporting large products like TVs or appliances is inconvenient. The platform had to coordinate multi-party dependencies across customers, shops, and delivery partners.",
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
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#8fa58a",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/repairro-live.jpg",
  },
  {
    id: "student-portal",
    n: "04",
    title: "Student Management Portal: Unified Campus System",
    client: "Academic Software Architecture",
    year: "2025",
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
    featured: true,
    href: "/work/student-portal",
    githubUrl: "https://github.com/Thanzeerwork",
    accent: "#2f4a57",
    imageUrl: "https://pub-3332a705bc7448cb8f7d0cbef92c8730.r2.dev/projects/student-portal-live.jpg",
  },
];
