"use client"

import type React from "react"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ChevronUp, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { subscribeToNewsletter } from "@/lib/client-api"
import { socialLinks } from "@/data/socialMedia"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)

    try {
      // Submit email using client API
      const result = await subscribeToNewsletter(email)

      if (result.success) {
        setEmail("")
        setSubscribeStatus("success")
      } else {
        setErrorMessage(result.error || "Failed to subscribe")
        setSubscribeStatus("error")
      }
    } catch (error) {
      console.error("Error subscribing:", error)
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred")
      setSubscribeStatus("error")
    } finally {
      setIsSubscribing(false)

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubscribeStatus(null)
        setErrorMessage("")
      }, 5000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-card/50 border-t border-border relative">
      {/* Back to top button */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Button
          onClick={scrollToTop}
          className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-primary inline-block">
              'Abdul 'Aziz
            </Link>
            <p className="text-muted-foreground">
              A passionate fullstack developer dedicated to creating elegant, efficient, and user-friendly web
              applications.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((link) => (
                <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-9 w-9 hover:bg-primary/10 hover:text-primary"
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-muted-foreground hover:text-primary transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:bintangkapala@gmail.com"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  bintangkapala@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="https://wa.me/62895637594068" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                  +62 895-6375-94068
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span className="text-muted-foreground">Indonesia</span>
              </li>
            </ul>
            <div className="mt-4 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm">Available for freelance work</span>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to my newsletter to receive updates on my latest projects and tech articles.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-r-none border-r-0 focus:ring-0 focus:border-primary"
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? (
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
              {subscribeStatus === "success" && <p className="text-green-500 text-sm">Thank you for subscribing!</p>}
              {subscribeStatus === "error" && (
                <p className="text-red-500 text-sm">{errorMessage || "Something went wrong. Please try again."}</p>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} 'Abdul 'Aziz. All rights reserved.
          </div>
          <div className="text-sm text-muted-foreground flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by 'Abdul 'Aziz
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden -z-10">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>
    </footer>
  )
}

