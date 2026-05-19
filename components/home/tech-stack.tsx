"use client";

import { useState } from "react";
import { Layers3, Globe, Database, BrainCircuit, Server, Rocket } from "lucide-react";

// import tech-stack-data
import { techStack } from "@/datas/tech-stack-data";

const capabilities = [
  {
    title: "Modern SaaS Platforms",
    description: "Building scalable SaaS applications with clean architecture, authentication systems, and responsive user experiences.",
    icon: <Rocket className="h-5 w-5 text-primary" />,
  },
  {
    title: "AI-Powered Applications",
    description: "Developing AI-integrated products such as chatbots, RAG systems, semantic search, and automation tools.",
    icon: <BrainCircuit className="h-5 w-5 text-primary" />,
  },
  {
    title: "Fullstack Web Development",
    description: "Creating fast, modern, and scalable web applications using modern frontend and backend technologies.",
    icon: <Globe className="h-5 w-5 text-primary" />,
  },
  {
    title: "Backend & API Systems",
    description: "Designing backend architectures, authentication systems, APIs, and realtime features for modern products.",
    icon: <Server className="h-5 w-5 text-primary" />,
  },
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState("Frontend");

  const activeCategoryData = techStack.find((category) => category.category === activeCategory);

  const itemsToDisplay = activeCategoryData?.items || [];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-background/95 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">What I Build</span>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Modern{" "}
            <span className="text-primary relative inline-block">
              Solutions
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>

          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>

          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">I build scalable web applications, AI-powered tools, and modern digital products focused on performance, usability, and real-world impact.</p>
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {capabilities.map((capability, index) => (
            <div key={index} className="bg-card/60 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">{capability.icon}</div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">{capability.title}</h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">{capability.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Header */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Layers3 className="h-6 w-6 text-primary" />
            Technologies & Tools
          </h3>

          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Technologies I use to build scalable web platforms and AI-powered applications.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {techStack.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.category ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted hover:bg-primary/20 hover:text-primary"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="flex flex-wrap justify-center gap-10">
          {itemsToDisplay.map((tech) => (
            <div key={tech.name} className="group flex flex-col items-center">
              <div className="bg-background dark:bg-card border border-primary/10 rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                <img src={tech.icon || "/placeholder.svg"} alt={tech.name} className="w-12 h-12 object-contain" />
              </div>

              <span className="mt-3 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Current Focus */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 shadow-xl shadow-primary/5">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Database className="mr-2 h-5 w-5 text-primary" />
              Current Focus
            </h3>

            <div className="flex flex-wrap gap-3">
              {["AI-Powered Web Apps", "RAG Systems", "SaaS Platforms", "Realtime Applications", "AI Chatbot Integration", "Dashboard Systems", "Modern API Architectures", "Scalable Fullstack Products"].map((item, index) => (
                <span key={index} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
