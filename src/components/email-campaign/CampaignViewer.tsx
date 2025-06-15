
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wand2, Target, Video, ImageIcon, Play, Pause, Eye, X } from "lucide-react";
import { EmailCampaign } from "@/hooks/useEmailCampaign";

interface CampaignViewerProps {
  campaign: EmailCampaign | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CampaignViewer = ({ campaign, isOpen, onClose }: CampaignViewerProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
      setIsVideoPlaying(false);
    } else {
      video.play();
      setIsVideoPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  if (!campaign) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Campaign View
              </DialogTitle>
              <DialogDescription>
                Full campaign preview with interactive AI-generated content
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Campaign Header */}
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold mb-2">{campaign.subject}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={
                campaign.status === "Published" ? "default" : 
                campaign.status === "Scheduled" ? "secondary" : "outline"
              }>
                {campaign.status}
              </Badge>
              {campaign.aiGenerated && (
                <Badge variant="outline" className="text-purple-600 border-purple-300">
                  <Wand2 className="h-3 w-3 mr-1" />
                  AI Generated
                </Badge>
              )}
              {campaign.targetAudience === "organic-traffic" && (
                <Badge variant="outline" className="text-green-600 border-green-300">
                  <Target className="h-3 w-3 mr-1" />
                  Organic Traffic Audience
                </Badge>
              )}
            </div>
          </div>

          {/* Campaign Stats */}
          {campaign.status === "Published" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{campaign.sent.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{campaign.opens}</div>
                <div className="text-sm text-gray-600">Opens</div>
                <div className="text-xs text-gray-500">{((campaign.opens / campaign.sent) * 100).toFixed(1)}%</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{campaign.clicks}</div>
                <div className="text-sm text-gray-600">Clicks</div>
                <div className="text-xs text-gray-500">{((campaign.clicks / campaign.opens) * 100).toFixed(1)}%</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{Math.floor(campaign.sent * 0.015)}</div>
                <div className="text-sm text-gray-600">Unsubscribes</div>
                <div className="text-xs text-gray-500">1.5%</div>
              </div>
            </div>
          )}

          {/* AI Creative Content */}
          {campaign.creative?.url && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">AI-Generated Creative</h3>
              <div className="relative">
                {campaign.creative.type === "video" ? (
                  <div className="relative w-full max-w-2xl mx-auto group">
                    <video 
                      ref={videoRef}
                      src={campaign.creative.url} 
                      className="w-full h-80 object-cover rounded-lg shadow-lg"
                      muted
                      preload="metadata"
                      onEnded={handleVideoEnd}
                      poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
                    />
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
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        <Video className="h-3 w-3 mr-1" />
                        30s AI Intro Video
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full max-w-2xl mx-auto">
                    <img 
                      src={campaign.creative.url} 
                      alt={campaign.creative.alt}
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
                  {campaign.creative.alt}
                </p>
              </div>
            </div>
          )}

          {/* Email Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Email Content</h3>
            <div className="p-6 border rounded-lg bg-white shadow-sm">
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {campaign.content}
                </p>
              </div>
            </div>
          </div>

          {/* Campaign Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Campaign Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">Target Audience</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {campaign.targetAudience === "organic-traffic" ? "Organic Traffic Subscribers" : campaign.targetAudience}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900">Content Generation</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {campaign.aiGenerated ? "AI-Powered Content & Creative" : "Manual Content Creation"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
