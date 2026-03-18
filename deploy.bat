@echo off
echo ===================================================
echo     AI Chatbot Demo - Deployment Script
echo ===================================================
echo.
echo Step 1: Authenticating with GitHub...
echo (A browser window will open. Please log in to GitHub.)
"C:\Program Files\GitHub CLI\gh.exe" auth login --web

echo.
echo Step 2: Creating GitHub Repository and Pushing Code...
"C:\Program Files\GitHub CLI\gh.exe" repo create chatbot-demo --public --source=. --remote=origin --push
if %errorlevel% neq 0 (
    echo [!] GitHub repository creation or push failed. You might already have a repo named 'chatbot-demo'.
)

echo.
echo Step 3: Authenticating with Vercel...
echo (A browser window will open. Please log in to Vercel.)
call npx vercel login

echo.
echo Step 4: Deploying to Vercel...
echo IMPORTANT: During setup, please say 'Y' to set up and deploy.
echo It will ask for 'Link to existing project?' - Say 'N'.
echo.
call npx vercel --prod

echo.
echo ===================================================
echo Deployment Complete!
echo Make sure to add your OPENAI_API_KEY environment variable in your Vercel Dashboard Settings!
echo ===================================================
pause
