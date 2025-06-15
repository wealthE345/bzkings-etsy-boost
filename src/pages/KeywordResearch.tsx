
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, TrendingUp, DollarSign, BarChart, Globe, Plus, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { KeywordScrapingService } from "@/services/KeywordScrapingService";

const KeywordResearch = () => {
  const [keyword, setKeyword] = useState("");
  const [displayedResults, setDisplayedResults] = useState<any[]>([]);
  const [trendingKeywords, setTrendingKeywords] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  // Load trending keywords on component mount
  useEffect(() => {
    loadTrendingKeywords();
  }, []);

  const loadTrendingKeywords = async () => {
    setIsLoadingTrending(true);
    try {
      const trending = await KeywordScrapingService.getTrendingKeywords();
      setTrendingKeywords(trending);
      console.log('Loaded fresh trending keywords from search engines:', trending);
      toast.success(`Loaded ${trending.length} trending keywords from search engines`);
    } catch (error) {
      console.error('Error loading trending keywords from search engines:', error);
      toast.error("Failed to load trending keywords from search engines");
    } finally {
      setIsLoadingTrending(false);
    }
  };

  const handleTrendingKeywordClick = async (trendingKeyword: string) => {
    setKeyword(trendingKeyword);
    console.log('Clicked trending keyword, starting live search for:', trendingKeyword);
    await handleSearch(trendingKeyword);
  };

  const handleSearch = async (searchKeyword?: string) => {
    const keywordToSearch = searchKeyword || keyword;
    if (!keywordToSearch.trim()) {
      toast.error("Please enter a keyword to search");
      return;
    }

    setIsSearching(true);
    setCurrentPage(0);
    setHasSearched(false);
    setDisplayedResults([]);
    
    // Reset used keywords for fresh search
    KeywordScrapingService.resetUsedKeywords();
    
    console.log('Starting fresh live keyword scraping from search engines for:', keywordToSearch);
    
    try {
      const response = await KeywordScrapingService.scrapeKeywords(keywordToSearch, 0);
      
      if (response.success && response.data) {
        setDisplayedResults(response.data);
        setCurrentPage(1);
        setHasSearched(true);
        toast.success(`Found ${response.data.length} fresh keywords from search engines for "${keywordToSearch}"`);
        console.log('Live scraped fresh keywords:', response.data);
      } else {
        toast.error(response.error || "Failed to scrape live keyword data from search engines");
        console.error('Live scraping failed:', response.error);
      }
    } catch (error) {
      console.error('Error during live keyword scraping from search engines:', error);
      toast.error("Failed to scrape live keyword data from search engines");
    } finally {
      setIsSearching(false);
    }
  };

  const handleShowMore = async () => {
    setIsLoadingMore(true);
    
    console.log(`Fetching more live keywords from search engines for: ${keyword}, page: ${currentPage}`);
    
    try {
      // Fetch fresh keywords from search engines for the current page
      const response = await KeywordScrapingService.scrapeKeywords(keyword, currentPage);
      
      if (response.success && response.data && response.data.length > 0) {
        setDisplayedResults(prev => [...prev, ...response.data]);
        setCurrentPage(prev => prev + 1);
        toast.success(`Loaded ${response.data.length} more fresh keywords from search engines`);
        console.log(`Added ${response.data.length} more live keywords from search engines`);
      } else {
        toast.info("No more live keywords available from search engines");
      }
    } catch (error) {
      console.error('Error loading more live keywords from search engines:', error);
      toast.error("Failed to load more live keywords from search engines");
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
              Live Keyword Research Tool
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Get fresh keywords from search engines in real-time
            </p>
          </div>
        </div>

        {/* Trending Keywords Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-600" />
              Live Trending Keywords
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Globe className="h-3 w-3" />
              Fresh trending keywords from search engines - updated in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Globe className="h-3 w-3 mr-1" />
                Live Data from Search Engines
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadTrendingKeywords}
                disabled={isLoadingTrending}
              >
                {isLoadingTrending ? "Refreshing..." : "Refresh Trending"}
              </Button>
            </div>
            {isLoadingTrending ? (
              <div className="flex items-center justify-center py-4">
                <div className="text-gray-500">Loading fresh trending keywords from search engines...</div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {trendingKeywords.map((trending, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-colors p-2"
                    onClick={() => handleTrendingKeywordClick(trending.keyword)}
                  >
                    <TrendingUp className="h-3 w-3 mr-1 text-orange-600" />
                    {trending.keyword}
                    <span className="ml-1 text-xs text-orange-600">{trending.trend}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      {typeof trending.volume === 'number' ? trending.volume.toLocaleString() : trending.volume}/mo
                    </span>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-600" />
              Search Live Keywords
            </CardTitle>
            <CardDescription>
              Enter a keyword to fetch fresh keyword suggestions directly from search engines
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
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="gradient-primary text-white"
              >
                {isSearching ? "Fetching Live Data..." : "Get Live Keywords"}
                <Globe className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              ✓ Live keyword data from search engines - fresh results every time
            </p>
          </CardContent>
        </Card>

        {displayedResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Live Keyword Results for "{keyword}" ({displayedResults.length} keywords from search engines)
              </h2>
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Globe className="h-3 w-3 mr-1" />
                Live Data from Search Engines
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
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(result.difficulty)}>
                          {result.difficulty} SEO Difficulty
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Globe className="h-3 w-3 mr-1" />
                          Live
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <BarChart className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">
                          {typeof result.volume === 'number' ? result.volume.toLocaleString() : result.volume}
                        </div>
                        <div className="text-sm text-gray-600">Live Monthly Searches</div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">
                          ${typeof result.cpc === 'number' ? result.cpc.toFixed(2) : result.cpc}
                        </div>
                        <div className="text-sm text-gray-600">Live Cost Per Click</div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">
                          {result.trend}
                        </div>
                        <div className="text-sm text-gray-600">Live Search Trend</div>
                      </div>
                      
                      <div className="text-center p-4 bg-amber-50 rounded-lg">
                        <Badge variant="outline" className="mb-2">
                          {result.competition}
                        </Badge>
                        <div className="text-sm text-gray-600">Live Competition Level</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {hasSearched && (
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleShowMore}
                  disabled={isLoadingMore}
                  variant="outline"
                  size="lg"
                  className="bg-white hover:bg-purple-50 border-purple-200 text-purple-700"
                >
                  {isLoadingMore ? "Fetching Live Data from Search Engines..." : "Show 20 More Live Keywords"}
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
