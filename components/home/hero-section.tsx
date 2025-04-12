"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/datas/socialMedia"
import { ArrowRight } from "lucide-react"
import Link from "next/link"


export default function HeroSection() {
  return (
    <section className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <div className="inline-block">
              <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                Welcome to my portfolio
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Hi, I'm{" "}
              <span className="text-primary relative inline-block">
                Abdul 'Aziz
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
              </span>
              <span className="block mt-2">Fullstack Developer</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              I build exceptional and accessible digital experiences for the web. Focused on creating clean,
              user-friendly interfaces with modern technologies.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 group"
              >
               <a href="#portfolio" className="flex items-center">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
               </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/20 hover:border-primary/50 hover:bg-primary/5"
              >
                <Link href="https://www.instagram.com/abdul_aziz_2412/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Contact Me
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              {socialLinks.map((link) => (
                <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="relative mx-auto lg:ml-auto">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square overflow-hidden rounded-full border-4 border-primary/20 p-2 bg-gradient-to-br from-background to-background/80 shadow-2xl">
                <div className="rounded-full overflow-hidden bg-primary/5 h-full w-full relative">
                  <Image
                    src="/profile-3.jpg?height=600&width=600"
                    alt="Abdul 'Aziz"
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full"
                    priority
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-60"></div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-background shadow-lg rounded-lg p-4 border border-primary/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

