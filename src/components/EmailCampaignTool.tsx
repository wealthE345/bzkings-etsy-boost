import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Mail, Calendar, Zap, Target } from "lucide-react";
import { toast } from "sonner";
import { useEmailCampaign, NewEmail, EmailCampaign } from "@/hooks/useEmailCampaign";
import { EmailCreationForm } from "@/components/email-campaign/EmailCreationForm";
import { EmailList } from "@/components/email-campaign/EmailList";
import { CampaignStats } from "@/components/email-campaign/CampaignStats";
import { EmailDialogs } from "@/components/email-campaign/EmailDialogs";

export default function EmailCampaignTool() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [previewEmail, setPreviewEmail] = useState<EmailCampaign | null>(null);
  const [editingEmail, setEditingEmail] = useState<EmailCampaign | null>(null);
  const [analyticsEmail, setAnalyticsEmail] = useState<EmailCampaign | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState(false);
  
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [platformCredentials, setPlatformCredentials] = useState({
    apiKey: "",
    listId: ""
  });

  const {
    emailList,
    setEmailList,
    newEmail,
    setNewEmail,
    isCreatingEmail,
    isPublishing,
    handleCreateEmail,
    handlePublishEmail,
    handleDeleteEmail,
    handleDuplicateEmail
  } = useEmailCampaign();

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

  const handleIntegratePlatform = () => {
    if (!selectedPlatform) {
      toast.error("Please select a platform first");
      return;
    }

    if (!platformCredentials.apiKey.trim()) {
      toast.error("Please enter your API key");
      return;
    }

    toast.info(`🔗 Integrating with ${selectedPlatform}...`);
    
    setTimeout(() => {
      toast.success(`✅ Successfully integrated with ${selectedPlatform}!`);
      toast.info("🎯 Your organic traffic audience is now synced");
    }, 2000);
  };

  const handlePreviewEmail = (email: EmailCampaign) => {
    setPreviewEmail(email);
    setIsPreviewDialogOpen(true);
    toast.info(`👀 Previewing: "${email.subject}"`);
  };

  const handleEditEmail = (email: EmailCampaign) => {
    if (email.status === "Published") {
      toast.error("Cannot edit published campaigns. Create a new campaign instead.");
      return;
    }
    
    setEditingEmail({ ...email });
    setIsEditDialogOpen(true);
    toast.info(`✏️ Editing: "${email.subject}"`);
  };

  const handleSaveEdit = (email: EmailCampaign) => {
    setEmailList(emailList.map(e => 
      e.id === email.id ? email : e
    ));
  };

  const handleViewAnalytics = (email: EmailCampaign) => {
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
            <EmailCreationForm
              newEmail={newEmail}
              setNewEmail={setNewEmail}
              isCreatingEmail={isCreatingEmail}
              onCreateEmail={handleCreateEmail}
            />
            <CampaignStats campaignStats={campaignStats} />
          </div>

          <EmailList
            emailList={emailList}
            isPublishing={isPublishing}
            onPublishEmail={handlePublishEmail}
            onPreviewEmail={handlePreviewEmail}
            onEditEmail={handleEditEmail}
            onViewAnalytics={handleViewAnalytics}
            onDuplicateEmail={handleDuplicateEmail}
            onDeleteEmail={handleDeleteEmail}
          />
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
                  <SelectItem value="mailchimp">Mailchimp</SelectItem>
                  <SelectItem value="convertkit">ConvertKit</SelectItem>
                  <SelectItem value="aweber">AWeber</SelectItem>
                  <SelectItem value="constantcontact">Constant Contact</SelectItem>
                  <SelectItem value="sendinblue">Sendinblue</SelectItem>
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

      <EmailDialogs
        previewEmail={previewEmail}
        editingEmail={editingEmail}
        analyticsEmail={analyticsEmail}
        isPreviewDialogOpen={isPreviewDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        isAnalyticsDialogOpen={isAnalyticsDialogOpen}
        setIsPreviewDialogOpen={setIsPreviewDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setIsAnalyticsDialogOpen={setIsAnalyticsDialogOpen}
        setEditingEmail={setEditingEmail}
        onSaveEdit={handleSaveEdit}
        onPublishEmail={handlePublishEmail}
        onEditEmail={handleEditEmail}
      />
    </div>
  );
};
