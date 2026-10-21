export interface Testimonial {
  id: string;
  n: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  year: string;
  projectFocus: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "problem-solving",
    n: "01",
    quote:
      "I focus on understanding the core problem before picking a technical tool. Breaking complex requirements into smaller, manageable tasks ensures every line of code serves a functional purpose.",
    author: "Problem-Solving Mindset",
    role: "Development Philosophy",
    company: "Analytical Thinking",
    year: "Core",
    projectFocus: "Architecture & Planning",
  },
  {
    id: "full-stack",
    n: "02",
    quote:
      "Good software requires seeing the big picture: how responsive frontend interfaces, backend logic, REST APIs, authentication security, and persistent databases work together seamlessly.",
    author: "Full-Stack Perspective",
    role: "Technical Vision",
    company: "End-to-End Delivery",
    year: "Core",
    projectFocus: "Web & Mobile Systems",
  },
  {
    id: "user-focused",
    n: "03",
    quote:
      "I prioritize interfaces that are responsive, intuitive, and easy to navigate across any screen size. Functionality is only effective when people can use it without friction.",
    author: "User-Focused Engineering",
    role: "Design & UX Standard",
    company: "Interface Ergonomics",
    year: "Core",
    projectFocus: "Accessibility & Usability",
  },
  {
    id: "practical-learning",
    n: "04",
    quote:
      "I continuously improve by building real applications, debugging challenging edge cases, and taking ideas beyond the planning stage into working products that solve real-world problems.",
    author: "Practical Implementation",
    role: "Continuous Growth",
    company: "Hands-on Development",
    year: "Core",
    projectFocus: "Curiosity & Execution",
  },
];
