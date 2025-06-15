
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Plus, Play, Pause, BarChart3, Image, Target, Calendar, DollarSign } from "lucide-react";
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
      progress: 75
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
      progress: 92
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
    imageUrl: ''
  });
  const [generatingImage, setGeneratingImage] = useState(false);

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
      // Simulate AI image generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      const placeholderImages = [
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
      ];
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      setNewCampaign(prev => ({ ...prev, imageUrl: randomImage }));
      toast.success('AI image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate AI image');
    } finally {
      setGeneratingImage(false);
    }
  };

  const createCampaign = () => {
    if (!newCampaign.title || !newCampaign.platform || !newCampaign.budget) {
      toast.error('Please fill in all required fields');
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
      progress: 0
    };

    setCampaigns(prev => [...prev, campaign]);
    setNewCampaign({ title: '', platform: '', budget: '', adContent: '', startDate: '', endDate: '', imageUrl: '' });
    setShowCreateForm(false);
    toast.success('Campaign created successfully!');
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
          <h2 className="text-2xl font-bold">Campaign Management</h2>
          <p className="text-muted-foreground">Track and manage your marketing campaigns</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {showCreateForm && (
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
            <CardDescription>Set up a new marketing campaign with AI-generated content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="date"
                  value={newCampaign.startDate}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ad Content</label>
              <Textarea
                placeholder="Enter your ad content and description"
                value={newCampaign.adContent}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, adContent: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign Image</label>
              <div className="flex gap-2">
                <Button
                  onClick={generateAIImage}
                  disabled={generatingImage}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Image className="h-4 w-4" />
                  {generatingImage ? 'Generating...' : 'Generate AI Image'}
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={createCampaign} className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Create Campaign
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
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{campaign.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{campaign.platform}</p>
                      <p className="text-sm">{campaign.adContent}</p>
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
