
#!/bin/bash

# BZKings Etsy Boost Mobile App Installer
# This script automates the mobile app installation process

set -e

APP_NAME="BZKings Etsy Boost"
echo "🚀 Starting $APP_NAME Mobile App Installation"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Initialize Capacitor (if not already done)
echo "⚡ Setting up Capacitor..."

# Add Android platform
echo "📱 Adding Android platform..."
npx cap add android

# Add iOS platform (only on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Adding iOS platform..."
    npx cap add ios
fi

# Sync the project
echo "🔄 Syncing Capacitor..."
npx cap sync

echo ""
echo "🎉 Mobile app setup completed!"
echo ""
echo "Next steps:"
echo "1. For Android APK:"
echo "   - Run: npx cap open android"
echo "   - In Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)"
echo ""

if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "2. For iOS app:"
    echo "   - Run: npx cap open ios"
    echo "   - In Xcode: Build and run or archive for App Store"
    echo ""
fi

echo "✨ Your mobile app is ready!"
