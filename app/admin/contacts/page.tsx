"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import AdminNavbar from "@/components/admin/admin-navbar";
import { Eye, Search, RefreshCw } from "lucide-react";

// import types
import { ContactSubmission } from "@/types/Contact";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactSubmission[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isViewing, setIsViewing] = useState(false);
  const [selectedContact, setSelectedContact] =
    useState<ContactSubmission | null>(null);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const contactsQuery = query(
        collection(db, "contactSubmissions"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(contactsQuery);
      const contactsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ContactSubmission[];

      setContacts(contactsData);
      setFilteredContacts(contactsData);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = contacts;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (contact) =>
          contact.name.toLowerCase().includes(term) ||
          contact.email.toLowerCase().includes(term) ||
          contact.subject.toLowerCase().includes(term) ||
          contact.message.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((contact) => contact.status === statusFilter);
    }

    setFilteredContacts(result);
  }, [searchTerm, statusFilter, contacts]);

  const handleStatusChange = async (contactId: string, newStatus: string) => {
    try {
      const contactRef = doc(db, "contactSubmissions", contactId);
      await updateDoc(contactRef, {
        status: newStatus,
      });

      // Update local state
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === contactId ? { ...contact, status: newStatus } : contact
        )
      );
    } catch (error) {
      console.error("Error updating contact status:", error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";

    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Contact Submissions</h1>
          <Button onClick={fetchContacts} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Manage Contact Submissions</CardTitle>
            <CardDescription>
              View and manage messages from your contact form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
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
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No contact submissions found</p>
                {searchTerm || statusFilter !== "all" ? (
                  <p className="mt-2">Try adjusting your filters</p>
                ) : null}
              </div>
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
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr
                        key={contact.id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="py-3 px-2">{contact.name}</td>
                        <td className="py-3 px-2">{contact.email}</td>
                        <td className="py-3 px-2">{contact.subject}</td>
                        <td className="py-3 px-2">
                          {formatDate(contact.createdAt)}
                        </td>
                        <td className="py-3 px-2">
                          <Select
                            value={contact.status}
                            onValueChange={(value) =>
                              handleStatusChange(contact.id, value)
                            }
                          >
                            <SelectTrigger className="h-8 w-[100px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="replied">Replied</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedContact(contact);
                                  setIsViewing(true);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>

                            <DialogContent className="p-8 max-w-xs sm:max-w-xl rounded-lg shadow-lg">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-semibold text-primary">
                                  View Contact Submission
                                </DialogTitle>
                                <DialogDescription className="mt-2 text-muted-foreground">
                                  Here are the details of the contact submission
                                  you selected.
                                </DialogDescription>
                              </DialogHeader>

                              {/* Informasi Umum */}
                              <div className="mt-6 space-y-3">
                                <div className="flex justify-between">
                                  <span className="font-medium">Name:</span>
                                  <span>{selectedContact?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium">Email:</span>
                                  <span>{selectedContact?.email}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium">Date:</span>
                                  <span>
                                    {formatDate(selectedContact?.createdAt)}
                                  </span>
                                </div>
                              </div>

                              {/* Subject dan Message */}
                              <div className="mt-8 space-y-4 border-t pt-6">
                                <div>
                                  <span className="block font-medium mb-1">
                                    Subject:
                                  </span>
                                  <div className="bg-muted p-3 rounded-md break-words">
                                    {selectedContact?.subject}
                                  </div>
                                </div>
                                <div>
                                  <span className="block font-medium mb-1">
                                    Message:
                                  </span>
                                  <div className="bg-muted p-3 rounded-md whitespace-pre-wrap break-words max-h-60 overflow-y-auto">
                                    {selectedContact?.message}
                                  </div>
                                </div>
                              </div>

                              <DialogFooter className="mt-6">
                                <DialogClose className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80">
                                  Close
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
    </div>
  );
}
