import { useState, useRef, useEffect } from "react";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, { role: "user", content: userMessage }]
        }),
      });

      if (!response.ok) throw new Error("API response error");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || `Error: ${data.details || 'Unknown'}` },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error answering your question." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 ring-1 ring-gray-900/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white shadow-md z-10">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Demo AI Assistant
        </h2>
        <p className="text-blue-100 text-sm mt-1 opacity-90">Powered by Custom AI Engine</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 shadow-sm animation-fade-in ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm ring-1 ring-black/5"
              }`}
            >
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
                {msg.content}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animation-fade-in">
            <div className="max-w-[80%] bg-white text-gray-400 border border-gray-100 rounded-2xl rounded-tl-sm p-4 ring-1 ring-black/5 flex items-center gap-1.5 shadow-sm">
              <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></span>
              <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              <span className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[50px]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .animation-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
