"use client";

import { Code2, GraduationCap, Briefcase, History, BookOpen, Gamepad2, Dumbbell, Camera, Layers, Bot, LayoutDashboard, Server, Shield, Sparkles, Globe } from "lucide-react";
import Image from "next/image";
import DownloadResumeButton from "../ui/download-resume-button";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">About Me</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Building Modern{" "}
            <span className="text-primary relative inline-block">
              Web & AI Solutions
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">I build scalable web applications and AI-powered solutions focused on performance, usability, and real-world impact.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="relative bg-card rounded-2xl overflow-hidden border border-primary/10 shadow-xl">
                <Image src="/profile-1.jpg?height=600&width=600" alt="'Abdul 'Aziz" width={1000} height={1000} className="w-full h-auto" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold">'Abdul 'Aziz</h3>
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
              I'm a <span className="text-primary">Fullstack Developer</span> with a passion for building exceptional digital experiences
            </h3>

            <p className="text-muted-foreground">
              I specialize in building modern web applications and AI-powered products using technologies like Next.js, Supabase, and Python. My focus is creating scalable, user-focused solutions that help businesses and startups move
              faster.
            </p>

            {/* Education & Experience */}
            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-4 p-3 rounded-lg border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Educational Background</h4>
                  <p className="text-sm text-muted-foreground">Studying Informatics Engineering while actively building real-world fullstack and AI projects.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Professional Journey</h4>
                  <p className="text-sm text-muted-foreground">2 years of experience working with various technologies and frameworks, Hands-on experience building modern web applications, SaaS products, and scalable backend systems.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Coding Passion</h4>
                  <p className="text-sm text-muted-foreground">Focused on continuously improving in fullstack development and AI engineering through real-world projects and product building.</p>
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

            <div className="mt-8 bg-gradient-to-br from-primary/5 to-primary/10 p-5 rounded-xl border border-primary/20">
              <h4 className="font-semibold mb-4 flex items-center text-lg">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                What I Can Help With
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-background/80 transition-all group">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Layers className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">SaaS Development</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-background/80 transition-all group">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">AI Chatbot Integration</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-background/80 transition-all group">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <LayoutDashboard className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Dashboard & Admin Systems</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-background/80 transition-all group">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Server className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">API Development</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-background/80 transition-all group">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Authentication Systems</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-background/80 transition-all group">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">AI-powered Web Apps</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-background/80 transition-all group sm:col-span-2">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Globe className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Modern Responsive Websites</span>
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
  );
}
