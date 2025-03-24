import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, query, orderBy, where, serverTimestamp } from "firebase/firestore"
import { isAdmin } from "@/lib/auth-utils"

// GET all contacts
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and admin
    const isUserAdmin = await isAdmin()
    if (!isUserAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    // Build query
    let contactsQuery = query(
      collection(db, "contactSubmissions"),
      orderBy("createdAt", "desc")
    )

    // Add status filter if provided
    if (status && status !== "all") {
      contactsQuery = query(
        collection(db, "contactSubmissions"),
        where("status", "==", status),
        orderBy("createdAt", "desc")
      )
    }

    const snapshot = await getDocs(contactsQuery)
    let contacts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Apply search filter if provided (client-side filtering)
    if (search) {
      const searchLower = search.toLowerCase()
      contacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.subject.toLowerCase().includes(searchLower) ||
        contact.message.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json({ contacts })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

// POST new contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Add new contact submission
    const docRef = await addDoc(collection(db, "contactSubmissions"), {
      name,
      email,
      subject,
      message,
      status: "new",
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      message: "Contact form submitted successfully" 
    })
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}

