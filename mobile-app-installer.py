
#!/usr/bin/env python3
"""
Mobile App Installer Script for BZKings Etsy Boost
This script helps users install the mobile app on their devices
"""

import os
import sys
import platform
import subprocess
import zipfile
import shutil
from pathlib import Path

class MobileAppInstaller:
    def __init__(self):
        self.system = platform.system().lower()
        self.app_name = "BZKings Etsy Boost"
        
    def check_requirements(self):
        """Check if required tools are installed"""
        print(f"🔍 Checking system requirements...")
        print(f"Operating System: {platform.system()} {platform.release()}")
        
        # Check for Node.js
        try:
            result = subprocess.run(['node', '--version'], capture_output=True, text=True)
            print(f"✅ Node.js: {result.stdout.strip()}")
        except FileNotFoundError:
            print("❌ Node.js not found. Please install Node.js from https://nodejs.org/")
            return False
            
        # Check for npm
        try:
            result = subprocess.run(['npm', '--version'], capture_output=True, text=True)
            print(f"✅ npm: {result.stdout.strip()}")
        except FileNotFoundError:
            print("❌ npm not found. Please install npm")
            return False
            
        return True
    
    def install_dependencies(self):
        """Install project dependencies"""
        print("\n📦 Installing dependencies...")
        try:
            subprocess.run(['npm', 'install'], check=True)
            print("✅ Dependencies installed successfully")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to install dependencies")
            return False
    
    def build_app(self):
        """Build the web application"""
        print("\n🔨 Building the application...")
        try:
            subprocess.run(['npm', 'run', 'build'], check=True)
            print("✅ Application built successfully")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to build application")
            return False
    
    def setup_capacitor(self):
        """Initialize and sync Capacitor"""
        print("\n⚡ Setting up Capacitor...")
        try:
            # Add platforms
            if self.system == 'darwin':  # macOS
                subprocess.run(['npx', 'cap', 'add', 'ios'], check=True)
                print("✅ iOS platform added")
            
            subprocess.run(['npx', 'cap', 'add', 'android'], check=True)
            print("✅ Android platform added")
            
            # Sync the project
            subprocess.run(['npx', 'cap', 'sync'], check=True)
            print("✅ Capacitor synced successfully")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to setup Capacitor")
            return False
    
    def create_apk(self):
        """Create Android APK"""
        print("\n📱 Creating Android APK...")
        try:
            # Open Android Studio project
            subprocess.run(['npx', 'cap', 'open', 'android'], check=True)
            print("✅ Android project opened in Android Studio")
            print("📋 To create APK:")
            print("   1. In Android Studio, go to Build > Build Bundle(s) / APK(s) > Build APK(s)")
            print("   2. The APK will be created in android/app/build/outputs/apk/debug/")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to open Android project")
            return False
    
    def create_ios_app(self):
        """Create iOS app (macOS only)"""
        if self.system != 'darwin':
            print("❌ iOS development requires macOS with Xcode")
            return False
            
        print("\n🍎 Creating iOS app...")
        try:
            subprocess.run(['npx', 'cap', 'open', 'ios'], check=True)
            print("✅ iOS project opened in Xcode")
            print("📋 To create iOS app:")
            print("   1. In Xcode, select your device or simulator")
            print("   2. Click the Play button to build and run")
            print("   3. For App Store: Product > Archive")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to open iOS project")
            return False
    
    def create_distribution_package(self):
        """Create distribution package with APK and installation files"""
        print("\n📦 Creating distribution package...")
        
        # Create distribution folder
        dist_folder = Path("mobile-app-distribution")
        dist_folder.mkdir(exist_ok=True)
        
        # Copy installation script
        shutil.copy(__file__, dist_folder / "install.py")
        
        # Create README for users
        readme_content = f"""
# {self.app_name} Mobile App Installation

## Prerequisites
1. Install Node.js from https://nodejs.org/
2. For Android: Install Android Studio from https://developer.android.com/studio
3. For iOS (macOS only): Install Xcode from App Store

## Installation Steps
1. Extract this folder to your preferred location
2. Open terminal/command prompt in this folder
3. Run: python install.py

## Manual Installation (Alternative)
1. Run: npm install
2. Run: npm run build
3. Run: npx cap add android (and/or npx cap add ios on macOS)
4. Run: npx cap sync
5. Run: npx cap open android (opens Android Studio)
6. In Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)

## Support
If you encounter any issues, please contact support.

Generated on: {platform.platform()}
"""
        
        with open(dist_folder / "README.md", "w") as f:
            f.write(readme_content)
        
        # Create batch file for Windows users
        if self.system == 'windows':
            batch_content = """@echo off
echo Installing BZKings Etsy Boost Mobile App...
python install.py
pause
"""
            with open(dist_folder / "install.bat", "w") as f:
                f.write(batch_content)
        
        print(f"✅ Distribution package created in: {dist_folder.absolute()}")
        return True
    
    def run_installation(self):
        """Run the complete installation process"""
        print(f"🚀 Starting {self.app_name} Mobile App Installation")
        print("=" * 60)
        
        if not self.check_requirements():
            return False
        
        if not self.install_dependencies():
            return False
        
        if not self.build_app():
            return False
        
        if not self.setup_capacitor():
            return False
        
        # Create APK for Android
        self.create_apk()
        
        # Create iOS app if on macOS
        if self.system == 'darwin':
            self.create_ios_app()
        
        # Create distribution package
        self.create_distribution_package()
        
        print("\n🎉 Installation process completed!")
        print("📱 Your mobile app is ready to be built and distributed!")
        
        return True

def main():
    installer = MobileAppInstaller()
    try:
        installer.run_installation()
    except KeyboardInterrupt:
        print("\n❌ Installation cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Installation failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
