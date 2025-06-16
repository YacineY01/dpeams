import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { createEmbedding } from "@/lib/file-processor"

export async function POST(request: NextRequest) {
  try {
    const { query, top_k = 5 } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "No query provided" }, { status: 400 })
    }

    // Create embedding for the query
    const queryEmbedding = await createEmbedding(query)

    // Search for similar documents using cosine similarity
    const { data: documents, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: top_k,
    })

    if (error) {
      console.error("Search error:", error)
      return NextResponse.json({ error: "Search failed" }, { status: 500 })
    }

    return NextResponse.json({
      results: documents.map((doc: any) => ({
        content: doc.content,
        metadata: doc.metadata,
        similarity: doc.similarity,
      })),
    })
  } catch (error) {
    console.error("Query error:", error)
    return NextResponse.json({ error: "Failed to process query" }, { status: 500 })
  }
}
