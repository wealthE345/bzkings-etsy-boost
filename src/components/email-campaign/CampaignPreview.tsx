
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wand2, Target, Video, ImageIcon, Play, Pause, Eye, Edit } from "lucide-react";
import { NewEmail } from "@/hooks/useEmailCampaign";

interface CampaignPreviewProps {
  campaign: NewEmail;
  onEditClick: () => void;
}

export const CampaignPreview = ({ campaign, onEditClick }: CampaignPreviewProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
      setIsVideoPlaying(false);
    } else {
      video.currentTime = 0;
      video.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(console.error);
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  if (!campaign.subject && !campaign.content) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-600" />
            Campaign Preview
          </CardTitle>
          <CardDescription>
            Start creating your campaign to see a live preview here
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Your campaign preview will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              Campaign Preview
            </CardTitle>
            <CardDescription>
              Live preview of your email campaign
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onEditClick}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Campaign Header */}
        {campaign.subject && (
          <div className="border-b pb-4">
            <h3 className="text-lg font-bold mb-2">{campaign.subject}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline">Draft</Badge>
              {campaign.aiGenerated && (
                <Badge variant="outline" className="text-purple-600 border-purple-300">
                  <Wand2 className="h-3 w-3 mr-1" />
                  AI Generated
                </Badge>
              )}
              <Badge variant="outline" className="text-green-600 border-green-300">
                <Target className="h-3 w-3 mr-1" />
                {campaign.targetAudience === "organic-traffic" ? "Organic Traffic" : campaign.targetAudience}
              </Badge>
            </div>
          </div>
        )}

        {/* Campaign Dates */}
        {(campaign.startDate || campaign.endDate) && (
          <div className="p-3 bg-gray-50 rounded-lg text-sm">
            <div className="font-medium mb-1">Campaign Schedule:</div>
            {campaign.startDate && (
              <div>Start: {new Date(campaign.startDate).toLocaleString()}</div>
            )}
            {campaign.endDate && (
              <div>End: {new Date(campaign.endDate).toLocaleString()}</div>
            )}
          </div>
        )}

        {/* Creative Preview */}
        {campaign.creative?.url && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Creative Preview:</div>
            <div className="relative">
              {campaign.creative.type === "video" ? (
                <div className="relative w-full group">
                  <video 
                    ref={videoRef}
                    src={campaign.creative.url} 
                    className="w-full h-40 object-cover rounded-lg shadow-sm"
                    muted
                    preload="metadata"
                    onEnded={handleVideoEnd}
                    poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
                    loop
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg group-hover:bg-black/30 transition-colors">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white text-black"
                      onClick={toggleVideoPlayback}
                    >
                      {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                    <Video className="h-3 w-3 mr-1" />
                    30s Video
                  </Badge>
                </div>
              ) : (
                <div className="relative w-full">
                  <img 
                    src={campaign.creative.url} 
                    alt={campaign.creative.alt}
                    className="w-full h-40 object-cover rounded-lg shadow-sm"
                  />
                  <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                    <ImageIcon className="h-3 w-3 mr-1" />
                    Image
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Preview */}
        {campaign.content && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Email Content:</div>
            <div className="p-3 border rounded-lg bg-white text-sm">
              <p className="whitespace-pre-wrap text-gray-700 line-clamp-6">
                {campaign.content}
              </p>
            </div>
          </div>
        )}

        {/* Recipients */}
        {campaign.recipients && (
          <div className="text-xs text-gray-600">
            Recipients: {campaign.recipients === "organic-traffic" ? "Organic Traffic Subscribers" : campaign.recipients}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
