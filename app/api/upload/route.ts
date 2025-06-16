import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { processFile, createEmbedding } from "@/lib/file-processor"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read file content
    const content = await file.text()

    // Process file into chunks
    const chunks = await processFile(content, file.name)

    // Create embeddings and store in database
    const documents = []

    for (const chunk of chunks) {
      const embedding = await createEmbedding(chunk.content)

      const { data, error } = await supabase
        .from("documents")
        .insert({
          content: chunk.content,
          metadata: chunk.metadata,
          embedding: embedding,
        })
        .select()
        .single()

      if (error) {
        console.error("Error inserting document:", error)
        continue
      }

      documents.push(data)
    }

    return NextResponse.json({
      message: `Successfully processed ${documents.length} chunks from ${file.name}`,
      documents: documents.length,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
  }
}
