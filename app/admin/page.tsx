"use client"

import { useState, useEffect } from "react"
import { signOut } from "@/lib/auth-utils"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import AdminNavbar from "@/components/admin-navbar"

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: any
  status: string
}

interface Subscriber {
  id: string
  email: string
  createdAt: any
  status: string
}

export default function AdminDashboard() {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch contact submissions
        const contactQuery = query(collection(db, "contactSubmissions"), orderBy("createdAt", "desc"), limit(5))
        const contactSnapshot = await getDocs(contactQuery)
        const contactData = contactSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ContactSubmission[]

        setContactSubmissions(contactData)

        // Fetch subscribers
        const subscribersQuery = query(
          collection(db, "newsletterSubscriptions"),
          orderBy("createdAt", "desc"),
          limit(5),
        )
        const subscribersSnapshot = await getDocs(subscribersQuery)
        const subscribersData = subscribersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Subscriber[]

        setSubscribers(subscribersData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"

    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } catch (error) {
      return "Invalid date"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.email}</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Contact Submissions</CardTitle>
              <CardDescription>Total messages received</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{contactSubmissions.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Newsletter Subscribers</CardTitle>
              <CardDescription>Total active subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{subscribers.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Admin Users</CardTitle>
              <CardDescription>Total admin accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Data */}
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="contacts">Recent Contacts</TabsTrigger>
            <TabsTrigger value="subscribers">Recent Subscribers</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Recent Contact Submissions</CardTitle>
                <CardDescription>The latest messages from your contact form</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : contactSubmissions.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">No contact submissions yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Name</th>
                          <th className="text-left py-3 px-2">Email</th>
                          <th className="text-left py-3 px-2">Subject</th>
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contactSubmissions.map((submission) => (
                          <tr key={submission.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2">{submission.name}</td>
                            <td className="py-3 px-2">{submission.email}</td>
                            <td className="py-3 px-2">{submission.subject}</td>
                            <td className="py-3 px-2">{formatDate(submission.createdAt)}</td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                  submission.status === "new"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                    : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                }`}
                              >
                                {submission.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="mt-4 text-right">
                  <Button variant="outline" onClick={() => router.push("/admin/contacts")}>
                    View All Contacts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <CardTitle>Recent Newsletter Subscribers</CardTitle>
                <CardDescription>The latest subscribers to your newsletter</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : subscribers.length === 0 ? (
                  <p className="text-center py-4 text-muted-foreground">No subscribers yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Email</th>
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2">{subscriber.email}</td>
                            <td className="py-3 px-2">{formatDate(subscriber.createdAt)}</td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                  subscriber.status === "active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                }`}
                              >
                                {subscriber.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="mt-4 text-right">
                  <Button variant="outline" onClick={() => router.push("/admin/subscribers")}>
                    View All Subscribers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

