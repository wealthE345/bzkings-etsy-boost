
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
import { EmailCreationForm } from "@/components/email-campaign/EmailCreationForm";
import { CampaignStats } from "@/components/email-campaign/CampaignStats";
import { SimpleEmailList } from "@/components/email-campaign/SimpleEmailList";

export interface EmailCampaign {
  id: number;
  subject: string;
  content: string;
  status: "Draft" | "Scheduled" | "Published";
  sent: number;
  opens: number;
  clicks: number;
  aiGenerated?: boolean;
  targetAudience?: string;
  creative?: {
    type: "image" | "video";
    url: string;
    alt: string;
  };
  startDate?: string;
  endDate?: string;
}

export interface NewEmail {
  subject?: string;
  content?: string;
  creative?: {
    type: "image" | "video";
    url: string;
    alt: string;
  };
  aiGenerated?: boolean;
  targetAudience?: string;
  recipients?: string[];
  scheduleDate?: string;
  startDate?: string;
  endDate?: string;
}

export default function EmailCampaignTool() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [emailList, setEmailList] = useState<EmailCampaign[]>([]);
  const [newEmail, setNewEmail] = useState<NewEmail>({});
  const [isCreatingEmail, setIsCreatingEmail] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
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

  const handleCreateEmail = () => {
    if (!newEmail.subject?.trim() || !newEmail.content?.trim()) {
      toast.error("Please fill in both subject and content");
      return;
    }

    setIsCreatingEmail(true);
    toast.info("🚀 Creating your AI-powered email campaign...");

    setTimeout(() => {
      const newCampaign: EmailCampaign = {
        id: emailList.length + 1,
        subject: newEmail.subject,
        content: newEmail.content,
        status: "Draft",
        sent: 0,
        opens: 0,
        clicks: 0,
        aiGenerated: newEmail.aiGenerated || false,
        targetAudience: newEmail.targetAudience || "organic-traffic",
        creative: newEmail.creative,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      setEmailList([...emailList, newCampaign]);
      setNewEmail({});
      setIsCreatingEmail(false);
      toast.success("✅ Email campaign created successfully!");
    }, 2000);
  };

  const handlePublishEmail = (emailId: number) => {
    const email = emailList.find(e => e.id === emailId);
    if (!email) return;

    setIsPublishing(true);
    toast.info(`🚀 Publishing: "${email.subject}"...`);

    setTimeout(() => {
      setEmailList(emailList.map(e =>
        e.id === emailId ? { ...e, status: "Published" } : e
      ));
      setIsPublishing(false);
      toast.success(`✅ Published: "${email.subject}"!`);
    }, 2000);
  };

  const handleDeleteEmail = (emailId: number) => {
    const email = emailList.find(e => e.id === emailId);
    if (!email) return;

    setEmailList(emailList.filter(e => e.id !== emailId));
    toast.success(`🗑️ Deleted: "${email.subject}"`);
  };

  const handleDuplicateEmail = (emailId: number) => {
    const email = emailList.find(e => e.id === emailId);
    if (!email) return;

    const duplicatedEmail: EmailCampaign = {
      ...email,
      id: emailList.length + 1,
      subject: `${email.subject} (Copy)`,
      status: "Draft",
      sent: 0,
      opens: 0,
      clicks: 0,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    setEmailList([...emailList, duplicatedEmail]);
    toast.success(`📄 Duplicated: "${email.subject}"`);
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

          <SimpleEmailList
            emailList={emailList}
            isPublishing={isPublishing}
            onPublishEmail={handlePublishEmail}
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
    </div>
  );
}
