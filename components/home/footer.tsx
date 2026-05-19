"use client";

import type React from "react";
import { Mail, Phone, MapPin, ChevronUp, Briefcase, BrainCircuit, LayoutDashboard, Database, Bot } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { socialLinks } from "@/datas/socialMedia";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-card/50 border-t border-border relative overflow-hidden">
      {/* Back To Top */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <Button onClick={scrollToTop} className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" aria-label="Back to top">
          <ChevronUp className="h-5 w-5" />
        </Button>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="space-y-5">
            <div>
              <Link href="/" className="text-2xl font-bold text-primary">
                Abdul Aziz
              </Link>

              <p className="mt-4 text-muted-foreground leading-relaxed">Fullstack & AI Engineer focused on building scalable SaaS platforms, AI-powered applications, and modern digital products.</p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                    <link.icon className="h-5 w-5" />
                  </Button>
                </Link>
              ))}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 pt-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Open for freelance & AI product development</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Services & Solutions</h3>

            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <LayoutDashboard className="h-5 w-5 text-primary mt-0.5" />
                <span>SaaS Platform Development</span>
              </li>

              <li className="flex items-start gap-3">
                <Bot className="h-5 w-5 text-primary mt-0.5" />
                <span>AI Chatbot & RAG Systems</span>
              </li>

              <li className="flex items-start gap-3">
                <Database className="h-5 w-5 text-primary mt-0.5" />
                <span>Backend APIs & Database Systems</span>
              </li>

              <li className="flex items-start gap-3">
                <BrainCircuit className="h-5 w-5 text-primary mt-0.5" />
                <span>AI-Powered Web Applications</span>
              </li>
            </ul>
          </div>

          {/* Current Focus */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Current Focus</h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-border bg-background/50">
                <h4 className="font-medium flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                  AI Engineering
                </h4>

                <p className="text-sm text-muted-foreground mt-2">Building AI-powered products using modern LLM workflows, automation systems, and RAG architecture.</p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-background/50">
                <h4 className="font-medium flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Fullstack SaaS
                </h4>

                <p className="text-sm text-muted-foreground mt-2">Developing scalable fullstack applications with modern UI, backend architecture, and cloud deployment.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Let’s Build Something</h3>

            <div className="bg-background/60 border border-border rounded-2xl p-6">
              <p className="text-muted-foreground leading-relaxed mb-6">Have an idea for a SaaS product, AI application, dashboard, or automation system? Let’s turn it into a real product.</p>

              <div className="space-y-4">
                <Link className="block" href="mailto:bintangkapala@gmail.com" target="_blank">
                  <Button className="w-full bg-primary hover:bg-primary/90">Start a Project</Button>
                </Link>

                <Link className="block" href="https://wa.me/62895637594068" target="_blank">
                  <Button variant="outline" className="w-full border-primary/20 hover:border-primary hover:bg-primary/5">
                    Chat via WhatsApp
                  </Button>
                </Link>
              </div>

              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>bintangkapala@gmail.com</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+62 895-6375-94068</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Remote • Worldwide Collaboration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Abdul Aziz. All rights reserved.</p>

          <p className="text-sm text-muted-foreground text-center md:text-right">Building scalable web applications, AI-powered systems, and modern digital products.</p>
        </div>
      </div>

      {/* Background Blur */}
      <div className="absolute bottom-0 left-0 w-full -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
}
