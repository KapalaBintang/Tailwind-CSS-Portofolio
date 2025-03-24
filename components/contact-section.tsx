"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { submitContactForm } from "@/lib/client-api"
import { socialLinks } from "@/data/socialMedia"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit form data using client API
      const result = await submitContactForm(formState)

      if (result.success) {
        // Reset form
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        setSubmitStatus("success")
      } else {
        throw new Error(result.error || "Failed to submit form")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's{" "}
            <span className="text-primary relative inline-block">
              Connect
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you. Feel free to
            reach out using the form below or through my contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card rounded-xl p-6 border border-border shadow-lg relative overflow-hidden">
              <h3 className="text-xl font-bold mb-6 flex items-center relative">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Contact Information
              </h3>

              <div className="space-y-4 relative">
                <div className="flex items-start gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a
                      href="mailto:bintangkapala@gmail.com"
                      target="_blank"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      bintangkapala@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <a
                      href="https://wa.me/62895637594068"
                      target="_blank"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      +62 895-6375-94068
                    </a>

                  </div>
                </div>

                <div className="flex items-start gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-sm text-muted-foreground">Indonesia</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 relative">
                <h4 className="font-semibold mb-4">Connect with me</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((link) => (
                    <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-10 h-10 border-primary/20 hover:border-primary hover:bg-primary/5"
                      >
                        <link.icon className="h-5 w-5" />
                        <span className="sr-only">{link.label}</span>
                      </Button>
                    </Link>
                  ))}
                  
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border shadow-lg relative overflow-hidden">
              <h3 className="text-xl font-bold mb-4 flex items-center relative">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Availability
              </h3>
              <p className="text-muted-foreground mb-4 relative">
                I'm currently available for freelance work and open to discussing new opportunities.
              </p>
              <div className="flex items-center text-sm relative">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium">Available for hire</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl p-6 border border-border shadow-lg relative overflow-hidden">
              <h3 className="text-xl font-bold mb-6 flex items-center relative">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Send Me a Message
              </h3>

              {submitStatus === "success" ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-500">Message Sent Successfully!</h4>
                    <p className="text-sm text-muted-foreground">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              ) : submitStatus === "error" ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3 mb-6">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-500">Something went wrong!</h4>
                    <p className="text-sm text-muted-foreground">
                      {errorMessage || "There was an error sending your message. Please try again later."}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="border-border focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="border-border focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Inquiry"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="border-border focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Hello, I'd like to discuss a project..."
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="min-h-[150px] border-border focus:border-primary transition-all"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
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
  )
}

