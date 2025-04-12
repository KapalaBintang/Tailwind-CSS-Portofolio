"use client"

import { Briefcase, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// import experiences data
import {experiences} from "@/datas/experience-data"

export default function ExperienceSection() {
 

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
            My Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional{" "}
            <span className="text-primary relative inline-block">
              Experience
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey as a developer, showcasing my work experience and career growth.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5 transform md:translate-x-px z-0 rounded-full"></div>

          {/* Experience items */}
          <div className="relative z-10">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex md:items-center md:justify-center absolute left-1/2 transform -translate-x-1/2 w-12 h-12">
                  <span className="absolute w-4 h-4 rounded-full bg-primary border-4 border-background"></span>
                </div>

                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div
                    className={`bg-card hover:bg-card/80 transition-colors rounded-xl p-6 border border-border shadow-lg ${
                      index % 2 === 0 ? "md:rounded-tr-none" : "md:rounded-tl-none"
                    }`}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        {experience.icon}
                      </span>
                      <span className="text-sm font-medium text-primary">{experience.period}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                    <p className={`flex items-center gap-1 text-muted-foreground mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <Briefcase className="h-4 w-4" />
                      {experience.company}
                    </p>

                    <p className="text-foreground/80 mb-4">{experience.description}</p>

                    <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      {experience.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {experience.link && (
                      <div className={`mt-4 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                        <Link href={experience.link.url} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="group border-primary/20 hover:border-primary hover:bg-primary/5"
                          >
                            {experience.link.text}
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty space for timeline alignment */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card border border-border rounded-xl p-8 shadow-lg relative overflow-hidden">
            <h3 className="text-xl font-bold mb-2 relative">Interested in working together?</h3>
            <p className="text-muted-foreground mb-4 relative">
              I'm always open to discussing new projects and opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative">
            <Link href="https://www.instagram.com/abdul_aziz_2412/" target="_blank">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              
                Contact Me 👋
              
              </Button>
              </Link>
              <Link href="/resume.pdf" target="_blank" download="Abdul_Aziz_Resume.pdf">
                <Button variant="outline" className="border-primary/20 hover:border-primary hover:bg-primary/5">
                  Download Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

