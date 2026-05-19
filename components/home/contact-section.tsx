"use client";

import type React from "react";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Briefcase, Bot, LayoutDashboard, Layers3 } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { submitContactForm } from "@/lib/client-api";
import { socialLinks } from "@/datas/socialMedia";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formState);

      if (result.success) {
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setSubmitStatus("success");
      } else {
        throw new Error(result.error || "Failed to submit form");
      }
    } catch (error) {
      console.error(error);

      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");

      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">Let&apos;s Work Together</span>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build Your{" "}
            <span className="text-primary relative inline-block">
              Next Product
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>

          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>

          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I help startups, businesses, and founders build scalable web applications, SaaS platforms, dashboards, and AI-powered tools using modern technologies like Next.js, Supabase, and AI systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Let&apos;s Talk About Your Project</h3>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h4 className="font-semibold">Email</h4>

                    <a href="mailto:bintangkapala@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      bintangkapala@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h4 className="font-semibold">WhatsApp</h4>

                    <a href="https://wa.me/62895637594068" target="_blank" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      +62 895-6375-94068
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h4 className="font-semibold">Location</h4>

                    <p className="text-sm text-muted-foreground">Remote • Available Worldwide</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-8">
                <h4 className="font-semibold mb-4">Connect With Me</h4>

                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((link) => (
                    <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/5">
                        <link.icon className="h-5 w-5" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-5">Typical Projects I Work On</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Layers3 className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <h4 className="font-medium">Modern SaaS Platforms</h4>

                    <p className="text-sm text-muted-foreground">Scalable fullstack applications with authentication, dashboards, and subscriptions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <h4 className="font-medium">AI-Powered Applications</h4>

                    <p className="text-sm text-muted-foreground">AI chatbots, RAG systems, automation tools, and AI integrations for modern products.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <LayoutDashboard className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <h4 className="font-medium">Dashboard & Admin Systems</h4>

                    <p className="text-sm text-muted-foreground">Clean and efficient admin panels, realtime dashboards, and management systems.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <h4 className="font-medium">Business Websites</h4>

                    <p className="text-sm text-muted-foreground">Modern responsive websites focused on performance, branding, and user experience.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Availability</h3>

              <p className="text-muted-foreground mb-4">Currently available for freelance projects, startup collaborations, and AI-powered product development.</p>

              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>

                <span className="font-medium">Open for Freelance & AI Projects</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Start a Conversation</h3>

              <p className="text-muted-foreground mb-6">Tell me about your project, idea, or business needs.</p>

              {/* SUCCESS */}
              {submitStatus === "success" ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />

                  <div>
                    <h4 className="font-semibold text-green-500">Message Sent Successfully</h4>

                    <p className="text-sm text-muted-foreground">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                  </div>
                </div>
              ) : submitStatus === "error" ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />

                  <div>
                    <h4 className="font-semibold text-red-500">Something went wrong</h4>

                    <p className="text-sm text-muted-foreground">{errorMessage}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>

                      <Input id="name" name="name" placeholder="John Doe" value={formState.name} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>

                      <Input id="email" name="email" type="email" placeholder="john@example.com" value={formState.email} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Project Type</Label>

                    <Input id="subject" name="subject" placeholder="AI Chatbot, SaaS Dashboard, Business Website..." value={formState.subject} onChange={handleChange} required />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell Me About Your Project</Label>

                    <Textarea id="message" name="message" placeholder="Describe your project idea, goals, timeline, or challenges..." value={formState.message} onChange={handleChange} required className="min-h-[180px]" />
                  </div>

                  {/* Button */}
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group">
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Discuss Your Project
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
