import { getKnowledgeBaseContent } from "@/utils/knowledgeBase";
import { generateChatResponse } from "@/utils/openai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array provided' });
    }

    // 1. Fetch context from Google Docs / Sheets
    const context = await getKnowledgeBaseContent();
    
    // 2. Generate AI Response using OpenAI
    const reply = await generateChatResponse(messages, context);
    
    // 3. Return the generated reply to the frontend
    res.status(200).json({ reply });
  } catch (error) {
    console.error("API Route Error: ", error);
    res.status(500).json({ 
      error: 'Internal server error while processing message', 
      details: error.message || 'Unknown' 
    });
  }
}
