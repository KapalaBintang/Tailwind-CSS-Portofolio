import { auth } from "./firebase"
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, type User } from "firebase/auth"

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log("User signed in:", userCredential.user)
    return {
      success: true,
      user: userCredential.user,
    }
  } catch (error: any) {
    console.error("Error signing in:", error)
    
    // Provide more specific error messages based on Firebase error codes
    let errorMessage = "Failed to sign in"
    
    if (error.code) {
      switch (error.code) {
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password. Please check your credentials and try again."
          break
        case "auth/user-not-found":
          errorMessage = "No account found with this email. Please check your email or sign up."
          break
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again."
          break
        case "auth/invalid-email":
          errorMessage = "Invalid email format. Please enter a valid email address."
          break
        case "auth/user-disabled":
          errorMessage = "This account has been disabled. Please contact support."
          break
        case "auth/too-many-requests":
          errorMessage = "Too many unsuccessful login attempts. Please try again later or reset your password."
          break
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your internet connection and try again."
          break
        default:
          errorMessage = `Authentication error: ${error.message}`
      }
    }
    
    return {
      success: false,
      error: errorMessage,
      code: error.code
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
export const getCurrentUser = async (): Promise<User | null> => {
  console.log("Auth:", auth.currentUser)
  return auth.currentUser
}

// Check if user is admin
export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser()
  console.log("User:", user)
  // In a real app, you would check if the user has admin role
  // For now, we'll consider any authenticated user as admin
  return !!user
}
