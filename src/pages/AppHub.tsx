import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  
  // Social Media Post Generator state
  const [postFormData, setPostFormData] = useState({
    website: "",
    keywords: "",
    description: ""
  });

  const handleFreeAppDownload = (appName: string) => {
    if (!user) {
      toast.info("Please sign up to download free apps!");
      navigate("/signup");
      return;
    }
    
    toast.success(`${appName} downloaded successfully!`);
  };

  const handlePaidAppDownload = (appName: string) => {
    // Redirect to PayPal checkout page
    window.open("https://www.paypal.com/checkoutnow?token=your_paypal_token", "_blank");
    toast.info(`Redirecting to PayPal checkout for ${appName}...`);
  };

  const downloadAppsAsZip = async (apps: any[], sectionName: string) => {
    if (!user) {
      toast.info("Please sign up to download apps!");
      navigate("/signup");
      return;
    }

    // Redirect to PayPal payment page for ZIP download access
    window.open("https://www.paypal.com/checkoutnow?token=your_zip_download_token", "_blank");
    toast.info("Redirecting to PayPal for ZIP download access...");
  };

  const generateSocialMediaPosts = async () => {
    if (!postFormData.website || !postFormData.keywords || !postFormData.description) {
      toast.error("Please fill in all fields to generate posts!");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation based on user input
    const basePrompts = [
      `🚀 Transform your business with ${postFormData.keywords}! Visit ${postFormData.website} to discover ${postFormData.description}`,
      `✨ New breakthrough in ${postFormData.keywords}! ${postFormData.description} - Check it out at ${postFormData.website}`,
      `💡 Ready to revolutionize your approach to ${postFormData.keywords}? ${postFormData.description} Available at ${postFormData.website}`,
      `🎯 Don't miss out on the latest ${postFormData.keywords} solutions! ${postFormData.description} Visit ${postFormData.website} now!`
    ];

    const images = [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop"
    ];

    const platforms = ["Instagram", "Facebook", "Twitter", "LinkedIn"];
    const hashtags = postFormData.keywords.split(" ").map(keyword => `#${keyword.replace(/\s+/g, '')}`).join(" ");

    const newPosts = platforms.map((platform, index) => ({
      id: Date.now() + index,
      platform,
      content: `${basePrompts[index % basePrompts.length]} ${hashtags} #AI #Innovation #Business`,
      image: images[index % images.length],
      engagement: `${Math.floor(Math.random() * 3000 + 500)} likes • ${Math.floor(Math.random() * 500 + 50)} ${platform === 'Twitter' ? 'retweets' : 'shares'}`,
      tags: hashtags
    }));

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedPosts(newPosts);
    setIsGenerating(false);
    toast.success("Viral AI posts generated successfully!");
  };

  const launchOrganicCampaign = () => {
    navigate("/payment");
    toast.info("Redirecting to payment to start your organic campaign...");
  };

  const handlePostFormChange = (field: string, value: string) => {
    setPostFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const copyPostToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Post copied to clipboard!");
  };

  // AI Productivity Apps Section (20 apps)
  const productivityApps = [
    { name: "AI Writing Assistant", icon: Edit3, description: "Advanced AI-powered writing and editing tool", rating: 4.9, reviews: "3.2k", price: "$9.99" },
    { name: "Smart Task Manager", icon: Calendar, description: "AI-driven task prioritization and scheduling", rating: 4.8, reviews: "2.1k" },
    { name: "Voice Transcriber Pro", icon: Mic, description: "Real-time speech-to-text with AI enhancement", rating: 4.7, reviews: "1.8k", price: "$12.99" },
    { name: "AI Email Composer", icon: Mail, description: "Generate professional emails with AI", rating: 4.8, reviews: "2.5k", price: "$7.99" },
    { name: "Smart Notes Organizer", icon: FileText, description: "AI-powered note organization and search", rating: 4.6, reviews: "1.9k" },
    { name: "AI Code Generator", icon: Code, description: "Generate code snippets with AI assistance", rating: 4.9, reviews: "3.5k", price: "$19.99" },
    { name: "Meeting Summarizer", icon: Users, description: "AI-generated meeting summaries and action items", rating: 4.7, reviews: "2.2k", price: "$14.99" },
    { name: "Smart Calendar AI", icon: Calendar, description: "Intelligent scheduling and time management", rating: 4.5, reviews: "1.7k" },
    { name: "AI Document Scanner", icon: Smartphone, description: "Scan and digitize documents with AI enhancement", rating: 4.6, reviews: "2.8k" },
    { name: "Content Idea Generator", icon: Lightbulb, description: "AI-powered content brainstorming tool", rating: 4.8, reviews: "2.4k", price: "$8.99" },
    { name: "AI Password Manager", icon: Lock, description: "Secure password generation and management", rating: 4.7, reviews: "3.1k", price: "$6.99" },
    { name: "Smart Bookmark AI", icon: Link2, description: "AI-organized bookmark management system", rating: 4.5, reviews: "1.5k" },
    { name: "AI Expense Tracker", icon: CreditCard, description: "Automated expense categorization and tracking", rating: 4.6, reviews: "2.0k" },
    { name: "Research Assistant AI", icon: Search, description: "AI-powered research and fact-checking tool", rating: 4.8, reviews: "2.7k", price: "$16.99" },
    { name: "Smart Habit Tracker", icon: Target, description: "AI-driven habit formation and tracking", rating: 4.4, reviews: "1.6k" },
    { name: "AI Language Translator", icon: Globe, description: "Real-time language translation with context", rating: 4.7, reviews: "3.0k", price: "$11.99" },
    { name: "Digital Wellness AI", icon: Monitor, description: "AI-powered digital health monitoring", rating: 4.5, reviews: "1.8k" },
    { name: "AI Backup Manager", icon: Cloud, description: "Intelligent file backup and organization", rating: 4.6, reviews: "2.3k", price: "$9.99" },
    { name: "Smart Focus Timer", icon: Zap, description: "AI-optimized focus and productivity sessions", rating: 4.7, reviews: "2.1k" },
    { name: "AI Project Planner", icon: Workflow, description: "Intelligent project planning and management", rating: 4.8, reviews: "2.6k", price: "$24.99" }
  ];

  // AI Creative Apps Section (20 apps)
  const creativeApps = [
    { name: "AI Art Generator", icon: Palette, description: "Create stunning artwork with AI algorithms", rating: 4.9, reviews: "4.2k", price: "$14.99" },
    { name: "Smart Photo Editor", icon: Image, description: "AI-enhanced photo editing and enhancement", rating: 4.8, reviews: "3.5k", price: "$12.99" },
    { name: "AI Music Composer", icon: Music, description: "Generate original music with artificial intelligence", rating: 4.7, reviews: "2.8k", price: "$19.99" },
    { name: "Video AI Studio", icon: Video, description: "AI-powered video editing and creation", rating: 4.8, reviews: "3.1k", price: "$24.99" },
    { name: "Logo Designer AI", icon: Layers, description: "Create professional logos with AI assistance", rating: 4.6, reviews: "2.4k" },
    { name: "AI Color Palette", icon: Palette, description: "Generate harmonious color schemes with AI", rating: 4.5, reviews: "1.9k" },
    { name: "Smart GIF Maker", icon: Video, description: "Create animated GIFs with AI optimization", rating: 4.7, reviews: "2.2k" },
    { name: "AI Typography Tool", icon: Type, description: "Intelligent font pairing and typography design", rating: 4.6, reviews: "1.7k", price: "$8.99" },
    { name: "3D Model Generator", icon: Layers, description: "Create 3D models with AI assistance", rating: 4.8, reviews: "2.9k", price: "$29.99" },
    { name: "AI Sketch Enhancer", icon: PenTool, description: "Transform sketches into detailed artwork", rating: 4.7, reviews: "2.1k", price: "$16.99" },
    { name: "Background Remover AI", icon: Scissors, description: "Remove backgrounds with pixel-perfect precision", rating: 4.9, reviews: "3.8k" },
    { name: "AI Meme Generator", icon: Camera, description: "Create viral memes with AI humor intelligence", rating: 4.5, reviews: "2.6k" },
    { name: "Smart Filter Creator", icon: Filter, description: "Design custom filters with AI technology", rating: 4.6, reviews: "1.8k" },
    { name: "AI Animation Studio", icon: Video, description: "Create animations with intelligent assistance", rating: 4.8, reviews: "2.7k", price: "$22.99" },
    { name: "Voice Changer AI", icon: Headphones, description: "Transform voices with AI vocal effects", rating: 4.4, reviews: "2.0k", price: "$9.99" },
    { name: "AI Mockup Generator", icon: Smartphone, description: "Create product mockups with AI placement", rating: 4.7, reviews: "2.3k", price: "$11.99" },
    { name: "Story Illustrator AI", icon: FileText, description: "Generate illustrations for stories and content", rating: 4.6, reviews: "1.5k", price: "$15.99" },
    { name: "AI Pattern Maker", icon: Hash, description: "Create seamless patterns with AI generation", rating: 4.5, reviews: "1.6k" },
    { name: "Smart Collage Creator", icon: Image, description: "AI-assisted photo collage composition", rating: 4.7, reviews: "2.4k" },
    { name: "AI Watermark Tool", icon: Shield, description: "Intelligent watermark creation and removal", rating: 4.6, reviews: "1.9k", price: "$7.99" }
  ];

  // AI Business Apps Section (20 apps)
  const businessApps = [
    { name: "AI Sales Predictor", icon: TrendingUp, description: "Predict sales trends with machine learning", rating: 4.9, reviews: "2.1k", price: "$39.99" },
    { name: "Customer Insight AI", icon: Users, description: "Deep customer behavior analysis and insights", rating: 4.8, reviews: "1.8k", price: "$34.99" },
    { name: "AI Chatbot Builder", icon: Bot, description: "Create intelligent chatbots for customer service", rating: 4.7, reviews: "2.5k", price: "$29.99" },
    { name: "Smart Invoice AI", icon: FileText, description: "Automated invoice generation and processing", rating: 4.6, reviews: "1.9k" },
    { name: "AI Lead Generator", icon: Target, description: "Find and qualify leads with AI algorithms", rating: 4.8, reviews: "2.3k", price: "$32.99" },
    { name: "Market Research AI", icon: BarChart3, description: "Comprehensive market analysis with AI insights", rating: 4.7, reviews: "1.7k", price: "$44.99" },
    { name: "AI Inventory Manager", icon: Database, description: "Smart inventory tracking and optimization", rating: 4.5, reviews: "2.0k", price: "$27.99" },
    { name: "Price Optimizer AI", icon: CreditCard, description: "Dynamic pricing strategies with AI", rating: 4.8, reviews: "1.5k", price: "$36.99" },
    { name: "AI HR Assistant", icon: Users, description: "Streamline HR processes with intelligent automation", rating: 4.6, reviews: "1.8k", price: "$31.99" },
    { name: "Business Plan AI", icon: FileText, description: "Generate comprehensive business plans with AI", rating: 4.7, reviews: "1.4k", price: "$24.99" },
    { name: "AI Risk Analyzer", icon: Shield, description: "Identify and assess business risks intelligently", rating: 4.8, reviews: "1.2k", price: "$38.99" },
    { name: "Smart CRM System", icon: Phone, description: "AI-powered customer relationship management", rating: 4.9, reviews: "2.8k", price: "$49.99" },
    { name: "AI Competitor Tracker", icon: Eye, description: "Monitor competitors with intelligent analysis", rating: 4.6, reviews: "1.6k", price: "$28.99" },
    { name: "Financial Forecast AI", icon: TrendingUp, description: "Predict financial outcomes with machine learning", rating: 4.8, reviews: "1.3k", price: "$42.99" },
    { name: "AI Meeting Scheduler", icon: Calendar, description: "Intelligent meeting coordination and optimization", rating: 4.5, reviews: "2.1k" },
    { name: "Supply Chain AI", icon: Workflow, description: "Optimize supply chain with predictive analytics", rating: 4.7, reviews: "1.1k", price: "$89.99" },
    { name: "AI Performance Tracker", icon: BarChart3, description: "Track and improve business performance metrics", rating: 4.6, reviews: "1.7k", price: "$33.99" },
    { name: "Smart Contract AI", icon: FileText, description: "Generate and analyze contracts with AI", rating: 4.8, reviews: "1.0k", price: "$54.99" },
    { name: "AI Location Finder", icon: MapPin, description: "Find optimal business locations with data analysis", rating: 4.4, reviews: "1.2k", price: "$37.99" },
    { name: "Customer Retention AI", icon: Gift, description: "Improve customer retention with intelligent strategies", rating: 4.7, reviews: "1.9k", price: "$41.99" }
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

        {/* Enhanced AI Social Media Post Generator Section */}
        <div className="mb-16">
          <Card className="glass-effect border-white/20 max-w-6xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Camera className="h-8 w-8 text-purple-400" />
                <Edit3 className="h-8 w-8 text-blue-400" />
              </div>
              <CardTitle className="text-2xl text-white">Viral AI Social Media Post Generator</CardTitle>
              <CardDescription className="text-white/70">
                Create viral social media posts with AI-powered content, images, and hashtags
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* User Input Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white font-medium">Your Website</Label>
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    value={postFormData.website}
                    onChange={(e) => handlePostFormChange("website", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-white font-medium">Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="AI marketing tools business"
                    value={postFormData.keywords}
                    onChange={(e) => handlePostFormChange("keywords", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white font-medium">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product or service..."
                    value={postFormData.description}
                    onChange={(e) => handlePostFormChange("description", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[80px]"
                  />
                </div>
              </div>

              <div className="text-center mb-8">
                <Button 
                  onClick={generateSocialMediaPosts}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating Viral Posts..." : "Generate Viral AI Posts"}
                </Button>
              </div>

              {generatedPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <p className="text-white/90 text-xs mb-3 line-clamp-4">{post.content}</p>
                        <div className="text-white/60 text-xs mb-2">{post.engagement}</div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-white/30 text-white hover:bg-white/10 text-xs"
                            onClick={() => copyPostToClipboard(post.content)}
                          >
                            Copy Post
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Campaign Builder Section - Keep unchanged */}
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
