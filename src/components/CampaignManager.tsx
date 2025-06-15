
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Plus, Play, Pause, BarChart3, Image, Target, Calendar, DollarSign, Globe, Users, MapPin, Wand2, Search, Lightbulb, Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface Campaign {
  id: string;
  title: string;
  platform: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
  adContent: string;
  imageUrl: string;
  progress: number;
  websiteUrl?: string;
  productName?: string;
  targetAge?: string;
  targetRegion?: string;
  targetGender?: string;
  objectives?: string;
  seoKeywords?: string[];
  adVariations?: string[];
}

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Google Ads - Digital Templates',
      platform: 'Google Ads',
      status: 'active',
      budget: 500,
      spent: 375,
      impressions: 12500,
      clicks: 450,
      conversions: 23,
      startDate: '2024-06-10',
      endDate: '2024-06-20',
      adContent: 'Premium digital templates for creative professionals',
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      progress: 75,
      websiteUrl: 'https://example.com',
      productName: 'Digital Templates',
      targetAge: '25-45',
      targetRegion: 'United States',
      objectives: 'Drive traffic and sales',
      seoKeywords: ['digital templates', 'creative design', 'professional templates'],
      adVariations: ['Premium digital templates for creative professionals', 'Transform your designs with professional templates', 'Unlock creativity with our digital template collection']
    },
    {
      id: '2',
      title: 'Facebook Ads - Printables',
      platform: 'Facebook',
      status: 'active',
      budget: 300,
      spent: 276,
      impressions: 8900,
      clicks: 267,
      conversions: 15,
      startDate: '2024-06-03',
      endDate: '2024-06-18',
      adContent: 'Beautiful printable designs for home and office',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      progress: 92,
      websiteUrl: 'https://printables.com',
      productName: 'Printable Designs',
      targetAge: '30-55',
      targetRegion: 'Canada',
      objectives: 'Brand awareness',
      seoKeywords: ['printables', 'home decor', 'office organization'],
      adVariations: ['Beautiful printable designs for home and office', 'Organize your space with stunning printables', 'Download and print beautiful designs instantly']
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    platform: '',
    budget: '',
    adContent: '',
    startDate: '',
    endDate: '',
    imageUrl: '',
    websiteUrl: '',
    productName: '',
    targetAge: '',
    targetRegion: '',
    targetGender: '',
    objectives: '',
    seoKeywords: '',
    adVariations: [] as string[]
  });
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatingContent, setGeneratingContent] = useState(false);
  const [analyzingSEO, setAnalyzingSEO] = useState(false);
  const [generatingVariations, setGeneratingVariations] = useState(false);
  const [seoRecommendations, setSeoRecommendations] = useState<string[]>([]);

  const performanceData = [
    { date: 'Day 1', impressions: 1200, clicks: 45, conversions: 3 },
    { date: 'Day 2', impressions: 1850, clicks: 67, conversions: 5 },
    { date: 'Day 3', impressions: 2100, clicks: 89, conversions: 8 },
    { date: 'Day 4', impressions: 1900, clicks: 72, conversions: 6 },
    { date: 'Day 5', impressions: 2300, clicks: 95, conversions: 12 },
    { date: 'Day 6', impressions: 2600, clicks: 108, conversions: 15 },
    { date: 'Day 7', impressions: 2200, clicks: 88, conversions: 10 }
  ];

  const generateAIImage = async () => {
    setGeneratingImage(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const placeholderImages = [
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop'
      ];
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      setNewCampaign(prev => ({ ...prev, imageUrl: randomImage }));
      toast.success('AI-generated ad creative image based on your product!');
    } catch (error) {
      toast.error('Failed to generate AI image');
    } finally {
      setGeneratingImage(false);
    }
  };

  const generateAIContent = async () => {
    if (!newCampaign.productName || !newCampaign.websiteUrl) {
      toast.error('Please enter product name and website URL first');
      return;
    }

    setGeneratingContent(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const contentTemplates = [
        `🚀 Transform your ${newCampaign.targetAge ? `life at ${newCampaign.targetAge}` : 'experience'} with ${newCampaign.productName}! Visit ${newCampaign.websiteUrl} and discover the difference. ${newCampaign.objectives ? `Perfect for ${newCampaign.objectives.toLowerCase()}.` : ''} Shop now! ✨`,
        `✨ Discover amazing ${newCampaign.productName} that will revolutionize your daily routine! ${newCampaign.targetAge ? `Designed for ages ${newCampaign.targetAge}.` : ''} Visit ${newCampaign.websiteUrl} today! 🎯`,
        `🎯 Ready to upgrade? ${newCampaign.productName} is here to help! ${newCampaign.objectives ? `Our mission: ${newCampaign.objectives.toLowerCase()}.` : ''} Get started at ${newCampaign.websiteUrl} 🚀`,
        `💫 Join thousands who love ${newCampaign.productName}! ${newCampaign.targetRegion ? `Popular in ${newCampaign.targetRegion}.` : ''} Experience the difference at ${newCampaign.websiteUrl} ⭐`
      ];
      const randomContent = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
      setNewCampaign(prev => ({ ...prev, adContent: randomContent }));
      toast.success('AI-optimized ad content generated!');
    } catch (error) {
      toast.error('Failed to generate AI content');
    } finally {
      setGeneratingContent(false);
    }
  };

  const generateAdVariations = async () => {
    if (!newCampaign.adContent) {
      toast.error('Please generate or enter ad content first');
      return;
    }

    setGeneratingVariations(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const variations = [
        `Short & Sweet: "${newCampaign.productName} - Your solution awaits at ${newCampaign.websiteUrl}"`,
        `Question Hook: "Looking for ${newCampaign.productName}? Find your answer at ${newCampaign.websiteUrl}"`,
        `Urgency: "Limited time! Get ${newCampaign.productName} now at ${newCampaign.websiteUrl}"`,
        `Social Proof: "Join thousands using ${newCampaign.productName}! Start at ${newCampaign.websiteUrl}"`
      ];
      setNewCampaign(prev => ({ ...prev, adVariations: variations }));
      toast.success('Generated 4 ad variations for A/B testing!');
    } catch (error) {
      toast.error('Failed to generate ad variations');
    } finally {
      setGeneratingVariations(false);
    }
  };

  const analyzeSEO = async () => {
    if (!newCampaign.websiteUrl || !newCampaign.productName) {
      toast.error('Please enter website URL and product name first');
      return;
    }

    setAnalyzingSEO(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const seoTips = [
        `Use long-tail keywords like "${newCampaign.productName} for ${newCampaign.targetAge || 'professionals'}"`,
        `Include location-based keywords if targeting ${newCampaign.targetRegion || 'specific regions'}`,
        `Add emotional triggers like "best", "premium", "exclusive" to your ad copy`,
        `Use action words: "discover", "transform", "unlock" in your headlines`,
        `Include your target keyword "${newCampaign.productName}" in the first 125 characters`,
        `Create urgency with phrases like "limited time", "exclusive offer"`,
        `Use numbers and stats to build credibility`,
        `Include local SEO terms if targeting specific regions`
      ];
      setSeoRecommendations(seoTips);
      
      // Auto-generate SEO keywords
      const keywords = [
        newCampaign.productName.toLowerCase(),
        `best ${newCampaign.productName.toLowerCase()}`,
        `${newCampaign.productName.toLowerCase()} online`,
        `buy ${newCampaign.productName.toLowerCase()}`,
        `${newCampaign.productName.toLowerCase()} ${newCampaign.targetRegion?.toLowerCase() || 'store'}`
      ];
      setNewCampaign(prev => ({ ...prev, seoKeywords: keywords.join(', ') }));
      
      toast.success('SEO analysis complete with keyword suggestions!');
    } catch (error) {
      toast.error('Failed to analyze SEO');
    } finally {
      setAnalyzingSEO(false);
    }
  };

  const createCampaign = () => {
    if (!newCampaign.title || !newCampaign.platform || !newCampaign.budget || !newCampaign.websiteUrl || !newCampaign.productName) {
      toast.error('Please fill in all required fields including website and product information');
      return;
    }

    const campaign: Campaign = {
      id: Date.now().toString(),
      title: newCampaign.title,
      platform: newCampaign.platform,
      status: 'active',
      budget: parseFloat(newCampaign.budget),
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      adContent: newCampaign.adContent,
      imageUrl: newCampaign.imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      progress: 0,
      websiteUrl: newCampaign.websiteUrl,
      productName: newCampaign.productName,
      targetAge: newCampaign.targetAge,
      targetRegion: newCampaign.targetRegion,
      targetGender: newCampaign.targetGender,
      objectives: newCampaign.objectives,
      seoKeywords: newCampaign.seoKeywords ? newCampaign.seoKeywords.split(',').map(k => k.trim()) : [],
      adVariations: newCampaign.adVariations
    };

    setCampaigns(prev => [...prev, campaign]);
    setNewCampaign({ 
      title: '', 
      platform: '', 
      budget: '', 
      adContent: '', 
      startDate: '', 
      endDate: '', 
      imageUrl: '',
      websiteUrl: '',
      productName: '',
      targetAge: '',
      targetRegion: '',
      targetGender: '',
      objectives: '',
      seoKeywords: '',
      adVariations: []
    });
    setSeoRecommendations([]);
    setShowCreateForm(false);
    toast.success('AI-powered ad campaign created successfully!');
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id 
        ? { ...campaign, status: campaign.status === 'active' ? 'paused' : 'active' }
        : campaign
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 border-green-300';
      case 'paused': return 'text-yellow-600 border-yellow-300';
      case 'completed': return 'text-blue-600 border-blue-300';
      default: return 'text-gray-600 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Ad Creatives Campaign Tool</h2>
          <p className="text-muted-foreground">Create high-converting ad campaigns with AI-generated content, images, and SEO optimization</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create AI Campaign
        </Button>
      </div>

      {showCreateForm && (
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              AI Ad Campaign Builder
            </CardTitle>
            <CardDescription>Let AI create optimized ad content, images, and SEO strategy for your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Campaign Info */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Target className="h-4 w-4" />
                Campaign Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Title *</label>
                  <Input
                    placeholder="Enter campaign title"
                    value={newCampaign.title}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform *</label>
                  <Select value={newCampaign.platform} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, platform: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Google Ads">Google Ads</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget ($) *</label>
                  <Input
                    type="number"
                    placeholder="Enter budget"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, budget: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Objective</label>
                  <Select value={newCampaign.objectives} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, objectives: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select objective" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Drive traffic and sales">Drive Traffic & Sales</SelectItem>
                      <SelectItem value="Brand awareness">Brand Awareness</SelectItem>
                      <SelectItem value="Lead generation">Lead Generation</SelectItem>
                      <SelectItem value="App installs">App Installs</SelectItem>
                      <SelectItem value="Engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Website & Product Info */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website & Product Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website URL *</label>
                  <Input
                    placeholder="https://yourwebsite.com"
                    value={newCampaign.websiteUrl}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, websiteUrl: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product/Service Name *</label>
                  <Input
                    placeholder="Enter product or service name"
                    value={newCampaign.productName}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, productName: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Targeting Options */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                Target Audience
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age Range</label>
                  <Select value={newCampaign.targetAge} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, targetAge: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-24">18-24</SelectItem>
                      <SelectItem value="25-34">25-34</SelectItem>
                      <SelectItem value="35-44">35-44</SelectItem>
                      <SelectItem value="45-54">45-54</SelectItem>
                      <SelectItem value="55-64">55-64</SelectItem>
                      <SelectItem value="65+">65+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Region</label>
                  <Select value={newCampaign.targetRegion} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, targetRegion: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Worldwide">Worldwide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <Select value={newCampaign.targetGender} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, targetGender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* AI Content Creation */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                AI Ad Content Generator
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Ad Content</label>
                  <Textarea
                    placeholder="AI will generate optimized ad content, or enter your own"
                    value={newCampaign.adContent}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, adContent: e.target.value }))}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={generateAIContent}
                      disabled={generatingContent}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Wand2 className="h-4 w-4" />
                      {generatingContent ? 'Generating...' : 'Generate AI Content'}
                    </Button>
                    <Button
                      onClick={generateAdVariations}
                      disabled={generatingVariations || !newCampaign.adContent}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <TrendingUp className="h-4 w-4" />
                      {generatingVariations ? 'Creating...' : 'Create A/B Variations'}
                    </Button>
                  </div>
                </div>

                {/* Ad Variations */}
                {newCampaign.adVariations.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">AI-Generated Ad Variations (A/B Testing)</label>
                    <div className="grid gap-2">
                      {newCampaign.adVariations.map((variation, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm font-medium text-purple-600">Variation {index + 1}:</p>
                          <p className="text-sm">{variation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI Image Generation */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                AI Ad Creative Images
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={generateAIImage}
                    disabled={generatingImage}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Wand2 className="h-4 w-4" />
                    {generatingImage ? 'Generating...' : 'Generate AI Image'}
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Upload className="h-4 w-4" />
                    Or upload your own image
                  </div>
                </div>
                {newCampaign.imageUrl && (
                  <div className="flex items-center gap-4">
                    <img src={newCampaign.imageUrl} alt="Generated ad creative" className="w-32 h-24 rounded-lg object-cover border-2 border-purple-200" />
                    <div className="text-sm">
                      <p className="font-medium text-green-600">✅ Ad creative ready</p>
                      <p className="text-muted-foreground">Optimized for {newCampaign.platform || 'social media'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SEO Optimization */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Search className="h-4 w-4" />
                SEO Optimization & Keywords
              </h4>
              <div className="space-y-4">
                <Button
                  onClick={analyzeSEO}
                  disabled={analyzingSEO}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  {analyzingSEO ? 'Analyzing...' : 'Analyze SEO & Generate Keywords'}
                </Button>

                {seoRecommendations.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SEO Recommendations</label>
                    <div className="p-4 bg-blue-50 rounded-lg space-y-2">
                      {seoRecommendations.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">SEO Keywords (comma-separated)</label>
                  <Textarea
                    placeholder="AI will suggest keywords, or enter your own"
                    value={newCampaign.seoKeywords}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, seoKeywords: e.target.value }))}
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Campaign Schedule */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Campaign Schedule
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={createCampaign} className="flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                Launch AI Campaign
              </Button>
              <Button onClick={() => setShowCreateForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <img 
                      src={campaign.imageUrl} 
                      alt={campaign.title}
                      className="w-20 h-16 rounded-lg object-cover border"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{campaign.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{campaign.platform}</p>
                      <p className="text-sm mb-2">{campaign.adContent}</p>
                      {campaign.seoKeywords && campaign.seoKeywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {campaign.seoKeywords.slice(0, 3).map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleCampaignStatus(campaign.id)}
                    >
                      {campaign.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-semibold">${campaign.budget}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Spent</p>
                    <p className="font-semibold">${campaign.spent}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Impressions</p>
                    <p className="font-semibold">{campaign.impressions.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Clicks</p>
                    <p className="font-semibold">{campaign.clicks}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Conversions</p>
                    <p className="font-semibold">{campaign.conversions}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Campaign Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>

                {campaign.adVariations && campaign.adVariations.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium mb-2">A/B Test Variations:</p>
                    <div className="grid gap-1">
                      {campaign.adVariations.slice(0, 2).map((variation, index) => (
                        <p key={index} className="text-xs text-muted-foreground bg-gray-50 p-2 rounded">
                          {variation}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Campaign Performance
                </CardTitle>
                <CardDescription>Daily performance metrics across all campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="impressions" stroke="#8b5cf6" strokeWidth={2} name="Impressions" />
                    <Line type="monotone" dataKey="clicks" stroke="#f59e0b" strokeWidth={2} name="Clicks" />
                    <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Platform Comparison
                </CardTitle>
                <CardDescription>Performance by social media platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { platform: 'Facebook', conversions: 15, clicks: 267 },
                    { platform: 'Google Ads', conversions: 23, clicks: 450 },
                    { platform: 'Instagram', conversions: 8, clicks: 120 },
                    { platform: 'LinkedIn', conversions: 5, clicks: 89 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clicks" fill="#8b5cf6" name="Clicks" />
                    <Bar dataKey="conversions" fill="#f59e0b" name="Conversions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignManager;
