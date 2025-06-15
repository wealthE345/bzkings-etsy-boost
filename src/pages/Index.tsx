import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Target, Zap, Star, ArrowRight, BarChart3, Share2, Download, Search, Mail, Link2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import TrafficDashboard from "@/components/TrafficDashboard";
import SEOTools from "@/components/SEOTools";
import SocialMediaBooster from "@/components/SocialMediaBooster";
import ConversionTracker from "@/components/ConversionTracker";
import EmailCampaignTool from "@/components/EmailCampaignTool";
import Banner from "@/components/Banner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen animated-bg">
      <Banner />
      <Navigation />
      <HeroSection />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-purple-700 border-purple-300 glass-effect">
            🚀 Etsy Traffic Booster Pro
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            Drive Qualified Traffic to Your Etsy Store
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            Transform your <span className="font-semibold text-yellow-300">BZ Kings Digital Mall</span> into a lead-generating powerhouse. 
            Get qualified buyers, not just visitors.
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <Link to="/app-hub">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer glass-effect border-white/20 hover:border-purple-300">
              <CardContent className="p-6 text-center">
                <Download className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-white">AI App Hub</h3>
                <p className="text-sm text-white/70">Download SEO & mobile apps</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/keyword-research">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer glass-effect border-white/20 hover:border-blue-300">
              <CardContent className="p-6 text-center">
                <Search className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-white">Keyword Research</h3>
                <p className="text-sm text-white/70">SEO keyword analysis tool</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/backlink-generator">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer glass-effect border-white/20 hover:border-green-300">
              <CardContent className="p-6 text-center">
                <Link2 className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-white">Backlink Generator</h3>
                <p className="text-sm text-white/70">Generate organic backlinks</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/reviews">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer glass-effect border-white/20 hover:border-amber-300">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-white">Customer Reviews</h3>
                <p className="text-sm text-white/70">See what others say</p>
              </CardContent>
            </Card>
          </Link>

          <div
            onClick={() => window.open("https://bzkingsdigitalmall.etsy.com", "_blank")}
            className="cursor-pointer"
          >
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer glass-effect border-white/20 hover:border-green-300 h-full">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-white">Visit Store</h3>
                <p className="text-sm text-white/70">Go to Etsy store</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 glass-effect border-white/20">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-white">
              <BarChart3 size={16} />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2 text-white">
              <Target size={16} />
              Lead Generation
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2 text-white">
              <TrendingUp size={16} />
              SEO Tools
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2 text-white">
              <Share2 size={16} />
              Social Boost
            </TabsTrigger>
            <TabsTrigger value="conversion" className="flex items-center gap-2 text-white">
              <Zap size={16} />
              Conversions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <TrafficDashboard />
          </TabsContent>

          <TabsContent value="leads">
            <div className="grid grid-cols-1 gap-8">
              <LeadCaptureForm />
              <EmailCampaignTool />
            </div>
          </TabsContent>

          <TabsContent value="seo">
            <SEOTools />
          </TabsContent>

          <TabsContent value="social">
            <SocialMediaBooster />
          </TabsContent>

          <TabsContent value="conversion">
            <ConversionTracker />
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto glass-effect border-white/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Ready to Boost Your Etsy Sales?</h3>
              <p className="text-lg mb-6 text-white/90">
                Join thousands of successful Etsy sellers who are already using our platform to drive traffic and increase sales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-purple-700 hover:bg-gray-100"
                  onClick={() => {
                    toast.success("🎉 Welcome to Etsy Traffic Booster Pro!");
                    window.open("https://bzkingsdigitalmall.etsy.com", "_blank");
                  }}
                >
                  Visit BZ Kings Digital Mall
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link to="/app-hub">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-purple-700"
                  >
                    Explore AI Apps
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer with Disclaimer Link */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70 mb-4">© 2024 BZ Kings Digital Mall. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <Link to="/disclaimer" className="text-purple-300 hover:text-purple-100 transition-colors">
              Terms & Disclaimer
            </Link>
            <Link to="/reviews" className="text-purple-300 hover:text-purple-100 transition-colors">
              Customer Reviews
            </Link>
            <Link to="/about" className="text-purple-300 hover:text-purple-100 transition-colors">
              About Us
            </Link>
            <Link to="/backlink-generator" className="text-purple-300 hover:text-purple-100 transition-colors">
              Backlink Generator
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
