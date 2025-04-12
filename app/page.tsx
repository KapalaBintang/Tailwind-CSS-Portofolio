"use client"

import { useEffect } from "react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ExperienceSection from "@/components/experience-section"
import TechStack from "@/components/tech-stack"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { useTheme } from "next-themes"
import PortfolioSection from "@/components/portfolio-section"

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

