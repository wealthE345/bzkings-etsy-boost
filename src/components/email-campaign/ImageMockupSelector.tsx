
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageIcon, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getMockupImagesBySearchQuery } from "@/utils/aiContentGenerator";

interface ImageMockupSelectorProps {
  searchTerm: string;
  onImageSelect: (imageUrl: string, description: string) => void;
  isVisible: boolean;
}

export const ImageMockupSelector = ({ searchTerm, onImageSelect, isVisible }: ImageMockupSelectorProps) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  
  if (!isVisible || !searchTerm.trim()) return null;

  const mockupImages = getMockupImagesBySearchQuery(searchTerm);

  const handleImageSelect = (imageUrl: string, description: string) => {
    setSelectedImage(imageUrl);
    onImageSelect(imageUrl, description);
    toast.success("✅ Image selected for your campaign!");
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI Image Mockups
          <Badge variant="outline" className="text-blue-600 border-blue-300">
            Based on "{searchTerm}"
          </Badge>
        </CardTitle>
        <CardDescription>
          Choose from these AI-generated mockup images that match your campaign idea
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockupImages.map((mockup, index) => (
            <div 
              key={index} 
              className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                selectedImage === mockup.url 
                  ? 'border-purple-500 shadow-lg' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => handleImageSelect(mockup.url, mockup.description)}
            >
              <img 
                src={mockup.url} 
                alt={mockup.description}
                className="w-full h-32 object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              
              {/* Selection indicator */}
              {selectedImage === mockup.url && (
                <div className="absolute top-2 right-2">
                  <div className="bg-purple-600 text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              )}
              
              {/* Image type badge */}
              <Badge 
                variant="secondary" 
                className="absolute top-2 left-2 text-xs bg-white/90"
              >
                <ImageIcon className="h-3 w-3 mr-1" />
                Mockup {index + 1}
              </Badge>
              
              {/* Description overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white text-xs font-medium line-clamp-2">
                  {mockup.description}
                </p>
              </div>
              
              {/* Click to select button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-black"
                >
                  {selectedImage === mockup.url ? "Selected" : "Select Image"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-gray-600 text-center">
          💡 These images are AI-generated based on your search term "{searchTerm}". Click to select one for your campaign.
        </div>
      </CardContent>
    </Card>
  );
};
