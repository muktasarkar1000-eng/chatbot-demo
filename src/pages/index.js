import Head from "next/head";
import ChatUI from "@/components/ChatUI";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <Head>
        <title>AI Chatbot System Demo</title>
        <meta name="description" content="Demo AI Chatbot for showcasing AI capabilities" />
      </Head>
      
      <main className="w-full flex flex-col items-center gap-8 justify-center max-w-4xl mx-auto">
        <div className="text-center space-y-4 max-w-2xl px-4 mt-8 md:mt-0">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Intelligent Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Reimagined</span>
          </h1>
          <p className="text-lg text-gray-600">
            A demonstrative AI chatbot securely connected to your knowledge base to provide instantaneous, accurate answers.
          </p>
        </div>

        <ChatUI />
      </main>
      
      <footer className="mt-12 mb-4 text-center text-gray-400 text-sm font-medium">
        <p>Demonstration Chatbot System &middot; Built with Next.js & OpenAI</p>
      </footer>
    </div>
  );
}
