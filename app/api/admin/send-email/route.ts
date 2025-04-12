import { NextResponse } from "next/server"
import nodemailer from "nodemailer"


export async function POST(request: Request) {
  try {
  
    // Parse the form data
    const formData = await request.formData()
    const from = formData.get("from") as string
    const to = formData.get("to") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const sendToAll = formData.get("sendToAll") as string

    // Get attachments
    const attachmentFiles: { filename: string; content: Buffer }[] = []
    for (let i = 0; formData.get(`attachments[${i}]`); i++) {
      const file = formData.get(`attachments[${i}]`) as File
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      attachmentFiles.push({
        filename: file.name,
        content: buffer,
      })
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Handle sending to all subscribers or a single recipient
    if (sendToAll === "true") {
      // Parse the JSON string to get the array of emails
      const recipients = JSON.parse(to) as string[]
      
      // Send email to each recipient individually
      const sendPromises = recipients.map(async (recipient) => {
        await transporter.sendMail({
          from,
          to: recipient,
          subject,
          html: message,
          attachments: attachmentFiles,
        })
      })
      
      // Wait for all emails to be sent
      await Promise.all(sendPromises)
      
      return NextResponse.json({ 
        success: true, 
        message: `Email sent successfully to ${recipients.length} subscribers` 
      })
    } else {
      // Send to a single recipient
      await transporter.sendMail({
        from,
        to,
        subject,
        html: message,
        attachments: attachmentFiles,
      })
      
      return NextResponse.json({ 
        success: true, 
        message: "Email sent successfully" 
      })
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send email" },
      { status: 500 }
    )
  }
}

