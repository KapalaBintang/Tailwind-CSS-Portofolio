import { Code2, Building } from "lucide-react";

export const experiences = [
  {
    title: "Fullstack Developer",
    company: "WebKita",
    period: "2025 - Present",

    description: "Building modern SaaS features and scalable web systems focused on performance and usability.",

    impact: [
      "Developed responsive dashboard and authentication systems",
      "Integrated scalable backend architecture using Supabase",
      "Improved workflow efficiency through automation features",
      "Built reusable frontend components for faster development",
    ],

    skills: ["Next.js", "Supabase", "TypeScript"],

    icon: <Code2 className="h-5 w-5" />,
  },
  {
    title: "Backend Developer Intern",
    company: "Minilemon Studio",
    period: "Jan 2025 - July 2025",

    description: "Contributed to backend development for scalable web applications by building APIs, managing databases, and improving backend workflows using modern backend technologies.",

    impact: [
      "Developed RESTful APIs using FastAPI and PostgreSQL",
      "Designed and maintained backend services for scalable applications",
      "Collaborated with frontend and backend developers in team-based projects",
      "Improved API structure and backend maintainability",
      "Worked with Docker-based development environments",
    ],

    skills: ["FastAPI", "PostgreSQL", "Python", "Docker", "REST API"],

    icon: <Building className="h-5 w-5" />,
  },
];
