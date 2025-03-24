"use client"

import { useState } from "react"
import { Layers } from "lucide-react"

// Define tech stack categories and items
const techStack = [
  {
    category: "Frontend",
    items: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Nest.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
      { name: "Golang", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    ],
  },
  {
    category: "DevOps",
    items: [{ name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }],
  },
]

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState("Frontend")

  // Find the active category
  const activeCategoryData = techStack.find((category) => category.category === activeCategory)

  // Ensure we have items to display
  const itemsToDisplay = activeCategoryData?.items || []

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-background/95 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
            My Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tech{" "}
            <span className="text-primary relative inline-block">
              Stack
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            As a Fullstack Developer, I've mastered various technologies across the development spectrum. Here are the
            tools and technologies I work with.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {techStack.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted hover:bg-primary/20 hover:text-primary"
              }`}
            >
              <span className="relative z-10">{category.category}</span>
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="flex flex-wrap justify-center gap-20 mt-8">
          {itemsToDisplay.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center">
              <div className="relative group">
                <div className="relative bg-background dark:bg-card p-6 rounded-xl flex items-center justify-center border border-primary/20 hover:border-primary/40 transition-colors">
                  <img
                    src={tech.icon || "/placeholder.svg"}
                    alt={tech.name}
                    className="w-12 h-12 object-contain "
                  />
                </div>
              </div>
              <span className="mt-3 font-medium">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Skill Level Indicator */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-primary/10 shadow-xl shadow-primary/5 relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-6 flex items-center relative">
              <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
              <Layers className="mr-2 h-5 w-5 text-primary" />
              Skill Proficiency
            </h3>
            <div className="space-y-6 relative">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Frontend Development</span>
                  <span className="text-primary font-semibold">80%</span>
                </div>
                <div className="w-full bg-muted-foreground/20 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Backend Development</span>
                  <span className="text-primary font-semibold">95%</span>
                </div>
                <div className="w-full bg-muted-foreground/20 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Database Management</span>
                  <span className="text-primary font-semibold">85%</span>
                </div>
                <div className="w-full bg-muted-foreground/20 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">DevOps</span>
                  <span className="text-primary font-semibold">50%</span>
                </div>
                <div className="w-full bg-muted-foreground/20 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
