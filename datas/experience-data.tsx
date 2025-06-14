import { Code2, Building } from "lucide-react";

export const experiences = [
  {
    title: "Freelance Fullstack Developer",
    company: "Self-employed",
    period: "2024 - Present",
    description: "Working with clients worldwide to deliver high-quality web applications and solutions. Specializing in React, Next.js, Node.js, and modern web technologies.",
    skills: ["Fullstack"],
    link: {
      url: "https://www.fiverr.com/abdul_aziz_2412/create-responsive-websites-for-multiple-devices?context_referrer=seller_page&ref_ctx_id=7755b323c1a743fdabb6bcacc6a7c2ac&pckg_id=1&pos=1&seller_online=true&imp_id=14c810a3-88e2-4755-a904-aad716e2a2ab",
      text: "View Fiverr Profile",
    },
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    title: "Backend Developer Intern",
    company: "Minilemon Studio",
    period: "2025 - Present",
    description: "Developing and maintaining backend services and APIs. Working with a team of developers to create scalable and efficient solutions for various projects.",
    skills: ["Node.js", "Express", "Next.js", "REST API", "Docker"],
    icon: <Building className="h-5 w-5" />,
  },
];
