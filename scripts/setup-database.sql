-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the documents table for storing file chunks and embeddings
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  metadata JSONB,
  embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for similarity search
CREATE INDEX IF NOT EXISTS documents_embedding_idx 
ON documents USING hnsw (embedding vector_cosine_ops);
