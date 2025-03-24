"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import AdminNavbar from "@/components/admin-navbar"
import { Search, RefreshCw, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Subscriber {
  id: string
  email: string
  createdAt: any
  status: string
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subscriberToDelete, setSubscriberToDelete] = useState<string | null>(null)

  const fetchSubscribers = async () => {
    setIsLoading(true)
    try {
      const subscribersQuery = query(collection(db, "newsletterSubscriptions"), orderBy("createdAt", "desc"))
      const snapshot = await getDocs(subscribersQuery)
      const subscribersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Subscriber[]

      setSubscribers(subscribersData)
      setFilteredSubscribers(subscribersData)
    } catch (error) {
      console.error("Error fetching subscribers:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscribers()
  }, [])

  useEffect(() => {
    // Apply filters
    let result = subscribers

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter((subscriber) => subscriber.email.toLowerCase().includes(term))
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((subscriber) => subscriber.status === statusFilter)
    }

    setFilteredSubscribers(result)
  }, [searchTerm, statusFilter, subscribers])

  const handleStatusChange = async (subscriberId: string, newStatus: string) => {
    try {
      const subscriberRef = doc(db, "newsletterSubscriptions", subscriberId)
      await updateDoc(subscriberRef, {
        status: newStatus,
      })

      // Update local state
      setSubscribers((prevSubscribers) =>
        prevSubscribers.map((subscriber) =>
          subscriber.id === subscriberId ? { ...subscriber, status: newStatus } : subscriber,
        ),
      )
    } catch (error) {
      console.error("Error updating subscriber status:", error)
    }
  }

  const handleDeleteSubscriber = async () => {
    if (!subscriberToDelete) return

    try {
      const subscriberRef = doc(db, "newsletterSubscriptions", subscriberToDelete)
      await deleteDoc(subscriberRef)

      // Update local state
      setSubscribers((prevSubscribers) => prevSubscribers.filter((subscriber) => subscriber.id !== subscriberToDelete))

      // Close dialog
      setSubscriberToDelete(null)
    } catch (error) {
      console.error("Error deleting subscriber:", error)
    }
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
          <Button onClick={fetchSubscribers} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Manage Subscribers</CardTitle>
            <CardDescription>View and manage your newsletter subscribers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredSubscribers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No subscribers found</p>
                {searchTerm || statusFilter !== "all" ? <p className="mt-2">Try adjusting your filters</p> : null}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Email</th>
                      <th className="text-left py-3 px-2">Date Subscribed</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">{subscriber.email}</td>
                        <td className="py-3 px-2">{formatDate(subscriber.createdAt)}</td>
                        <td className="py-3 px-2">
                          <Select
                            value={subscriber.status}
                            onValueChange={(value) => handleStatusChange(subscriber.id, value)}
                          >
                            <SelectTrigger className="h-8 w-[100px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSubscriberToDelete(subscriber.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!subscriberToDelete} onOpenChange={(open) => !open && setSubscriberToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the subscriber from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSubscriber} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

