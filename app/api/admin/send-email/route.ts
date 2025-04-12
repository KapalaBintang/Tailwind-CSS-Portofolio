import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || "smtp.gmail.com",
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    // Get form data with files
    const formData = await request.formData()

    const from = formData.get("from") as string
    const to = formData.get("to") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!from || !to || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Process attachments
    const attachments = []

    // Get all files from formData
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("attachments") && value instanceof Blob) {
        const file = value as File

        // Convert file to buffer for nodemailer
        const buffer = Buffer.from(await file.arrayBuffer())

        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type,
        })
      }
    }

    // Send email
    const mailOptions = {
      from,
      to,
      subject,
      html: message,
      attachments,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}

