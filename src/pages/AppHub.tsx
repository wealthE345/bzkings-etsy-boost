
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, Star, ArrowLeft, Zap, Crown } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AppHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: number}>({});

  const freeApps = [
    {
      id: "ai-writer",
      name: "AI Content Writer",
      description: "Generate high-quality content with AI",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "15K+",
      size: "12.5 MB",
      category: "Writing"
    },
    {
      id: "voice-ai",
      name: "Voice AI Assistant",
      description: "Smart voice-powered AI assistant",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "8.2K+",
      size: "18.7 MB",
      category: "Productivity"
    },
    {
      id: "image-gen",
      name: "AI Image Generator",
      description: "Create stunning images with AI",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "22K+",
      size: "25.3 MB",
      category: "Design"
    }
  ];

  const paidApps = [
    {
      id: "ai-studio-pro",
      name: "AI Studio Pro",
      description: "Professional AI suite for businesses",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "5.8K+",
      price: "$29.99",
      size: "45.2 MB",
      category: "Business"
    },
    {
      id: "ai-analytics",
      name: "AI Analytics Dashboard",
      description: "Advanced AI-powered analytics platform",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "3.1K+",
      price: "$49.99",
      size: "38.9 MB",
      category: "Analytics"
    },
    {
      id: "ai-automation",
      name: "AI Automation Suite",
      description: "Complete automation solution powered by AI",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "7.3K+",
      price: "$79.99",
      size: "52.1 MB",
      category: "Automation"
    }
  ];

  const simulateDownload = async (appId: string, appName: string) => {
    setDownloadProgress(prev => ({ ...prev, [appId]: 0 }));
    
    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDownloadProgress(prev => ({ ...prev, [appId]: i }));
    }

    // Create and download zip file
    const zipContent = `# ${appName} Installation Package\n\n## Installation Instructions\n1. Extract this ZIP file\n2. Run setup.exe (Windows) or install.app (Mac)\n3. Follow the installation wizard\n\n## System Requirements\n- Windows 10+ or macOS 10.15+\n- 4GB RAM minimum\n- 1GB free disk space\n\n## License\nBy installing this software, you agree to our terms of service.\n\n## Support\nVisit https://bzkingsdigitalmall.etsy.com for support`;
    
    const blob = new Blob([zipContent], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${appName.replace(/\s+/g, '_')}_v1.0.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadProgress(prev => ({ ...prev, [appId]: undefined }));
    toast.success(`${appName} downloaded successfully!`);
  };

  const filteredFreeApps = freeApps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPaidApps = paidApps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-amber-600 bg-clip-text text-transparent">
              AI App Hub
            </h1>
            <p className="text-gray-600 mt-2">Discover and download AI-powered applications</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="free" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="free" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Free Apps ({filteredFreeApps.length})
            </TabsTrigger>
            <TabsTrigger value="paid" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Premium Apps ({filteredPaidApps.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="free">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFreeApps.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-all duration-300 border-2 border-green-100">
                  <CardHeader className="p-4">
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <CardTitle className="flex items-center justify-between">
                      {app.name}
                      <Badge variant="outline" className="bg-green-50 text-green-600">FREE</Badge>
                    </CardTitle>
                    <CardDescription>{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {app.rating}
                      </div>
                      <span>{app.downloads}</span>
                      <span>{app.size}</span>
                    </div>
                    {downloadProgress[app.id] !== undefined ? (
                      <div className="space-y-2">
                        <Progress value={downloadProgress[app.id]} className="h-2" />
                        <p className="text-sm text-center">Downloading... {downloadProgress[app.id]}%</p>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => simulateDownload(app.id, app.name)}
                        className="w-full gradient-primary text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Free
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaidApps.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-all duration-300 border-2 border-purple-100">
                  <CardHeader className="p-4">
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <CardTitle className="flex items-center justify-between">
                      {app.name}
                      <Badge className="bg-purple-100 text-purple-700">{app.price}</Badge>
                    </CardTitle>
                    <CardDescription>{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {app.rating}
                      </div>
                      <span>{app.downloads}</span>
                      <span>{app.size}</span>
                    </div>
                    {downloadProgress[app.id] !== undefined ? (
                      <div className="space-y-2">
                        <Progress value={downloadProgress[app.id]} className="h-2" />
                        <p className="text-sm text-center">Downloading... {downloadProgress[app.id]}%</p>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => simulateDownload(app.id, app.name)}
                        className="w-full gradient-primary text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Purchase & Download
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppHub;
