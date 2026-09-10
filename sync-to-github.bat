@echo off
echo ========================================================
echo   Syncing bambiboy602.com with GitHub
echo ========================================================
cd /d "%~dp0"
git add .
set /p commitMsg="Enter commit message (or press Enter for default): "
if "%commitMsg%"=="" set commitMsg=Update site and standalone Tom bot
git commit -m "%commitMsg%"
git push origin main
echo.
echo ========================================================
echo   Sync Complete! GitHub Actions will auto-deploy.
echo ========================================================
pause
