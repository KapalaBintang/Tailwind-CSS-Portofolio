import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
   console.log("Resume download requested at", new Date().toISOString())
    return NextResponse.redirect(new URL("https://ugkmb-files.s3.ap-southeast-2.amazonaws.com/resume.pdf", request.url))
  } catch (error) {
    console.error("Error handling resume download:", error)
    return NextResponse.json({ error: "Failed to process resume download" }, { status: 500 })
  }
}

