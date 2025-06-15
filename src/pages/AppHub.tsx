import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, File, Code, Package, Plus, X, Search, Smartphone } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Banner from "@/components/Banner";

interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  platform: string;
  price: string;
  features: string[];
  icon: string;
}

const initialApps: App[] = [
  {
    id: "1",
    name: "Keyword Research Tool",
    description: "Find the best keywords for your Etsy listings",
    category: "SEO",
    platform: "Web",
    price: "Free",
    features: ["Keyword analysis", "Competition tracking", "Trend analysis"],
    icon: "/icons/keyword-research.png",
  },
  {
    id: "2",
    name: "Listing Optimization Tool",
    description: "Optimize your Etsy listings for better search rankings",
    category: "SEO",
    platform: "Web",
    price: "$9.99/month",
    features: ["Title optimization", "Description optimization", "Tag optimization"],
    icon: "/icons/listing-optimization.png",
  },
  {
    id: "3",
    name: "Traffic Analysis Tool",
    description: "Track your Etsy shop traffic and identify areas for improvement",
    category: "Analytics",
    platform: "Web",
    price: "$4.99/month",
    features: ["Traffic tracking", "Sales tracking", "Customer behavior analysis"],
    icon: "/icons/traffic-analysis.png",
  },
  {
    id: "4",
    name: "Mobile SEO Analyzer",
    description: "Analyze your mobile SEO performance and get actionable insights",
    category: "SEO",
    platform: "Mobile",
    price: "Free",
    features: ["Mobile keyword analysis", "Mobile ranking tracking", "Mobile SEO audit"],
    icon: "/icons/mobile-seo.png",
  },
  {
    id: "5",
    name: "Social Media Manager",
    description: "Manage your social media accounts and schedule posts",
    category: "Marketing",
    platform: "Web",
    price: "$19.99/month",
    features: ["Social media scheduling", "Social media analytics", "Social media automation"],
    icon: "/icons/social-media.png",
  },
  {
    id: "6",
    name: "Customer Relationship Manager",
    description: "Manage your customer relationships and track customer interactions",
    category: "CRM",
    platform: "Web",
    price: "$29.99/month",
    features: ["Customer tracking", "Customer communication", "Customer segmentation"],
    icon: "/icons/crm.png",
  },
  {
    id: "7",
    name: "Etsy Sales Tracker",
    description: "Track your Etsy sales and identify your best-selling products",
    category: "Analytics",
    platform: "Mobile",
    price: "Free",
    features: ["Sales tracking", "Product tracking", "Revenue tracking"],
    icon: "/icons/sales-tracker.png",
  },
  {
    id: "8",
    name: "Etsy Keyword Finder",
    description: "Find the best keywords for your Etsy shop",
    category: "SEO",
    platform: "Mobile",
    price: "$4.99/month",
    features: ["Keyword research", "Keyword analysis", "Keyword tracking"],
    icon: "/icons/keyword-finder.png",
  },
  {
    id: "9",
    name: "Etsy Listing Editor",
    description: "Edit your Etsy listings on the go",
    category: "SEO",
    platform: "Mobile",
    price: "$9.99/month",
    features: ["Listing editing", "Listing optimization", "Listing management"],
    icon: "/icons/listing-editor.png",
  },
  {
    id: "10",
    name: "Etsy Shop Manager",
    description: "Manage your Etsy shop from your phone",
    category: "Management",
    platform: "Mobile",
    price: "$14.99/month",
    features: ["Shop management", "Order management", "Customer management"],
    icon: "/icons/shop-manager.png",
  },
];

