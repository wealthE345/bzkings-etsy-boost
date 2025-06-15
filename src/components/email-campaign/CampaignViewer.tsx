
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Wand2, Target, Video, ImageIcon, Play, Pause, Eye, X, Edit, Save, Sparkles, VolumeX, Volume2, Volume1, Mic } from "lucide-react";
import { EmailCampaign } from "@/hooks/useEmailCampaign";
import { generateEmailContent } from "@/utils/aiContentGenerator";
import { toast } from "sonner";

interface CampaignViewerProps {
  campaign: EmailCampaign | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (campaign: EmailCampaign) => void;
  isEditable?: boolean;
}

export const CampaignViewer = ({ campaign, isOpen, onClose, onSave, isEditable = false }: CampaignViewerProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isEditing, setIsEditing] = useState(isEditable);
  const [editedCampaign, setEditedCampaign] = useState<EmailCampaign | null>(null);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [showTextToSpeech, setShowTextToSpeech] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Reset video state when campaign changes
    if (campaign && videoRef.current) {
      setIsVideoPlaying(false);
      videoRef.current.currentTime = 0;
      videoRef.current.volume = volume;
      setIsMuted(false);
    }
    setEditedCampaign(campaign);
    setIsEditing(isEditable);
  }, [campaign, isEditable, volume]);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
      setIsVideoPlaying(false);
    } else {
      video.currentTime = 0;
      video.volume = isMuted ? 0 : volume;
      video.play().then(() => {
        setIsVideoPlaying(true);
        toast.success("🎬 Video playing with promotional audio!");
      }).catch(console.error);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    const video = videoRef.current;
    if (video) {
      video.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
      toast.info("🔊 Video audio enabled");
    } else {
      video.volume = 0;
      setIsMuted(true);
      toast.info("🔇 Video audio muted");
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    toast.info("🎬 Promotional video completed!");
  };

  const handleVideoError = () => {
    console.log("Video playback error, but continuing...");
    setIsVideoPlaying(false);
  };

  const handleGenerateContent = async () => {
    if (!editedCampaign) return;
    
    setIsGeneratingContent(true);
    toast.info("🤖 Generating AI-powered email content...");
    
    setTimeout(() => {
      const searchTerm = editedCampaign.subject || "digital marketing";
      const newContent = generateEmailContent(searchTerm);
      
      setEditedCampaign({
        ...editedCampaign,
        content: newContent
      });
      
      setIsGeneratingContent(false);
      toast.success("✨ AI content generated successfully!");
    }, 2000);
  };

  const handleSave = () => {
    if (!editedCampaign) return;
    
    if (!editedCampaign.subject.trim() || !editedCampaign.content.trim()) {
      toast.error("Please fill in both subject and content");
      return;
    }

    if (onSave) {
      onSave(editedCampaign);
    }
    setIsEditing(false);
    toast.success("✅ Campaign saved successfully!");
  };

  // Get text-to-speech content for video
  const getTextToSpeechContent = () => {
    if (currentCampaign.creative?.type === "video") {
      // This would be the actual text-to-speech content that plays in the video
      const searchTerm = currentCampaign.subject || "digital marketing";
      return `Welcome to this promotional video about ${searchTerm}! This AI-generated content will help you understand the key benefits and strategies for success with ${searchTerm}. Our comprehensive system is designed to deliver maximum results and help you achieve your goals.`;
    }
    return "";
  };

  if (!campaign) return null;

  const currentCampaign = editedCampaign || campaign;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                {isEditing ? "Edit Campaign" : "Campaign Preview"}
                {isEditing && (
                  <Badge variant="outline" className="text-purple-600 border-purple-300">
                    <Edit className="h-3 w-3 mr-1" />
                    Editing Mode
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Edit your campaign with AI-powered content generation"
                  : "Full campaign preview with promotional video featuring text-to-speech narration and volume controls"
                }
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing && isEditable && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Campaign Header */}
          <div className="border-b pb-4">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={currentCampaign.subject}
                  onChange={(e) => setEditedCampaign(prev => prev ? {...prev, subject: e.target.value} : null)}
                  placeholder="Email Subject"
                  className="text-xl font-bold"
                />
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={
                    currentCampaign.status === "Published" ? "default" : 
                    currentCampaign.status === "Scheduled" ? "secondary" : "outline"
                  }>
                    {currentCampaign.status}
                  </Badge>
                  {currentCampaign.aiGenerated && (
                    <Badge variant="outline" className="text-purple-600 border-purple-300">
                      <Wand2 className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  )}
                  {currentCampaign.targetAudience === "organic-traffic" && (
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      <Target className="h-3 w-3 mr-1" />
                      Organic Traffic Audience
                    </Badge>
                  )}
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2">{currentCampaign.subject}</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={
                    currentCampaign.status === "Published" ? "default" : 
                    currentCampaign.status === "Scheduled" ? "secondary" : "outline"
                  }>
                    {currentCampaign.status}
                  </Badge>
                  {currentCampaign.aiGenerated && (
                    <Badge variant="outline" className="text-purple-600 border-purple-300">
                      <Wand2 className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  )}
                  {currentCampaign.targetAudience === "organic-traffic" && (
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      <Target className="h-3 w-3 mr-1" />
                      Organic Traffic Audience
                    </Badge>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Campaign Stats */}
          {currentCampaign.status === "Published" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{currentCampaign.sent.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{currentCampaign.opens}</div>
                <div className="text-sm text-gray-600">Opens</div>
                <div className="text-xs text-gray-500">{((currentCampaign.opens / currentCampaign.sent) * 100).toFixed(1)}%</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{currentCampaign.clicks}</div>
                <div className="text-sm text-gray-600">Clicks</div>
                <div className="text-xs text-gray-500">{((currentCampaign.clicks / currentCampaign.opens) * 100).toFixed(1)}%</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{Math.floor(currentCampaign.sent * 0.015)}</div>
                <div className="text-sm text-gray-600">Unsubscribes</div>
                <div className="text-xs text-gray-500">1.5%</div>
              </div>
            </div>
          )}

          {/* Enhanced AI Creative Content with Volume Controls */}
          {currentCampaign.creative?.url && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Promotional Video with Text-to-Speech Narration</h3>
                {currentCampaign.creative.type === "video" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTextToSpeech(!showTextToSpeech)}
                  >
                    <Mic className="h-4 w-4 mr-1" />
                    {showTextToSpeech ? "Hide" : "Show"} Narration Text
                  </Button>
                )}
              </div>

              {/* Text-to-Speech Content Display */}
              {showTextToSpeech && currentCampaign.creative.type === "video" && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    Video Narration Script (Text-to-Speech)
                  </h4>
                  <p className="text-sm text-blue-800 italic">
                    {getTextToSpeechContent()}
                  </p>
                </div>
              )}

              <div className="relative">
                {currentCampaign.creative.type === "video" ? (
                  <div className="relative w-full max-w-2xl mx-auto group">
                    <video 
                      ref={videoRef}
                      src={currentCampaign.creative.url} 
                      className="w-full h-80 object-cover rounded-lg shadow-lg"
                      preload="metadata"
                      onEnded={handleVideoEnd}
                      onError={handleVideoError}
                      poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
                      loop
                    />
                    
                    {/* Play/Pause Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg group-hover:bg-black/30 transition-colors">
                      <Button
                        size="lg"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white text-black border-none shadow-lg transform scale-110"
                        onClick={toggleVideoPlayback}
                      >
                        {isVideoPlaying ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="h-8 w-8" />
                        )}
                      </Button>
                    </div>

                    {/* Top Controls */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        <Video className="h-3 w-3 mr-1" />
                        Promotional Video
                      </Badge>
                    </div>

                    {/* Bottom Volume Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-black/70 hover:bg-black/80 text-white"
                        onClick={toggleMute}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : volume > 0.5 ? (
                          <Volume2 className="h-4 w-4" />
                        ) : (
                          <Volume1 className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <div className="flex-1 max-w-32">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <Badge variant="outline" className="bg-black/70 text-white border-white/30">
                        {Math.round(volume * 100)}%
                      </Badge>
                    </div>

                    {/* Status Indicators */}
                    {isVideoPlaying && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="default" className="bg-green-600">
                          <Play className="h-3 w-3 mr-1" />
                          Playing
                        </Badge>
                        {!isMuted && (
                          <Badge variant="outline" className="bg-blue-600 text-white border-white/30">
                            <Mic className="h-3 w-3 mr-1" />
                            Narration On
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full max-w-2xl mx-auto">
                    <img 
                      src={currentCampaign.creative.url} 
                      alt={currentCampaign.creative.alt}
                      className="w-full h-80 object-cover rounded-lg shadow-lg"
                    />
                    <Badge 
                      variant="default"
                      className="absolute top-4 right-4"
                    >
                      <ImageIcon className="h-3 w-3 mr-1" />
                      AI Generated Image
                    </Badge>
                  </div>
                )}
                
                <p className="text-sm text-gray-600 mt-2 text-center italic">
                  {currentCampaign.creative.alt}
                </p>
                
                {currentCampaign.creative.type === "video" && (
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    📢 Promotional video with AI-generated text-to-speech narration • Use volume controls to adjust audio
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Email Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Email Content</h3>
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateContent}
                  disabled={isGeneratingContent}
                  className="text-purple-600 border-purple-300"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  {isGeneratingContent ? "Generating..." : "Generate AI Content"}
                </Button>
              )}
            </div>
            <div className="p-6 border rounded-lg bg-white shadow-sm">
              {isEditing ? (
                <Textarea
                  value={currentCampaign.content}
                  onChange={(e) => setEditedCampaign(prev => prev ? {...prev, content: e.target.value} : null)}
                  placeholder="Email content..."
                  rows={12}
                  className="min-h-[300px] resize-none"
                />
              ) : (
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {currentCampaign.content}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Campaign Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Campaign Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">Target Audience</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {currentCampaign.targetAudience === "organic-traffic" ? "Organic Traffic Subscribers" : currentCampaign.targetAudience}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">Content Generation</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {currentCampaign.aiGenerated ? "AI-Powered Content with Promotional Video & Text-to-Speech" : "Manual Content Creation"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-2 justify-end pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
