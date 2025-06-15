import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrendingUp, Plus, Play, Pause, BarChart3, Image, Target, Calendar, DollarSign, Globe, Users, MapPin, Wand2, Search, Lightbulb, Upload, ImageIcon, UserCheck, Star, Award, TrendingDown, Trash2, Crown, Zap, Rocket, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

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
  sales: number;
  leadQualityScore: number;
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
  leadQuality?: 'high' | 'medium' | 'low';
  geographicalPerformance?: {
    region: string;
    conversions: number;
    revenue: number;
  }[];
  qualifiedLeads?: number;
  costPerLead?: number;
  salesConversionRate?: number;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  campaignLimit: number;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
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
      sales: 18,
      leadQualityScore: 85,
      qualifiedLeads: 15,
      costPerLead: 25,
      salesConversionRate: 78.3,
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
      leadQuality: 'high',
      seoKeywords: ['digital templates', 'creative design', 'professional templates'],
      adVariations: ['Premium digital templates for creative professionals', 'Transform your designs with professional templates', 'Unlock creativity with our digital template collection'],
      geographicalPerformance: [
        { region: 'California', conversions: 8, revenue: 2400 },
        { region: 'New York', conversions: 5, revenue: 1500 },
        { region: 'Texas', conversions: 5, revenue: 1350 }
      ]
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
      sales: 12,
      leadQualityScore: 72,
      qualifiedLeads: 9,
      costPerLead: 30.7,
      salesConversionRate: 80.0,
      startDate: '2024-06-03',
      endDate: '2024-06-18',
      adContent: 'Beautiful printable designs for home and office',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      progress: 92,
      websiteUrl: 'https://printables.com',
      productName: 'Printable Designs',
      targetAge: '30-55',
      targetRegion: 'Canada',
      leadQuality: 'medium',
      objectives: 'Brand awareness',
      seoKeywords: ['printables', 'home decor', 'office organization'],
      adVariations: ['Beautiful printable designs for home and office', 'Organize your space with stunning printables', 'Download and print beautiful designs instantly'],
      geographicalPerformance: [
        { region: 'Ontario', conversions: 6, revenue: 900 },
        { region: 'British Columbia', conversions: 4, revenue: 600 },
        { region: 'Quebec', conversions: 5, revenue: 750 }
      ]
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPlansSelection, setShowPlansSelection] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedPaymentPackage, setSelectedPaymentPackage] = useState<any>(null);
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

  const paymentPackages = [
    {
      id: 'starter_impressions',
      name: 'Starter Package',
      impressions: 1000,
      price: 15,
      costPer100: 1.50,
      features: ['1,000 organic impressions', 'Basic targeting', 'Standard reporting']
    },
    {
      id: 'professional_impressions',
      name: 'Professional Package',
      impressions: 5000,
      price: 65,
      costPer100: 1.30,
      features: ['5,000 organic impressions', 'Advanced targeting', 'Detailed analytics', 'A/B testing'],
      popular: true
    },
    {
      id: 'enterprise_impressions',
      name: 'Enterprise Package',
      impressions: 15000,
      price: 180,
      costPer100: 1.20,
      features: ['15,000 organic impressions', 'Premium targeting', 'Real-time analytics', 'Priority support']
    },
    {
      id: 'custom_impressions',
      name: 'Custom Package',
      impressions: 0,
      price: 0,
      costPer100: 1.00,
      features: ['Custom impression count', 'Bulk discount pricing', 'Dedicated account manager']
    }
  ];

  const performanceData = [
    { date: 'Day 1', impressions: 1200, clicks: 45, conversions: 3, sales: 2, leadQuality: 75 },
    { date: 'Day 2', impressions: 1850, clicks: 67, conversions: 5, sales: 4, leadQuality: 82 },
    { date: 'Day 3', impressions: 2100, clicks: 89, conversions: 8, sales: 6, leadQuality: 78 },
    { date: 'Day 4', impressions: 1900, clicks: 72, conversions: 6, sales: 5, leadQuality: 85 },
    { date: 'Day 5', impressions: 2300, clicks: 95, conversions: 12, sales: 9, leadQuality: 88 },
    { date: 'Day 6', impressions: 2600, clicks: 108, conversions: 15, sales: 12, leadQuality: 90 },
    { date: 'Day 7', impressions: 2200, clicks: 88, conversions: 10, sales: 8, leadQuality: 86 }
  ];

  const leadQualityData = [
    { name: 'High Quality', value: 65, color: '#10b981' },
    { name: 'Medium Quality', value: 25, color: '#f59e0b' },
    { name: 'Low Quality', value: 10, color: '#ef4444' }
  ];

  const geographicalData = [
    { region: 'California', leads: 45, sales: 38, revenue: 11400 },
    { region: 'New York', leads: 32, sales: 28, revenue: 8400 },
    { region: 'Texas', leads: 28, sales: 22, revenue: 6600 },
    { region: 'Florida', leads: 25, sales: 20, revenue: 6000 }
  ];

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
    toast.success('Campaign deleted successfully!');
  };

  const handleCreateCampaignClick = () => {
    setShowCreateForm(true);
  };

  const generateAIContent = async () => {
    if (!newCampaign.websiteUrl || !newCampaign.productName) {
      toast.error('Please enter website URL and product name first');
      return;
    }

    setGeneratingContent(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const generatedContent = `Discover premium ${newCampaign.productName} at ${newCampaign.websiteUrl} - Transform your experience with our high-quality solutions designed for ${newCampaign.targetAge || 'professionals'}`;
      setNewCampaign(prev => ({ ...prev, adContent: generatedContent }));
      toast.success('AI-generated organic traffic content ready!');
    } catch (error) {
      toast.error('Failed to generate content');
    } finally {
      setGeneratingContent(false);
    }
  };

  const generateAIImage = async () => {
    if (!newCampaign.productName) {
      toast.error('Please enter product name first');
      return;
    }

    setGeneratingImage(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const imageUrl = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&auto=format`;
      setNewCampaign(prev => ({ ...prev, imageUrl }));
      toast.success('AI-generated organic traffic image created!');
    } catch (error) {
      toast.error('Failed to generate image');
    } finally {
      setGeneratingImage(false);
    }
  };

  const analyzeSEO = async () => {
    if (!newCampaign.websiteUrl || !newCampaign.productName) {
      toast.error('Please enter website URL and product name first');
      return;
    }

    setAnalyzingSEO(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const recommendations = [
        `Target high-intent keywords like "buy ${newCampaign.productName}" for quality leads`,
        `Optimize landing page for "${newCampaign.productName} reviews" to build trust`,
        `Use location-based keywords for ${newCampaign.targetRegion || 'your target region'}`,
        `Create urgency with "limited time ${newCampaign.productName} offer"`,
        `Include social proof and testimonials to increase conversion rates`
      ];
      setSeoRecommendations(recommendations);
      const keywords = `${newCampaign.productName}, buy ${newCampaign.productName}, ${newCampaign.productName} reviews, best ${newCampaign.productName}`;
      setNewCampaign(prev => ({ ...prev, seoKeywords: keywords }));
      toast.success('SEO analysis complete with lead generation recommendations!');
    } catch (error) {
      toast.error('Failed to analyze SEO');
    } finally {
      setAnalyzingSEO(false);
    }
  };

  const handlePaymentSelection = (pkg: any) => {
    setSelectedPaymentPackage(pkg);
    setShowPaymentDialog(false);
    
    if (pkg.id === 'custom_impressions') {
      toast.info('Contact us for custom pricing on bulk impressions');
      return;
    }
    
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=your-paypal-email@example.com&item_name=${encodeURIComponent(pkg.name + ' - ' + pkg.impressions + ' Organic Impressions')}&amount=${pkg.price}&currency_code=USD&return=https://yoursite.com/payment-success&cancel_return=https://yoursite.com/payment-cancelled`;
    
    toast.success(`Redirecting to PayPal for ${pkg.name} payment ($${pkg.price})`);
    
    setTimeout(() => {
      toast.success(`Payment successful! You now have ${pkg.impressions.toLocaleString()} organic impressions available.`);
    }, 2000);
  };

  const generateAdVariations = async () => {
    if (!newCampaign.adContent) {
      toast.error('Please generate or enter ad content first');
      return;
    }

    setShowPaymentDialog(true);
    return;
  };

  const processAdVariations = async () => {
    setGeneratingVariations(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const variations = [
        `Premium Focus: "Exclusive ${newCampaign.productName} for serious buyers at ${newCampaign.websiteUrl}"`,
        `Value Proposition: "Transform your results with ${newCampaign.productName} - Visit ${newCampaign.websiteUrl}"`,
        `Social Proof: "Join 1000+ satisfied customers using ${newCampaign.productName} at ${newCampaign.websiteUrl}"`,
        `Urgency + Quality: "Limited premium ${newCampaign.productName} available at ${newCampaign.websiteUrl}"`
      ];
      setNewCampaign(prev => ({ ...prev, adVariations: variations }));
      toast.success('Generated 4 high-converting ad variations with organic impressions!');
    } catch (error) {
      toast.error('Failed to generate ad variations');
    } finally {
      setGeneratingVariations(false);
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
      sales: 0,
      leadQualityScore: 0,
      qualifiedLeads: 0,
      costPerLead: 0,
      salesConversionRate: 0,
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
      leadQuality: 'high',
      seoKeywords: newCampaign.seoKeywords ? newCampaign.seoKeywords.split(',').map(k => k.trim()) : [],
      adVariations: newCampaign.adVariations,
      geographicalPerformance: []
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
    setSelectedPlan(null);
    setSelectedPaymentPackage(null);
    toast.success(`High-converting AI campaign created with organic impressions!`);
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

  const getLeadQualityColor = (quality: string) => {
    switch (quality) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Lead Generation & Sales Campaign Tool</h2>
          <p className="text-muted-foreground">Create high-converting campaigns with organic impressions - Pay per click/impression</p>
        </div>
        <Button onClick={handleCreateCampaignClick} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Campaign (Pay-Per-Impression)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Leads Generated</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +35%
              </span>
              from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Conversion Rate</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.9%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2%
              </span>
              above industry average
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Per Quality Lead</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$27.50</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -15%
              </span>
              cost reduction
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lead Quality Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85/100</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                Excellent
              </span>
              quality rating
            </p>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Choose Your Impression Package
            </DialogTitle>
            <DialogDescription>
              Pay only for the organic impressions you need - Real traffic, real results
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {paymentPackages.map((pkg) => (
              <Card key={pkg.id} className={`relative cursor-pointer transition-all hover:shadow-lg ${pkg.popular ? 'border-2 border-blue-500' : 'border'}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">Best Value</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">${pkg.price}</span>
                      {pkg.impressions > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>{pkg.impressions.toLocaleString()} organic impressions</p>
                          <p className="text-green-600 font-medium">${pkg.costPer100}/100 impressions</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handlePaymentSelection(pkg)} 
                    className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay with PayPal
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Why Choose Our Organic Impressions?</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 100% real, organic traffic from actual users</li>
              <li>• Geo-targeted to your specified regions</li>
              <li>• Higher engagement rates than standard ads</li>
              <li>• No bots or fake traffic - guaranteed quality</li>
              <li>• Instant PayPal payment processing</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>

      {showCreateForm && (
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              AI Campaign Builder - Pay Per Organic Impression
              {selectedPaymentPackage && (
                <Badge className="ml-2 bg-green-100 text-green-800">
                  {selectedPaymentPackage.impressions.toLocaleString()} impressions purchased
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Create campaigns with real organic traffic - pay only for actual impressions delivered</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
                      <SelectItem value="Facebook">Facebook (Best for B2C leads)</SelectItem>
                      <SelectItem value="Instagram">Instagram (Visual products)</SelectItem>
                      <SelectItem value="Google Ads">Google Ads (High intent leads)</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn (B2B quality leads)</SelectItem>
                      <SelectItem value="Twitter">Twitter (Engagement leads)</SelectItem>
                      <SelectItem value="TikTok">TikTok (Young demographic)</SelectItem>
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
                      <SelectItem value="Generate quality leads">Generate Quality Leads</SelectItem>
                      <SelectItem value="Drive sales conversions">Drive Sales Conversions</SelectItem>
                      <SelectItem value="Increase brand awareness">Increase Brand Awareness</SelectItem>
                      <SelectItem value="App installs">App Installs</SelectItem>
                      <SelectItem value="Build email list">Build Email List</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

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

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Geographical & Quality Targeting
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Target Region *</label>
                  <Select value={newCampaign.targetRegion} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, targetRegion: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Custom Geographic Area">Custom Geographic Area</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Age (Quality Focused)</label>
                  <Select value={newCampaign.targetAge} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, targetAge: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25-34">25-34 (High purchasing power)</SelectItem>
                      <SelectItem value="35-44">35-44 (Peak earning years)</SelectItem>
                      <SelectItem value="45-54">45-54 (Established professionals)</SelectItem>
                      <SelectItem value="55-64">55-64 (High disposable income)</SelectItem>
                      <SelectItem value="18-24">18-24 (Emerging market)</SelectItem>
                      <SelectItem value="65+">65+ (Mature market)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender Focus</label>
                  <Select value={newCampaign.targetGender} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, targetGender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Genders</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                AI Ad Content Generator (Organic Traffic Optimized)
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organic Traffic Ad Content</label>
                  <Textarea
                    placeholder="AI will generate content optimized for organic engagement and real user interaction"
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
                      {generatingContent ? 'Generating...' : 'Generate Organic Content'}
                    </Button>
                    <Button
                      onClick={generateAdVariations}
                      disabled={generatingVariations || !newCampaign.adContent}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <TrendingUp className="h-4 w-4" />
                      Create High-Converting Variations
                    </Button>
                  </div>
                </div>

                {!selectedPaymentPackage && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <p className="font-medium text-blue-800">Organic Impression Pricing</p>
                    </div>
                    <p className="text-sm text-blue-700 mb-3">
                      Generate high-converting ad variations with real organic impressions starting at $1.50/100 impressions
                    </p>
                    <Button
                      onClick={() => setShowPaymentDialog(true)}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      View Impression Packages
                    </Button>
                  </div>
                )}

                {selectedPaymentPackage && !newCampaign.adVariations.length && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 mb-3">
                      Ready to generate variations with your purchased {selectedPaymentPackage.impressions.toLocaleString()} organic impressions
                    </p>
                    <Button
                      onClick={processAdVariations}
                      disabled={generatingVariations}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {generatingVariations ? 'Creating...' : 'Create Variations Now'}
                    </Button>
                  </div>
                )}

                {newCampaign.adVariations.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Organic Traffic Ad Variations</label>
                    <div className="grid gap-2">
                      {newCampaign.adVariations.map((variation, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-md border border-green-200">
                          <p className="text-sm font-medium text-green-600">Organic Variation {index + 1}:</p>
                          <p className="text-sm">{variation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                AI Visual Content for Organic Traffic
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
                    {generatingImage ? 'Generating...' : 'Generate Organic-Optimized Image'}
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Upload className="h-4 w-4" />
                    Or upload your own creative
                  </div>
                </div>
                {newCampaign.imageUrl && (
                  <div className="flex items-center gap-4">
                    <img src={newCampaign.imageUrl} alt="Organic traffic creative" className="w-32 h-24 rounded-lg object-cover border-2 border-green-200" />
                    <div className="text-sm">
                      <p className="font-medium text-green-600">✅ Organic traffic creative ready</p>
                      <p className="text-muted-foreground">Optimized for {newCampaign.platform || 'organic engagement'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Search className="h-4 w-4" />
                SEO & Lead Quality Optimization
              </h4>
              <div className="space-y-4">
                <Button
                  onClick={analyzeSEO}
                  disabled={analyzingSEO}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  {analyzingSEO ? 'Analyzing...' : 'Analyze Lead Generation SEO Strategy'}
                </Button>

                {seoRecommendations.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Lead Generation SEO Recommendations</label>
                    <div className="p-4 bg-blue-50 rounded-lg space-y-2">
                      {seoRecommendations.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">High-Intent Keywords (comma-separated)</label>
                  <Textarea
                    placeholder="AI will suggest buyer-intent keywords for quality leads"
                    value={newCampaign.seoKeywords}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, seoKeywords: e.target.value }))}
                    rows={2}
                  />
                </div>
              </div>
            </div>

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
                <Target className="h-4 w-4" />
                Launch Organic Traffic Campaign
              </Button>
              <Button onClick={() => {
                setShowCreateForm(false);
                setSelectedPlan(null);
                setSelectedPaymentPackage(null);
              }} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          <TabsTrigger value="leads">Lead Quality</TabsTrigger>
          <TabsTrigger value="geographical">Geographical Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="border-l-4 border-l-green-500">
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
                      <div className="flex flex-wrap gap-2 mb-2">
                        {campaign.leadQuality && (
                          <Badge className={getLeadQualityColor(campaign.leadQuality)}>
                            {campaign.leadQuality} quality leads
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-green-600">
                          {campaign.leadQualityScore}/100 Quality Score
                        </Badge>
                      </div>
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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteCampaign(campaign.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-semibold">${campaign.budget}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Spent</p>
                    <p className="font-semibold">${campaign.spent}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Quality Leads</p>
                    <p className="font-semibold text-green-600">{campaign.qualifiedLeads}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Sales</p>
                    <p className="font-semibold text-blue-600">{campaign.sales}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="font-semibold">{campaign.salesConversionRate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Cost/Lead</p>
                    <p className="font-semibold">${campaign.costPerLead}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Target Region</p>
                    <p className="font-semibold text-xs">{campaign.targetRegion}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Campaign Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>

                {campaign.geographicalPerformance && campaign.geographicalPerformance.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Top Performing Regions:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {campaign.geographicalPerformance.map((region, index) => (
                        <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                          <p className="font-medium">{region.region}</p>
                          <p className="text-green-600">{region.conversions} sales</p>
                          <p className="text-blue-600">${region.revenue}</p>
                        </div>
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
                  Lead Quality & Sales Performance
                </CardTitle>
                <CardDescription>Daily performance metrics with lead quality scores</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="conversions" stroke="#8b5cf6" strokeWidth={2} name="Conversions" />
                    <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} name="Sales" />
                    <Line type="monotone" dataKey="leadQuality" stroke="#f59e0b" strokeWidth={2} name="Lead Quality Score" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Platform ROI Comparison
                </CardTitle>
                <CardDescription>Return on investment by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { platform: 'Google Ads', sales: 18, roi: 485, qualityScore: 85 },
                    { platform: 'Facebook', sales: 12, roi: 320, qualityScore: 72 },
                    { platform: 'LinkedIn', sales: 8, roi: 280, qualityScore: 90 },
                    { platform: 'Instagram', sales: 6, roi: 180, qualityScore: 68 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#10b981" name="Sales" />
                    <Bar dataKey="roi" fill="#8b5cf6" name="ROI %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Lead Quality Distribution
                </CardTitle>
                <CardDescription>Quality breakdown of generated leads</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadQualityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {leadQualityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Lead Quality Metrics
                </CardTitle>
                <CardDescription>Key indicators of lead quality performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-green-700">High Quality Leads</p>
                    <p className="text-sm text-green-600">Ready to purchase</p>
                  </div>
                  <div className="text-2xl font-bold text-green-700">65%</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-yellow-700">Medium Quality Leads</p>
                    <p className="text-sm text-yellow-600">Needs nurturing</p>
                  </div>
                  <div className="text-2xl font-bold text-yellow-700">25%</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-red-700">Low Quality Leads</p>
                    <p className="text-sm text-red-600">Requires re-targeting</p>
                  </div>
                  <div className="text-2xl font-bold text-red-700">10%</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographical">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Geographical Performance Overview
                </CardTitle>
                <CardDescription>Sales and lead performance by geographical region</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={geographicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#8b5cf6" name="Leads Generated" />
                    <Bar dataKey="sales" fill="#10b981" name="Sales Closed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {geographicalData.map((region, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{region.region}</h4>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Leads</span>
                        <span className="font-medium">{region.leads}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Sales</span>
                        <span className="font-medium text-green-600">{region.sales}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Revenue</span>
                        <span className="font-medium text-blue-600">${region.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Conversion</span>
                        <span className="font-medium">{((region.sales / region.leads) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignManager;
