export interface ToolGroup {
  category: string;
  n: string;
  tools: {
    name: string;
    description: string;
    experience: string;
  }[];
}

export const TOOLBOX: ToolGroup[] = [
  {
    category: "Languages & Core Web",
    n: "01",
    tools: [
      { name: "JavaScript (ES6+)", description: "Async/await, DOM APIs, event architecture, closures", experience: "Core" },
      { name: "HTML5", description: "Semantic markup, accessibility, modern web forms", experience: "Core" },
      { name: "CSS3", description: "Flexbox, CSS Grid, media queries, CSS variables", experience: "Core" },
      { name: "TypeScript", description: "Static typing, component props and interface modeling", experience: "Active" },
    ],
  },
  {
    category: "Frontend & UI Engineering",
    n: "02",
    tools: [
      { name: "React.js", description: "Component-based architecture, hooks, state workflows", experience: "Primary" },
      { name: "Tailwind CSS", description: "Utility-first design systems and responsive styling", experience: "Primary" },
      { name: "Vite", description: "Fast HMR and optimized production bundling", experience: "Primary" },
      { name: "Bootstrap & DaisyUI", description: "Rapid component assembly and visual consistency", experience: "Proficient" },
    ],
  },
  {
    category: "Mobile Application Development",
    n: "03",
    tools: [
      { name: "React Native", description: "Cross-platform mobile apps for iOS and Android", experience: "Primary" },
      { name: "React Navigation", description: "Stack, tab, and drawer navigation architectures", experience: "Primary" },
      { name: "Mobile UI Design", description: "Touch ergonomics, mobile forms, and responsive screens", experience: "Core" },
      { name: "Firebase Mobile SDK", description: "Mobile auth, real-time sync, and offline support", experience: "Proficient" },
    ],
  },
  {
    category: "Backend, Databases & Cloud",
    n: "04",
    tools: [
      { name: "Node.js & Express.js", description: "RESTful API services, middleware, request routing", experience: "Proficient" },
      { name: "MongoDB", description: "NoSQL document modeling, indexing, aggregation", experience: "Proficient" },
      { name: "Cloud Firestore & Auth", description: "Firebase real-time database, security rules, RBAC", experience: "Proficient" },
      { name: "Supabase", description: "Postgres database integration, row-level security", experience: "Proficient" },
    ],
  },
  {
    category: "Tools, Systems & Foundations",
    n: "05",
    tools: [
      { name: "Git & GitHub", description: "Branch management, version control, collaboration", experience: "Primary" },
      { name: "VS Code & npm", description: "Custom developer workflows, package management", experience: "Daily" },
      { name: "Linux Fundamentals", description: "Command line, file permissions, shell environments", experience: "Active" },
      { name: "Networking & Security", description: "HTTP/HTTPS, REST principles, web application security", experience: "Active" },
    ],
  },
];
