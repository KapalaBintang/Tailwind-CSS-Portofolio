import { auth } from "./firebase"
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, type User } from "firebase/auth"

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return {
      success: true,
      user: userCredential.user,
    }
  } catch (error: any) {
    console.error("Error signing in:", error)
    return {
      success: false,
      error: error.message || "Failed to sign in",
    }
  }
}

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { success: true }
  } catch (error: any) {
    console.error("Error signing out:", error)
    return {
      success: false,
      error: error.message || "Failed to sign out",
    }
  }
}

// Get current user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

// Check if user is admin
export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser()
  // In a real app, you would check if the user has admin role
  // For now, we'll consider any authenticated user as admin
  return !!user
}

