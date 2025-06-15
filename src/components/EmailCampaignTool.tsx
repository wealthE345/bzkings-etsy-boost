
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
import { Mail, Send, Users, TrendingUp, Clock, Settings, Plus, Eye, Edit, Trash2, Calendar, Zap, Wand2, Image as ImageIcon, Video, Copy, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const EmailCampaignTool = () => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [isCreatingEmail, setIsCreatingEmail] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [previewEmail, setPreviewEmail] = useState(null);
  const [editingEmail, setEditingEmail] = useState(null);
  const [analyticsEmail, setAnalyticsEmail] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState(false);
  
  const [emailList, setEmailList] = useState([
    { 
      id: 1, 
      subject: "Welcome to BZ Kings Digital Mall", 
      status: "Published", 
      opens: 245, 
      clicks: 67, 
      sent: 1000, 
      content: "Welcome to our digital marketplace! Discover amazing digital products and tools that will transform your business.",
      creative: {
        type: "image",
        url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop",
        alt: "Welcome to digital marketplace"
      },
      aiGenerated: true
    },
    { 
      id: 2, 
      subject: "New Digital Products Available", 
      status: "Draft", 
      opens: 0, 
      clicks: 0, 
      sent: 0, 
      content: "Check out our latest collection of digital products designed to boost your business productivity and success.",
      creative: {
        type: "image",
        url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
        alt: "New digital products"
      },
      aiGenerated: true
    },
    { 
      id: 3, 
      subject: "Exclusive Etsy Store Discount", 
      status: "Scheduled", 
      opens: 0, 
      clicks: 0, 
      sent: 850, 
      content: "Get 20% off on all digital products in our Etsy store. Limited time offer - don't miss out!",
      creative: {
        type: "video",
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
        alt: "Exclusive discount offer"
      },
      aiGenerated: false
    },
  ]);

  const [newEmail, setNewEmail] = useState({
    subject: "",
    content: "",
    recipients: "all",
    scheduleDate: "",
    creative: {
      type: "image",
      url: "",
      alt: ""
    },
    aiGenerated: false
  });

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [platformCredentials, setPlatformCredentials] = useState({
    apiKey: "",
    listId: ""
  });

  // Analytics data for email performance
  const emailAnalytics = [
    { name: 'Week 1', sent: 800, opened: 320, clicked: 96, unsubscribed: 8 },
    { name: 'Week 2', sent: 950, opened: 418, clicked: 125, unsubscribed: 12 },
    { name: 'Week 3', sent: 1100, opened: 528, clicked: 159, unsubscribed: 15 },
    { name: 'Week 4', sent: 1250, opened: 625, clicked: 200, unsubscribed: 18 },
  ];

  const campaignStats = {
    totalSent: 4100,
    totalOpened: 1891,
    totalClicked: 580,
    openRate: 46.1,
    clickRate: 14.1,
    unsubscribeRate: 1.3
  };

  const emailSequences = [
    { id: 1, name: "Welcome Series", emails: 5, status: "Active", subscribers: 1200 },
    { id: 2, name: "Product Launch", emails: 3, status: "Paused", subscribers: 850 },
    { id: 3, name: "Re-engagement", emails: 4, status: "Draft", subscribers: 0 },
  ];

  const supportedPlatforms = [
    "Mailchimp", "Constant Contact", "ConvertKit", "AWeber", "GetResponse", "Campaign Monitor"
  ];

  const creativeTemplates = [
    { id: 1, name: "Welcome Message", type: "image", url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop" },
    { id: 2, name: "Product Showcase", type: "image", url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop" },
    { id: 3, name: "Tech Innovation", type: "image", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop" },
    { id: 4, name: "Coding Theme", type: "image", url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop" },
    { id: 5, name: "Digital Workspace", type: "video", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop" },
  ];

  const handleGenerateAIContent = async () => {
    if (!newEmail.subject.trim()) {
      toast.error("Please enter a subject first to generate AI content");
      return;
    }

    setIsGeneratingContent(true);
    toast.info("🤖 Generating AI content and creative...");

    setTimeout(() => {
      // Simulate AI content generation
      const aiContents = [
        "Transform your business with our cutting-edge digital solutions. Our expert team has curated the perfect collection of tools and resources to help you succeed in today's competitive market.",
        "Discover the power of digital innovation with our premium collection. Each product is carefully selected to provide maximum value and impact for your business growth.",
        "Join thousands of successful entrepreneurs who trust our digital marketplace for their business needs. Experience the difference quality makes.",
        "Unlock your potential with our comprehensive suite of digital products. From SEO tools to marketing templates, we have everything you need to thrive online."
      ];

      const randomContent = aiContents[Math.floor(Math.random() * aiContents.length)];
      const randomCreative = creativeTemplates[Math.floor(Math.random() * creativeTemplates.length)];

      setNewEmail({
        ...newEmail,
        content: randomContent,
        creative: {
          type: randomCreative.type,
          url: randomCreative.url,
          alt: `AI generated creative for ${newEmail.subject}`
        },
        aiGenerated: true
      });

      setIsGeneratingContent(false);
      toast.success("✨ AI content and creative generated successfully!");
      toast.info("📝 Review and customize the generated content before creating your campaign");
    }, 3000);
  };

  const handleCreateEmail = () => {
    if (!newEmail.subject.trim() || !newEmail.content.trim()) {
      toast.error("Please fill in both subject and content");
      return;
    }

    setIsCreatingEmail(true);
    toast.info("Creating new email campaign...");

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
        aiGenerated: newEmail.aiGenerated
      };

      setEmailList([newEmailItem, ...emailList]);
      setNewEmail({ 
        subject: "", 
        content: "", 
        recipients: "all", 
        scheduleDate: "",
        creative: { type: "image", url: "", alt: "" },
        aiGenerated: false
      });
      setIsCreatingEmail(false);
      
      toast.success("Email campaign created successfully!");
      toast.info("📧 Campaign added to your list - you can now preview, edit, or publish it!");
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
    toast.info(`Publishing "${emailToPublish.subject}"...`);
    toast.info("🚀 Sending to all subscribers in your list...");

    setTimeout(() => {
      const randomSent = Math.floor(Math.random() * 500) + 500;
      const randomOpens = Math.floor(randomSent * 0.3);
      const randomClicks = Math.floor(randomOpens * 0.2);

      setEmailList(emailList.map(email => 
        email.id === emailId 
          ? { ...email, status: "Published", sent: randomSent, opens: randomOpens, clicks: randomClicks }
          : email
      ));
      setIsPublishing(false);
      toast.success(`"${emailToPublish.subject}" published successfully!`);
      toast.success(`📊 Campaign sent to ${randomSent.toLocaleString()} subscribers!`);
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
      aiGenerated: email.aiGenerated
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

  const handleScheduleEmail = (email) => {
    if (email.status === "Published") {
      toast.error("This campaign is already published");
      return;
    }

    const scheduleDate = new Date();
    scheduleDate.setHours(scheduleDate.getHours() + 1);

    setEmailList(emailList.map(e => 
      e.id === email.id 
        ? { ...e, status: "Scheduled" }
        : e
    ));

    toast.success(`📅 "${email.subject}" scheduled for ${scheduleDate.toLocaleTimeString()}`);
  };

  const handleIntegratePlatform = () => {
    if (!selectedPlatform || !platformCredentials.apiKey) {
      toast.error("Please select a platform and enter your API key");
      return;
    }

    toast.success(`Successfully integrated with ${selectedPlatform}!`);
    toast.info("Your email lists and campaigns are now synced");
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-purple-600" />
            Email Campaign Manager
          </CardTitle>
          <CardDescription>
            Create, manage, and track your email marketing campaigns with AI-generated content
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
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
                  <Plus className="h-5 w-5 text-green-600" />
                  Create New Email Campaign
                </CardTitle>
                <CardDescription>Use AI to generate engaging content and creatives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Email Subject"
                  value={newEmail.subject}
                  onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                />
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleGenerateAIContent}
                    disabled={isGeneratingContent || !newEmail.subject.trim()}
                    variant="outline"
                    className="flex-1"
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
                </div>

                {newEmail.creative.url && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Generated Creative:</label>
                    <div className="relative">
                      <img 
                        src={newEmail.creative.url} 
                        alt={newEmail.creative.alt}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Badge 
                        variant={newEmail.creative.type === "video" ? "secondary" : "default"}
                        className="absolute top-2 right-2"
                      >
                        {newEmail.creative.type === "video" ? <Video className="h-3 w-3 mr-1" /> : <ImageIcon className="h-3 w-3 mr-1" />}
                        {newEmail.creative.type}
                      </Badge>
                      {newEmail.aiGenerated && (
                        <Badge variant="outline" className="absolute top-2 left-2 bg-purple-50">
                          <Wand2 className="h-3 w-3 mr-1" />
                          AI Generated
                        </Badge>
                      )}
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
                    <SelectItem value="all">All Subscribers</SelectItem>
                    <SelectItem value="active">Active Customers</SelectItem>
                    <SelectItem value="new">New Subscribers</SelectItem>
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
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Email Campaign
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Email Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Campaign Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{campaignStats.openRate}%</div>
                    <div className="text-sm text-gray-600">Open Rate</div>
                    <Progress value={campaignStats.openRate} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{campaignStats.clickRate}%</div>
                    <div className="text-sm text-gray-600">Click Rate</div>
                    <Progress value={campaignStats.clickRate} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{campaignStats.totalSent.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Emails Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{campaignStats.unsubscribeRate}%</div>
                    <div className="text-sm text-gray-600">Unsubscribe Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Email List */}
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns ({emailList.length}/10)</CardTitle>
              <CardDescription>Manage your email campaigns with AI-generated content</CardDescription>
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
                        {email.creative?.type && (
                          <Badge variant="secondary">
                            {email.creative.type === "video" ? <Video className="h-3 w-3 mr-1" /> : <ImageIcon className="h-3 w-3 mr-1" />}
                            {email.creative.type}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Sent: {email.sent.toLocaleString()} | Opens: {email.opens} | Clicks: {email.clicks}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {email.status === "Published" && `Published • Active campaign`}
                        {email.status === "Draft" && `Draft • Ready to edit or publish`}
                        {email.status === "Scheduled" && `Scheduled • Will be sent automatically`}
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
                          title="Preview email content"
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
                          title={email.status === "Published" ? "Cannot edit published campaigns" : "Edit email content"}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        {/* Analytics Button */}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewAnalytics(email)}
                          className="hover:bg-green-50 hover:border-green-300"
                          title="View email analytics"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>

                        {/* Duplicate Button */}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDuplicateEmail(email)}
                          className="hover:bg-purple-50 hover:border-purple-300"
                          title="Duplicate email campaign"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>

                        {/* Schedule/Delete Button */}
                        {email.status === "Draft" ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleScheduleEmail(email)}
                            className="hover:bg-purple-50 hover:border-purple-300"
                            title="Schedule email for later"
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                        ) : email.status !== "Published" ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteEmail(email.id)}
                            className="hover:bg-red-50 hover:border-red-300"
                            title="Delete email campaign"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        ) : null}

                        {/* Publish Button */}
                        {(email.status === "Draft" || email.status === "Scheduled") && (
                          <Button 
                            size="sm" 
                            onClick={() => handlePublishEmail(email.id)}
                            disabled={isPublishing}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            title="Publish and send email campaign"
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
                    <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No email campaigns yet. Create your first AI-powered campaign above!</p>
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
                <CardTitle>Email Performance Trends</CardTitle>
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
              </CardTitle>
              <CardDescription>Automated email sequences and drip campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailSequences.map((sequence) => (
                  <div key={sequence.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{sequence.name}</div>
                      <div className="text-sm text-gray-600">
                        {sequence.emails} emails • {sequence.subscribers.toLocaleString()} subscribers
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        sequence.status === "Active" ? "default" : 
                        sequence.status === "Paused" ? "secondary" : "outline"
                      }>
                        {sequence.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
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
                  {supportedPlatforms.map((platform) => (
                    <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                  ))}
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
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📧 Email Preview</DialogTitle>
            <DialogDescription>Preview how your email will look to recipients</DialogDescription>
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
                  {previewEmail.status === "Published" && (
                    <span className="text-sm text-gray-600">
                      Sent to {previewEmail.sent.toLocaleString()} subscribers
                    </span>
                  )}
                </div>
              </div>
              
              {previewEmail.creative?.url && (
                <div className="space-y-2">
                  <div className="relative">
                    <img 
                      src={previewEmail.creative.url} 
                      alt={previewEmail.creative.alt}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge 
                      variant={previewEmail.creative.type === "video" ? "secondary" : "default"}
                      className="absolute top-2 right-2"
                    >
                      {previewEmail.creative.type === "video" ? <Video className="h-3 w-3 mr-1" /> : <ImageIcon className="h-3 w-3 mr-1" />}
                      {previewEmail.creative.type}
                    </Badge>
                  </div>
                </div>
              )}

              <div className="p-4 border rounded-lg bg-gray-50">
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
                    Edit Email
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>✏️ Edit Email Campaign</DialogTitle>
            <DialogDescription>Modify your email campaign details</DialogDescription>
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

      {/* Analytics Dialog */}
      <Dialog open={isAnalyticsDialogOpen} onOpenChange={setIsAnalyticsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📊 Email Analytics</DialogTitle>
            <DialogDescription>Detailed performance metrics for your email campaign</DialogDescription>
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
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analyticsEmail.sent.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Sent</div>
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
                  <div className="text-2xl font-bold text-orange-600">{Math.floor(analyticsEmail.sent * 0.02)}</div>
                  <div className="text-sm text-gray-600">Unsubscribes</div>
                  <div className="text-xs text-gray-500">2.0% rate</div>
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
