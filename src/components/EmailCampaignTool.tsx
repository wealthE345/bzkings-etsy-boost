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
import { Mail, Send, Users, TrendingUp, Clock, Settings, Plus, Eye, Edit, Trash2, Calendar, Zap } from "lucide-react";
import { toast } from "sonner";

const EmailCampaignTool = () => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [isCreatingEmail, setIsCreatingEmail] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [previewEmail, setPreviewEmail] = useState(null);
  const [editingEmail, setEditingEmail] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  
  const [emailList, setEmailList] = useState([
    { id: 1, subject: "Welcome to BZ Kings Digital Mall", status: "Published", opens: 245, clicks: 67, sent: 1000, content: "Welcome to our digital marketplace! Discover amazing digital products and tools." },
    { id: 2, subject: "New Digital Products Available", status: "Draft", opens: 0, clicks: 0, sent: 0, content: "Check out our latest collection of digital products designed to boost your business." },
    { id: 3, subject: "Exclusive Etsy Store Discount", status: "Scheduled", opens: 0, clicks: 0, sent: 850, content: "Get 20% off on all digital products in our Etsy store. Limited time offer!" },
  ]);

  const [newEmail, setNewEmail] = useState({
    subject: "",
    content: "",
    recipients: "all",
    scheduleDate: ""
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
        content: newEmail.content
      };

      setEmailList([newEmailItem, ...emailList]);
      setNewEmail({ subject: "", content: "", recipients: "all", scheduleDate: "" });
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
      content: email.content
    };

    setEmailList([duplicatedEmail, ...emailList]);
    toast.success(`📋 Email duplicated: "Copy of ${email.subject}"`);
  };

  const handleViewAnalytics = (email) => {
    if (email.status !== "Published") {
      toast.info("📊 Analytics are only available for published campaigns");
      return;
    }
    
    toast.success(`📈 Viewing analytics for: "${email.subject}"`);
    toast.info(`Opens: ${email.opens} | Clicks: ${email.clicks} | Sent: ${email.sent}`);
    
    // Switch to analytics tab to show relevant data
    setActiveTab("analytics");
  };

  const handleScheduleEmail = (email) => {
    if (email.status === "Published") {
      toast.error("This campaign is already published");
      return;
    }

    const scheduleDate = new Date();
    scheduleDate.setHours(scheduleDate.getHours() + 1); // Schedule for 1 hour from now

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
            Create, manage, and track your email marketing campaigns
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
            {/* Create New Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-green-600" />
                  Create New Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Email Subject"
                  value={newEmail.subject}
                  onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                />
                <Textarea
                  placeholder="Email Content..."
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
                      Create Email
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
              <CardDescription>Manage your email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emailList.map((email) => (
                  <div key={email.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-lg">{email.subject}</div>
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
                      <div className="flex gap-2">
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

                        {/* Analytics Button (for published emails) */}
                        {email.status === "Published" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewAnalytics(email)}
                            className="hover:bg-green-50 hover:border-green-300"
                            title="View email analytics"
                          >
                            <TrendingUp className="h-4 w-4" />
                          </Button>
                        )}

                        {/* Schedule Button (for draft emails) */}
                        {email.status === "Draft" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleScheduleEmail(email)}
                            className="hover:bg-purple-50 hover:border-purple-300"
                            title="Schedule email for later"
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                        )}

                        {/* Delete Button */}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteEmail(email.id)}
                          disabled={email.status === "Published"}
                          className="hover:bg-red-50 hover:border-red-300 disabled:opacity-50"
                          title={email.status === "Published" ? "Cannot delete published campaigns" : "Delete email campaign"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        {/* Publish Button (for draft and scheduled emails) */}
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
                    <p>No email campaigns yet. Create your first campaign above!</p>
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
        <DialogContent className="max-w-2xl">
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
                  {previewEmail.status === "Published" && (
                    <span className="text-sm text-gray-600">
                      Sent to {previewEmail.sent.toLocaleString()} subscribers
                    </span>
                  )}
                </div>
              </div>
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
        <DialogContent className="max-w-2xl">
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
    </div>
  );
};

export default EmailCampaignTool;
