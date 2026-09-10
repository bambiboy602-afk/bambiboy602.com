@echo off
echo ========================================================
echo   Starting B.A.M.B.I. Local Server (bambiboy602.com)
echo ========================================================
cd /d "%~dp0"
if not exist node_modules (
    echo Installing dependencies...
    npm install
)
echo Launching development server on http://localhost:3000
echo Standalone Tom Brain & B.A.M.B.I. Learner ready!
npm run dev
pause
