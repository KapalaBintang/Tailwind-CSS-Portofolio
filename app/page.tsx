"use client"

import { useEffect } from "react"
import HeroSection from "@/components/home/hero-section"
import AboutSection from "@/components/home/about-section"
import ExperienceSection from "@/components/home/experience-section"
import TechStack from "@/components/home/tech-stack"
import ContactSection from "@/components/home/contact-section"
import Footer from "@/components/home/footer"
import Navbar from "@/components/home/navbar"
import PortfolioSection from "@/components/home/portfolio-section"
import { useTheme } from "next-themes"

export default function Home() {
  // Force theme to be applied on initial load
  const { setTheme } = useTheme()

  useEffect(() => {
    // Check if there's a stored theme preference
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      // Set default theme
      setTheme("light")
    }
  }, [setTheme])

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <TechStack />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

