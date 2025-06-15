
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Target, Zap, Star, ArrowRight, BarChart3, Mail, Share2 } from "lucide-react";
import { toast } from "sonner";
import HeroSection from "@/components/HeroSection";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import TrafficDashboard from "@/components/TrafficDashboard";
import SEOTools from "@/components/SEOTools";
import SocialMediaBooster from "@/components/SocialMediaBooster";
import ConversionTracker from "@/components/ConversionTracker";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-purple-700 border-purple-300">
            🚀 Etsy Traffic Booster Pro
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-amber-600 bg-clip-text text-transparent">
            Drive Qualified Traffic to Your Etsy Store
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Turn visitors into buyers with our comprehensive lead generation and traffic optimization platform
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Target size={16} />
              Lead Generation
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <TrendingUp size={16} />
              SEO Tools
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 size={16} />
              Social Boost
            </TabsTrigger>
            <TabsTrigger value="conversion" className="flex items-center gap-2">
              <Zap size={16} />
              Conversions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <TrafficDashboard />
          </TabsContent>

          <TabsContent value="leads">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LeadCaptureForm />
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-purple-600" />
                    Email Marketing Stats
                  </CardTitle>
                  <CardDescription>
                    Track your email campaign performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Open Rate</span>
                      <span className="text-sm text-gray-600">24.5%</span>
                    </div>
                    <Progress value={24.5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Click Rate</span>
                      <span className="text-sm text-gray-600">8.3%</span>
                    </div>
                    <Progress value={8.3} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Conversion Rate</span>
                      <span className="text-sm text-gray-600">3.7%</span>
                    </div>
                    <Progress value={3.7} className="h-2" />
                  </div>
                </CardContent>
              </Card>
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
          <Card className="max-w-4xl mx-auto gradient-primary text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Boost Your Etsy Sales?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of successful Etsy sellers who are already using our platform to drive traffic and increase sales.
              </p>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
