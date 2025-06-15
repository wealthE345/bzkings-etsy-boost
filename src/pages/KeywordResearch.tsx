
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, TrendingUp, DollarSign, BarChart, Globe, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { KeywordScrapingService } from "@/services/KeywordScrapingService";

const KeywordResearch = () => {
  const [keyword, setKeyword] = useState("");
  const [allResults, setAllResults] = useState<any[]>([]);
  const [displayedResults, setDisplayedResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const RESULTS_PER_PAGE = 20;

  const handleSearch = async () => {
    if (!keyword.trim()) {
      toast.error("Please enter a keyword to search");
      return;
    }

    setIsSearching(true);
    setCurrentPage(0);
    setHasSearched(false);
    console.log('Starting organic keyword scraping for:', keyword);
    
    try {
      const response = await KeywordScrapingService.scrapeKeywords(keyword);
      
      if (response.success && response.data) {
        setAllResults(response.data);
        setDisplayedResults(response.data.slice(0, RESULTS_PER_PAGE));
        setCurrentPage(1);
        setHasSearched(true);
        toast.success(`Found ${response.data.length} organic keyword suggestions`);
        console.log('Scraped organic keywords:', response.data);
      } else {
        toast.error(response.error || "Failed to scrape organic keyword data");
        console.error('Scraping failed:', response.error);
      }
    } catch (error) {
      console.error('Error during organic keyword scraping:', error);
      toast.error("Failed to scrape organic keyword data");
    } finally {
      setIsSearching(false);
    }
  };

  const handleShowMore = async () => {
    setIsLoadingMore(true);
    
    try {
      // Generate more keywords for the same search term
      const response = await KeywordScrapingService.scrapeKeywords(keyword);
      
      if (response.success && response.data) {
        const newResults = response.data.slice(currentPage * RESULTS_PER_PAGE, (currentPage + 1) * RESULTS_PER_PAGE);
        if (newResults.length > 0) {
          setDisplayedResults(prev => [...prev, ...newResults]);
          setCurrentPage(prev => prev + 1);
          toast.success(`Loaded ${newResults.length} more keywords`);
        } else {
          toast.info("No more keywords available");
        }
      }
    } catch (error) {
      console.error('Error loading more keywords:', error);
      toast.error("Failed to load more keywords");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      case "Medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "High": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const canShowMore = hasSearched && displayedResults.length >= RESULTS_PER_PAGE;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-amber-600 bg-clip-text text-transparent">
              Organic Keyword Research Tool
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Discover organic keywords with free web-based keyword generation
            </p>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-600" />
              Search Organic Keywords
            </CardTitle>
            <CardDescription>
              Enter a keyword to generate organic keyword suggestions with estimated metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter keyword (e.g., digital marketing, online business)"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                className="gradient-primary text-white"
              >
                {isSearching ? "Generating..." : "Find Keywords"}
                <Globe className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              ✓ Free organic keyword generation - no API key required
            </p>
          </CardContent>
        </Card>

        {displayedResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Organic Keyword Results ({displayedResults.length} keywords shown)
              </h2>
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Globe className="h-3 w-3 mr-1" />
                Organic Data
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {displayedResults.map((result, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-purple-700">
                        {result.keyword}
                      </h3>
                      <Badge className={getDifficultyColor(result.difficulty)}>
                        {result.difficulty} SEO Difficulty
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <BarChart className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">
                          {typeof result.volume === 'number' ? result.volume.toLocaleString() : result.volume}
                        </div>
                        <div className="text-sm text-gray-600">Est. Monthly Searches</div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">
                          ${typeof result.cpc === 'number' ? result.cpc.toFixed(2) : result.cpc}
                        </div>
                        <div className="text-sm text-gray-600">Est. Cost Per Click</div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">
                          {result.trend}
                        </div>
                        <div className="text-sm text-gray-600">Search Trend</div>
                      </div>
                      
                      <div className="text-center p-4 bg-amber-50 rounded-lg">
                        <Badge variant="outline" className="mb-2">
                          {result.competition}
                        </Badge>
                        <div className="text-sm text-gray-600">Competition Level</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {canShowMore && (
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleShowMore}
                  disabled={isLoadingMore}
                  variant="outline"
                  size="lg"
                  className="bg-white hover:bg-purple-50 border-purple-200 text-purple-700"
                >
                  {isLoadingMore ? "Loading..." : "Show More Keywords"}
                  <Plus className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordResearch;
