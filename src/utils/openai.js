import OpenAI from "openai";

// Helper to get OpenAI client with trimmed key
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY?.trim(),
  });
}

export async function generateChatResponse(messages, context) {
  try {
    const systemPrompt = {
      role: "system",
      content: `You are a helpful AI assistant that answers questions using the provided knowledge base. Always give clear, concise, and helpful answers. Formulate your answers beautifully.

--- KNOWLEDGE BASE START ---
${context}
--- KNOWLEDGE BASE END ---

Instructions:
1. Try to answer the user's question using ONLY the knowledge base provided above.
2. If the user's question cannot be answered using the knowledge base, politely inform them that you do not have that information, but you can try to help them generally if appropriate.
3. Be professional like a customer support assistant.
`
    };

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Recommended for speed and cost efficiency in demos
      messages: [systemPrompt, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI error:", error);
    throw new Error(error.message || "Failed to generate response from OpenAI");
  }
}
