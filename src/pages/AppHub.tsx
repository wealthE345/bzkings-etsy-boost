
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Star, Users, TrendingUp, Smartphone, Globe, Zap, Camera, Edit3, Share2, Shield, Search, Mail, Link2, BarChart3, Target, MessageSquare, Calendar, FileText, Image, Video, Music, Headphones, Monitor, Palette, Code, Database, Lock, Wifi, Cloud, Settings, Brain, Cpu, Bot, Workflow, Lightbulb, Eye, Mic, Layers, Filter, Scissors, PenTool, Folder, Hash, Type, MapPin, Phone, Gift, ShoppingCart, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import JSZip from 'jszip';

const AppHub = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFreeAppDownload = (appName: string) => {
    if (!user) {
      toast.info("Please sign up to download free apps!");
      navigate("/signup");
      return;
    }
    
    toast.success(`${appName} downloaded successfully!`);
  };

  const handlePaidAppDownload = (appName: string) => {
    toast.info(`Redirecting to purchase ${appName}...`);
    navigate("/payment");
  };

  const downloadAppsAsZip = async (apps: any[], sectionName: string) => {
    if (!user) {
      toast.info("Please sign up to download apps!");
      navigate("/signup");
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder(sectionName);

    // Create a README file for the section
    const readmeContent = `${sectionName} Apps Collection\n\nThis package contains ${apps.length} AI-powered applications:\n\n${apps.map(app => `- ${app.name}: ${app.description}`).join('\n')}`;
    folder?.file("README.txt", readmeContent);

    // Create individual app info files
    apps.forEach((app, index) => {
      const appInfo = `App Name: ${app.name}\nDescription: ${app.description}\nRating: ${app.rating} (${app.reviews} reviews)\n${app.price ? `Price: ${app.price}` : 'Type: Free'}\n\nInstallation Instructions:\n1. Extract this file\n2. Follow the setup guide\n3. Launch the application`;
      folder?.file(`${app.name.replace(/[^a-zA-Z0-9]/g, '_')}_info.txt`, appInfo);
    });

    try {
      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${sectionName.replace(/\s+/g, '_')}_Apps.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(`${sectionName} apps downloaded as ZIP file!`);
    } catch (error) {
      toast.error("Failed to create ZIP file");
    }
  };

  const generateSocialMediaPosts = async () => {
    setIsGenerating(true);
    
    const samplePosts = [
      {
        id: 1,
        platform: "Instagram",
        content: "🌟 Boost your Etsy sales with our traffic booster! Get more eyes on your products today. #EtsySeller #TrafficBoost #OnlineBusiness",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
        engagement: "2.5K likes • 340 comments"
      },
      {
        id: 2,
        platform: "Facebook",
        content: "💡 Ready to take your online store to the next level? Our AI-powered tools help you reach more customers and increase sales organically!",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
        engagement: "1.8K reactions • 125 shares"
      },
      {
        id: 3,
        platform: "Twitter",
        content: "🚀 Just launched a new campaign and already seeing 300% more traffic! The organic reach is incredible. #DigitalMarketing #Growth",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
        engagement: "892 retweets • 2.1K likes"
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedPosts(samplePosts);
    setIsGenerating(false);
    toast.success("Social media posts generated successfully!");
  };

  const launchOrganicCampaign = () => {
    navigate("/payment");
    toast.info("Redirecting to payment to start your organic campaign...");
  };

  // AI Productivity Apps Section (20 apps)
  const productivityApps = [
    { name: "AI Writing Assistant", icon: Edit3, description: "Advanced AI-powered writing and editing tool", rating: 4.9, reviews: "3.2k", price: "$19.99" },
    { name: "Smart Task Manager", icon: Calendar, description: "AI-driven task prioritization and scheduling", rating: 4.8, reviews: "2.1k" },
    { name: "Voice Transcriber Pro", icon: Mic, description: "Real-time speech-to-text with AI enhancement", rating: 4.7, reviews: "1.8k", price: "$24.99" },
    { name: "AI Email Composer", icon: Mail, description: "Generate professional emails with AI", rating: 4.8, reviews: "2.5k" },
    { name: "Smart Notes Organizer", icon: FileText, description: "AI-powered note organization and search", rating: 4.6, reviews: "1.9k" },
    { name: "AI Code Generator", icon: Code, description: "Generate code snippets with AI assistance", rating: 4.9, reviews: "3.5k", price: "$39.99" },
    { name: "Meeting Summarizer", icon: Users, description: "AI-generated meeting summaries and action items", rating: 4.7, reviews: "2.2k", price: "$29.99" },
    { name: "Smart Calendar AI", icon: Calendar, description: "Intelligent scheduling and time management", rating: 4.5, reviews: "1.7k" },
    { name: "AI Document Scanner", icon: Smartphone, description: "Scan and digitize documents with AI enhancement", rating: 4.6, reviews: "2.8k" },
    { name: "Content Idea Generator", icon: Lightbulb, description: "AI-powered content brainstorming tool", rating: 4.8, reviews: "2.4k" },
    { name: "AI Password Manager", icon: Lock, description: "Secure password generation and management", rating: 4.7, reviews: "3.1k", price: "$14.99" },
    { name: "Smart Bookmark AI", icon: Link2, description: "AI-organized bookmark management system", rating: 4.5, reviews: "1.5k" },
    { name: "AI Expense Tracker", icon: CreditCard, description: "Automated expense categorization and tracking", rating: 4.6, reviews: "2.0k" },
    { name: "Research Assistant AI", icon: Search, description: "AI-powered research and fact-checking tool", rating: 4.8, reviews: "2.7k", price: "$34.99" },
    { name: "Smart Habit Tracker", icon: Target, description: "AI-driven habit formation and tracking", rating: 4.4, reviews: "1.6k" },
    { name: "AI Language Translator", icon: Globe, description: "Real-time language translation with context", rating: 4.7, reviews: "3.0k", price: "$22.99" },
    { name: "Digital Wellness AI", icon: Monitor, description: "AI-powered digital health monitoring", rating: 4.5, reviews: "1.8k" },
    { name: "AI Backup Manager", icon: Cloud, description: "Intelligent file backup and organization", rating: 4.6, reviews: "2.3k" },
    { name: "Smart Focus Timer", icon: Zap, description: "AI-optimized focus and productivity sessions", rating: 4.7, reviews: "2.1k" },
    { name: "AI Project Planner", icon: Workflow, description: "Intelligent project planning and management", rating: 4.8, reviews: "2.6k", price: "$44.99" }
  ];

  // AI Creative Apps Section (20 apps)
  const creativeApps = [
    { name: "AI Art Generator", icon: Palette, description: "Create stunning artwork with AI algorithms", rating: 4.9, reviews: "4.2k", price: "$29.99" },
    { name: "Smart Photo Editor", icon: Image, description: "AI-enhanced photo editing and enhancement", rating: 4.8, reviews: "3.5k" },
    { name: "AI Music Composer", icon: Music, description: "Generate original music with artificial intelligence", rating: 4.7, reviews: "2.8k", price: "$39.99" },
    { name: "Video AI Studio", icon: Video, description: "AI-powered video editing and creation", rating: 4.8, reviews: "3.1k", price: "$49.99" },
    { name: "Logo Designer AI", icon: Layers, description: "Create professional logos with AI assistance", rating: 4.6, reviews: "2.4k" },
    { name: "AI Color Palette", icon: Palette, description: "Generate harmonious color schemes with AI", rating: 4.5, reviews: "1.9k" },
    { name: "Smart GIF Maker", icon: Video, description: "Create animated GIFs with AI optimization", rating: 4.7, reviews: "2.2k" },
    { name: "AI Typography Tool", icon: Type, description: "Intelligent font pairing and typography design", rating: 4.6, reviews: "1.7k", price: "$24.99" },
    { name: "3D Model Generator", icon: Layers, description: "Create 3D models with AI assistance", rating: 4.8, reviews: "2.9k", price: "$59.99" },
    { name: "AI Sketch Enhancer", icon: PenTool, description: "Transform sketches into detailed artwork", rating: 4.7, reviews: "2.1k", price: "$34.99" },
    { name: "Background Remover AI", icon: Scissors, description: "Remove backgrounds with pixel-perfect precision", rating: 4.9, reviews: "3.8k" },
    { name: "AI Meme Generator", icon: Camera, description: "Create viral memes with AI humor intelligence", rating: 4.5, reviews: "2.6k" },
    { name: "Smart Filter Creator", icon: Filter, description: "Design custom filters with AI technology", rating: 4.6, reviews: "1.8k" },
    { name: "AI Animation Studio", icon: Video, description: "Create animations with intelligent assistance", rating: 4.8, reviews: "2.7k", price: "$44.99" },
    { name: "Voice Changer AI", icon: Headphones, description: "Transform voices with AI vocal effects", rating: 4.4, reviews: "2.0k", price: "$19.99" },
    { name: "AI Mockup Generator", icon: Smartphone, description: "Create product mockups with AI placement", rating: 4.7, reviews: "2.3k" },
    { name: "Story Illustrator AI", icon: FileText, description: "Generate illustrations for stories and content", rating: 4.6, reviews: "1.5k", price: "$32.99" },
    { name: "AI Pattern Maker", icon: Hash, description: "Create seamless patterns with AI generation", rating: 4.5, reviews: "1.6k" },
    { name: "Smart Collage Creator", icon: Image, description: "AI-assisted photo collage composition", rating: 4.7, reviews: "2.4k" },
    { name: "AI Watermark Tool", icon: Shield, description: "Intelligent watermark creation and removal", rating: 4.6, reviews: "1.9k", price: "$16.99" }
  ];

  // AI Business Apps Section (20 apps)
  const businessApps = [
    { name: "AI Sales Predictor", icon: TrendingUp, description: "Predict sales trends with machine learning", rating: 4.9, reviews: "2.1k", price: "$99.99" },
    { name: "Customer Insight AI", icon: Users, description: "Deep customer behavior analysis and insights", rating: 4.8, reviews: "1.8k", price: "$79.99" },
    { name: "AI Chatbot Builder", icon: Bot, description: "Create intelligent chatbots for customer service", rating: 4.7, reviews: "2.5k", price: "$59.99" },
    { name: "Smart Invoice AI", icon: FileText, description: "Automated invoice generation and processing", rating: 4.6, reviews: "1.9k" },
    { name: "AI Lead Generator", icon: Target, description: "Find and qualify leads with AI algorithms", rating: 4.8, reviews: "2.3k", price: "$89.99" },
    { name: "Market Research AI", icon: BarChart3, description: "Comprehensive market analysis with AI insights", rating: 4.7, reviews: "1.7k", price: "$149.99" },
    { name: "AI Inventory Manager", icon: Database, description: "Smart inventory tracking and optimization", rating: 4.5, reviews: "2.0k", price: "$69.99" },
    { name: "Price Optimizer AI", icon: CreditCard, description: "Dynamic pricing strategies with AI", rating: 4.8, reviews: "1.5k", price: "$119.99" },
    { name: "AI HR Assistant", icon: Users, description: "Streamline HR processes with intelligent automation", rating: 4.6, reviews: "1.8k", price: "$94.99" },
    { name: "Business Plan AI", icon: FileText, description: "Generate comprehensive business plans with AI", rating: 4.7, reviews: "1.4k", price: "$49.99" },
    { name: "AI Risk Analyzer", icon: Shield, description: "Identify and assess business risks intelligently", rating: 4.8, reviews: "1.2k", price: "$129.99" },
    { name: "Smart CRM System", icon: Phone, description: "AI-powered customer relationship management", rating: 4.9, reviews: "2.8k", price: "$199.99" },
    { name: "AI Competitor Tracker", icon: Eye, description: "Monitor competitors with intelligent analysis", rating: 4.6, reviews: "1.6k", price: "$74.99" },
    { name: "Financial Forecast AI", icon: TrendingUp, description: "Predict financial outcomes with machine learning", rating: 4.8, reviews: "1.3k", price: "$159.99" },
    { name: "AI Meeting Scheduler", icon: Calendar, description: "Intelligent meeting coordination and optimization", rating: 4.5, reviews: "2.1k" },
    { name: "Supply Chain AI", icon: Workflow, description: "Optimize supply chain with predictive analytics", rating: 4.7, reviews: "1.1k", price: "$299.99" },
    { name: "AI Performance Tracker", icon: BarChart3, description: "Track and improve business performance metrics", rating: 4.6, reviews: "1.7k", price: "$84.99" },
    { name: "Smart Contract AI", icon: FileText, description: "Generate and analyze contracts with AI", rating: 4.8, reviews: "1.0k", price: "$179.99" },
    { name: "AI Location Finder", icon: MapPin, description: "Find optimal business locations with data analysis", rating: 4.4, reviews: "1.2k", price: "$124.99" },
    { name: "Customer Retention AI", icon: Gift, description: "Improve customer retention with intelligent strategies", rating: 4.7, reviews: "1.9k", price: "$109.99" }
  ];

  return (
    <div className="min-h-screen animated-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-purple-700 border-purple-300 glass-effect">
            🤖 AI App Hub
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            AI-Powered Application Store
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            Discover, download, and deploy cutting-edge AI applications for productivity, creativity, and business
          </p>
        </div>

        {/* AI Social Media Post Generator Section */}
        <div className="mb-16">
          <Card className="glass-effect border-white/20 max-w-6xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Camera className="h-8 w-8 text-purple-400" />
                <Edit3 className="h-8 w-8 text-blue-400" />
              </div>
              <CardTitle className="text-2xl text-white">Social Media Post Generator</CardTitle>
              <CardDescription className="text-white/70">
                Generate engaging social media posts with AI-powered content and web images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <Button 
                  onClick={generateSocialMediaPosts}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating Posts..." : "Generate AI Posts"}
                </Button>
              </div>

              {generatedPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedPosts.map((post) => (
                    <Card key={post.id} className="bg-white/10 border-white/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-white border-white/30">
                            {post.platform}
                          </Badge>
                          <Share2 className="h-4 w-4 text-white/60" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <img 
                          src={post.image} 
                          alt="Generated post image"
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <p className="text-white/90 text-sm mb-4">{post.content}</p>
                        <div className="text-white/60 text-xs">{post.engagement}</div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-4 border-white/30 text-white hover:bg-white/10"
                        >
                          Use This Post
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Campaign Builder Section */}
        <div className="mb-16">
          <Card className="glass-effect border-white/20 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="h-8 w-8 text-green-400" />
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
              <CardTitle className="text-2xl text-white">AI Campaign Builder</CardTitle>
              <CardDescription className="text-white/70">
                Pay Per Organic Impression - Drive targeted traffic to your Etsy store
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">2.5M+</div>
                  <div className="text-white/70">Organic Impressions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">85%</div>
                  <div className="text-white/70">Traffic Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">$0.02</div>
                  <div className="text-white/70">Cost Per Impression</div>
                </div>
              </div>
              
              <div className="bg-white/5 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Campaign Features:</h3>
                <ul className="text-white/80 space-y-2 text-left max-w-md mx-auto">
                  <li>✅ Targeted audience selection</li>
                  <li>✅ Real-time analytics dashboard</li>
                  <li>✅ A/B testing capabilities</li>
                  <li>✅ Organic traffic optimization</li>
                  <li>✅ ROI tracking and reporting</li>
                </ul>
              </div>

              <Button 
                onClick={launchOrganicCampaign}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 text-lg"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Launch Organic Traffic Campaign
              </Button>
              
              <p className="text-white/60 text-sm mt-4">
                Starting at $50 minimum campaign budget
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Productivity Apps Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              <Brain className="inline h-8 w-8 mr-2 text-blue-400" />
              AI Productivity Apps ({productivityApps.length} Available)
            </h2>
            <Button 
              onClick={() => downloadAppsAsZip(productivityApps, "AI Productivity Apps")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download All as ZIP
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productivityApps.map((app, index) => (
              <Card key={index} className="glass-effect border-white/20 hover:border-blue-300 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <app.icon className="h-8 w-8 text-blue-400" />
                    <Badge variant="secondary" className={app.price ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}>
                      {app.price || "Free"}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-sm">{app.name}</CardTitle>
                  <CardDescription className="text-white/70 text-xs">
                    {app.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white/80 text-sm">{app.rating} ({app.reviews} reviews)</span>
                  </div>
                  <Button 
                    className={`w-full text-sm ${app.price ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'}`}
                    onClick={() => app.price ? handlePaidAppDownload(app.name) : handleFreeAppDownload(app.name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {app.price ? "Purchase & Download" : "Download Free"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Creative Apps Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              <Palette className="inline h-8 w-8 mr-2 text-purple-400" />
              AI Creative Apps ({creativeApps.length} Available)
            </h2>
            <Button 
              onClick={() => downloadAppsAsZip(creativeApps, "AI Creative Apps")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download All as ZIP
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {creativeApps.map((app, index) => (
              <Card key={index} className="glass-effect border-white/20 hover:border-purple-300 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <app.icon className="h-8 w-8 text-purple-400" />
                    <Badge variant="secondary" className={app.price ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}>
                      {app.price || "Free"}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-sm">{app.name}</CardTitle>
                  <CardDescription className="text-white/70 text-xs">
                    {app.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white/80 text-sm">{app.rating} ({app.reviews} reviews)</span>
                  </div>
                  <Button 
                    className={`w-full text-sm ${app.price ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'}`}
                    onClick={() => app.price ? handlePaidAppDownload(app.name) : handleFreeAppDownload(app.name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {app.price ? "Purchase & Download" : "Download Free"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Business Apps Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              <TrendingUp className="inline h-8 w-8 mr-2 text-green-400" />
              AI Business Apps ({businessApps.length} Available)
            </h2>
            <Button 
              onClick={() => downloadAppsAsZip(businessApps, "AI Business Apps")}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download All as ZIP
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {businessApps.map((app, index) => (
              <Card key={index} className="glass-effect border-white/20 hover:border-green-300 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <app.icon className="h-8 w-8 text-green-400" />
                    <Badge variant="secondary" className={app.price ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}>
                      {app.price || "Free"}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-sm">{app.name}</CardTitle>
                  <CardDescription className="text-white/70 text-xs">
                    {app.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white/80 text-sm">{app.rating} ({app.reviews} reviews)</span>
                  </div>
                  <Button 
                    className={`w-full text-sm ${app.price ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'}`}
                    onClick={() => app.price ? handlePaidAppDownload(app.name) : handleFreeAppDownload(app.name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {app.price ? "Purchase & Download" : "Download Free"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHub;
