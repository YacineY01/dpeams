import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface DocumentChunk {
  content: string
  metadata: {
    filename: string
    chunkIndex: number
    totalChunks: number
  }
}

export function chunkText(text: string, chunkSize = 1000): string[] {
  const chunks: string[] = []
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)

  let currentChunk = ""

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim())
      currentChunk = sentence
    } else {
      currentChunk += (currentChunk ? ". " : "") + sentence
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim())
  }

  return chunks
}

export async function createEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  })

  return response.data[0].embedding
}

export async function processFile(content: string, filename: string): Promise<DocumentChunk[]> {
  const chunks = chunkText(content)

  return chunks.map((chunk, index) => ({
    content: chunk,
    metadata: {
      filename,
      chunkIndex: index,
      totalChunks: chunks.length,
    },
  }))
}
