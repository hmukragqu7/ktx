@echo off
echo ========================================
echo   KT-X Website - Deploy to GitHub Pages
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Checking git status...
git status
echo.

echo [2/4] Staging all changes...
git add .
echo.

echo [3/4] Committing changes...
git commit -m "Update contact info and add themed service pages - Contact: 1157/1 13th Main BTM Layout Bangalore, Email: avvinod@koushalyatantra.in, Phone: +91 7090271555 - Added Industry 4.0 IIoT page and Workforce Manpower page with cache-busting"
echo.

echo [4/4] Pushing to GitHub...
git push origin main
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your changes are being deployed to:
echo https://hmukragqu7.github.io/ktx/
echo.
echo Wait 1-2 minutes for GitHub Pages to rebuild,
echo then hard refresh (Ctrl + Shift + R) to see changes.
echo.
pause
