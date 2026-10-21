export interface AgencyStat {
  value: string;
  unit?: string;
  label: string;
  note: string;
}

export const AGENCY_STATS: AgencyStat[] = [
  {
    value: "B.Tech",
    unit: "CSE",
    label: "Computer Science & Engineering",
    note: "Graduated with strong foundations in software design and algorithms.",
  },
  {
    value: "4+",
    unit: "apps",
    label: "Featured Full-Stack Projects",
    note: "Covering live business sites, canteen prebooking, repair logistics & campus portals.",
  },
  {
    value: "100%",
    unit: "viewports",
    label: "Responsive & User-Focused",
    note: "Interfaces designed for consistent ergonomics from mobile phones to wide displays.",
  },
  {
    value: "Mobile",
    unit: "+ Web",
    label: "Cross-Platform Delivery",
    note: "React Native for mobile apps and React.js for modern web platforms.",
  },
  {
    value: "Kerala",
    unit: "India",
    label: "Based in South India",
    note: "Available for remote software development and collaborative opportunities.",
  },
  {
    value: "End-to-End",
    unit: "stack",
    label: "Full Application Perspective",
    note: "Frontend UI, backend REST APIs, authentication, and database integration.",
  },
];
