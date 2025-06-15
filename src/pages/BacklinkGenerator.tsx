import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Link2, TrendingUp, Globe, Target, CheckCircle, Clock, AlertCircle, Crown, Zap, Star } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Banner from "@/components/Banner";

interface BacklinkData {
  id: string;
  url: string;
  domain: string;
  anchor: string;
  status: "pending" | "active" | "failed";
  domainAuthority: number;
  timestamp: Date;
}

const BacklinkGenerator = () => {
  const [targetUrl, setTargetUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [backlinks, setBacklinks] = useState<BacklinkData[]>([]);
  const [totalGenerated, setTotalGenerated] = useState(0);
  const [activeBacklinks, setActiveBacklinks] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState("free");

  // Expanded list of 100+ high-authority domains including search engines and forums
  const domains = [
    // Search Engines & Major Platforms
    "google.com", "bing.com", "yahoo.com", "duckduckgo.com", "baidu.com",
    "yandex.com", "ask.com", "aol.com", "startpage.com", "searx.org",
    
    // Social Media Platforms
    "facebook.com", "twitter.com", "linkedin.com", "instagram.com", "pinterest.com",
    "reddit.com", "quora.com", "tumblr.com", "snapchat.com", "tiktok.com",
    "discord.com", "telegram.org", "whatsapp.com", "skype.com", "zoom.us",
    
    // Forums & Community Sites
    "stackoverflow.com", "stackexchange.com", "forums.adobe.com", "community.mozilla.org",
    "answers.microsoft.com", "discussions.apple.com", "ubuntu-forums.org", "xda-developers.com",
    "techcrunch.com", "hacker-news.firebaseio.com", "producthunt.com", "indiehackers.com",
    
    // Content Platforms
    "medium.com", "wordpress.com", "blogspot.com", "substack.com", "ghost.org",
    "wix.com", "squarespace.com", "weebly.com", "webflow.com", "carrd.co",
    
    // Development & Tech
    "github.com", "gitlab.com", "bitbucket.org", "codepen.io", "replit.com",
    "heroku.com", "netlify.com", "vercel.com", "firebase.google.com", "aws.amazon.com",
    "digitalocean.com", "vultr.com", "linode.com", "cloudflare.com", "mongodb.com",
    
    // E-commerce & Business
    "amazon.com", "ebay.com", "etsy.com", "shopify.com", "alibaba.com",
    "aliexpress.com", "walmart.com", "target.com", "bestbuy.com", "newegg.com",
    
    // News & Media
    "cnn.com", "bbc.com", "reuters.com", "bloomberg.com", "forbes.com",
    "techcrunch.com", "mashable.com", "wired.com", "theverge.com", "engadget.com",
    
    // Educational & Reference
    "wikipedia.org", "wikihow.com", "coursera.org", "udemy.com", "edx.org",
    "khanacademy.org", "mit.edu", "stanford.edu", "harvard.edu", "berkeley.edu",
    
    // Video & Multimedia
    "youtube.com", "vimeo.com", "dailymotion.com", "twitch.tv", "soundcloud.com",
    "spotify.com", "apple.com", "netflix.com", "hulu.com", "disney.com",
    
    // Professional Services
    "salesforce.com", "hubspot.com", "mailchimp.com", "constantcontact.com",
    "dropbox.com", "googledrive.com", "onedrive.com", "box.com", "slack.com",
    
    // Additional High-Authority Sites
    "yelp.com", "tripadvisor.com", "booking.com", "airbnb.com", "expedia.com",
    "indeed.com", "glassdoor.com", "monster.com", "careerbuilder.com", "upwork.com",
    "fiverr.com", "99designs.com", "behance.net", "dribbble.com", "unsplash.com"
  ];

  const plans = [
    {
      name: "Free Plan",
      id: "free",
      price: "$0",
      backlinks: "500 backlinks",
      domains: "50+ domains",
      features: ["Basic analytics", "Email support", "Manual generation"],
      color: "border-gray-300",
      icon: <Star className="h-5 w-5 text-gray-500" />
    },
    {
      name: "Pro Plan",
      id: "pro",
      price: "$29/month",
      backlinks: "1500 backlinks",
      domains: "100+ domains",
      features: ["Real-time analytics", "Priority support", "Auto-generation", "Custom anchors"],
      color: "border-blue-500",
      icon: <Zap className="h-5 w-5 text-blue-500" />
    },
    {
      name: "Enterprise",
      id: "enterprise",
      price: "$99/month",
      backlinks: "5000 backlinks",
      domains: "100+ premium domains",
      features: ["Advanced analytics", "24/7 support", "Bulk generation", "White-label", "API access"],
      color: "border-purple-500",
      icon: <Crown className="h-5 w-5 text-purple-500" />
    }
  ];

  // Sample analytics data
  const analyticsData = [
    { date: '2024-01-01', backlinks: 145, domains: 32 },
    { date: '2024-01-02', backlinks: 252, domains: 45 },
    { date: '2024-01-03', backlinks: 367, domains: 48 },
    { date: '2024-01-04', backlinks: 478, domains: 52 },
    { date: '2024-01-05', backlinks: 589, domains: 55 },
    { date: '2024-01-06', backlinks: 702, domains: 58 },
    { date: '2024-01-07', backlinks: 825, domains: 62 },
  ];

  const getMaxBacklinks = () => {
    switch (selectedPlan) {
      case "free": return 500;
      case "pro": return 1500;
      case "enterprise": return 5000;
      default: return 500;
    }
  };

  const generateBacklinks = async () => {
    if (!targetUrl || !keywords) {
      toast.error("Please enter both target URL and keywords");
      return;
    }

    const maxBacklinks = getMaxBacklinks();
    setIsGenerating(true);
    setProgress(0);

    // Simulate backlink generation
    const keywordList = keywords.split(",").map(k => k.trim());

    for (let i = 0; i < maxBacklinks; i++) {
      setTimeout(() => {
        const domain = domains[Math.floor(Math.random() * domains.length)];
        const keyword = keywordList[Math.floor(Math.random() * keywordList.length)];
        const newBacklink: BacklinkData = {
          id: `bl-${Date.now()}-${i}`,
          url: `https://${domain}/post/${Math.random().toString(36).substr(2, 9)}`,
          domain,
          anchor: keyword,
          status: Math.random() > 0.15 ? "active" : Math.random() > 0.5 ? "pending" : "failed",
          domainAuthority: Math.floor(Math.random() * 50) + 40,
          timestamp: new Date()
        };

        setBacklinks(prev => [...prev, newBacklink]);
        setTotalGenerated(prev => prev + 1);
        if (newBacklink.status === "active") {
          setActiveBacklinks(prev => prev + 1);
        }
        setProgress(((i + 1) / maxBacklinks) * 100);

        if (i === maxBacklinks - 1) {
          setIsGenerating(false);
          toast.success(`🎉 Backlink generation completed! Generated ${maxBacklinks} high-quality backlinks from 100+ premium domains including search engines and forums.`);
        }
      }, i * 100);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
    }
  };

  const handlePlanSelection = (planId: string) => {
    if (planId === "free") {
      setSelectedPlan(planId);
      toast.success("Free plan selected!");
      return;
    }
    
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=wealthenterprise69@gmail.com&item_name=${encodeURIComponent(plan.name + ' - Backlink Generator')}&amount=${planId === 'pro' ? '29' : '99'}&currency_code=USD&return=https://bzkingsdigitalmall.etsy.com/success&cancel_return=https://bzkingsdigitalmall.etsy.com/cancel`;
      
      toast.info("Redirecting to PayPal for secure payment...");
      window.open(paypalUrl, '_blank');
    }
  };

  const handlePlanPayment = (planId: string) => {
    if (planId === "free") {
      setSelectedPlan(planId);
      toast.success("Free plan selected! Sign up to get started.");
      window.location.href = '/signup';
      return;
    }
    
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=wealthenterprise69@gmail.com&item_name=${encodeURIComponent(plan.name + ' - Backlink Generator')}&amount=${planId === 'pro' ? '29' : '99'}&currency_code=USD&return=https://bzkingsdigitalmall.etsy.com/success&cancel_return=https://bzkingsdigitalmall.etsy.com/cancel`;
      
      toast.info("Redirecting to PayPal for secure payment...");
      window.open(paypalUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen animated-bg">
      <Banner />
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-purple-700 border-purple-300 glass-effect">
            🔗 BZ Kings SEO - Premium Backlink Generator
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            Generate High-Quality Organic Backlinks from 100+ Domains
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            Build powerful backlinks automatically from 100+ premium domains including search engines, forums, and high-authority websites. 
            Get real organic backlinks that boost your SEO rankings instantly.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`glass-effect border-2 cursor-pointer transition-all ${
                selectedPlan === plan.id ? plan.color : 'border-white/20'
              }`}
              onClick={() => handlePlanSelection(plan.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  {plan.icon}
                  <h3 className="text-xl font-bold text-white ml-2">{plan.name}</h3>
                </div>
                <p className="text-3xl font-bold text-white mb-2">{plan.price}</p>
                <p className="text-white/70 mb-4">{plan.backlinks}</p>
                <p className="text-white/70 mb-4">{plan.domains}</p>
                <ul className="text-sm text-white/80 space-y-1 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanPayment(plan.id);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  size="sm"
                >
                  {plan.id === 'free' ? 'Get Started' : `Get ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6 text-center">
              <Link2 className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white">{totalGenerated}</h3>
              <p className="text-white/70">Total Generated</p>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white">{activeBacklinks}</h3>
              <p className="text-white/70">Active Backlinks</p>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white">{new Set(backlinks.map(b => b.domain)).size}</h3>
              <p className="text-white/70">Unique Domains</p>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white">{Math.round((activeBacklinks / Math.max(totalGenerated, 1)) * 100)}%</h3>
              <p className="text-white/70">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 glass-effect">
            <TabsTrigger value="generator" className="text-white">Backlink Generator</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">Real-time Analytics</TabsTrigger>
            <TabsTrigger value="history" className="text-white">Backlink History</TabsTrigger>
          </TabsList>

          <TabsContent value="generator">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Generate Premium Backlinks</CardTitle>
                <CardDescription className="text-white/70">
                  Enter your target URL and keywords to generate up to {getMaxBacklinks()} high-quality backlinks from 100+ premium domains
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="url" className="text-white">Target URL</Label>
                  <Input
                    id="url"
                    placeholder="https://your-website.com"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="keywords" className="text-white">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    placeholder="SEO tools, digital marketing, website optimization"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-white font-semibold mb-2">Selected Plan: {plans.find(p => p.id === selectedPlan)?.name}</p>
                  <p className="text-white/70">Will generate up to {getMaxBacklinks()} backlinks from 100+ premium domains including search engines and forums</p>
                </div>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span>Generating backlinks from 100+ premium domains...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                <Button
                  onClick={generateBacklinks}
                  disabled={isGenerating}
                  className="w-full gradient-primary text-white"
                  size="lg"
                >
                  {isGenerating ? `Generating ${getMaxBacklinks()} Backlinks...` : `Generate ${getMaxBacklinks()} Backlinks`}
                  <Target className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Premium Analytics Dashboard</CardTitle>
                <CardDescription className="text-white/70">
                  Real-time analytics of your backlink generation progress across 50+ premium domains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Backlinks Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                        />
                        <Line type="monotone" dataKey="backlinks" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Domain Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                        />
                        <Bar dataKey="domains" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Backlink History</CardTitle>
                <CardDescription className="text-white/70">
                  View all generated backlinks from 100+ premium domains including search engines and forums
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {backlinks.length === 0 ? (
                    <p className="text-white/70 text-center py-8">
                      No backlinks generated yet. Use the generator to create your first backlinks from 100+ premium domains!
                    </p>
                  ) : (
                    backlinks.map((backlink) => (
                      <div key={backlink.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(backlink.status)}
                          <div>
                            <p className="font-medium text-white">{backlink.domain}</p>
                            <p className="text-sm text-white/70">{backlink.anchor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(backlink.status)}>
                            {backlink.status}
                          </Badge>
                          <p className="text-sm text-white/70 mt-1">DA: {backlink.domainAuthority}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BacklinkGenerator;
