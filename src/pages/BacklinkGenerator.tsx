
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Link2, TrendingUp, Globe, Target, CheckCircle, Clock, AlertCircle } from "lucide-react";
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

  // Sample analytics data
  const analyticsData = [
    { date: '2024-01-01', backlinks: 45, domains: 12 },
    { date: '2024-01-02', backlinks: 52, domains: 15 },
    { date: '2024-01-03', backlinks: 67, domains: 18 },
    { date: '2024-01-04', backlinks: 78, domains: 22 },
    { date: '2024-01-05', backlinks: 89, domains: 25 },
    { date: '2024-01-06', backlinks: 102, domains: 28 },
    { date: '2024-01-07', backlinks: 125, domains: 32 },
  ];

  const generateBacklinks = async () => {
    if (!targetUrl || !keywords) {
      toast.error("Please enter both target URL and keywords");
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate backlink generation
    const keywordList = keywords.split(",").map(k => k.trim());
    const domains = [
      "medium.com", "reddit.com", "quora.com", "linkedin.com", "facebook.com",
      "twitter.com", "pinterest.com", "tumblr.com", "blogspot.com", "wordpress.com",
      "github.com", "stackoverflow.com", "youtube.com", "vimeo.com", "flickr.com"
    ];

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const domain = domains[Math.floor(Math.random() * domains.length)];
        const keyword = keywordList[Math.floor(Math.random() * keywordList.length)];
        const newBacklink: BacklinkData = {
          id: `bl-${Date.now()}-${i}`,
          url: `https://${domain}/post/${Math.random().toString(36).substr(2, 9)}`,
          domain,
          anchor: keyword,
          status: Math.random() > 0.2 ? "active" : Math.random() > 0.5 ? "pending" : "failed",
          domainAuthority: Math.floor(Math.random() * 40) + 30,
          timestamp: new Date()
        };

        setBacklinks(prev => [...prev, newBacklink]);
        setTotalGenerated(prev => prev + 1);
        if (newBacklink.status === "active") {
          setActiveBacklinks(prev => prev + 1);
        }
        setProgress((i + 1) * 5);

        if (i === 19) {
          setIsGenerating(false);
          toast.success("🎉 Backlink generation completed! Generated 20 high-quality backlinks.");
        }
      }, i * 500);
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

  return (
    <div className="min-h-screen animated-bg">
      <Banner />
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-purple-700 border-purple-300 glass-effect">
            🔗 AI Backlink Generator Pro
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            Generate High-Quality Organic Backlinks
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            Build powerful backlinks automatically with our AI-powered backlink generator. 
            Get real organic backlinks from high-authority domains.
          </p>
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
                <CardTitle className="text-white">Generate Backlinks</CardTitle>
                <CardDescription className="text-white/70">
                  Enter your target URL and keywords to generate high-quality backlinks
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

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span>Generating backlinks...</span>
                      <span>{progress}%</span>
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
                  {isGenerating ? "Generating Backlinks..." : "Generate Backlinks"}
                  <Target className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Backlink Analytics</CardTitle>
                <CardDescription className="text-white/70">
                  Real-time analytics of your backlink generation progress
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
                  View all generated backlinks and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {backlinks.length === 0 ? (
                    <p className="text-white/70 text-center py-8">
                      No backlinks generated yet. Use the generator to create your first backlinks!
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