const AppHub = () => {
  const [apps, setApps] = useState(initialApps);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [newApp, setNewApp] = useState<Omit<App, "id" | "icon">>({
    name: "",
    description: "",
    category: "SEO",
    platform: "Web",
    price: "Free",
    features: [],
  });
  const [isAddingApp, setIsAddingApp] = useState(false);

  const filteredApps = apps.filter((app) => {
    const searchMatch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = categoryFilter === "All" || app.category === categoryFilter;
    const platformMatch = platformFilter === "All" || app.platform === platformFilter;
    return searchMatch && categoryMatch && platformMatch;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setNewApp({ ...newApp, [field]: e.target.value });
  };

  const handleSelectChange = (value: string, field: string) => {
    setNewApp({ ...newApp, [field]: value });
  };

  const handleAddFeature = () => {
    setNewApp({ ...newApp, features: [...newApp.features, ""] });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newApp.features];
    updatedFeatures[index] = value;
    setNewApp({ ...newApp, features: updatedFeatures });
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...newApp.features];
    updatedFeatures.splice(index, 1);
    setNewApp({ ...newApp, features: updatedFeatures });
  };

  const addApp = () => {
    if (!newApp.name || !newApp.description) {
      toast.error("Please enter both name and description");
      return;
    }

    const newAppWithId: App = {
      id: Date.now().toString(),
      icon: "/icons/default-app.png",
      ...newApp,
    };

    setApps([...apps, newAppWithId]);
    setNewApp({
      name: "",
      description: "",
      category: "SEO",
      platform: "Web",
      price: "Free",
      features: [],
    });
    setIsAddingApp(false);
    toast.success("App added successfully!");
  };

  const downloadApp = (app: App) => {
    // Enhanced download with cross-platform support
    const createDownloadFile = (platform: string) => {
      let fileContent = '';
      let fileName = '';
      let mimeType = '';

      switch (platform) {
        case 'windows':
          fileContent = `
@echo off
echo Installing ${app.name} for Windows...
echo.
echo Creating application directory...
mkdir "%USERPROFILE%\\Desktop\\${app.name.replace(/\s+/g, '')}"
cd "%USERPROFILE%\\Desktop\\${app.name.replace(/\s+/g, '')}"

echo Creating executable files...
echo @echo off > "${app.name.replace(/\s+/g, '')}.bat"
echo echo Welcome to ${app.name}! >> "${app.name.replace(/\s+/g, '')}.bat"
echo echo. >> "${app.name.replace(/\s+/g, '')}.bat"
echo echo Features: ${app.features.join(', ')} >> "${app.name.replace(/\s+/g, '')}.bat"
echo echo. >> "${app.name.replace(/\s+/g, '')}.bat"
echo echo App is running successfully! >> "${app.name.replace(/\s+/g, '')}.bat"
echo pause >> "${app.name.replace(/\s+/g, '')}.bat"

echo Creating configuration file...
echo [CONFIG] > config.ini
echo AppName=${app.name} >> config.ini
echo Version=1.0.0 >> config.ini
echo Platform=Windows >> config.ini
echo Features=${app.features.join(',')} >> config.ini

echo.
echo Installation completed successfully!
echo Double-click ${app.name.replace(/\s+/g, '')}.bat to run the application.
pause
`;
          fileName = `${app.name.replace(/\s+/g, '')}-Windows-Installer.bat`;
          mimeType = 'text/plain';
          break;

        case 'macos':
          fileContent = `#!/bin/bash
echo "Installing ${app.name} for macOS..."
echo
echo "Creating application bundle..."
mkdir -p ~/Desktop/${app.name.replace(/\s+/g, '')}.app/Contents/{MacOS,Resources}

echo "Creating executable..."
cat > ~/Desktop/${app.name.replace(/\s+/g, '')}.app/Contents/MacOS/${app.name.replace(/\s+/g, '')} << 'EOF'
#!/bin/bash
echo "Welcome to ${app.name}!"
echo
echo "Features: ${app.features.join(', ')}"
echo
echo "App is running successfully!"
read -p "Press enter to continue..."
EOF

chmod +x ~/Desktop/${app.name.replace(/\s+/g, '')}.app/Contents/MacOS/${app.name.replace(/\s+/g, '')}

echo "Creating Info.plist..."
cat > ~/Desktop/${app.name.replace(/\s+/g, '')}.app/Contents/Info.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>${app.name.replace(/\s+/g, '')}</string>
    <key>CFBundleIdentifier</key>
    <string>com.bzkings.${app.name.replace(/\s+/g, '').toLowerCase()}</string>
    <key>CFBundleName</key>
    <string>${app.name}</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
</dict>
</plist>
EOF

echo
echo "Installation completed successfully!"
echo "Application created at ~/Desktop/${app.name.replace(/\s+/g, '')}.app"
`;
          fileName = `${app.name.replace(/\s+/g, '')}-macOS-Installer.sh`;
          mimeType = 'text/plain';
          break;

        case 'linux':
          fileContent = `#!/bin/bash
echo "Installing ${app.name} for Linux..."
echo
echo "Creating application directory..."
mkdir -p ~/Desktop/${app.name.replace(/\s+/g, '')}
cd ~/Desktop/${app.name.replace(/\s+/g, '')}

echo "Creating executable script..."
cat > ${app.name.replace(/\s+/g, '')}.sh << 'EOF'
#!/bin/bash
echo "Welcome to ${app.name}!"
echo
echo "Features: ${app.features.join(', ')}"
echo
echo "App is running successfully!"
read -p "Press enter to continue..."
EOF

chmod +x ${app.name.replace(/\s+/g, '')}.sh

echo "Creating desktop entry..."
cat > ${app.name.replace(/\s+/g, '')}.desktop << 'EOF'
[Desktop Entry]
Version=1.0
Type=Application
Name=${app.name}
Exec=$HOME/Desktop/${app.name.replace(/\s+/g, '')}/${app.name.replace(/\s+/g, '')}.sh
Icon=utilities-terminal
Terminal=true
Categories=Utility;
EOF

echo
echo "Installation completed successfully!"
echo "Run ./${app.name.replace(/\s+/g, '')}.sh to start the application"
`;
          fileName = `${app.name.replace(/\s+/g, '')}-Linux-Installer.sh`;
          mimeType = 'text/plain';
          break;

        case 'android':
          fileContent = `
# ${app.name} Android Installation Package
# This is a simulation of an Android APK package

## Installation Instructions:
1. Enable "Install from Unknown Sources" in your Android settings
2. Download and install this package
3. Open the app from your app drawer

## App Information:
- Name: ${app.name}
- Version: 1.0.0
- Platform: Android
- Features: ${app.features.join(', ')}
- Package: com.bzkings.${app.name.replace(/\s+/g, '').toLowerCase()}

## Configuration:
[app_config]
name=${app.name}
version=1.0.0
platform=android
features=${app.features.join(',')}

## Manifest:
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bzkings.${app.name.replace(/\s+/g, '').toLowerCase()}">
    
    <application
        android:label="${app.name}"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`;
          fileName = `${app.name.replace(/\s+/g, '')}-Android.apk.txt`;
          mimeType = 'text/plain';
          break;

        case 'ios':
          fileContent = `
# ${app.name} iOS Installation Package
# This is a simulation of an iOS IPA package

## Installation Instructions:
1. Install via Xcode or iOS Simulator
2. For device installation, use Apple Configurator or similar tools
3. Open the app from your home screen

## App Information:
- Name: ${app.name}
- Version: 1.0.0
- Platform: iOS
- Features: ${app.features.join(', ')}
- Bundle ID: com.bzkings.${app.name.replace(/\s+/g, '').toLowerCase()}

## Info.plist:
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDisplayName</key>
    <string>${app.name}</string>
    <key>CFBundleIdentifier</key>
    <string>com.bzkings.${app.name.replace(/\s+/g, '').toLowerCase()}</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>UIDeviceFamily</key>
    <array>
        <integer>1</integer>
        <integer>2</integer>
    </array>
</dict>
</plist>

## Features Configuration:
[features]
${app.features.map(feature => `${feature}=enabled`).join('\n')}
`;
          fileName = `${app.name.replace(/\s+/g, '')}-iOS.ipa.txt`;
          mimeType = 'text/plain';
          break;
      }

      return { fileContent, fileName, mimeType };
    };

    // Create ZIP file with all platform versions
    const createZipDownload = () => {
      const JSZip = window.JSZip || require('jszip');
      const zip = new JSZip();

      // Add installation guide
      zip.file('README.txt', `
${app.name} - Universal Installation Package
==========================================

This package contains installation files for multiple platforms:

WINDOWS:
- Run ${app.name.replace(/\s+/g, '')}-Windows-Installer.bat as Administrator
- Follow the on-screen instructions

MACOS:
- Open Terminal and run: chmod +x ${app.name.replace(/\s+/g, '')}-macOS-Installer.sh
- Then run: ./${app.name.replace(/\s+/g, '')}-macOS-Installer.sh

LINUX:
- Open Terminal and run: chmod +x ${app.name.replace(/\s+/g, '')}-Linux-Installer.sh
- Then run: ./${app.name.replace(/\s+/g, '')}-Linux-Installer.sh

ANDROID:
- Enable "Install from Unknown Sources" in Settings
- Install the APK file

IOS:
- Use Xcode or Apple Configurator for installation

Features included:
${app.features.map(feature => `- ${feature}`).join('\n')}

Support: wealthenterprise69@gmail.com
Website: https://bzkingsdigitalmall.etsy.com
`);

      // Add platform-specific files
      const platforms = ['windows', 'macos', 'linux', 'android', 'ios'];
      platforms.forEach(platform => {
        const { fileContent, fileName } = createDownloadFile(platform);
        zip.file(fileName, fileContent);
      });

      // Generate and download ZIP
      zip.generateAsync({ type: 'blob' }).then(function(content) {
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${app.name.replace(/\s+/g, '')}-Universal-Package.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    };

    // Fallback for browsers without JSZip
    if (typeof window !== 'undefined' && !window.JSZip) {
      // Create simple download
      const { fileContent, fileName, mimeType } = createDownloadFile('windows');
      const blob = new Blob([fileContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      createZipDownload();
    }

    toast.success(`✅ ${app.name} downloaded successfully! Universal package for all devices.`);
  };

  return (
    <div className="min-h-screen animated-bg">
      <Banner />
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-purple-700 border-purple-300 glass-effect">
            🚀 AI App Hub - Free & Premium SEO Tools
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            Explore Our Powerful AI-Driven Apps
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            Download our free and premium apps to boost your Etsy shop's SEO, traffic, and sales.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Input
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-effect border-white/20 text-white placeholder:text-white/50"
          />
          <Select onValueChange={(value) => setCategoryFilter(value)}>
            <SelectTrigger className="glass-effect w-full border-white/20 text-white">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="glass-effect bg-black/80 backdrop-blur-sm border-white/20 text-white">
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="SEO">SEO</SelectItem>
              <SelectItem value="Analytics">Analytics</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="CRM">CRM</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setPlatformFilter(value)}>
            <SelectTrigger className="glass-effect w-full border-white/20 text-white">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent className="glass-effect bg-black/80 backdrop-blur-sm border-white/20 text-white">
              <SelectItem value="All">All Platforms</SelectItem>
              <SelectItem value="Web">Web</SelectItem>
              <SelectItem value="Mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <Card key={app.id} className="glass-effect border-white/20">
              <CardHeader>
                <img src={app.icon} alt={app.name} className="w-12 h-12 mx-auto mb-4 rounded-lg" />
                <CardTitle className="text-white">{app.name}</CardTitle>
                <CardDescription className="text-white/70">{app.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-white/70">
                  Category: <Badge variant="secondary">{app.category}</Badge>
                </p>
                <p className="text-sm text-white/70">Platform: {app.platform}</p>
                <p className="text-sm text-white/70">Price: {app.price}</p>
                <ul className="list-disc pl-4 text-sm text-white/70">
                  {app.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Button className="w-full gradient-primary text-white" onClick={() => downloadApp(app)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add App Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">
            {isAddingApp ? "Add New App" : "Want to add your app?"}
          </h2>
          {isAddingApp ? (
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white">New App Details</CardTitle>
                <CardDescription className="text-white/70">
                  Fill out the form below to add a new app to the hub
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="App Name"
                    value={newApp.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    className="glass-effect border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <Input
                    id="description"
                    placeholder="App Description"
                    value={newApp.description}
                    onChange={(e) => handleInputChange(e, "description")}
                    className="glass-effect border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-white">
                    Category
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange(value, "category")}>
                    <SelectTrigger className="glass-effect w-full border-white/20 text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="glass-effect bg-black/80 backdrop-blur-sm border-white/20 text-white">
                      <SelectItem value="SEO">SEO</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="CRM">CRM</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="platform" className="text-white">
                    Platform
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange(value, "platform")}>
                    <SelectTrigger className="glass-effect w-full border-white/20 text-white">
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent className="glass-effect bg-black/80 backdrop-blur-sm border-white/20 text-white">
                      <SelectItem value="Web">Web</SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price" className="text-white">
                    Price
                  </Label>
                  <Input
                    id="price"
                    placeholder="Price"
                    value={newApp.price}
                    onChange={(e) => handleInputChange(e, "price")}
                    className="glass-effect border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <Label className="text-white">Features</Label>
                  {newApp.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        type="text"
                        placeholder={`Feature ${index + 1}`}
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="glass-effect border-white/20 text-white placeholder:text-white/50"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-500 hover:bg-red-500/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="secondary" size="sm" onClick={handleAddFeature}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature
                  </Button>
                </div>
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setIsAddingApp(false)}>
                    Cancel
                  </Button>
                  <Button className="gradient-primary text-white" onClick={addApp}>
                    Add App
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button className="gradient-primary text-white" onClick={() => setIsAddingApp(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your App
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppHub;
