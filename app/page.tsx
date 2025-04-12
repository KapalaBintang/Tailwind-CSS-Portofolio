import HeroSection from "@/components/home/hero-section"
import AboutSection from "@/components/home/about-section"
import ExperienceSection from "@/components/home/experience-section"
import TechStack from "@/components/home/tech-stack"
import ContactSection from "@/components/home/contact-section"
import Footer from "@/components/home/footer"
import Navbar from "@/components/home/navbar"
import PortfolioSection from "@/components/home/portfolio-section"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Abdul 'Aziz | Fullstack Developer & Web Engineer",
  description: "Professional portfolio of Abdul 'Aziz, a skilled Fullstack Developer specializing in modern web technologies, React, Next.js, and full-stack development solutions.",
  alternates: {
    canonical: "https://abdul-aziz.my.id/",
  },
}

export default function Home() {

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

