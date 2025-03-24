"use client"

import { type ReactNode, useEffect, useState } from "react"
import { getApp } from "firebase/app"

interface FirebaseProviderProps {
  children: ReactNode
}

export default function FirebaseProvider({ children }: FirebaseProviderProps) {
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Check if Firebase is initialized
      const firebaseApp = getApp()
      if (firebaseApp) {
        setIsFirebaseInitialized(true)
      }
    } catch (error) {
      console.error("Firebase initialization error:", error)
      setError("Failed to initialize Firebase. Please check your configuration.")
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-500 mb-2">Firebase Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">
            Please make sure you have set up the required environment variables for Firebase.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

