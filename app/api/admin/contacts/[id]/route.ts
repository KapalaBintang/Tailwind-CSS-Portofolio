import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { isAdmin } from "@/lib/auth-utils"

// GET a specific contact
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

    const contactId = params.id
    const contactRef = doc(db, "contactSubmissions", contactId)
    const contactSnap = await getDoc(contactRef)

    if (!contactSnap.exists()) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      id: contactSnap.id, 
      ...contactSnap.data() 
    })
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 })
  }
}

// PATCH to update a contact
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

    const contactId = params.id
    const body = await request.json()
    const { status, notes } = body

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const contactRef = doc(db, "contactSubmissions", contactId)
    const contactSnap = await getDoc(contactRef)

    if (!contactSnap.exists()) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    const updateData: Record<string, any> = { status }
    if (notes !== undefined) {
      updateData.notes = notes
    }

    await updateDoc(contactRef, updateData)

    return NextResponse.json({ 
      success: true, 
      message: "Contact updated successfully" 
    })
  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 })
  }
}

// DELETE a contact
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

    const contactId = params.id
    const contactRef = doc(db, "contactSubmissions", contactId)
    const contactSnap = await getDoc(contactRef)

    if (!contactSnap.exists()) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    await deleteDoc(contactRef)

    return NextResponse.json({ 
      success: true, 
      message: "Contact deleted successfully" 
    })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 })
  }
}

