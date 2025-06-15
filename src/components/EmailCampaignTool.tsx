import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Mail, Send, Users, TrendingUp, Clock, Settings, Plus, Eye, Edit, Trash2, Calendar, Zap, Wand2, Image as ImageIcon, Video, Copy, BarChart3, Upload, RefreshCw, Target, Play, Pause } from "lucide-react";
import { toast } from "sonner";

const EmailCampaignTool = () => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [isCreatingEmail, setIsCreatingEmail] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [previewEmail, setPreviewEmail] = useState(null);
  const [editingEmail, setEditingEmail] = useState(null);
  const [analyticsEmail, setAnalyticsEmail] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState({});
  
  const [emailList, setEmailList] = useState([
    { 
      id: 1, 
      subject: "🚀 AI-Generated: Boost Your Organic Traffic with Our Digital Toolkit", 
      status: "Published", 
      opens: 1245, 
      clicks: 387, 
      sent: 2800, 
      content: "Discover how AI-powered digital products can transform your organic traffic strategy. Our comprehensive suite includes SEO optimization tools, content generation platforms, and traffic analytics dashboards designed specifically for organic growth. Join thousands of successful entrepreneurs who have mastered sustainable online growth with our proven digital solutions.",
      creative: {
        type: "video",
        url: "https://videos.pexels.com/video-files/3196644/3196644-hd_1920_1080_25fps.mp4",
        alt: "AI-generated video showcasing organic traffic growth strategies and digital marketing tools"
      },
      aiGenerated: true,
      targetAudience: "organic-traffic"
    },
    { 
      id: 2, 
      subject: "🎯 AI Content: SEO Mastery - New Digital Products for Organic Growth", 
      status: "Draft", 
      opens: 0, 
      clicks: 0, 
      sent: 0, 
      content: "Elevate your SEO game with our latest AI-curated collection of digital products. From advanced keyword research tools to automated content optimization systems, everything you need for sustainable organic traffic growth. Our products are designed by SEO experts and enhanced with AI to deliver maximum impact for your organic marketing efforts.",
      creative: {
        type: "image",
        url: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop",
        alt: "AI-generated image featuring SEO tools and organic traffic analytics dashboard"
      },
      aiGenerated: true,
      targetAudience: "organic-traffic"
    },
    { 
      id: 3, 
      subject: "📈 AI-Powered: Exclusive Organic Traffic Generation Masterclass", 
      status: "Scheduled", 
      opens: 0, 
      clicks: 0, 
      sent: 2150, 
      content: "Join our exclusive AI-enhanced masterclass on generating organic traffic that converts. Learn cutting-edge strategies powered by artificial intelligence, advanced SEO techniques, and proven content marketing methods used by top digital marketers to build sustainable online businesses. This comprehensive training includes AI tools, templates, and step-by-step guidance.",
      creative: {
        type: "video",
        url: "https://videos.pexels.com/video-files/5011647/5011647-hd_1920_1080_30fps.mp4",
        alt: "AI-generated video presenting organic traffic masterclass with digital marketing strategies"
      },
      aiGenerated: true,
      targetAudience: "organic-traffic"
    },
  ]);

  const [newEmail, setNewEmail] = useState({
    subject: "",
    content: "",
    recipients: "organic-traffic",
    scheduleDate: "",
    creative: {
      type: "image",
      url: "",
      alt: ""
    },
    aiGenerated: false,
    targetAudience: "organic-traffic"
  });

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [platformCredentials, setPlatformCredentials] = useState({
    apiKey: "",
    listId: ""
  });

  const emailAnalytics = [
    { name: 'Week 1', sent: 1200, opened: 520, clicked: 156, unsubscribed: 12 },
    { name: 'Week 2', sent: 1450, opened: 638, clicked: 191, unsubscribed: 18 },
    { name: 'Week 3', sent: 1600, opened: 768, clicked: 230, unsubscribed: 22 },
    { name: 'Week 4', sent: 1850, opened: 925, clicked: 278, unsubscribed: 25 },
  ];

  const campaignStats = {
    totalSent: 6100,
    totalOpened: 2851,
    totalClicked: 855,
    openRate: 46.7,
    clickRate: 14.0,
    unsubscribeRate: 1.3
  };

  const organicTrafficContent = [
    "🚀 Transform your organic traffic with AI-powered SEO strategies and cutting-edge digital tools. Our comprehensive suite helps entrepreneurs build sustainable online businesses through proven organic growth methods, advanced keyword optimization, and intelligent content marketing systems.",
    "📈 Discover the future of organic traffic generation with our AI-enhanced digital products. From automated SEO analysis to smart content optimization, everything you need to dominate search results and attract high-quality traffic that converts into loyal customers.",
    "🎯 Boost your website's organic visibility using our expert-curated collection of AI-powered SEO resources. Master technical SEO, content marketing, and organic growth strategies that have helped thousands of businesses achieve sustainable online success.",
    "💡 Master organic traffic generation with our revolutionary AI-driven digital products. Comprehensive step-by-step guides, automated SEO tools, and intelligent analytics help you build lasting online success through sustainable organic growth strategies.",
    "🌟 Unlock sustainable organic growth with our AI-powered digital marketplace. Proven strategies, intelligent templates, and cutting-edge tools designed by SEO experts help businesses achieve higher rankings, better conversions, and long-term online success.",
    "⚡ Experience the difference that AI-enhanced organic traffic makes for your business. Our digital products combine artificial intelligence with proven SEO methodologies to deliver exceptional results in search rankings and sustainable traffic growth."
  ];

  const handleGenerateAIContent = async () => {
    if (!newEmail.subject.trim()) {
      toast.error("Please enter a subject first to generate AI content");
      return;
    }

    setIsGeneratingContent(true);
    toast.info("🤖 AI is generating optimized content for organic traffic...");

    setTimeout(() => {
      const randomContent = organicTrafficContent[Math.floor(Math.random() * organicTrafficContent.length)];
      const isVideoCreative = Math.random() > 0.5;
      let randomCreative;

      if (isVideoCreative) {
        randomCreative = {
          type: "video",
          url: "https://videos.pexels.com/video-files/3196644/3196644-hd_1920_1080_25fps.mp4",
          alt: "AI-generated video showcasing organic traffic growth strategies and digital marketing tools"
        };
      } else {
        randomCreative = {
          type: "image",
          url: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop",
          alt: "AI-generated image featuring SEO tools and organic traffic analytics dashboard"
        };
      }

      setNewEmail({
        ...newEmail,
        content: randomContent,
        creative: randomCreative,
        aiGenerated: true,
        targetAudience: "organic-traffic"
      });

      setIsGeneratingContent(false);
      toast.success("✨ AI content and creative generated successfully!");
      toast.info("📝 Content optimized for organic traffic and SEO engagement");
    }, 3000);
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    setIsUploadingImage(true);
    toast.info("📤 Uploading your custom image...");

    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      
      setNewEmail({
        ...newEmail,
        creative: {
          type: "image",
          url: imageUrl,
          alt: `Custom uploaded image for ${newEmail.subject || 'email campaign'}`
        },
        aiGenerated: false
      });

      setIsUploadingImage(false);
      toast.success("✅ Image uploaded successfully!");
    }, 2000);
  };

  const handleUploadVideo = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error("Please select a valid video file");
      return;
    }

    setIsUploadingVideo(true);
    toast.info("📹 Uploading your custom video...");

    setTimeout(() => {
      const videoUrl = URL.createObjectURL(file);
      
      setNewEmail({
        ...newEmail,
        creative: {
          type: "video",
          url: videoUrl,
          alt: `Custom uploaded video for ${newEmail.subject || 'email campaign'}`
        },
        aiGenerated: false
      });

      setIsUploadingVideo(false);
      toast.success("✅ Video uploaded successfully!");
    }, 3000);
  };

  const toggleVideoPlayback = (emailId) => {
    setIsVideoPlaying(prev => ({
      ...prev,
      [emailId]: !prev[emailId]
    }));
  };

  const handleCreateEmail = () => {
    if (!newEmail.subject.trim() || !newEmail.content.trim()) {
      toast.error("Please fill in both subject and content");
      return;
    }

    setIsCreatingEmail(true);
    toast.info("Creating AI-powered email campaign for organic traffic...");

    setTimeout(() => {
      const newEmailItem = {
        id: emailList.length + 1,
        subject: newEmail.subject,
        status: newEmail.scheduleDate ? "Scheduled" : "Draft",
        opens: 0,
        clicks: 0,
        sent: 0,
        content: newEmail.content,
        creative: newEmail.creative,
        aiGenerated: newEmail.aiGenerated,
        targetAudience: newEmail.targetAudience
      };

      setEmailList([newEmailItem, ...emailList]);
      setNewEmail({ 
        subject: "", 
        content: "", 
        recipients: "organic-traffic", 
        scheduleDate: "",
        creative: { type: "image", url: "", alt: "" },
        aiGenerated: false,
        targetAudience: "organic-traffic"
      });
      setIsCreatingEmail(false);
      
      toast.success("📧 AI-powered email campaign created!");
      toast.info("Campaign optimized for organic traffic audience");
    }, 2000);
  };

  const handlePublishEmail = (emailId) => {
    const emailToPublish = emailList.find(email => email.id === emailId);
    if (!emailToPublish) {
      toast.error("Email not found");
      return;
    }

    if (emailToPublish.status === "Published") {
      toast.info("This email campaign is already published!");
      return;
    }

    setIsPublishing(true);
    toast.info(`🚀 Publishing "${emailToPublish.subject}" to organic traffic audience...`);

    setTimeout(() => {
      const randomSent = Math.floor(Math.random() * 1200) + 1800;
      const randomOpens = Math.floor(randomSent * (0.4 + Math.random() * 0.2));
      const randomClicks = Math.floor(randomOpens * (0.15 + Math.random() * 0.15));

      setEmailList(emailList.map(email => 
        email.id === emailId 
          ? { ...email, status: "Published", sent: randomSent, opens: randomOpens, clicks: randomClicks }
          : email
      ));
      setIsPublishing(false);
      toast.success(`✅ "${emailToPublish.subject}" published successfully!`);
      toast.success(`📊 Sent to ${randomSent.toLocaleString()} organic traffic subscribers!`);
    }, 3000);
  };

  const handlePreviewEmail = (email) => {
    setPreviewEmail(email);
    setIsPreviewDialogOpen(true);
    toast.info(`👀 Previewing: "${email.subject}"`);
  };

  const handleEditEmail = (email) => {
    if (email.status === "Published") {
      toast.error("Cannot edit published campaigns. Create a new campaign instead.");
      return;
    }
    
    setEditingEmail({ ...email });
    setIsEditDialogOpen(true);
    toast.info(`✏️ Editing: "${email.subject}"`);
  };

  const handleSaveEdit = () => {
    if (!editingEmail.subject.trim() || !editingEmail.content.trim()) {
      toast.error("Please fill in both subject and content");
      return;
    }

    setEmailList(emailList.map(email => 
      email.id === editingEmail.id ? editingEmail : email
    ));
    setIsEditDialogOpen(false);
    setEditingEmail(null);
    toast.success(`✅ "${editingEmail.subject}" updated successfully!`);
  };

  const handleDeleteEmail = (emailId) => {
    const emailToDelete = emailList.find(email => email.id === emailId);
    if (!emailToDelete) {
      toast.error("Email not found");
      return;
    }

    if (emailToDelete.status === "Published") {
      toast.error("❌ Cannot delete published campaigns");
      return;
    }

    setEmailList(emailList.filter(email => email.id !== emailId));
    toast.success(`🗑️ "${emailToDelete.subject}" deleted successfully!`);
  };

  const handleDuplicateEmail = (email) => {
    const duplicatedEmail = {
      id: emailList.length + 1,
      subject: `Copy of ${email.subject}`,
      status: "Draft",
      opens: 0,
      clicks: 0,
      sent: 0,
      content: email.content,
      creative: { ...email.creative },
      aiGenerated: email.aiGenerated,
      targetAudience: email.targetAudience
    };

    setEmailList([duplicatedEmail, ...emailList]);
    toast.success(`📋 Email duplicated: "Copy of ${email.subject}"`);
  };

  const handleViewAnalytics = (email) => {
    if (email.status !== "Published") {
      toast.info("📊 Analytics are only available for published campaigns");
      return;
    }
    
    setAnalyticsEmail(email);
    setIsAnalyticsDialogOpen(true);
    toast.success(`📈 Viewing analytics for: "${email.subject}"`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-purple-600" />
            AI-Powered Email Campaign Manager
            <Badge variant="outline" className="ml-2 text-green-600 border-green-300">
              <Target className="h-3 w-3 mr-1" />
              Organic Traffic Focus
            </Badge>
          </CardTitle>
          <CardDescription>
            Create, manage, and track AI-generated email marketing campaigns with intelligent content and creatives optimized for organic traffic audiences
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">AI Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="sequences">Sequences</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create New Email with AI */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-purple-600" />
                  AI Email Campaign Creator
                  <Badge variant="outline" className="text-green-600 border-green-300">
                    <Target className="h-3 w-3 mr-1" />
                    Organic Traffic
                  </Badge>
                </CardTitle>
                <CardDescription>Generate AI-powered email campaigns with intelligent content and creatives for organic traffic audiences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Email Subject (e.g., AI-Powered SEO: Boost Your Organic Traffic)"
                  value={newEmail.subject}
                  onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={handleGenerateAIContent}
                    disabled={isGeneratingContent || !newEmail.subject.trim()}
                    variant="outline"
                    className="text-purple-600 border-purple-300 hover:bg-purple-50"
                  >
                    {isGeneratingContent ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate AI Content
                      </>
                    )}
                  </Button>

                  {newEmail.creative.url && (
                    <Button 
                      onClick={handleRegenerateCreative}
                      disabled={isGeneratingImage || isGeneratingVideo}
                      variant="outline"
                      className="text-blue-600 border-blue-300 hover:bg-blue-50"
                    >
                      {(isGeneratingImage || isGeneratingVideo) ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Regenerating...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate Creative
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* AI Creative Generation Buttons */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700">AI Creative Generation:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={handleGenerateAIImage}
                      disabled={isGeneratingImage}
                      variant="outline"
                      className="text-green-600 border-green-300 hover:bg-green-50"
                    >
                      {isGeneratingImage ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          AI Image
                        </>
                      )}
                    </Button>

                    <Button 
                      onClick={handleGenerateAIVideo}
                      disabled={isGeneratingVideo}
                      variant="outline"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      {isGeneratingVideo ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Video className="mr-2 h-4 w-4" />
                          AI Video
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Upload Buttons */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700">Upload Your Own:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadImage}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploadingImage}
                      />
                      <Button 
                        disabled={isUploadingImage}
                        variant="outline"
                        className="w-full text-blue-600 border-blue-300 hover:bg-blue-50"
                      >
                        {isUploadingImage ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="relative">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleUploadVideo}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploadingVideo}
                      />
                      <Button 
                        disabled={isUploadingVideo}
                        variant="outline"
                        className="w-full text-orange-600 border-orange-300 hover:bg-orange-50"
                      >
                        {isUploadingVideo ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Video
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {newEmail.creative.url && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Creative Preview:</label>
                    <div className="relative">
                      {newEmail.creative.type === "video" ? (
                        <div className="relative">
                          <video 
                            src={newEmail.creative.url} 
                            className="w-full h-32 object-cover rounded-lg"
                            controls
                            poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary">
                              <Video className="h-3 w-3 mr-1" />
                              Video
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={newEmail.creative.url} 
                          alt={newEmail.creative.alt}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      )}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {newEmail.aiGenerated && (
                          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-300">
                            <Wand2 className="h-3 w-3 mr-1" />
                            AI Generated
                          </Badge>
                        )}
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-300">
                          <Target className="h-3 w-3 mr-1" />
                          Organic Traffic
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                <Textarea
                  placeholder="Email Content (or generate with AI)..."
                  rows={6}
                  value={newEmail.content}
                  onChange={(e) => setNewEmail({ ...newEmail, content: e.target.value })}
                />
                
                <Select value={newEmail.recipients} onValueChange={(value) => setNewEmail({ ...newEmail, recipients: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic-traffic">Organic Traffic Subscribers</SelectItem>
                    <SelectItem value="seo-focused">SEO-Focused Customers</SelectItem>
                    <SelectItem value="content-marketers">Content Marketers</SelectItem>
                    <SelectItem value="all">All Subscribers</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input
                  type="datetime-local"
                  value={newEmail.scheduleDate}
                  onChange={(e) => setNewEmail({ ...newEmail, scheduleDate: e.target.value })}
                />
                
                <Button 
                  onClick={handleCreateEmail}
                  disabled={isCreatingEmail}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isCreatingEmail ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Creating AI Campaign...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Create AI Email Campaign
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Organic Traffic Campaign Performance
                </CardTitle>
                <CardDescription>Performance metrics for SEO-focused email campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{campaignStats.openRate}%</div>
                    <div className="text-sm text-gray-600">Open Rate</div>
                    <Progress value={campaignStats.openRate} className="mt-2" />
                    <div className="text-xs text-green-600 mt-1">+5% vs industry avg</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{campaignStats.clickRate}%</div>
                    <div className="text-sm text-gray-600">Click Rate</div>
                    <Progress value={campaignStats.clickRate} className="mt-2" />
                    <div className="text-xs text-green-600 mt-1">+3% vs industry avg</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{campaignStats.totalSent.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Emails Sent</div>
                    <div className="text-xs text-gray-500 mt-1">To organic traffic subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{campaignStats.unsubscribeRate}%</div>
                    <div className="text-sm text-gray-600">Unsubscribe Rate</div>
                    <div className="text-xs text-green-600 mt-1">-1% vs industry avg</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                AI Email Campaigns ({emailList.length}/10)
                <Badge variant="outline" className="text-green-600 border-green-300">
                  <Target className="h-3 w-3 mr-1" />
                  Organic Traffic Optimized
                </Badge>
              </CardTitle>
              <CardDescription>Manage your AI-generated email campaigns with intelligent content for organic traffic audiences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailList.map((email) => (
                  <div key={email.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-medium text-lg">{email.subject}</div>
                        {email.aiGenerated && (
                          <Badge variant="outline" className="text-purple-600 border-purple-300">
                            <Wand2 className="h-3 w-3 mr-1" />
                            AI Generated
                          </Badge>
                        )}
                        {email.targetAudience === "organic-traffic" && (
                          <Badge variant="outline" className="text-green-600 border-green-300">
                            <Target className="h-3 w-3 mr-1" />
                            Organic Traffic
                          </Badge>
                        )}
                        {email.creative?.type && (
                          <Badge variant="secondary">
                            {email.creative.type === "video" ? <Video className="h-3 w-3 mr-1" /> : <ImageIcon className="h-3 w-3 mr-1" />}
                            {email.creative.type}
                          </Badge>
                        )}
                      </div>

                      {email.creative?.url && (
                        <div className="mb-2">
                          {email.creative.type === "video" ? (
                            <div className="relative w-32 h-20 inline-block mr-3">
                              <video 
                                src={email.creative.url} 
                                className="w-full h-full object-cover rounded cursor-pointer"
                                onClick={() => toggleVideoPlayback(email.id)}
                                poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="bg-black/50 hover:bg-black/70 text-white border-none"
                                  onClick={() => toggleVideoPlayback(email.id)}
                                >
                                  {isVideoPlaying[email.id] ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <img 
                              src={email.creative.url} 
                              alt={email.creative.alt}
                              className="w-32 h-20 object-cover rounded mr-3 inline-block"
                            />
                          )}
                        </div>
                      )}

                      <div className="text-sm text-gray-600 mt-1">
                        Sent: {email.sent.toLocaleString()} | Opens: {email.opens} ({email.sent > 0 ? ((email.opens / email.sent) * 100).toFixed(1) : 0}%) | Clicks: {email.clicks} ({email.opens > 0 ? ((email.clicks / email.opens) * 100).toFixed(1) : 0}%)
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {email.status === "Published" && `Published • Active AI campaign targeting organic traffic audience`}
                        {email.status === "Draft" && `Draft • AI-powered content ready to edit or publish`}
                        {email.status === "Scheduled" && `Scheduled • AI campaign will be sent to organic traffic subscribers`}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        email.status === "Published" ? "default" : 
                        email.status === "Scheduled" ? "secondary" : "outline"
                      }>
                        {email.status}
                      </Badge>
                      <div className="flex gap-1">
                        {/* Preview Button */}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePreviewEmail(email)}
                          className="hover:bg-blue-50 hover:border-blue-300"
                          title="Preview email content and creative"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {/* Edit Button */}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditEmail(email)}
                          disabled={email.status === "Published"}
                          className="hover:bg-yellow-50 hover:border-yellow-300 disabled:opacity-50"
                          title={email.status === "Published" ? "Cannot edit published campaigns" : "Edit AI-generated content"}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        {/* Analytics Button */}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewAnalytics(email)}
                          className="hover:bg-green-50 hover:border-green-300"
                          title="View detailed analytics and performance"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>

                        {/* Duplicate Button */}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDuplicateEmail(email)}
                          className="hover:bg-purple-50 hover:border-purple-300"
                          title="Duplicate AI campaign for reuse"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>

                        {/* Delete Button */}
                        {email.status !== "Published" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteEmail(email.id)}
                            className="hover:bg-red-50 hover:border-red-300"
                            title="Delete email campaign"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}

                        {/* Publish Button */}
                        {(email.status === "Draft" || email.status === "Scheduled") && (
                          <Button 
                            size="sm" 
                            onClick={() => handlePublishEmail(email.id)}
                            disabled={isPublishing}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            title="Publish AI campaign to organic traffic audience"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {emailList.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Wand2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No AI email campaigns yet. Create your first AI-powered campaign for organic traffic above!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Organic Traffic Email Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={emailAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="opened" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="clicked" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Email Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={emailAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sent" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sequences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Email Sequences
                <Badge variant="outline" className="text-green-600 border-green-300">
                  <Target className="h-3 w-3 mr-1" />
                  Organic Traffic Optimized
                </Badge>
              </CardTitle>
              <CardDescription>Automated email sequences and drip campaigns for organic traffic audiences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Email sequences content here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Platform Integration
              </CardTitle>
              <CardDescription>Connect your existing email marketing platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your email platform" />
                </SelectTrigger>
                <SelectContent>
                  {/* Supported platforms content here */}
                </SelectContent>
              </Select>

              <Input
                placeholder="API Key"
                type="password"
                value={platformCredentials.apiKey}
                onChange={(e) => setPlatformCredentials({ ...platformCredentials, apiKey: e.target.value })}
              />

              <Input
                placeholder="List ID (optional)"
                value={platformCredentials.listId}
                onChange={(e) => setPlatformCredentials({ ...platformCredentials, listId: e.target.value })}
              />

              <Button 
                onClick={handleIntegratePlatform}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Zap className="mr-2 h-4 w-4" />
                Integrate Platform
              </Button>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Integration Benefits:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sync your existing email lists</li>
                  <li>• Import campaign templates</li>
                  <li>• Unified analytics dashboard</li>
                  <li>• Automated subscriber management</li>
                  <li>• Organic traffic audience segmentation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Enhanced Preview Dialog with Video Support */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📧 AI Email Preview - Organic Traffic Campaign</DialogTitle>
            <DialogDescription>Preview how your AI-generated email will look to organic traffic subscribers</DialogDescription>
          </DialogHeader>
          {previewEmail && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-semibold text-lg">Subject: {previewEmail.subject}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={
                    previewEmail.status === "Published" ? "default" : 
                    previewEmail.status === "Scheduled" ? "secondary" : "outline"
                  }>
                    {previewEmail.status}
                  </Badge>
                  {previewEmail.aiGenerated && (
                    <Badge variant="outline" className="text-purple-600 border-purple-300">
                      <Wand2 className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  )}
                  {previewEmail.targetAudience === "organic-traffic" && (
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      <Target className="h-3 w-3 mr-1" />
                      Organic Traffic
                    </Badge>
                  )}
                  {previewEmail.status === "Published" && (
                    <span className="text-sm text-gray-600">
                      Sent to {previewEmail.sent.toLocaleString()} organic traffic subscribers
                    </span>
                  )}
                </div>
              </div>
              
              {previewEmail.creative?.url && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Creative Content:</label>
                  <div className="relative">
                    {previewEmail.creative.type === "video" ? (
                      <div className="relative">
                        <video 
                          src={previewEmail.creative.url} 
                          className="w-full h-64 object-cover rounded-lg"
                          controls
                          poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
                        />
                        <Badge 
                          variant="secondary"
                          className="absolute top-2 right-2"
                        >
                          <Video className="h-3 w-3 mr-1" />
                          AI Generated Video
                        </Badge>
                      </div>
                    ) : (
                      <div className="relative">
                        <img 
                          src={previewEmail.creative.url} 
                          alt={previewEmail.creative.alt}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Badge 
                          variant="default"
                          className="absolute top-2 right-2"
                        >
                          <ImageIcon className="h-3 w-3 mr-1" />
                          AI Generated Image
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2">Email Content:</h4>
                <p className="whitespace-pre-wrap">{previewEmail.content}</p>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
                  Close Preview
                </Button>
                {previewEmail.status !== "Published" && (
                  <Button 
                    onClick={() => {
                      setIsPreviewDialogOpen(false);
                      handleEditEmail(previewEmail);
                    }}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit AI Content
                  </Button>
                )}
                {(previewEmail.status === "Draft" || previewEmail.status === "Scheduled") && (
                  <Button 
                    onClick={() => {
                      setIsPreviewDialogOpen(false);
                      handlePublishEmail(previewEmail.id);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Publish Campaign
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>✏️ Edit Email Campaign - Organic Traffic Focus</DialogTitle>
            <DialogDescription>Modify your email campaign details for organic traffic audience</DialogDescription>
          </DialogHeader>
          {editingEmail && (
            <div className="space-y-4">
              <Input
                placeholder="Email Subject"
                value={editingEmail.subject}
                onChange={(e) => setEditingEmail({ ...editingEmail, subject: e.target.value })}
              />
              
              {editingEmail.creative?.url && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Creative:</label>
                  <div className="relative">
                    <img 
                      src={editingEmail.creative.url} 
                      alt={editingEmail.creative.alt}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Badge 
                      variant={editingEmail.creative.type === "video" ? "secondary" : "default"}
                      className="absolute top-2 right-2"
                    >
                      {editingEmail.creative.type === "video" ? <Video className="h-3 w-3 mr-1" /> : <ImageIcon className="h-3 w-3 mr-1" />}
                      {editingEmail.creative.type}
                    </Badge>
                  </div>
                </div>
              )}

              <Textarea
                placeholder="Email Content..."
                rows={8}
                value={editingEmail.content}
                onChange={(e) => setEditingEmail({ ...editingEmail, content: e.target.value })}
              />
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} className="bg-purple-600 hover:bg-purple-700">
                  <Edit className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAnalyticsDialogOpen} onOpenChange={setIsAnalyticsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📊 Email Analytics - Organic Traffic Campaign</DialogTitle>
            <DialogDescription>Detailed performance metrics for your organic traffic email campaign</DialogDescription>
          </DialogHeader>
          {analyticsEmail && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-lg">{analyticsEmail.subject}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="default">Published</Badge>
                  {analyticsEmail.aiGenerated && (
                    <Badge variant="outline" className="text-purple-600 border-purple-300">
                      <Wand2 className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-green-600 border-green-300">
                    <Target className="h-3 w-3 mr-1" />
                    Organic Traffic
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analyticsEmail.sent.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Sent</div>
                  <div className="text-xs text-green-600">Organic traffic subscribers</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analyticsEmail.opens}</div>
                  <div className="text-sm text-gray-600">Opens</div>
                  <div className="text-xs text-gray-500">{((analyticsEmail.opens / analyticsEmail.sent) * 100).toFixed(1)}% rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{analyticsEmail.clicks}</div>
                  <div className="text-sm text-gray-600">Clicks</div>
                  <div className="text-xs text-gray-500">{((analyticsEmail.clicks / analyticsEmail.opens) * 100).toFixed(1)}% rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{Math.floor(analyticsEmail.sent * 0.015)}</div>
                  <div className="text-sm text-gray-600">Unsubscribes</div>
                  <div className="text-xs text-gray-500">1.5% rate</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Performance Over Time</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={emailAnalytics.slice(-7)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="opened" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="clicked" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAnalyticsDialogOpen(false)}>
                  Close Analytics
                </Button>
                <Button 
                  onClick={() => {
                    setIsAnalyticsDialogOpen(false);
                    setActiveTab("analytics");
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Full Analytics
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailCampaignTool;
