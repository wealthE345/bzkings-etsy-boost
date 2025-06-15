
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KeywordScrapingService } from "@/services/KeywordScrapingService";
import { Key, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ApiKeySetupProps {
  onApiKeySet: () => void;
}

export const ApiKeySetup = ({ onApiKeySet }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter your SerpAPI key");
      return;
    }

    setIsLoading(true);
    try {
      KeywordScrapingService.saveApiKey(apiKey);
      toast.success("API key saved successfully!");
      onApiKeySet();
    } catch (error) {
      toast.error("Failed to save API key");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-8 border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700">
          <Key className="h-5 w-5" />
          Setup Required: SerpAPI Key
        </CardTitle>
        <CardDescription>
          To scrape real keyword data, you need a SerpAPI key. Get one for free at{" "}
          <a 
            href="https://serpapi.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
          >
            serpapi.com <ExternalLink className="h-3 w-3" />
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Input
            type="password"
            placeholder="Enter your SerpAPI key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleSaveApiKey}
            disabled={isLoading}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isLoading ? "Saving..." : "Save Key"}
          </Button>
        </div>
        <p className="text-sm text-orange-600 mt-2">
          Note: For production use, consider connecting to Supabase for secure API key storage.
        </p>
      </CardContent>
    </Card>
  );
};
