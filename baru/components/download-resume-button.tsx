"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"

interface DownloadResumeButtonProps {
  variant?: "default" | "navbar"
  className?: string
}

export default function DownloadResumeButton({ variant = "default", className = "" }: DownloadResumeButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      // Create a temporary anchor element to trigger the download
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = "/resume.pdf" // Direct link to the static file
      a.download = "Abdul_Aziz_Resume.pdf"

      // Add to the DOM and trigger the download
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)

      // Optional: Track the download via API
      try {
        await fetch("/api/download-resume", { method: "GET" })
      } catch (trackError) {
        // Silently fail tracking - the user still gets the download
        console.warn("Failed to track download:", trackError)
      }
    } catch (error) {
      console.error("Error downloading resume:", error)
      alert("Failed to download resume. Please try again later.")
    } finally {
      // Short timeout to show the loading state briefly
      setTimeout(() => {
        setIsDownloading(false)
      }, 500)
    }
  }

  if (variant === "navbar") {
    return (
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`bg-primary hover:bg-primary/90 text-primary-foreground group ${className}`}
      >
        {isDownloading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="hidden sm:inline-block">Loading</span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline-block">Download</span> CV
            <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </>
        )}
      </Button>
    )
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 group ${className}`}
    >
      {isDownloading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          Download Resume
          <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
        </>
      )}
    </Button>
  )
}

