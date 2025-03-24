import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where, serverTimestamp } from "firebase/firestore"
import { getCurrentUser, isAdmin } from "@/lib/auth-utils"

// GET all subscribers
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
    let subscribersQuery = query(
      collection(db, "newsletterSubscriptions"),
      orderBy("createdAt", "desc")
    )

    // Add status filter if provided
    if (status && status !== "all") {
      subscribersQuery = query(
        collection(db, "newsletterSubscriptions"),
        where("status", "==", status),
        orderBy("createdAt", "desc")
      )
    }

    const snapshot = await getDocs(subscribersQuery)
    let subscribers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Apply search filter if provided (client-side filtering since Firestore doesn't support text search)
    if (search) {
      const searchLower = search.toLowerCase()
      subscribers = subscribers.filter(subscriber => 
        subscriber.email.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json({ subscribers })
  } catch (error) {
    console.error("Error fetching subscribers:", error)
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 })
  }
}

// POST new subscriber
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if email already exists
    const emailQuery = query(
      collection(db, "newsletterSubscriptions"),
      where("email", "==", email)
    )
    const querySnapshot = await getDocs(emailQuery)

    if (!querySnapshot.empty) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 409 })
    }

    // Add new subscription
    const docRef = await addDoc(collection(db, "newsletterSubscriptions"), {
      email,
      status: "active",
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      message: "Subscription successful" 
    })
  } catch (error) {
    console.error("Error creating subscriber:", error)
    return NextResponse.json({ error: "Failed to create subscriber" }, { status: 500 })
  }
}

