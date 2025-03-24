import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address" }, { status: 400 })
    }

    // Add new contact submission to Firestore
    const docRef = await addDoc(collection(db, "contactSubmissions"), {
      name,
      email,
      subject,
      message,
      status: "new",
      createdAt: serverTimestamp(),
    })

    // Return success response
    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: "Thank you for your message! We'll get back to you soon.",
    })
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return NextResponse.json(
      { success: false, error: "Failed to submit your message. Please try again later." },
      { status: 500 },
    )
  }
}

