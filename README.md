# AI Chatbot Demo System

This is a demonstration AI chatbot built with Next.js, Tailwind CSS, and OpenAI. It uses a simple Google Sheet or Google Doc (published as CSV or text) as its Knowledge Base.

## Project Structure
- `src/components/ChatUI.js`: The frontend chat interface
- `src/pages/index.js`: The main application page
- `src/pages/api/chat.js`: The API route that receives messages and talks to OpenAI
- `src/utils/knowledgeBase.js`: Connects to Google Sheets/Docs to retrieve context
- `src/utils/openai.js`: Connects to the OpenAI API

---

## 🚀 Step 1: Connecting your Knowledge Base
You can use **Google Sheets** or **Google Docs**. The easiest way without complex authentication is publishing it to the web.

### Using Google Sheets
1. Create a Google Sheet and fill it with your knowledge (e.g., FAQs, facts, text excerpts).
2. Go to **File** > **Share** > **Publish to web**.
3. In the dropdown, select **Entire Document** and **Comma-separated values (.csv)**.
4. Click **Publish** and copy the generated link.
5. Provide this link to the `KNOWLEDGE_BASE_URL` environment variable.

### Using Google Docs
1. Create a Google Doc with your knowledge base text.
2. Go to **File** > **Share** > **Publish to web**.
3. Click **Publish** and copy the link.
4. *Note:* A Google Doc published page contains HTML. The backend fetches raw text but a CSV from Sheets is cleaner for the AI.

---

## 🔑 Step 2: Environment Variables
Create a `.env.local` file in the root of the project (if running locally) or add these to your Vercel Dashboard:

```env
OPENAI_API_KEY=sk-your-openai-api-key
KNOWLEDGE_BASE_URL=https://docs.google.com/spreadsheets/d/e/.../pub?output=csv
```

---

## 🛠 Step 3: Local Development
To run this locally:
1. Ensure Node.js is installed.
2. Run `npm install`
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

---

## ☁️ Step 4: Deploying to GitHub & Vercel

### 1. Upload to GitHub
1. Initialize a git repository locally: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial commit"`
4. Go to [GitHub](https://github.com/) and create a new repository.
5. Add the remote URL: `git remote add origin https://github.com/yourusername/chatbot-demo.git`
6. Push the code: `git push -u origin main`

### 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com/) and sign in.
2. Click **Add New** > **Project**.
3. Import the `chatbot-demo` repository from your GitHub.
4. **Crucial Step:** In the "Environment Variables" section before deploying, add:
   - `OPENAI_API_KEY`: Your OpenAI API Key
   - `KNOWLEDGE_BASE_URL`: The published Google link from Step 1
5. Click **Deploy**. Vercel will build and host your chatbot!

> Note: Because we removed the default Next.js `app/` router and switched to `pages/`, Vercel might automatically detect Next.js. The current setup is clean and ready.
