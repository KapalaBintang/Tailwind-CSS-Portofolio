import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // In a real environment, you would read the file from the filesystem
    // For v0 preview, we'll redirect to a static path

    // Log the download (you could expand this to store in a database)
    console.log(`Resume download requested at ${new Date().toISOString()}`)

    // Return a redirect to the static file
    return NextResponse.redirect(new URL("/resume.pdf", request.url))
  } catch (error) {
    console.error("Error handling resume download:", error)
    return NextResponse.json({ error: "Failed to process resume download" }, { status: 500 })
  }
}

