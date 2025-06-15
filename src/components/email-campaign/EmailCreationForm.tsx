import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Wand2, ImageIcon, Video, Upload, RefreshCw, Target, Search } from "lucide-react";
import { toast } from "sonner";
import { NewEmail } from "@/hooks/useEmailCampaign";
import { getRandomContent, getRandomImage, getVideoBySubject } from "@/utils/aiContentGenerator";

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

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setIsSearching(true);
    toast.info(`🔍 Searching for content related to "${searchTerm}"...`);

    setTimeout(() => {
      // Generate AI subject based on search term
      const aiSubject = `🚀 AI-Powered: ${searchTerm} - Transform Your Organic Traffic Strategy`;
      
      setNewEmail({
        ...newEmail,
        subject: aiSubject
      });

      setIsSearching(false);
      toast.success(`✨ Generated subject for "${searchTerm}"!`);
      toast.info("📝 Now generate AI content and creatives based on this subject");
    }, 2000);
  };

  const handleGenerateAIContent = async () => {
    if (!newEmail.subject.trim()) {
      toast.error("Please enter a subject first to generate AI content");
      return;
    }

    setIsGeneratingContent(true);
    toast.info("🤖 AI is generating optimized content for organic traffic...");

    setTimeout(() => {
      const randomContent = getRandomContent();
      const isVideoCreative = Math.random() > 0.5;
      let randomCreative;

      if (isVideoCreative) {
        randomCreative = {
          type: "video" as const,
          url: getVideoBySubject(newEmail.subject),
          alt: `AI-generated video for ${newEmail.subject} showcasing organic traffic growth strategies`
        };
      } else {
        randomCreative = {
          type: "image" as const,
          url: getRandomImage(),
          alt: `AI-generated image for ${newEmail.subject} featuring SEO tools and organic traffic analytics`
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

  const handleGenerateAIImage = async () => {
    setIsGeneratingImage(true);
    const searchContext = newEmail.subject || searchTerm || "organic traffic";
    toast.info(`🖼️ AI is generating an optimized image for "${searchContext}"...`);

    setTimeout(() => {
      const randomImage = getRandomImage();
      
      setNewEmail({
        ...newEmail,
        creative: {
          type: "image",
          url: randomImage,
          alt: `AI-generated image for ${searchContext} optimized for organic traffic campaigns`
        },
        aiGenerated: true
      });

      setIsGeneratingImage(false);
      toast.success("🎨 AI image generated successfully!");
      toast.info(`📊 Image optimized for "${searchContext}" engagement`);
    }, 2500);
  };

  const handleGenerateAIVideo = async () => {
    setIsGeneratingVideo(true);
    const searchContext = newEmail.subject || searchTerm || "AI digital marketing";
    toast.info(`🎬 AI is generating an optimized video for "${searchContext}"...`);

    setTimeout(() => {
      const subjectBasedVideo = getVideoBySubject(searchContext);
      
      setNewEmail({
        ...newEmail,
        creative: {
          type: "video",
          url: subjectBasedVideo,
          alt: `AI-generated video for ${searchContext} optimized for organic traffic`
        },
        aiGenerated: true
      });

      setIsGeneratingVideo(false);
      toast.success("🎥 AI video generated successfully!");
      toast.info(`📈 Video optimized for "${searchContext}" conversion`);
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
      toast.info("🔄 Regenerating AI video creative...");
    } else {
      setIsGeneratingImage(true);
      toast.info("🔄 Regenerating AI image creative...");
    }

    setTimeout(() => {
      if (isCurrentVideo) {
        const subjectBasedVideo = getVideoBySubject(searchContext);
        
        setNewEmail({
          ...newEmail,
          creative: {
            type: "video",
            url: subjectBasedVideo,
            alt: `AI-regenerated video for ${searchContext} optimized for organic traffic campaigns`
          }
        });
        
        setIsGeneratingVideo(false);
        toast.success("🎬 AI video regenerated successfully!");
      } else {
        const randomImage = getRandomImage();
        
        setNewEmail({
          ...newEmail,
          creative: {
            type: "image",
            url: randomImage,
            alt: `AI-regenerated image for ${searchContext} optimized for organic traffic campaigns`
          }
        });
        
        setIsGeneratingImage(false);
        toast.success("🖼️ AI image regenerated successfully!");
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
        {/* Search Section */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">Search for Campaign Ideas:</div>
          <div className="flex gap-2">
            <Input
              placeholder="Search for topics (e.g., SEO, content marketing, social media...)"
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
                  Search
                </>
              )}
            </Button>
          </div>
        </div>

        <Input
          placeholder="Email Subject (or use search above to generate)"
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
                      Playable Video
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
  );
};
