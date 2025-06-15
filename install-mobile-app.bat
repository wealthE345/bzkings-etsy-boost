
@echo off
title BZKings Etsy Boost Mobile App Installer

echo 🚀 Starting BZKings Etsy Boost Mobile App Installation
echo ==============================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm
    pause
    exit /b 1
)

echo ✅ npm found
npm --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build the application
echo 🔨 Building the application...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build application
    pause
    exit /b 1
)

REM Setup Capacitor
echo ⚡ Setting up Capacitor...

REM Add Android platform
echo 📱 Adding Android platform...
npx cap add android

REM Sync the project
echo 🔄 Syncing Capacitor...
npx cap sync

echo.
echo 🎉 Mobile app setup completed!
echo.
echo Next steps:
echo 1. For Android APK:
echo    - Run: npx cap open android
echo    - In Android Studio: Build ^> Build Bundle(s) / APK(s) ^> Build APK(s)
echo.
echo ✨ Your mobile app is ready!
echo.
pause
