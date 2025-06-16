"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, CheckCircle } from "lucide-react"

export default function HomePage() {
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadResult(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setUploadResult(`✅ ${result.message}`)
      } else {
        setUploadResult(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      setUploadResult("❌ Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ChatGPT File Analyzer</h1>
          <p className="text-xl text-gray-600">Upload files and let ChatGPT analyze their content</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Upload text files, PDFs, or documents</p>
              <input
                type="file"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
                id="file-upload"
                accept=".txt,.pdf,.doc,.docx,.md"
              />
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={uploading}
                className="mb-4"
              >
                {uploading ? "Processing..." : "Choose File"}
              </Button>
              {uploadResult && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">{uploadResult}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Setup Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Environment Variables Needed:</h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <code>OPENAI_API_KEY</code> - Your OpenAI API key
                </li>
                <li>
                  • <code>NEXT_PUBLIC_SUPABASE_URL</code> - Your Supabase URL
                </li>
                <li>
                  • <code>SUPABASE_SERVICE_ROLE_KEY</code> - Your Supabase service key
                </li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">ChatGPT Plugin URL:</h3>
              <p className="text-sm">
                Add this URL to ChatGPT: <code>https://your-domain.com</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
