import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Wand2, Target, Video, ImageIcon, Play, Pause, Eye, X, Edit, Save, Sparkles, VolumeX, Volume2, Volume1, Mic, Captions } from "lucide-react";
import { EmailCampaign } from "@/hooks/useEmailCampaign";
import { generateEmailContent } from "@/utils/aiContentGenerator";
import { generateSynchronizedVideoContent, getCurrentVideoSegment, getSynchronizedNarrationWords, SynchronizedVideoContent } from "@/utils/videoContentGenerator";
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
  const [isEditing, setIsEditing] = useState(isEditable);
  const [editedCampaign, setEditedCampaign] = useState<EmailCampaign | null>(null);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoContent, setVideoContent] = useState<SynchronizedVideoContent | null>(null);
  const [isNarratorSpeaking, setIsNarratorSpeaking] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Generate synchronized video content when campaign changes
    if (campaign?.subject) {
      const content = generateSynchronizedVideoContent(campaign.subject);
      setVideoContent(content);
      toast.success(`🎬 Generated ${content.segments.length} synchronized video segments (2 min) for "${campaign.subject}"`);
    }
    setEditedCampaign(campaign);
    setIsEditing(isEditable);
  }, [campaign, isEditable]);

  // Update current time and sync content
  const updateVideoTime = () => {
    if (videoRef.current && videoContent && isVideoPlaying) {
      const newTime = videoRef.current.currentTime;
      setCurrentTime(newTime);
      
      // Check if video completed
      if (newTime >= videoContent.totalDuration) {
        setIsVideoPlaying(false);
        setIsNarratorSpeaking(false);
        stopNarrationAnimation();
        toast.info("🎬 2-minute synchronized promotional video completed!");
      }
    }
    
    if (isVideoPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateVideoTime);
    }
  };

  const startNarrationAnimation = () => {
    if (!videoContent || !showCaptions) return;
    
    setIsNarratorSpeaking(true);
    
    // Start text-to-speech narration with proper timing for 2-minute video
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(videoContent.fullNarration);
      utterance.rate = 0.85; // Slower rate to match 2-minute duration
      utterance.pitch = 1;
      utterance.volume = 0.8; // Full volume for narrator only
      
      utterance.onend = () => {
        setIsNarratorSpeaking(false);
      };
      
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      toast.success("🎤 AI narrator synchronized with 2-minute video content!");
    }
    
    // Start animation frame updates
    animationFrameRef.current = requestAnimationFrame(updateVideoTime);
  };

  const stopNarrationAnimation = () => {
    setIsNarratorSpeaking(false);
    
    // Stop text-to-speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setCurrentTime(0);
  };

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video || !videoContent) return;

    if (isVideoPlaying) {
      video.pause();
      setIsVideoPlaying(false);
      stopNarrationAnimation();
    } else {
      video.currentTime = 0;
      setCurrentTime(0);
      video.volume = 0; // Mute video completely
      video.play().then(() => {
        setIsVideoPlaying(true);
        startNarrationAnimation();
        toast.success("🎬 Playing 2-minute video with AI narrator only!");
      }).catch(console.error);
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    stopNarrationAnimation();
    toast.info("🎬 2-minute synchronized promotional video completed!");
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

  const toggleCaptions = () => {
    setShowCaptions(!showCaptions);
    if (!showCaptions && isVideoPlaying) {
      startNarrationAnimation();
    } else {
      stopNarrationAnimation();
    }
    toast.info(showCaptions ? "📝 Live synchronized text disabled" : "📝 Live synchronized text enabled");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopNarrationAnimation();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!campaign) return null;

  const currentCampaign = editedCampaign || campaign;
  const currentSegment = videoContent ? getCurrentVideoSegment(videoContent, currentTime) : null;
  const narrationWords = videoContent ? getSynchronizedNarrationWords(videoContent, currentTime) : { words: [], currentIndex: 0 };

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
                  : "Full campaign preview with 2-minute synchronized video content and AI narrator only"
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

          {/* Enhanced Playable Video with Dynamic Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">2-Minute AI Video (Narrator Audio Only)</h3>
              <div className="flex gap-2">
                <Badge variant="default" className="bg-red-600">
                  <Video className="h-3 w-3 mr-1" />
                  2:00 Runtime
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleCaptions}
                  className={showCaptions ? "bg-blue-50 border-blue-300" : ""}
                >
                  <Captions className="h-4 w-4 mr-1" />
                  {showCaptions ? "Hide" : "Show"} Text
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full max-w-2xl mx-auto group">
                {/* Actual Playable Video Element */}
                <video 
                  ref={videoRef}
                  className="w-full h-80 rounded-lg shadow-lg object-cover"
                  preload="metadata"
                  onEnded={handleVideoEnd}
                  onError={handleVideoError}
                  muted // Video is always muted
                  loop={false}
                  poster={currentSegment?.image || 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&q=80'}
                >
                  <source src={videoContent?.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Dynamic Background Overlay when video isn't playing */}
                {!isVideoPlaying && (
                  <div 
                    className="absolute inset-0 w-full h-80 rounded-lg shadow-lg bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${currentSegment?.image || 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&q=80'})`
                    }}
                  >
                    {/* Overlay for better text visibility */}
                    <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
                    
                    {/* Current segment text overlay */}
                    {currentSegment && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-white text-center px-6 leading-tight">
                          {currentSegment.text}
                        </h2>
                      </div>
                    )}
                  </div>
                )}
                
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

                {/* Status Indicators */}
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <VolumeX className="h-3 w-3 mr-1" />
                      Video Muted
                    </Badge>
                    {isNarratorSpeaking && (
                      <Badge variant="default" className="bg-green-600 animate-pulse">
                        <Mic className="h-3 w-3 mr-1" />
                        AI Narrator Speaking
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Live Synchronized Text Display (No Box) */}
              {showCaptions && isVideoPlaying && currentSegment && (
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Mic className={`h-4 w-4 ${isNarratorSpeaking ? 'text-green-400 animate-pulse' : 'text-gray-400'}`} />
                    <span className="text-xs text-green-600 font-medium">
                      {isNarratorSpeaking ? 'AI NARRATOR SPEAKING' : 'NARRATOR READY'}
                    </span>
                    <div className="w-32 h-1 bg-green-400/30 rounded">
                      <div 
                        className="h-full bg-green-400 rounded transition-all duration-300" 
                        style={{width: `${videoContent ? (currentTime / videoContent.totalDuration) * 100 : 0}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Current narration with synchronized word highlighting */}
                  <div className="text-2xl leading-relaxed mb-2 px-4">
                    {narrationWords.words.map((word, index) => {
                      const isCurrentWord = index === narrationWords.currentIndex;
                      
                      return (
                        <span
                          key={index}
                          className={`mr-2 transition-all duration-300 ${
                            isCurrentWord && isNarratorSpeaking
                              ? 'text-yellow-500 font-bold text-3xl transform scale-110' 
                              : 'text-gray-700'
                          }`}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="text-sm text-gray-500">
                    Now: "{narrationWords.words[narrationWords.currentIndex] || ''}" • 
                    {Math.floor(currentTime)}s / {videoContent?.totalDuration || 120}s
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-600 mt-2 text-center italic">
                Interactive 2-minute video for "{currentCampaign.subject}" with AI narrator only (video muted)
              </p>
              
              <p className="text-xs text-gray-500 mt-1 text-center">
                🎬 Click play to watch • 🎤 AI narrator audio only • 📝 Words highlight as spoken
              </p>
            </div>
          </div>

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
                  {currentCampaign.aiGenerated ? "AI-Powered Content with Synchronized Video & Real-time Narration" : "Manual Content Creation"}
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
