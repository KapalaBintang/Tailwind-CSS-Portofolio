import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { isAdmin } from "@/lib/auth-utils"

// GET a specific subscriber
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and admin
    const isUserAdmin = await isAdmin()
    if (!isUserAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const subscriberId = params.id
    const subscriberRef = doc(db, "newsletterSubscriptions", subscriberId)
    const subscriberSnap = await getDoc(subscriberRef)

    if (!subscriberSnap.exists()) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      id: subscriberSnap.id, 
      ...subscriberSnap.data() 
    })
  } catch (error) {
    console.error("Error fetching subscriber:", error)
    return NextResponse.json({ error: "Failed to fetch subscriber" }, { status: 500 })
  }
}

// PATCH to update a subscriber
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and admin
    const isUserAdmin = await isAdmin()
    if (!isUserAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const subscriberId = params.id
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const subscriberRef = doc(db, "newsletterSubscriptions", subscriberId)
    const subscriberSnap = await getDoc(subscriberRef)

    if (!subscriberSnap.exists()) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 })
    }

    await updateDoc(subscriberRef, { status })

    return NextResponse.json({ 
      success: true, 
      message: "Subscriber updated successfully" 
    })
  } catch (error) {
    console.error("Error updating subscriber:", error)
    return NextResponse.json({ error: "Failed to update subscriber" }, { status: 500 })
  }
}

// DELETE a subscriber
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and admin
    const isUserAdmin = await isAdmin()
    if (!isUserAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const subscriberId = params.id
    const subscriberRef = doc(db, "newsletterSubscriptions", subscriberId)
    const subscriberSnap = await getDoc(subscriberRef)

    if (!subscriberSnap.exists()) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 })
    }

    await deleteDoc(subscriberRef)

    return NextResponse.json({ 
      success: true, 
      message: "Subscriber deleted successfully" 
    })
  } catch (error) {
    console.error("Error deleting subscriber:", error)
    return NextResponse.json({ error: "Failed to delete subscriber" }, { status: 500 })
  }
}

