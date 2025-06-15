
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search, Star, ArrowLeft, Zap, Crown, Smartphone, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AppHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: number}>({});

  const freeSEOApps = [
    {
      id: "keyword-finder",
      name: "Keyword Finder Pro",
      description: "Discover high-ranking keywords for your content",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "25K+",
      size: "15.2 MB",
      category: "SEO"
    },
    {
      id: "backlink-checker",
      name: "Backlink Analyzer",
      description: "Analyze your website's backlink profile",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "18K+",
      size: "12.8 MB",
      category: "SEO"
    },
    {
      id: "rank-tracker",
      name: "Rank Tracker Free",
      description: "Track your website rankings in real-time",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "22K+",
      size: "18.5 MB",
      category: "SEO"
    },
    {
      id: "meta-optimizer",
      name: "Meta Tag Optimizer",
      description: "Optimize your meta tags for better SEO",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
      rating: 4.5,
      downloads: "16K+",
      size: "8.3 MB",
      category: "SEO"
    },
    {
      id: "sitemap-generator",
      name: "XML Sitemap Creator",
      description: "Generate XML sitemaps for search engines",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "30K+",
      size: "6.7 MB",
      category: "SEO"
    },
    {
      id: "page-speed",
      name: "Page Speed Tester",
      description: "Test and optimize your website speed",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.4,
      downloads: "14K+",
      size: "11.2 MB",
      category: "SEO"
    },
    {
      id: "schema-markup",
      name: "Schema Markup Tool",
      description: "Add structured data to your website",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "12K+",
      size: "9.8 MB",
      category: "SEO"
    },
    {
      id: "local-seo",
      name: "Local SEO Helper",
      description: "Optimize for local search results",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "19K+",
      size: "13.5 MB",
      category: "SEO"
    },
    {
      id: "content-analyzer",
      name: "Content SEO Analyzer",
      description: "Analyze content for SEO optimization",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "21K+",
      size: "16.3 MB",
      category: "SEO"
    },
    {
      id: "robots-txt",
      name: "Robots.txt Generator",
      description: "Create and validate robots.txt files",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      rating: 4.3,
      downloads: "9K+",
      size: "5.2 MB",
      category: "SEO"
    }
  ];

  const paidSEOApps = [
    {
      id: "seo-suite-pro",
      name: "SEO Suite Professional",
      description: "Complete SEO analysis and optimization suite",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "8.5K+",
      price: "$49.99",
      size: "85.3 MB",
      category: "SEO Pro"
    },
    {
      id: "competitor-spy",
      name: "Competitor SEO Spy",
      description: "Advanced competitor analysis and tracking",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "6.2K+",
      price: "$39.99",
      size: "72.1 MB",
      category: "SEO Pro"
    },
    {
      id: "enterprise-rank",
      name: "Enterprise Rank Tracker",
      description: "Professional ranking monitoring for agencies",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "4.8K+",
      price: "$79.99",
      size: "95.7 MB",
      category: "SEO Pro"
    },
    {
      id: "link-builder-pro",
      name: "Link Builder Professional",
      description: "Advanced link building and outreach platform",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "5.3K+",
      price: "$59.99",
      size: "68.4 MB",
      category: "SEO Pro"
    },
    {
      id: "technical-seo",
      name: "Technical SEO Auditor",
      description: "Comprehensive technical SEO analysis tool",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "7.1K+",
      price: "$69.99",
      size: "78.9 MB",
      category: "SEO Pro"
    },
    {
      id: "content-optimizer-pro",
      name: "AI Content Optimizer Pro",
      description: "AI-powered content optimization platform",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "9.2K+",
      price: "$89.99",
      size: "102.5 MB",
      category: "SEO Pro"
    },
    {
      id: "local-seo-pro",
      name: "Local SEO Management Suite",
      description: "Complete local SEO management platform",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "3.9K+",
      price: "$45.99",
      size: "56.8 MB",
      category: "SEO Pro"
    },
    {
      id: "seo-reporting",
      name: "SEO Reporting Dashboard",
      description: "Professional SEO reporting and analytics",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "6.7K+",
      price: "$54.99",
      size: "64.2 MB",
      category: "SEO Pro"
    },
    {
      id: "keyword-research-pro",
      name: "Advanced Keyword Research",
      description: "Professional keyword research and analysis",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "8.8K+",
      price: "$42.99",
      size: "58.7 MB",
      category: "SEO Pro"
    },
    {
      id: "seo-automation",
      name: "SEO Automation Suite",
      description: "Automate your SEO workflows and tasks",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "5.5K+",
      price: "$99.99",
      size: "118.3 MB",
      category: "SEO Pro"
    }
  ];

  const mobileApps = [
    {
      id: "mobile-seo-scanner",
      name: "Mobile SEO Scanner",
      description: "Scan and optimize mobile SEO on-the-go",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: "15K+",
      price: "$19.99",
      size: "45.2 MB",
      category: "Mobile"
    },
    {
      id: "rank-tracker-mobile",
      name: "Rank Tracker Mobile",
      description: "Track rankings from your mobile device",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "12K+",
      price: "$24.99",
      size: "38.7 MB",
      category: "Mobile"
    },
    {
      id: "keyword-mobile-app",
      name: "Keyword Research Mobile",
      description: "Research keywords anywhere, anytime",
      image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: "18K+",
      price: "$16.99",
      size: "32.4 MB",
      category: "Mobile"
    },
    {
      id: "seo-dashboard-mobile",
      name: "SEO Dashboard Mobile",
      description: "Monitor SEO metrics on your phone",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: "22K+",
      price: "$29.99",
      size: "52.1 MB",
      category: "Mobile"
    },
    {
      id: "site-audit-mobile",
      name: "Site Audit Mobile Pro",
      description: "Comprehensive site audits on mobile",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: "9K+",
      price: "$34.99",
      size: "67.8 MB",
      category: "Mobile"
    }
  ];

  const simulateDownload = async (appId: string, appName: string, category: string) => {
    setDownloadProgress(prev => ({ ...prev, [appId]: 0 }));
    
    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDownloadProgress(prev => ({ ...prev, [appId]: i }));
    }

    // Create comprehensive zip content based on app type
    let zipContent = `# ${appName} Installation Package\n\n`;
    
    if (category === "Mobile") {
      zipContent += `## Mobile App Installation\n\n### Android Installation:\n1. Enable "Unknown Sources" in Settings > Security\n2. Install ${appName}.apk\n3. Grant necessary permissions\n\n### iOS Installation:\n1. Install ${appName}.ipa using AltStore or similar\n2. Trust the developer in Settings > General > Device Management\n\n### Features:\n- Mobile-optimized interface\n- Offline functionality\n- Push notifications\n- Cloud sync capabilities\n\n`;
    } else {
      zipContent += `## Desktop Installation Instructions\n\n### Windows:\n1. Extract ZIP file\n2. Run ${appName}_Setup.exe\n3. Follow installation wizard\n\n### macOS:\n1. Extract ZIP file\n2. Drag ${appName}.app to Applications folder\n3. Allow app in Security & Privacy settings\n\n### Linux:\n1. Extract ZIP file\n2. Make ${appName}.AppImage executable\n3. Run the AppImage file\n\n`;
    }
    
    zipContent += `## System Requirements\n- RAM: 4GB minimum, 8GB recommended\n- Storage: 2GB free space\n- Internet connection for activation\n\n## License Information\nThis software is licensed for personal/commercial use.\nLicense key will be provided after purchase.\n\n## Support\n- Email: support@bzkingsdigitalmall.com\n- Website: https://bzkingsdigitalmall.etsy.com\n- Documentation: Included in /docs folder\n\n## Files Included:\n- Installation files for all platforms\n- User manual (PDF)\n- Quick start guide\n- Sample projects/templates\n- License agreement\n\n## Version: 1.0.0\nBuild Date: ${new Date().toLocaleDateString()}\n\nThank you for choosing ${appName}!`;
    
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

  const filteredFreeSEOApps = freeSEOApps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPaidSEOApps = paidSEOApps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMobileApps = mobileApps.filter(app => 
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
            <p className="text-gray-600 mt-2">Professional SEO & Mobile Apps - Download & Install on Any Device</p>
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

        <Tabs defaultValue="free-seo" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="free-seo" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Free SEO Apps ({filteredFreeSEOApps.length})
            </TabsTrigger>
            <TabsTrigger value="paid-seo" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Pro SEO Apps ({filteredPaidSEOApps.length})
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile Apps ({filteredMobileApps.length})
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Pricing Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="free-seo">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFreeSEOApps.map((app) => (
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
                        onClick={() => simulateDownload(app.id, app.name, app.category)}
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

          <TabsContent value="paid-seo">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaidSEOApps.map((app) => (
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
                        onClick={() => simulateDownload(app.id, app.name, app.category)}
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

          <TabsContent value="mobile">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMobileApps.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-all duration-300 border-2 border-blue-100">
                  <CardHeader className="p-4">
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <CardTitle className="flex items-center justify-between">
                      {app.name}
                      <Badge className="bg-blue-100 text-blue-700">{app.price}</Badge>
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
                        onClick={() => simulateDownload(app.id, app.name, app.category)}
                        className="w-full gradient-primary text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Mobile App
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pricing">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-center">Free Plan</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">$0</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Access to all 10 free SEO apps</li>
                    <li>• Basic keyword research</li>
                    <li>• Standard support</li>
                    <li>• Download up to 3 apps/month</li>
                    <li>• Basic analytics</li>
                  </ul>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Get Started Free
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-center">Starter Plan</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Everything in Free Plan</li>
                    <li>• Access to 5 premium SEO apps</li>
                    <li>• Advanced keyword research</li>
                    <li>• Priority support</li>
                    <li>• Unlimited downloads</li>
                    <li>• Advanced analytics</li>
                  </ul>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Choose Starter
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Most Popular
                </Badge>
                <CardHeader>
                  <CardTitle className="text-center">Professional</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">$79</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Everything in Starter Plan</li>
                    <li>• Access to all premium SEO apps</li>
                    <li>• All 5 mobile apps included</li>
                    <li>• White-label options</li>
                    <li>• API access</li>
                    <li>• Custom integrations</li>
                  </ul>
                  <Button className="w-full mt-4 gradient-primary text-white">
                    Choose Professional
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200">
                <CardHeader>
                  <CardTitle className="text-center">Enterprise</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">$199</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Everything in Professional</li>
                    <li>• Custom app development</li>
                    <li>• Dedicated account manager</li>
                    <li>• 24/7 premium support</li>
                    <li>• Custom training sessions</li>
                    <li>• Enterprise-grade security</li>
                  </ul>
                  <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppHub;
