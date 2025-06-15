import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wand2, Target, Sparkles, Eye, Send, Video, ImageIcon, RotateCcw, Shuffle } from "lucide-react";
import { EmailCampaign, NewEmail } from "@/hooks/useEmailCampaign";
import { generateAITitle, getMockupImagesBySearchQuery, getPromotionalVideoBySearchQuery, generateEmailContent } from "@/utils/aiContentGenerator";
import { ImageMockupSelector } from "./ImageMockupSelector";
import { CampaignViewer } from "./CampaignViewer";
import { toast } from "sonner";

interface EmailCreationFormProps {
  newEmail: NewEmail;
  setNewEmail: (email: NewEmail) => void;
  isCreatingEmail: boolean;
  onCreateEmail: () => void;
}

export const EmailCreationForm = ({ newEmail, setNewEmail, isCreatingEmail, onCreateEmail }: EmailCreationFormProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);
  const [isRegeneratingVideo, setIsRegeneratingVideo] = useState(false);
  const [showMockups, setShowMockups] = useState(false);
  const [mockupImages, setMockupImages] = useState<Array<{url: string, description: string}>>([]);
  const [mockupVideos, setMockupVideos] = useState<Array<{url: string, description: string, title: string}>>([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [previewCampaign, setPreviewCampaign] = useState<EmailCampaign | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleSearchCampaignIdeas = () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    toast.info(`🔍 Generating unique promotional content for: "${searchTerm}"`);
    
    // Generate AI title based on search term
    const aiTitle = generateAITitle(searchTerm);
    
    // Get fresh mockup images and promotional videos for this specific search
    const images = getMockupImagesBySearchQuery(searchTerm);
    const videos = getPromotionalVideoBySearchQuery(searchTerm);
    
    setMockupImages(images);
    setMockupVideos(videos);
    setCurrentImageIndex(0);
    setCurrentVideoIndex(0);
    setShowMockups(true);
    
    // Update email with AI-generated title and first promotional video
    setNewEmail({
      ...newEmail,
      subject: aiTitle,
      creative: {
        type: "video",
        url: videos[0].url,
        alt: videos[0].description
      }
    });

    toast.success(`✨ Generated unique promotional content: ${images.length} images and ${videos.length} videos for "${searchTerm}"`);
  };

  const handleRegenerateImage = () => {
    if (!searchTerm.trim()) {
      toast.error("Please search for campaign ideas first");
      return;
    }

    setIsRegeneratingImage(true);
    toast.info("🎨 Regenerating promotional image...");

    setTimeout(() => {
      // Get next image from the available images
      const nextIndex = (currentImageIndex + 1) % mockupImages.length;
      setCurrentImageIndex(nextIndex);
      
      setNewEmail({
        ...newEmail,
        creative: {
          type: "image",
          url: mockupImages[nextIndex].url,
          alt: mockupImages[nextIndex].description
        }
      });

      setIsRegeneratingImage(false);
      toast.success(`🎨 New promotional image generated for "${searchTerm}"!`);
    }, 1500);
  };

  const handleRegenerateVideo = () => {
    if (!searchTerm.trim()) {
      toast.error("Please search for campaign ideas first");
      return;
    }

    setIsRegeneratingVideo(true);
    toast.info("🎬 Generating new promotional video...");

    setTimeout(() => {
      // Get next video from the available videos
      const nextIndex = (currentVideoIndex + 1) % mockupVideos.length;
      setCurrentVideoIndex(nextIndex);
      
      setNewEmail({
        ...newEmail,
        creative: {
          type: "video",
          url: mockupVideos[nextIndex].url,
          alt: mockupVideos[nextIndex].description
        }
      });

      setIsRegeneratingVideo(false);
      toast.success(`🎬 New promotional video generated for "${searchTerm}"!`);
    }, 2000);
  };

  const handleGenerateAIContent = async () => {
    if (!newEmail.subject?.trim()) {
      toast.error("Please add a subject first or search for campaign ideas");
      return;
    }

    setIsGeneratingAI(true);
    toast.info("🤖 Generating AI-powered email content and promotional video...");

    try {
      // Generate email content
      const content = generateEmailContent(searchTerm || newEmail.subject);
      
      // Generate promotional video
      const videos = getPromotionalVideoBySearchQuery(searchTerm || newEmail.subject);
      const video = videos[0]; // Get first promotional video
      
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
        targetAudience: "organic-traffic",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });

      setIsGeneratingAI(false);
      toast.success("✅ AI content and promotional video generated!");
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

  const handleSelectVideo = (video: {url: string, description: string, title: string}) => {
    setNewEmail({
      ...newEmail,
      creative: {
        type: "video",
        url: video.url,
        alt: video.description
      }
    });
    setShowMockups(false);
    toast.success(`🎬 Selected video: ${video.title}`);
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
      creative: newEmail.creative,
      startDate: newEmail.startDate || new Date().toISOString(),
      endDate: newEmail.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
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
      targetAudience: updatedCampaign.targetAudience,
      startDate: updatedCampaign.startDate,
      endDate: updatedCampaign.endDate
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
          <CardDescription>Create AI-powered email campaigns with unique promotional videos for each search term</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search for Campaign Ideas */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Search for Campaign Ideas:</label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., make money with clickbank, facebook ads, make money with tiktok..."
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

          {/* Current Creative Preview with Regeneration Options */}
          {newEmail.creative && searchTerm && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Promotional Creative for "{searchTerm}":</label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRegenerateImage}
                    disabled={isRegeneratingImage}
                    className="hover:bg-blue-50"
                  >
                    <RotateCcw className={`h-3 w-3 mr-1 ${isRegeneratingImage ? 'animate-spin' : ''}`} />
                    {isRegeneratingImage ? "Generating..." : "New Image"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRegenerateVideo}
                    disabled={isRegeneratingVideo}
                    className="hover:bg-purple-50"
                  >
                    <Shuffle className={`h-3 w-3 mr-1 ${isRegeneratingVideo ? 'animate-spin' : ''}`} />
                    {isRegeneratingVideo ? "Generating..." : "New Video"}
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                {newEmail.creative.type === "video" ? (
                  <div className="relative">
                    <video 
                      src={newEmail.creative.url} 
                      className="w-full h-40 object-cover rounded-lg"
                      controls
                      poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
                    />
                    <Badge 
                      variant="secondary"
                      className="absolute top-2 right-2"
                    >
                      <Video className="h-3 w-3 mr-1" />
                      Promotional Video #{currentVideoIndex + 1}
                    </Badge>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={newEmail.creative.url} 
                      alt={newEmail.creative.alt}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <Badge 
                      variant="default"
                      className="absolute top-2 right-2"
                    >
                      <ImageIcon className="h-3 w-3 mr-1" />
                      Promotional Image #{currentImageIndex + 1}
                    </Badge>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {newEmail.creative.alt} - Optimized for "{searchTerm}" campaigns
              </p>
            </div>
          )}

          {/* AI Creative Generation */}
          <div className="space-y-2">
            <label className="text-sm font-medium">AI Content Generation:</label>
            <Button 
              onClick={handleGenerateAIContent}
              disabled={isGeneratingAI || !newEmail.subject?.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {isGeneratingAI ? "Generating AI Content..." : "Generate AI Content & Email Copy"}
            </Button>
          </div>

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
              Preview Campaign
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

      {/* Enhanced Mockup Selector */}
      <ImageMockupSelector
        isOpen={showMockups}
        onClose={() => setShowMockups(false)}
        mockups={mockupImages}
        videos={mockupVideos}
        onSelectImage={handleSelectMockup}
        onSelectVideo={handleSelectVideo}
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
