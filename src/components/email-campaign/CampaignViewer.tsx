import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Wand2, Target, Video, ImageIcon, Play, Pause, Eye, X, Edit, Save, Sparkles, VolumeX, Volume2, Volume1, Mic, Captions } from "lucide-react";
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
  const [showCaptions, setShowCaptions] = useState(true);
  const [showTextToSpeech, setShowTextToSpeech] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isNarratorSpeaking, setIsNarratorSpeaking] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const captionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const wordIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

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

  // Enhanced function to get topic-specific promotional content
  const getPromotionalContent = () => {
    if (!currentCampaign?.subject) return "";
    
    const searchTerm = currentCampaign.subject.toLowerCase();
    
    if (searchTerm.includes('tiktok') || searchTerm.includes('tik tok')) {
      return "Welcome to TikTok Money Mastery! Transform your TikTok passion into profit! Learn how creators are earning thousands monthly through viral content. Master the TikTok Creator Fund. Build your personal brand. Negotiate lucrative brand partnerships. Create engaging viral videos. Use trending hashtags effectively. Turn your followers into income streams. Start your TikTok money-making journey today!";
    } else if (searchTerm.includes('google') || searchTerm.includes('search')) {
      return "Unlock Google Money Secrets! Discover how to make money with Google AdSense, YouTube monetization, and Google Ads. Learn search engine optimization strategies. Master Google My Business for local profits. Create profitable Google Play apps. Monetize your content with Google platforms. Build passive income through Google services. Start earning with Google today!";
    } else if (searchTerm.includes('facebook') || searchTerm.includes('meta')) {
      return "Facebook Profit Blueprint! Master Facebook Ads for maximum ROI. Create viral Facebook content that converts. Build profitable Facebook groups. Monetize your Facebook page effectively. Learn advanced targeting strategies. Scale your business with Facebook marketing. Turn social media into serious income. Dominate Facebook advertising now!";
    } else if (searchTerm.includes('instagram') || searchTerm.includes('insta')) {
      return "Instagram Money Machine! Transform your Instagram into a profit center. Learn influencer marketing secrets. Master Instagram Reels for viral growth. Build engaged followers who buy. Create stunning content that sells. Monetize through sponsored posts. Use Instagram Shopping features. Start your Instagram empire today!";
    } else if (searchTerm.includes('youtube')) {
      return "YouTube Revenue Revolution! Build a profitable YouTube channel from scratch. Master YouTube monetization strategies. Create viral video content. Optimize for YouTube algorithm success. Build subscriber loyalty. Generate multiple income streams. Scale your YouTube business. Turn your passion into YouTube profits!";
    } else if (searchTerm.includes('affiliate') || searchTerm.includes('clickbank')) {
      return "Affiliate Marketing Mastery! Generate passive income through affiliate commissions. Master high-converting product selection. Learn traffic generation strategies. Build automated sales funnels. Scale affiliate campaigns profitably. Create multiple income streams. Join top affiliate networks. Start earning affiliate commissions today!";
    } else if (searchTerm.includes('crypto') || searchTerm.includes('bitcoin')) {
      return "Cryptocurrency Profit Guide! Learn smart crypto investment strategies. Master DeFi yield farming. Understand blockchain technology. Trade cryptocurrencies profitably. Build crypto passive income. Navigate market volatility safely. Create diversified crypto portfolios. Start your crypto wealth journey!";
    } else if (searchTerm.includes('dropshipping') || searchTerm.includes('ecommerce')) {
      return "Dropshipping Empire Builder! Create profitable online stores without inventory. Master product research strategies. Build high-converting sales pages. Scale with profitable advertising. Automate your dropshipping business. Find winning products consistently. Generate passive ecommerce income. Launch your store today!";
    }
    
    return `Discover powerful strategies for ${currentCampaign.subject}! Learn proven methods that generate real results. Master advanced techniques used by successful entrepreneurs. Build sustainable income streams. Scale your success systematically. Transform your financial future. Start your journey to success today with our comprehensive training program!`;
  };

  // Get topic-specific video URL based on email subject
  const getTopicVideoUrl = () => {
    if (!currentCampaign?.subject) return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    
    const searchTerm = currentCampaign.subject.toLowerCase();
    
    if (searchTerm.includes('tiktok')) {
      return "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"; // TikTok promotional style
    } else if (searchTerm.includes('google')) {
      return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"; // Tech/business style
    } else if (searchTerm.includes('facebook')) {
      return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"; // Social media style
    } else if (searchTerm.includes('instagram')) {
      return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"; // Visual/creative style
    } else if (searchTerm.includes('youtube')) {
      return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"; // Video content style
    }
    
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  };

  // Split narration into words for real-time highlighting
  const getNarrationWords = () => {
    const fullText = getPromotionalContent();
    return fullText.split(' ').filter(word => word.trim().length > 0);
  };

  // Split into sentences for sentence-by-sentence display
  const getNarrationSentences = () => {
    const fullText = getPromotionalContent();
    const sentences = fullText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    return sentences.map(sentence => sentence.trim() + '.');
  };

  const startNarrationAnimation = () => {
    if (!showCaptions) return;
    
    const words = getNarrationWords();
    const sentences = getNarrationSentences();
    setCurrentWordIndex(0);
    setCurrentSentenceIndex(0);
    setIsNarratorSpeaking(true);
    
    // Start text-to-speech narration
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(getPromotionalContent());
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = isMuted ? 0 : volume;
      
      utterance.onend = () => {
        setIsNarratorSpeaking(false);
        stopNarrationAnimation();
      };
      
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      toast.success("🎤 AI narrator is now speaking the promotional content!");
    }
    
    // Animate words to sync with speech (approximately)
    wordIntervalRef.current = setInterval(() => {
      setCurrentWordIndex(prev => {
        if (prev >= words.length - 1) {
          return 0; // Loop back to start
        }
        return prev + 1;
      });
    }, 600); // Adjusted timing for natural speech pace
    
    // Animate sentences every 5 seconds
    captionIntervalRef.current = setInterval(() => {
      setCurrentSentenceIndex(prev => {
        if (prev >= sentences.length - 1) {
          return 0; // Loop back to start
        }
        return prev + 1;
      });
    }, 5000);
  };

  const stopNarrationAnimation = () => {
    setIsNarratorSpeaking(false);
    
    // Stop text-to-speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    if (captionIntervalRef.current) {
      clearInterval(captionIntervalRef.current);
      captionIntervalRef.current = null;
    }
    if (wordIntervalRef.current) {
      clearInterval(wordIntervalRef.current);
      wordIntervalRef.current = null;
    }
    setCurrentWordIndex(0);
    setCurrentSentenceIndex(0);
  };

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
      setIsVideoPlaying(false);
      stopNarrationAnimation();
    } else {
      video.currentTime = 0;
      video.volume = isMuted ? 0 : 0.3; // Lower video volume so narrator is clear
      video.play().then(() => {
        setIsVideoPlaying(true);
        startNarrationAnimation();
        toast.success("🎬 Video playing with synchronized AI narrator!");
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
    stopNarrationAnimation();
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

  const toggleCaptions = () => {
    setShowCaptions(!showCaptions);
    if (!showCaptions && isVideoPlaying) {
      startNarrationAnimation();
    } else {
      stopNarrationAnimation();
    }
    toast.info(showCaptions ? "📝 Live narrator text disabled" : "📝 Live narrator text enabled");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopNarrationAnimation();
    };
  }, []);

  if (!campaign) return null;

  const currentCampaign = editedCampaign || campaign;
  const narrationWords = getNarrationWords();
  const narrationSentences = getNarrationSentences();
  const currentSentence = narrationSentences[currentSentenceIndex] || "";

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
                  : "Full campaign preview with promotional video featuring live narrator speech text synchronized with narration"
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

          {/* Enhanced AI Promotional Video with Synchronized Text-to-Speech */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">AI Promotional Video with Synchronized Narrator</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleCaptions}
                  className={showCaptions ? "bg-blue-50 border-blue-300" : ""}
                >
                  <Captions className="h-4 w-4 mr-1" />
                  {showCaptions ? "Hide" : "Show"} Live Text
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTextToSpeech(!showTextToSpeech)}
                >
                  <Mic className="h-4 w-4 mr-1" />
                  Full Script
                </Button>
              </div>
            </div>

            {/* Full Promotional Script Display */}
            {showTextToSpeech && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Complete AI Promotional Video Script for "{currentCampaign.subject}"
                </h4>
                <p className="text-sm text-blue-800 italic leading-relaxed">
                  {getPromotionalContent()}
                </p>
              </div>
            )}

            <div className="relative">
              <div className="relative w-full max-w-2xl mx-auto group">
                <video 
                  ref={videoRef}
                  src={getTopicVideoUrl()}
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                  preload="metadata"
                  onEnded={() => {
                    setIsVideoPlaying(false);
                    stopNarrationAnimation();
                    toast.info("🎬 Promotional video completed!");
                  }}
                  onError={() => {
                    console.log("Video playback error, but continuing...");
                    setIsVideoPlaying(false);
                  }}
                  poster={`https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&q=80`}
                  loop
                />
                
                {/* Live Synchronized Narrator Text Overlay */}
                {showCaptions && isVideoPlaying && (
                  <div className="absolute bottom-16 left-4 right-4 bg-black/95 text-white p-4 rounded-lg border border-yellow-400">
                    <div className="flex items-center gap-2 mb-3">
                      <Mic className={`h-4 w-4 ${isNarratorSpeaking ? 'text-green-400 animate-pulse' : 'text-gray-400'}`} />
                      <span className="text-xs text-green-400 font-medium">
                        {isNarratorSpeaking ? 'AI NARRATOR SPEAKING' : 'NARRATOR READY'}
                      </span>
                      <div className="flex-1 h-0.5 bg-green-400/30 rounded">
                        <div 
                          className="h-full bg-green-400 rounded transition-all duration-300" 
                          style={{width: `${(currentWordIndex / narrationWords.length) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Current sentence with synchronized word highlighting */}
                    <div className="text-lg leading-relaxed mb-2">
                      {currentSentence.split(' ').map((word, index) => {
                        const sentenceStartIndex = narrationWords.findIndex(w => 
                          currentSentence.toLowerCase().includes(w.toLowerCase())
                        );
                        const wordInSentence = index + sentenceStartIndex;
                        const isCurrentWord = Math.abs(wordInSentence - currentWordIndex) < 2;
                        
                        return (
                          <span
                            key={index}
                            className={`mr-1 transition-all duration-500 ${
                              isCurrentWord && isNarratorSpeaking
                                ? 'bg-yellow-400 text-black px-1 rounded font-bold shadow-lg transform scale-110 animate-pulse' 
                                : 'text-white'
                            }`}
                          >
                            {word}
                          </span>
                        );
                      })}
                    </div>
                    
                    {/* Progress and status indicators */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-300 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Now saying: "{narrationWords[currentWordIndex] || ''}"
                      </span>
                      <span className="text-gray-300">
                        {currentWordIndex + 1} / {narrationWords.length} words
                      </span>
                    </div>
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
                      <Video className="h-3 w-3 mr-1" />
                      AI Promotional Video
                    </Badge>
                    {isNarratorSpeaking && (
                      <Badge variant="default" className="bg-green-600 animate-pulse">
                        <Mic className="h-3 w-3 mr-1" />
                        Narrator Speaking
                      </Badge>
                    )}
                  </div>
                  {showCaptions && (
                    <Badge variant="outline" className="bg-blue-600 text-white border-white/30">
                      <Captions className="h-3 w-3 mr-1" />
                      Live Text On
                    </Badge>
                  )}
                </div>

                {/* Bottom Controls */}
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
              
              <p className="text-sm text-gray-600 mt-2 text-center italic">
                AI-generated promotional video for "{currentCampaign.subject}" with synchronized text-to-speech narration
              </p>
              
              <p className="text-xs text-gray-500 mt-1 text-center">
                🎤 AI narrator reads the script • 📝 Words highlight as spoken • 🎬 Topic-specific promotional content
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
