
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wand2, Video, Eye, Copy, Trash2, Send, Target, Play, Pause } from "lucide-react";
import { EmailCampaign } from "../EmailCampaignTool";

interface SimpleEmailListProps {
  emailList: EmailCampaign[];
  isPublishing: boolean;
  onPublishEmail: (emailId: number) => void;
  onDuplicateEmail: (emailId: number) => void;
  onDeleteEmail: (emailId: number) => void;
}

// Get video URL based on email subject
const getVideoForSubject = (subject: string): string => {
  const lowerSubject = subject.toLowerCase();
  
  if (lowerSubject.includes('tiktok') || lowerSubject.includes('social media')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
  } else if (lowerSubject.includes('clickbank') || lowerSubject.includes('affiliate')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4";
  } else if (lowerSubject.includes('facebook ads') || lowerSubject.includes('advertising')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  } else if (lowerSubject.includes('work from home') || lowerSubject.includes('remote work')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  } else if (lowerSubject.includes('email marketing') || lowerSubject.includes('email')) {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";
  } else {
    return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
  }
};

export const SimpleEmailList = ({ 
  emailList, 
  isPublishing, 
  onPublishEmail, 
  onDuplicateEmail, 
  onDeleteEmail 
}: SimpleEmailListProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const toggleVideoPlayback = (emailId: number) => {
    const video = videoRefs.current[emailId];
    if (!video) return;

    if (isVideoPlaying[emailId]) {
      video.pause();
      setIsVideoPlaying(prev => ({
        ...prev,
        [emailId]: false
      }));
    } else {
      video.currentTime = 0;
      video.play().catch(console.error);
      setIsVideoPlaying(prev => ({
        ...prev,
        [emailId]: true
      }));
    }
  };

  const handleVideoRef = (emailId: number, ref: HTMLVideoElement | null) => {
    if (ref) {
      videoRefs.current[emailId] = ref;
      ref.addEventListener('ended', () => handleVideoEnd(emailId));
    }
  };

  const handleVideoEnd = (emailId: number) => {
    setIsVideoPlaying(prev => ({
      ...prev,
      [emailId]: false
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          AI Email Campaigns ({emailList.length}/10)
          <Badge variant="outline" className="text-green-600 border-green-300">
            <Target className="h-3 w-3 mr-1" />
            Organic Traffic Optimized
          </Badge>
        </CardTitle>
        <CardDescription>Manage your AI-generated email campaigns with real web videos based on email subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {emailList.map((email) => (
            <div key={email.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-medium text-lg">{email.subject}</div>
                  {email.aiGenerated && (
                    <Badge variant="outline" className="text-purple-600 border-purple-300">
                      <Wand2 className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  )}
                  {email.targetAudience === "organic-traffic" && (
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      <Target className="h-3 w-3 mr-1" />
                      Organic Traffic
                    </Badge>
                  )}
                  <Badge variant="secondary">
                    <Video className="h-3 w-3 mr-1" />
                    Real Web Video
                  </Badge>
                </div>

                {/* Real Web Video Player */}
                <div className="mb-2">
                  <div className="relative w-48 h-32 inline-block mr-3 group">
                    <video 
                      ref={(ref) => handleVideoRef(email.id, ref)}
                      src={getVideoForSubject(email.subject)}
                      className="w-full h-full object-cover rounded-lg"
                      muted
                      preload="metadata"
                      poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg group-hover:bg-black/30 transition-colors">
                      <Button
                        size="lg"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white text-black border-none shadow-lg"
                        onClick={() => toggleVideoPlayback(email.id)}
                      >
                        {isVideoPlaying[email.id] ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        <Video className="h-3 w-3 mr-1" />
                        Real Video
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mt-1">
                  Sent: {email.sent.toLocaleString()} | Opens: {email.opens} ({email.sent > 0 ? ((email.opens / email.sent) * 100).toFixed(1) : 0}%) | Clicks: {email.clicks} ({email.opens > 0 ? ((email.clicks / email.opens) * 100).toFixed(1) : 0}%)
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {email.status === "Published" && `Published • Active AI campaign with real web video`}
                  {email.status === "Draft" && `Draft • AI-powered content with real web video ready`}
                  {email.status === "Scheduled" && `Scheduled • AI campaign with real web video will be sent`}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={
                  email.status === "Published" ? "default" : 
                  email.status === "Scheduled" ? "secondary" : "outline"
                }>
                  {email.status}
                </Badge>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onDuplicateEmail(email.id)}
                    className="hover:bg-purple-50 hover:border-purple-300"
                    title="Duplicate AI campaign for reuse"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>

                  {email.status !== "Published" && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onDeleteEmail(email.id)}
                      className="hover:bg-red-50 hover:border-red-300"
                      title="Delete email campaign"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}

                  {(email.status === "Draft" || email.status === "Scheduled") && (
                    <Button 
                      size="sm" 
                      onClick={() => onPublishEmail(email.id)}
                      disabled={isPublishing}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      title="Publish AI campaign to organic traffic audience"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {emailList.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Wand2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No AI email campaigns yet. Create your first AI-powered campaign with real web videos above!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
