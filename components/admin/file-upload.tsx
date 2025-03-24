"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, File } from "lucide-react"

interface FileUploadProps {
  onChange: (files: File[]) => void
  value: File[]
  multiple?: boolean
}

export default function FileUpload({ onChange, value, multiple = true }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      onChange(multiple ? [...value, ...filesArray] : filesArray)
    }
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = [...value]
    newFiles.splice(index, 1)
    onChange(newFiles)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" onClick={triggerFileInput} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          <span>Upload {multiple ? "Files" : "File"}</span>
        </Button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple={multiple} className="hidden" />
        {value.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {value.length} {value.length === 1 ? "file" : "files"} selected
          </span>
        )}
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-2 border rounded-md bg-muted/20"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <File className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm font-medium truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveFile(index)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

