export async function getKnowledgeBaseContent() {
  const publishedUrl = process.env.KNOWLEDGE_BASE_URL;
  if (!publishedUrl) {
    return "No knowledge base configured. The KNOWLEDGE_BASE_URL environment variable is missing. Please provide a link to a published Google Doc or Google Sheets CSV.";
  }

  try {
    const response = await fetch(publishedUrl);
    if (!response.ok) throw new Error("Failed to fetch knowledge base from the provided URL");
    const text = await response.text();
    
    // Limit context length to avoid exceeding token limits for simpler models
    // ~15000 characters is roughly 3000-4000 tokens.
    return text.substring(0, 15000); 
  } catch (err) {
    console.error("Knowledge base fetch error:", err);
    return "Error: Could not retrieve knowledge base. Please ensure the Google Doc/Sheet is published to the web.";
  }
}
