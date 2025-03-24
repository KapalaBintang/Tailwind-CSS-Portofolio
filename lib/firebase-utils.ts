import { db } from "./firebase"
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore"

// Contact form submission
export const submitContactForm = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  try {
    const docRef = await addDoc(collection(db, "contactSubmissions"), {
      ...formData,
      status: "new",
      createdAt: serverTimestamp(),
    })

    return {
      success: true,
      id: docRef.id,
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw error
  }
}

// Newsletter subscription
export const subscribeToNewsletter = async (email: string) => {
  try {
    // Check if email already exists
    const emailQuery = query(collection(db, "newsletterSubscriptions"), where("email", "==", email))

    const querySnapshot = await getDocs(emailQuery)

    if (!querySnapshot.empty) {
      return {
        success: false,
        error: "Email already subscribed",
      }
    }

    // Add new subscription
    const docRef = await addDoc(collection(db, "newsletterSubscriptions"), {
      email,
      status: "active",
      createdAt: serverTimestamp(),
    })

    return {
      success: true,
      id: docRef.id,
    }
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    throw error
  }
}

