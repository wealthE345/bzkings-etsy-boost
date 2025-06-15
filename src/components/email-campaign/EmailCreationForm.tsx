import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Target, Sparkles, Eye, Send, Video, ImageIcon, RotateCcw, Shuffle, Film } from "lucide-react";
import { EmailCampaign, NewEmail } from "@/hooks/useEmailCampaign";
import { generateAITitle, getMockupImagesBySearchQuery, getPromotionalVideoBySearchQuery, generateEmailContent } from "@/utils/aiContentGenerator";
import { generateMovieClipsForSearch, getNewMovieClip, MovieClip } from "@/utils/movieClipsGenerator";
import { ImageMockupSelector } from "./ImageMockupSelector";
import { CampaignViewer } from "./CampaignViewer";
import { MovieClipsCreator } from "./MovieClipsCreator";
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
  const [isGeneratingMovieClip, setIsGeneratingMovieClip] = useState(false);
  const [showMockups, setShowMockups] = useState(false);
  const [mockupImages, setMockupImages] = useState<Array<{url: string, description: string}>>([]);
  const [mockupVideos, setMockupVideos] = useState<Array<{url: string, description: string, title: string}>>([]);
  const [movieClips, setMovieClips] = useState<MovieClip[]>([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [previewCampaign, setPreviewCampaign] = useState<EmailCampaign | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentMovieClipIndex, setCurrentMovieClipIndex] = useState(0);

  const handleSearchCampaignIdeas = () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    toast.info(`🔍 Generating unique promotional content for: "${searchTerm}"`);
    
    // Generate AI title based on search term
    const aiTitle = generateAITitle(searchTerm);
    
    // Get fresh mockup images, promotional videos, and movie clips for this specific search
    const images = getMockupImagesBySearchQuery(searchTerm);
    const videos = getPromotionalVideoBySearchQuery(searchTerm);
    const clips = generateMovieClipsForSearch(searchTerm);
    
    // Reset indexes when getting new content for search
    setMockupImages(images);
    setMockupVideos(videos);
    setMovieClips(clips);
    setCurrentImageIndex(0);
    setCurrentVideoIndex(0);
    setCurrentMovieClipIndex(0);
    setShowMockups(true);
    
    // Update email with AI-generated title and first movie clip
    setNewEmail({
      ...newEmail,
      subject: aiTitle,
      creative: {
        type: "video",
        url: clips[0].url,
        alt: clips[0].description
      }
    });

    toast.success(`✨ Generated fresh content: ${images.length} images, ${videos.length} videos, ${clips.length} movie clips for "${searchTerm}"`);
  };

  const handleRegenerateImage = () => {
    if (!searchTerm.trim()) {
      toast.error("Please search for campaign ideas first");
      return;
    }

    setIsRegeneratingImage(true);
    toast.info("🎨 Getting fresh promotional image from web...");

    setTimeout(() => {
      // Get fresh images to ensure we have new content
      const freshImages = getMockupImagesBySearchQuery(searchTerm + "_refresh_" + Date.now());
      
      // Use modulo to cycle through available images, ensuring we get a different one
      const nextIndex = (currentImageIndex + 1) % (mockupImages.length || freshImages.length);
      
      // If we've cycled through all, get fresh images
      if (nextIndex === 0) {
        setMockupImages(freshImages);
        setCurrentImageIndex(0);
        setNewEmail({
          ...newEmail,
          creative: {
            type: "image",
            url: freshImages[0].url,
            alt: freshImages[0].description
          }
        });
      } else {
        setCurrentImageIndex(nextIndex);
        setNewEmail({
          ...newEmail,
          creative: {
            type: "image",
            url: mockupImages[nextIndex].url,
            alt: mockupImages[nextIndex].description
          }
        });
      }

      setIsRegeneratingImage(false);
      toast.success(`🎨 Fresh promotional image generated for "${searchTerm}"!`);
    }, 1500);
  };

  const handleRegenerateVideo = () => {
    if (!searchTerm.trim()) {
      toast.error("Please search for campaign ideas first");
      return;
    }

    setIsRegeneratingVideo(true);
    toast.info("🎬 Getting fresh promotional video from web...");

    setTimeout(() => {
      // Get completely fresh videos to ensure uniqueness
      const freshVideos = getPromotionalVideoBySearchQuery(searchTerm + "_refresh_" + Date.now());
      
      // Use modulo to cycle through available videos, ensuring we get a different one
      const nextIndex = (currentVideoIndex + 1) % (mockupVideos.length || freshVideos.length);
      
      // If we've cycled through all, get fresh videos
      if (nextIndex === 0 || mockupVideos.length === 0) {
        setMockupVideos(freshVideos);
        setCurrentVideoIndex(0);
        setNewEmail({
          ...newEmail,
          creative: {
            type: "video",
            url: freshVideos[0].url,
            alt: freshVideos[0].description
          }
        });
        toast.success(`🎬 Brand new promotional video from web for "${searchTerm}"!`);
      } else {
        setCurrentVideoIndex(nextIndex);
        setNewEmail({
          ...newEmail,
          creative: {
            type: "video",
            url: mockupVideos[nextIndex].url,
            alt: mockupVideos[nextIndex].description
          }
        });
        toast.success(`🎬 Different promotional video selected for "${searchTerm}"!`);
      }

      setIsRegeneratingVideo(false);
    }, 2000);
  };

  const handleGenerateMovieClip = () => {
    if (!searchTerm.trim()) {
      toast.error("Please search for campaign ideas first");
      return;
    }

    setIsGeneratingMovieClip(true);
    toast.info("🎬 Generating cinematic movie clip from web...");

    setTimeout(() => {
      // Get fresh movie clips to ensure uniqueness
      const freshClips = generateMovieClipsForSearch(searchTerm + "_refresh_" + Date.now());
      
      // Use modulo to cycle through available clips, ensuring we get a different one
      const nextIndex = (currentMovieClipIndex + 1) % (movieClips.length || freshClips.length);
      
      // If we've cycled through all, get fresh clips
      if (nextIndex === 0 || movieClips.length === 0) {
        setMovieClips(freshClips);
        setCurrentMovieClipIndex(0);
        setNewEmail({
          ...newEmail,
          creative: {
            type: "video",
            url: freshClips[0].url,
            alt: freshClips[0].description
          }
        });
        toast.success(`🎬 Brand new ${freshClips[0].style} movie clip generated for "${searchTerm}"!`);
      } else {
        setCurrentMovieClipIndex(nextIndex);
        setNewEmail({
          ...newEmail,
          creative: {
            type: "video",
            url: movieClips[nextIndex].url,
            alt: movieClips[nextIndex].description
          }
        });
        toast.success(`🎬 Different ${movieClips[nextIndex].style} movie clip selected for "${searchTerm}"!`);
      }

      setIsGeneratingMovieClip(false);
    }, 2000);
  };

  const handleSelectMovieClip = (clip: MovieClip) => {
    setNewEmail({
      ...newEmail,
      creative: {
        type: "video",
        url: clip.url,
        alt: clip.description
      }
    });
    toast.success(`🎬 Selected movie clip: ${clip.title} (${clip.style})`);
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
          <CardDescription>Create AI-powered email campaigns with movie-style promotional videos and unique content for each search term</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search for Campaign Ideas */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Search for Campaign Ideas:</label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., make money with clickbank, facebook ads, crypto success, fitness transformation..."
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

          {/* Creative Content Tabs */}
          {newEmail.creative && searchTerm && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Creative Content for "{searchTerm}":</label>
              </div>
              
              <Tabs defaultValue="current" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="current">Current Creative</TabsTrigger>
                  <TabsTrigger value="generate">Generate New</TabsTrigger>
                  <TabsTrigger value="movie-clips">Movie Clips</TabsTrigger>
                </TabsList>
                
                <TabsContent value="current" className="space-y-3">
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
                          Current Video
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
                          Current Image
                        </Badge>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {newEmail.creative.alt} - Optimized for "{searchTerm}" campaigns
                  </p>
                </TabsContent>
                
                <TabsContent value="generate" className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleGenerateMovieClip}
                      disabled={isGeneratingMovieClip}
                      className="hover:bg-red-50"
                    >
                      <Film className={`h-3 w-3 mr-1 ${isGeneratingMovieClip ? 'animate-spin' : ''}`} />
                      {isGeneratingMovieClip ? "Generating..." : "Movie Clip"}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="movie-clips">
                  <MovieClipsCreator onSelectClip={handleSelectMovieClip} />
                </TabsContent>
              </Tabs>
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
