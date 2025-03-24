import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address" }, { status: 400 })
    }

    // Check if email already exists
    const emailQuery = query(collection(db, "newsletterSubscriptions"), where("email", "==", email))
    const querySnapshot = await getDocs(emailQuery)

    if (!querySnapshot.empty) {
      return NextResponse.json(
        { success: false, error: "This email is already subscribed to our newsletter" },
        { status: 409 },
      )
    }

    // Add new subscription to Firestore
    const docRef = await addDoc(collection(db, "newsletterSubscriptions"), {
      email,
      status: "active",
      createdAt: serverTimestamp(),
    })

    // Return success response
    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: "Thank you for subscribing to our newsletter!",
    })
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return NextResponse.json({ success: false, error: "Failed to subscribe. Please try again later." }, { status: 500 })
  }
}

