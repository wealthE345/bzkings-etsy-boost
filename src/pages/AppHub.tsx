
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Star, Users, TrendingUp, Smartphone, Globe, Zap, Camera, Edit3, Share2, Shield, Search, Mail, Link2, BarChart3, Target, MessageSquare, Calendar, FileText, Image, Video, Music, Headphones, Monitor, Palette, Code, Database, Lock, Wifi, Cloud, Settings } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";

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
    // Handle actual download logic here
  };

  const generateSocialMediaPosts = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with sample posts
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

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedPosts(samplePosts);
    setIsGenerating(false);
    toast.success("Social media posts generated successfully!");
  };

  const launchOrganicCampaign = () => {
    navigate("/payment");
    toast.info("Redirecting to payment to start your organic campaign...");
  };

  const freeApps = [
    { name: "SEO Keyword Tracker", icon: Search, description: "Track your keyword rankings across all search engines", rating: 4.8, reviews: "2.1k" },
    { name: "Traffic Analytics", icon: Globe, description: "Monitor your website traffic and user behavior", rating: 4.9, reviews: "1.8k" },
    { name: "Social Media Scheduler", icon: TrendingUp, description: "Schedule and automate your social media posts", rating: 4.7, reviews: "3.2k" },
    { name: "Email Marketing Tool", icon: Mail, description: "Create and send professional email campaigns", rating: 4.6, reviews: "2.5k" },
    { name: "Backlink Checker", icon: Link2, description: "Monitor and analyze your website backlinks", rating: 4.8, reviews: "1.9k" },
    { name: "Website Speed Test", icon: Zap, description: "Test and optimize your website loading speed", rating: 4.7, reviews: "2.8k" },
    { name: "Content Generator", icon: FileText, description: "AI-powered content creation for blogs and posts", rating: 4.9, reviews: "3.5k" },
    { name: "Image Optimizer", icon: Image, description: "Compress and optimize images for web", rating: 4.5, reviews: "1.7k" },
    { name: "QR Code Generator", icon: Smartphone, description: "Create custom QR codes for marketing", rating: 4.6, reviews: "2.2k" },
    { name: "Password Manager", icon: Lock, description: "Secure password storage and generation", rating: 4.8, reviews: "4.1k" },
    { name: "Color Picker Pro", icon: Palette, description: "Advanced color selection and palette tools", rating: 4.7, reviews: "1.5k" },
    { name: "Code Formatter", icon: Code, description: "Format and beautify your code snippets", rating: 4.6, reviews: "1.8k" },
    { name: "Task Manager", icon: Calendar, description: "Organize and track your daily tasks", rating: 4.7, reviews: "2.9k" },
    { name: "Video Converter", icon: Video, description: "Convert video files to different formats", rating: 4.5, reviews: "2.1k" },
    { name: "Audio Editor", icon: Music, description: "Edit and enhance audio files", rating: 4.6, reviews: "1.6k" },
    { name: "Screenshot Tool", icon: Monitor, description: "Capture and annotate screenshots", rating: 4.8, reviews: "3.3k" },
    { name: "WiFi Analyzer", icon: Wifi, description: "Analyze and optimize WiFi networks", rating: 4.4, reviews: "1.4k" },
    { name: "Cloud Storage Manager", icon: Cloud, description: "Manage files across multiple cloud services", rating: 4.7, reviews: "2.6k" },
    { name: "System Monitor", icon: Settings, description: "Monitor system performance and resources", rating: 4.5, reviews: "1.9k" },
    { name: "Text Editor Pro", icon: FileText, description: "Advanced text editing with syntax highlighting", rating: 4.8, reviews: "2.4k" },
    { name: "URL Shortener", icon: Link2, description: "Create short, trackable links", rating: 4.6, reviews: "1.8k" },
    { name: "Markdown Editor", icon: Edit3, description: "Write and preview markdown documents", rating: 4.7, reviews: "1.5k" }
  ];

  const premiumApps = [
    { name: "Advanced Analytics Pro", icon: Users, description: "Complete business intelligence suite with AI insights", price: "$29.99", rating: 5.0, reviews: "500+" },
    { name: "AI Marketing Suite", icon: Zap, description: "Complete marketing automation with AI-powered campaigns", price: "$49.99", rating: 4.9, reviews: "1.2k" },
    { name: "E-commerce Optimizer", icon: TrendingUp, description: "Advanced e-commerce analytics and optimization", price: "$39.99", rating: 4.8, reviews: "800+" },
    { name: "Professional SEO Toolkit", icon: Search, description: "Enterprise-grade SEO analysis and optimization", price: "$59.99", rating: 4.9, reviews: "950+" },
    { name: "Social Media Pro", icon: Share2, description: "Advanced social media management and analytics", price: "$34.99", rating: 4.7, reviews: "1.1k" },
    { name: "Video Marketing Studio", icon: Video, description: "Professional video editing and marketing tools", price: "$79.99", rating: 4.8, reviews: "650+" },
    { name: "Email Automation Pro", icon: Mail, description: "Advanced email marketing with automation workflows", price: "$44.99", rating: 4.9, reviews: "870+" },
    { name: "Conversion Optimizer", icon: Target, description: "A/B testing and conversion rate optimization", price: "$54.99", rating: 4.8, reviews: "720+" },
    { name: "Customer Analytics", icon: BarChart3, description: "Deep customer behavior analysis and insights", price: "$64.99", rating: 4.7, reviews: "540+" },
    { name: "AI Content Creator", icon: Edit3, description: "Advanced AI content generation and optimization", price: "$69.99", rating: 4.9, reviews: "890+" }
  ];

  return (
    <div className="min-h-screen animated-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-purple-700 border-purple-300 glass-effect">
            📱 AI App Hub
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            Download Powerful AI Apps
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            Get access to our collection of AI-powered mobile and desktop applications
          </p>
        </div>

        {/* Free Apps Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Free Apps ({freeApps.length} Available)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {freeApps.map((app, index) => (
              <Card key={index} className="glass-effect border-white/20 hover:border-green-300 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <app.icon className="h-8 w-8 text-green-400" />
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Free</Badge>
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
                    className="w-full bg-green-600 hover:bg-green-700 text-sm"
                    onClick={() => handleFreeAppDownload(app.name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Free
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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

        {/* Premium Apps Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Premium Apps ({premiumApps.length} Available)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumApps.map((app, index) => (
              <Card key={index} className="glass-effect border-white/20 hover:border-amber-300 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <app.icon className="h-8 w-8 text-amber-400" />
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">{app.price}</Badge>
                  </div>
                  <CardTitle className="text-white">{app.name}</CardTitle>
                  <CardDescription className="text-white/70">
                    {app.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white/80">{app.rating} ({app.reviews} reviews)</span>
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    <Download className="h-4 w-4 mr-2" />
                    Purchase & Download
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
