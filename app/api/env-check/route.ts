import { NextResponse } from "next/server"

export async function GET() {
  // Check if Firebase environment variables are set
  const firebaseConfigured =
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

  return NextResponse.json({
    firebaseConfigured: !!firebaseConfigured,
    message: firebaseConfigured ? "Firebase is properly configured" : "Firebase environment variables are missing",
  })
}

