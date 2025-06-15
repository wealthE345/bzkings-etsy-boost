
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Video, Play, X } from "lucide-react";

interface ImageMockupSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  mockups: Array<{url: string, description: string}>;
  videos?: Array<{url: string, description: string, title: string}>;
  onSelectImage: (mockup: {url: string, description: string}) => void;
  onSelectVideo?: (video: {url: string, description: string, title: string}) => void;
  searchTerm: string;
}

export const ImageMockupSelector = ({ 
  isOpen, 
  onClose, 
  mockups, 
  videos = [], 
  onSelectImage, 
  onSelectVideo, 
  searchTerm 
}: ImageMockupSelectorProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              🎨 Creative Options for "{searchTerm}"
              <Badge variant="outline" className="text-purple-600 border-purple-300">
                {mockups.length + videos.length} Options
              </Badge>
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Images ({mockups.length})
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos ({videos.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockups.map((mockup, index) => (
                <div key={index} className="border rounded-lg p-3 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative">
                    <img 
                      src={mockup.url} 
                      alt={mockup.description}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <Badge variant="default" className="absolute top-2 right-2">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      AI Image
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm mb-2">{mockup.description}</h4>
                  <Button 
                    onClick={() => onSelectImage(mockup)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    Select Image
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((video, index) => (
                <div key={index} className="border rounded-lg p-3 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative">
                    <video 
                      src={video.url} 
                      className="w-full h-40 object-cover rounded-lg mb-3"
                      muted
                      poster="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg group-hover:bg-black/30 transition-colors">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      <Video className="h-3 w-3 mr-1" />
                      30s Video
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{video.title}</h4>
                  <p className="text-xs text-gray-600 mb-3">{video.description}</p>
                  <Button 
                    onClick={() => onSelectVideo && onSelectVideo(video)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    size="sm"
                  >
                    Select Video
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
