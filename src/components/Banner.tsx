
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 text-white py-3 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3 flex-1">
          <Sparkles className="h-5 w-5 animate-pulse" />
          <p className="text-sm md:text-base font-medium">
            🎉 <strong>New Year Special:</strong> Get 50% off all Premium SEO Apps! Limited time offer.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/app-hub">
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-white text-purple-700 hover:bg-gray-100 font-semibold"
            >
              Claim Offer
            </Button>
          </Link>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white/20 p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
