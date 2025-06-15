
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Wand2, ImageIcon, Video, Upload, RefreshCw, Target, Search, Play, Calendar, Eye } from "lucide-react";
import { toast } from "sonner";
import { NewEmail } from "@/hooks/useEmailCampaign";
import { 
  getRandomContent, 
  getImageBySearchQuery, 
  getVideoBySearchQuery, 
  getContentBySearchTerm,
  generateAITitle
} from "@/utils/aiContentGenerator";
import { ImageMockupSelector } from "./ImageMockupSelector";
import { CampaignPreview } from "./CampaignPreview";

interface EmailCreationFormProps {
  newEmail: NewEmail;
  setNewEmail: (email: NewEmail) => void;
  isCreatingEmail: boolean;
  onCreateEmail: () => void;
}

export const EmailCreationForm = ({ newEmail, setNewEmail, isCreatingEmail, onCreateEmail }: EmailCreationFormProps) => {
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showMockups, setShowMockups] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setIsSearching(true);
    toast.info(`🔍 Searching for campaign ideas related to "${searchTerm}"...`);

    setTimeout(() => {
      const aiSubject = generateAITitle(searchTerm);
      
      setNewEmail({
        ...newEmail,
        subject: aiSubject
      });

      setShowMockups(true);
      setIsSearching(false);
      toast.success(`✨ Generated AI title for "${searchTerm}"!`);
      toast.info("📸 Check out the AI mockup images below and select one for your campaign");
    }, 2000);
  };

  const handleMockupImageSelect = (imageUrl: string, description: string) => {
    setNewEmail({
      ...newEmail,
      creative: {
        type: "image",
        url: imageUrl,
        alt: description
      },
      aiGenerated: true
    });
    toast.success("🖼️ Mockup image added to your campaign!");
  };

  const handleViewCampaign = () => {
    if (!newEmail.subject && !newEmail.content) {
      toast.error("Please add a subject or content to preview your campaign");
      return;
    }
    setShowPreview(true);
    toast.info("👀 Viewing your campaign preview");
  };

  const handleGenerateAIContent = async () => {
    if (!newEmail.subject.trim()) {
      toast.error("Please enter a subject first to generate AI content");
      return;
    }

    setIsGeneratingContent(true);
    toast.info("🤖 AI is generating optimized content and advanced creatives...");

    setTimeout(() => {
      const searchContext = newEmail.subject || searchTerm || "organic traffic";
      const contentBasedOnSearch = getContentBySearchTerm(searchContext);
      const isVideoCreative = Math.random() > 0.3; // Higher chance for video
      let randomCreative;

      if (isVideoCreative) {
        const introVideo = getVideoBySearchQuery(searchContext);
        randomCreative = {
          type: "video" as const,
          url: introVideo.url,
          alt: `AI 30-second intro: ${introVideo.title} - ${introVideo.description}`
        };
        toast.info(`🎬 Generated advanced 30-second intro: "${introVideo.title}"`);
      } else {
        randomCreative = {
          type: "image" as const,
          url: getImageBySearchQuery(searchContext),
          alt: `AI-generated advanced image for ${searchContext} featuring professional visual content`
        };
      }

      setNewEmail({
        ...newEmail,
        content: contentBasedOnSearch,
        creative: randomCreative,
        aiGenerated: true,
        targetAudience: "organic-traffic"
      });

      setIsGeneratingContent(false);
      toast.success("✨ AI content and advanced creative generated successfully!");
      toast.info("🎯 Content optimized for organic traffic and maximum engagement");
    }, 3000);
  };

  const handleGenerateAIImage = async () => {
    setIsGeneratingImage(true);
    const searchContext = newEmail.subject || searchTerm || "organic traffic";
    toast.info(`🎨 AI is generating an advanced, professional image for "${searchContext}"...`);

    setTimeout(() => {
      const optimizedImage = getImageBySearchQuery(searchContext);
      
      setNewEmail({
        ...newEmail,
        creative: {
          type: "image",
          url: optimizedImage,
          alt: `AI-generated professional image for ${searchContext} optimized for maximum engagement`
        },
        aiGenerated: true
      });

      setIsGeneratingImage(false);
      toast.success("🎨 Advanced AI image generated successfully!");
      toast.info(`📊 Professional image optimized for "${searchContext}" campaigns`);
    }, 2500);
  };

  const handleGenerateAIVideo = async () => {
    setIsGeneratingVideo(true);
    const searchContext = newEmail.subject || searchTerm || "AI digital marketing";
    toast.info(`🎬 AI is generating an advanced 30-second intro video for "${searchContext}"...`);

    setTimeout(() => {
      const introVideo = getVideoBySearchQuery(searchContext);
      
      setNewEmail({
        ...newEmail,
        creative: {
          type: "video",
          url: introVideo.url,
          alt: `Advanced 30-second AI intro: ${introVideo.title} - ${introVideo.description}`
        },
        aiGenerated: true
      });

      setIsGeneratingVideo(false);
      toast.success(`🎥 Advanced 30-second intro video generated: "${introVideo.title}"!`);
      toast.info(`📈 Professional video optimized for "${searchContext}" conversion (${introVideo.duration})`);
    }, 4000);
  };

  const handleRegenerateCreative = async () => {
    if (!newEmail.creative.url) {
      toast.error("No creative to regenerate. Generate one first!");
      return;
    }

    const isCurrentVideo = newEmail.creative.type === "video";
    const searchContext = newEmail.subject || searchTerm || "AI digital marketing";
    
    if (isCurrentVideo) {
      setIsGeneratingVideo(true);
      toast.info("🔄 Regenerating advanced 30-second AI intro video...");
    } else {
      setIsGeneratingImage(true);
      toast.info("🔄 Regenerating advanced AI image creative...");
    }

    setTimeout(() => {
      if (isCurrentVideo) {
        const introVideo = getVideoBySearchQuery(searchContext);
        
        setNewEmail({
          ...newEmail,
          creative: {
            type: "video",
            url: introVideo.url,
            alt: `Advanced 30-second AI regenerated intro: ${introVideo.title} - ${introVideo.description}`
          }
        });
        
        setIsGeneratingVideo(false);
        toast.success(`🎬 Advanced 30-second intro video regenerated: "${introVideo.title}"!`);
      } else {
        const optimizedImage = getImageBySearchQuery(searchContext);
        
        setNewEmail({
          ...newEmail,
          creative: {
            type: "image",
            url: optimizedImage,
            alt: `AI-regenerated professional image for ${searchContext} optimized for maximum engagement`
          }
        });
        
        setIsGeneratingImage(false);
        toast.success("🖼️ Advanced AI image regenerated successfully!");
      }
    }, 3000);
  };

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleUploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-600" />
            AI Email Campaign Creator
            <Badge variant="outline" className="text-green-600 border-green-300">
              <Target className="h-3 w-3 mr-1" />
              Organic Traffic
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-300">
              <Play className="h-3 w-3 mr-1" />
              Advanced Creatives
            </Badge>
          </CardTitle>
          <CardDescription>Generate AI-powered email campaigns with intelligent content and creatives optimized for organic traffic audiences</CardDescription>
          
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={handleViewCampaign}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Section */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700">Search for Campaign Ideas:</div>
            <div className="flex gap-2">
              <Input
                placeholder="Search for topics (e.g., make money on Facebook, TikTok marketing...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                variant="outline"
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                {isSearching ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search & Generate
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Email Subject */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Subject:</label>
            <Input
              placeholder="Email Subject (or use search above to generate AI title)"
              value={newEmail.subject}
              onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
            />
          </div>
          
          {/* AI Content Generation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  Generate AI Content + Creative
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

          {/* AI Creative Generation */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700">AI Creative Generation:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    AI Professional Image
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
                    AI 30s Video
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700">Upload Your Own:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

          {/* Campaign Schedule */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Campaign Schedule:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600">Start Date & Time</label>
                <Input
                  type="datetime-local"
                  value={newEmail.startDate}
                  onChange={(e) => setNewEmail({ ...newEmail, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">End Date & Time</label>
                <Input
                  type="datetime-local"
                  value={newEmail.endDate}
                  onChange={(e) => setNewEmail({ ...newEmail, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Creative Preview */}
          {newEmail.creative.url && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Creative Preview:</label>
              <div className="relative">
                {newEmail.creative.type === "video" ? (
                  <div className="relative">
                    <video 
                      src={newEmail.creative.url} 
                      className="w-full h-48 object-cover rounded-lg"
                      controls
                      muted
                      poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
                    />
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      <Video className="h-3 w-3 mr-1" />
                      Video
                    </Badge>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={newEmail.creative.url} 
                      alt={newEmail.creative.alt}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      Image
                    </Badge>
                  </div>
                )}
                {newEmail.aiGenerated && (
                  <Badge variant="outline" className="absolute top-2 left-2 bg-purple-50 text-purple-600 border-purple-300">
                    <Wand2 className="h-3 w-3 mr-1" />
                    AI Generated
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Email Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Content:</label>
            <Textarea
              placeholder="Email Content (or generate with AI)..."
              rows={8}
              value={newEmail.content}
              onChange={(e) => setNewEmail({ ...newEmail, content: e.target.value })}
            />
          </div>
          
          {/* Recipients */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Recipients:</label>
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
          </div>
          
          {/* Schedule Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Schedule Date (Optional):</label>
            <Input
              type="datetime-local"
              value={newEmail.scheduleDate}
              onChange={(e) => setNewEmail({ ...newEmail, scheduleDate: e.target.value })}
            />
          </div>
          
          {/* Create Button */}
          <Button 
            onClick={onCreateEmail}
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

      {/* Campaign Preview */}
      {showPreview && (
        <CampaignPreview 
          campaign={newEmail}
          onEditClick={() => setShowPreview(false)}
        />
      )}

      {/* Image Mockup Selector */}
      <ImageMockupSelector 
        searchTerm={searchTerm}
        onImageSelect={handleMockupImageSelect}
        isVisible={showMockups}
      />
    </div>
  );
};
