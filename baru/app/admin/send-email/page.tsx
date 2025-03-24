"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2, Send, CheckCircle } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"
import RichTextEditor from "@/components/admin/rich-text-editor"
import FileUpload from "@/components/admin/file-upload"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

export default function SendEmailPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [subscribers, setSubscribers] = useState<string[]>([])
  const [loadingSubscribers, setLoadingSubscribers] = useState(true)

  const [formState, setFormState] = useState({
    from: "",
    to: "",
    subject: "",
    message: "",
  })

  const [attachments, setAttachments] = useState<File[]>([])

  // Fetch subscribers for the dropdown
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const subscribersQuery = query(collection(db, "newsletterSubscriptions"), where("status", "==", "active"))
        const snapshot = await getDocs(subscribersQuery)
        const emails = snapshot.docs.map((doc) => doc.data().email as string)
        setSubscribers(emails)
      } catch (error) {
        console.error("Error fetching subscribers:", error)
      } finally {
        setLoadingSubscribers(false)
      }
    }

    fetchSubscribers()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Create FormData to handle files
      const formData = new FormData()
      formData.append("from", formState.from)
      formData.append("to", formState.to)
      formData.append("subject", formState.subject)
      formData.append("message", formState.message)

      // Add attachments
      attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file)
      })

      // Send email
      const response = await fetch("/api/admin/send-email", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email")
      }

      // Show success message
      setSuccess(true)

      // Reset form after success
      setFormState({
        from: "",
        to: "",
        subject: "",
        message: "",
      })
      setAttachments([])

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Error sending email:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Send Email</h1>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Compose Email</CardTitle>
            <CardDescription>Send emails to subscribers or specific email addresses</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3 mb-6">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3 mb-6">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm text-green-500">Email sent successfully!</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="from">From</Label>
                <Input
                  id="from"
                  name="from"
                  type="email"
                  placeholder="your-email@example.com"
                  value={formState.from}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <div className="flex gap-2">
                  <Input
                    id="to"
                    name="to"
                    type="email"
                    placeholder="recipient@example.com"
                    value={formState.to}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <select
                    className="border rounded-md px-3 py-2 bg-background"
                    onChange={(e) => {
                      if (e.target.value) {
                        setFormState((prev) => ({ ...prev, to: e.target.value }))
                      }
                    }}
                    disabled={loadingSubscribers || isLoading}
                  >
                    <option value="">Select subscriber</option>
                    {subscribers.map((email) => (
                      <option key={email} value={email}>
                        {email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Email subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <RichTextEditor
                  value={formState.message}
                  onChange={(value) => setFormState((prev) => ({ ...prev, message: value }))}
                  placeholder="Compose your email..."
                />
              </div>

              <div className="space-y-2">
                <Label>Attachments</Label>
                <FileUpload value={attachments} onChange={setAttachments} multiple={true} />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Email
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

