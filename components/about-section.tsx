"use client"

import { Code2, GraduationCap, Briefcase, History, BookOpen, Gamepad2, Dumbbell, Camera } from "lucide-react"
import Image from "next/image"
import DownloadResumeButton from "./download-resume-button"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get to Know{" "}
            <span className="text-primary relative inline-block">
              Me Better
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate fullstack developer with a love for creating elegant solutions to complex problems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="relative bg-card rounded-2xl overflow-hidden border border-primary/10 shadow-xl">
                <Image
                  src="/profile-1.jpg?height=600&width=600"
                  alt="Abdul 'Aziz"
                  width={1000}
                  height={1000}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold">Abdul 'Aziz</h3>
                  <p className="text-sm opacity-90">Fullstack Developer</p>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-background shadow-lg rounded-full p-3 border border-primary/20">
                <Code2 className="h-6 w-6 text-primary" />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-background shadow-lg rounded-full p-3 border border-primary/20">
                <History className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              I'm a <span className="text-primary">Fullstack Developer</span> with a passion for building exceptional
              digital experiences
            </h3>

            <p className="text-muted-foreground">
              Hello! I'm Abdul 'Aziz, a dedicated fullstack developer with expertise in modern web technologies. I enjoy
              creating efficient, scalable, and user-friendly applications that solve real-world problems.
            </p>

            {/* Education & Experience */}
            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-4 p-3 rounded-lg border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Educational Background</h4>
                  <p className="text-sm text-muted-foreground">
                    Undergraduate informatics engineering student at Sriwijaya University
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Professional Journey</h4>
                  <p className="text-sm text-muted-foreground">
                    2 years of experience working with various technologies and frameworks, from startups to
                    enterprise-level applications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Coding Passion</h4>
                  <p className="text-sm text-muted-foreground">
                    My journey in coding began with curiosity about how websites work, which evolved into a deep passion
                    for creating elegant solutions to complex problems.
                  </p>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="mt-8 bg-card/50 p-5 rounded-xl border border-primary/10">
              <h4 className="font-semibold mb-4 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Fun Facts & Hobbies
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 group">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Gamepad2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Avid gamer</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="p-2 rounded-full bg-primary/10">
                    <History className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">History enthusiast</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Dumbbell className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Calisthenic</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Camera className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">photographer enthusiast</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <DownloadResumeButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

