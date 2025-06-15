
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wand2, Target, Sparkles, Eye, Send, Video, ImageIcon } from "lucide-react";
import { EmailCampaign } from "@/hooks/useEmailCampaign";
import { generateAITitle, getMockupImagesBySearchQuery, getIntroVideoBySubject, generateEmailContent } from "@/utils/aiContentGenerator";
import { ImageMockupSelector } from "./ImageMockupSelector";
import { CampaignViewer } from "./CampaignViewer";
import { toast } from "sonner";

interface EmailCreationFormProps {
  newEmail: Partial<EmailCampaign>;
  setNewEmail: (email: Partial<EmailCampaign>) => void;
  isCreatingEmail: boolean;
  onCreateEmail: () => void;
}

export const EmailCreationForm = ({ newEmail, setNewEmail, isCreatingEmail, onCreateEmail }: EmailCreationFormProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showMockups, setShowMockups] = useState(false);
  const [mockupImages, setMockupImages] = useState<Array<{url: string, description: string}>>([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [previewCampaign, setPreviewCampaign] = useState<EmailCampaign | null>(null);

  const handleSearchCampaignIdeas = () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    toast.info(`🔍 Searching for campaign ideas: "${searchTerm}"`);
    
    // Generate AI title based on search term
    const aiTitle = generateAITitle(searchTerm);
    
    // Get mockup images
    const images = getMockupImagesBySearchQuery(searchTerm);
    setMockupImages(images);
    setShowMockups(true);
    
    // Update email with AI-generated title
    setNewEmail({
      ...newEmail,
      subject: aiTitle
    });

    toast.success(`✨ Found ${images.length} creative ideas for "${searchTerm}"`);
  };

  const handleGenerateAIContent = async () => {
    if (!newEmail.subject?.trim()) {
      toast.error("Please add a subject first or search for campaign ideas");
      return;
    }

    setIsGeneratingAI(true);
    toast.info("🤖 Generating AI-powered email content and creative...");

    try {
      // Generate email content
      const content = generateEmailContent(searchTerm || newEmail.subject);
      
      // Generate intro video
      const video = getIntroVideoBySubject(newEmail.subject);
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      setNewEmail({
        ...newEmail,
        content,
        creative: {
          type: "video",
          url: video.url,
          alt: video.description
        },
        aiGenerated: true,
        targetAudience: "organic-traffic"
      });

      setIsGeneratingAI(false);
      toast.success("✅ AI content and 30-second intro video generated!");
    } catch (error) {
      setIsGeneratingAI(false);
      toast.error("Failed to generate AI content. Please try again.");
    }
  };

  const handleSelectMockup = (mockup: {url: string, description: string}) => {
    setNewEmail({
      ...newEmail,
      creative: {
        type: "image",
        url: mockup.url,
        alt: mockup.description
      }
    });
    setShowMockups(false);
    toast.success(`🎨 Selected creative: ${mockup.description}`);
  };

  const handleViewCampaign = () => {
    if (!newEmail.subject?.trim() || !newEmail.content?.trim()) {
      toast.error("Please add subject and content before viewing campaign");
      return;
    }

    // Create a preview campaign object
    const preview: EmailCampaign = {
      id: 0,
      subject: newEmail.subject,
      content: newEmail.content,
      status: "Draft",
      sent: 0,
      opens: 0,
      clicks: 0,
      aiGenerated: newEmail.aiGenerated || false,
      targetAudience: newEmail.targetAudience || "organic-traffic",
      creative: newEmail.creative
    };

    setPreviewCampaign(preview);
    setIsViewerOpen(true);
    toast.info("👀 Opening campaign preview...");
  };

  const handleSaveFromViewer = (updatedCampaign: EmailCampaign) => {
    setNewEmail({
      subject: updatedCampaign.subject,
      content: updatedCampaign.content,
      creative: updatedCampaign.creative,
      aiGenerated: updatedCampaign.aiGenerated,
      targetAudience: updatedCampaign.targetAudience
    });
    toast.success("✅ Campaign updated from viewer!");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-600" />
            AI Email Campaign Creator
            <Badge variant="outline" className="text-green-600 border-green-300">
              <Target className="h-3 w-3 mr-1" />
              Organic Traffic Focus
            </Badge>
          </CardTitle>
          <CardDescription>Create AI-powered email campaigns optimized for organic traffic audiences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search for Campaign Ideas */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Search for Campaign Ideas:</label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., make money with clickbank, facebook ads, tiktok marketing..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchCampaignIdeas()}
              />
              <Button onClick={handleSearchCampaignIdeas} variant="outline">
                <Sparkles className="h-4 w-4 mr-1" />
                Search Ideas
              </Button>
            </div>
          </div>

          {/* Subject Line */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Subject:</label>
            <Input
              placeholder="Enter email subject or search for ideas above..."
              value={newEmail.subject || ""}
              onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
            />
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Audience:</label>
            <Select value={newEmail.targetAudience || "organic-traffic"} onValueChange={(value) => setNewEmail({ ...newEmail, targetAudience: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organic-traffic">Organic Traffic Subscribers</SelectItem>
                <SelectItem value="all-subscribers">All Subscribers</SelectItem>
                <SelectItem value="high-engagement">High Engagement Segment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* AI Creative Generation */}
          <div className="space-y-2">
            <label className="text-sm font-medium">AI Creative Generation:</label>
            <Button 
              onClick={handleGenerateAIContent}
              disabled={isGeneratingAI || !newEmail.subject?.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {isGeneratingAI ? "Generating AI Content & Video..." : "Generate AI Content & 30s Intro Video"}
            </Button>
          </div>

          {/* Current Creative Preview */}
          {newEmail.creative && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Creative:</label>
              <div className="relative">
                {newEmail.creative.type === "video" ? (
                  <div className="relative">
                    <video 
                      src={newEmail.creative.url} 
                      className="w-full h-32 object-cover rounded-lg"
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
                      src={newEmail.creative.url} 
                      alt={newEmail.creative.alt}
                      className="w-full h-32 object-cover rounded-lg"
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
              <p className="text-sm text-gray-600">{newEmail.creative.alt}</p>
            </div>
          )}

          {/* Email Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Content:</label>
            <Textarea
              placeholder="Email content will be generated by AI or you can write your own..."
              rows={6}
              value={newEmail.content || ""}
              onChange={(e) => setNewEmail({ ...newEmail, content: e.target.value })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleViewCampaign}
              variant="outline"
              className="flex-1"
              disabled={!newEmail.subject?.trim() || !newEmail.content?.trim()}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Campaign
            </Button>
            <Button 
              onClick={onCreateEmail}
              disabled={isCreatingEmail || !newEmail.subject?.trim() || !newEmail.content?.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="mr-2 h-4 w-4" />
              {isCreatingEmail ? "Creating..." : "Create Campaign"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mockup Selector */}
      <ImageMockupSelector
        isOpen={showMockups}
        onClose={() => setShowMockups(false)}
        mockups={mockupImages}
        onSelect={handleSelectMockup}
        searchTerm={searchTerm}
      />

      {/* Campaign Viewer */}
      <CampaignViewer
        campaign={previewCampaign}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        onSave={handleSaveFromViewer}
        isEditable={true}
      />
    </>
  );
};
