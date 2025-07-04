
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Film, Play, Pause, Shuffle, Download, Eye, Clock, Palette, Heart, Volume2, VolumeX, Maximize } from "lucide-react";
import { generateMovieClipsForSearch, getNewMovieClip, generateMovieClipNarration, MovieClip } from "@/utils/movieClipsGenerator";
import { toast } from "sonner";

interface MovieClipsCreatorProps {
  onSelectClip?: (clip: MovieClip) => void;
}

export const MovieClipsCreator = ({ onSelectClip }: MovieClipsCreatorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieClips, setMovieClips] = useState<MovieClip[]>([]);
  const [selectedClip, setSelectedClip] = useState<MovieClip | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [playingClip, setPlayingClip] = useState<string | null>(null);
  const [mutedClips, setMutedClips] = useState<Set<string>>(new Set());
  const [showNarration, setShowNarration] = useState(true);
  const [fullscreenClip, setFullscreenClip] = useState<string | null>(null);

  const handleGenerateClips = () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term for your movie clips");
      return;
    }

    setIsGenerating(true);
    toast.info(`🎬 Generating cinematic ad creative videos for "${searchTerm}"...`);

    setTimeout(() => {
      const clips = generateMovieClipsForSearch(searchTerm);
      setMovieClips(clips);
      setSelectedClip(clips[0]);
      setIsGenerating(false);
      
      const clipStyles = clips.map(c => c.style).join(", ");
      toast.success(`🎥 Generated ${clips.length} movie-style ad creatives: ${clipStyles}`);
    }, 2000);
  };

  const handleRegenerateClip = (currentClip: MovieClip) => {
    if (!searchTerm.trim()) {
      toast.error("Please search for clips first");
      return;
    }

    toast.info("🔄 Getting new movie clip from web...");
    
    setTimeout(() => {
      const newClip = getNewMovieClip(searchTerm, currentClip.url);
      if (newClip) {
        const updatedClips = movieClips.map(clip => 
          clip.url === currentClip.url ? newClip : clip
        );
        setMovieClips(updatedClips);
        
        if (selectedClip?.url === currentClip.url) {
          setSelectedClip(newClip);
        }
        
        toast.success(`🎬 New ${newClip.style.toLowerCase()} movie clip loaded!`);
      }
    }, 1500);
  };

  const handleSelectClip = (clip: MovieClip) => {
    setSelectedClip(clip);
    if (onSelectClip) {
      onSelectClip(clip);
    }
    toast.success(`🎬 Selected: ${clip.title} (${clip.style})`);
  };

  const handlePlayClip = (clipUrl: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const videoElement = document.querySelector(`video[src="${clipUrl}"]`) as HTMLVideoElement;
    
    if (videoElement) {
      if (playingClip === clipUrl) {
        videoElement.pause();
        setPlayingClip(null);
        toast.info("⏸️ Video paused");
      } else {
        // Pause all other videos
        document.querySelectorAll('video').forEach(video => {
          if (video.src !== clipUrl) {
            video.pause();
          }
        });
        
        videoElement.play();
        setPlayingClip(clipUrl);
        toast.success("▶️ Playing movie clip with sound");
      }
    }
  };

  const handleMuteToggle = (clipUrl: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const videoElement = document.querySelector(`video[src="${clipUrl}"]`) as HTMLVideoElement;
    
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      const newMutedClips = new Set(mutedClips);
      
      if (videoElement.muted) {
        newMutedClips.add(clipUrl);
        toast.info("🔇 Video muted");
      } else {
        newMutedClips.delete(clipUrl);
        toast.info("🔊 Video unmuted");
      }
      
      setMutedClips(newMutedClips);
    }
  };

  const handleDownload = (clip: MovieClip, event: React.MouseEvent) => {
    event.stopPropagation();
    toast.info(`⬇️ Downloading: ${clip.title}...`);
    
    // Create download link
    const link = document.createElement('a');
    link.href = clip.url;
    link.download = `${clip.title.replace(/\s+/g, '_')}_movie_clip.mp4`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`✅ Download started: ${clip.title}`);
  };

  const handleFullscreen = (clipUrl: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const videoElement = document.querySelector(`video[src="${clipUrl}"]`) as HTMLVideoElement;
    
    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
        setFullscreenClip(clipUrl);
        toast.info("🖥️ Entering fullscreen mode");
      }
    }
  };

  const handlePreview = (clip: MovieClip, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedClip(clip);
    toast.info(`👀 Previewing: ${clip.title}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Film className="h-5 w-5 text-red-600" />
          Interactive Movie Clips AI Ad Creative Generator
          <Badge variant="outline" className="text-red-600 border-red-300">
            <Heart className="h-3 w-3 mr-1" />
            Hollywood Style
          </Badge>
        </CardTitle>
        <CardDescription>
          Generate interactive cinematic movie-style promotional videos with full playback controls, sound, and download options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Search for Movie Clip Style:</label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., money success, social media viral, crypto revolution, fitness transformation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateClips()}
            />
            <Button 
              onClick={handleGenerateClips}
              disabled={isGenerating}
              className="bg-red-600 hover:bg-red-700"
            >
              <Film className="h-4 w-4 mr-1" />
              {isGenerating ? "Generating..." : "Generate Clips"}
            </Button>
          </div>
        </div>

        {/* Movie Clips Grid */}
        {movieClips.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Interactive Movie Clips</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNarration(!showNarration)}
              >
                {showNarration ? "Hide" : "Show"} Narration
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {movieClips.map((clip, index) => (
                <Card 
                  key={clip.url} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedClip?.url === clip.url ? 'ring-2 ring-red-500' : ''
                  }`}
                  onClick={() => handleSelectClip(clip)}
                >
                  <CardContent className="p-4">
                    <div className="relative mb-3 group">
                      <video
                        src={clip.url}
                        className="w-full h-32 object-cover rounded-lg cursor-pointer"
                        poster={`https://images.unsplash.com/photo-1489599242897-bd08d00a7900?w=400&h=200&fit=crop&q=80&sig=${index}`}
                        loop
                        playsInline
                        onEnded={() => setPlayingClip(null)}
                        onClick={(e) => handlePlayClip(clip.url, e)}
                      />
                      
                      {/* Video Controls Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white"
                            onClick={(e) => handlePlayClip(clip.url, e)}
                          >
                            {playingClip === clip.url ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white"
                            onClick={(e) => handleMuteToggle(clip.url, e)}
                          >
                            {mutedClips.has(clip.url) ? (
                              <VolumeX className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white"
                            onClick={(e) => handleFullscreen(clip.url, e)}
                          >
                            <Maximize className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Clip Info Overlay */}
                      <div className="absolute top-2 left-2 right-2 flex justify-between">
                        <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {clip.duration}s
                        </Badge>
                        <Badge variant="default" className="bg-red-600 text-xs">
                          <Palette className="h-3 w-3 mr-1" />
                          {clip.style}
                        </Badge>
                      </div>

                      {/* Playing Indicator */}
                      {playingClip === clip.url && (
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="default" className="bg-green-600 text-white text-xs animate-pulse">
                            ▶️ Playing
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{clip.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRegenerateClip(clip);
                          }}
                        >
                          <Shuffle className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <p className="text-xs text-gray-600">{clip.description}</p>
                      
                      <div className="flex items-center gap-1 text-xs">
                        <Badge variant="outline" className="text-purple-600">
                          {clip.mood}
                        </Badge>
                        <Badge variant="outline" className="text-blue-600">
                          {clip.style}
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-1 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs"
                          onClick={(e) => handlePreview(clip, e)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs"
                          onClick={(e) => handleDownload(clip, e)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                      
                      {showNarration && (
                        <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                          <strong>AI Narration:</strong>
                          <p className="mt-1 italic">
                            {generateMovieClipNarration(clip, searchTerm)}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Selected Clip Preview */}
        {selectedClip && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Selected Movie Clip - Full Preview</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => handleFullscreen(selectedClip.url, e)}
                >
                  <Maximize className="h-4 w-4 mr-1" />
                  Fullscreen
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => handleDownload(selectedClip, e)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            
            <Card className="border-red-200">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <video
                      src={selectedClip.url}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer"
                      poster={`https://images.unsplash.com/photo-1489599242897-bd08d00a7900?w=600&h=300&fit=crop&q=80`}
                      controls
                      playsInline
                      onClick={(e) => handlePlayClip(selectedClip.url, e)}
                    />
                    
                    {/* Enhanced Controls */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-black/70 text-white hover:bg-black/90"
                        onClick={(e) => handleMuteToggle(selectedClip.url, e)}
                      >
                        {mutedClips.has(selectedClip.url) ? (
                          <VolumeX className="h-3 w-3" />
                        ) : (
                          <Volume2 className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold">{selectedClip.title}</h4>
                      <p className="text-gray-600">{selectedClip.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Duration</label>
                        <p className="text-lg font-semibold">{selectedClip.duration} seconds</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Style</label>
                        <p className="text-lg font-semibold">{selectedClip.style}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Mood</label>
                        <p className="text-lg font-semibold">{selectedClip.mood}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Category</label>
                        <p className="text-lg font-semibold">Movie Trailer</p>
                      </div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={(e) => handlePlayClip(selectedClip.url, e)}
                      >
                        {playingClip === selectedClip.url ? (
                          <>
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            Play with Sound
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => handleDownload(selectedClip, e)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download HD
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">AI Generated Narration:</h5>
                      <p className="text-blue-800 italic">
                        {generateMovieClipNarration(selectedClip, searchTerm)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
