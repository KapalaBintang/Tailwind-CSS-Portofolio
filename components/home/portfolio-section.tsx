"use client"

import { ExternalLink, Github, Code2, Globe, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// import portofolio datas
import { projects } from "@/datas/portofolio-data"

export default function PortfolioSection() {


  return (
    <section id="portfolio" className="py-20 bg-card/30 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured{" "}
            <span className="text-primary relative inline-block">
              Projects
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out some of my recent projects. Each project represents my skills, creativity, and problem-solving
            approach.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {projects.map((project, index) => (
            <div key={project.id} className="group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Project Image - Alternating layout */}
                <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative overflow-hidden rounded-xl border border-border shadow-xl">
                    <div className="aspect-video relative overflow-hidden bg-card">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                        <span className="bg-background/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                        <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        {index === 0 ? <Code2 className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                      </span>
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                    </div>

                    <p className="text-muted-foreground">{project.description}</p>

                    <div className="pt-2">
                      <h4 className="text-sm font-semibold mb-2 flex items-center">
                        <Layers className="mr-2 h-4 w-4 text-primary" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-primary" />
                        Key Features
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                          View Live
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

