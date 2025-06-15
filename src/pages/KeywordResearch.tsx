
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, TrendingUp, DollarSign, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const KeywordResearch = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockKeywordData = [
    {
      keyword: "digital planner template",
      volume: 12500,
      difficulty: "Medium",
      cpc: 1.20,
      trend: "↗️ +15%",
      competition: "Low"
    },
    {
      keyword: "printable wall art",
      volume: 8900,
      difficulty: "Low",
      cpc: 0.85,
      trend: "↗️ +8%",
      competition: "Medium"
    },
    {
      keyword: "business card template",
      volume: 15200,
      difficulty: "High",
      cpc: 2.10,
      trend: "→ 0%",
      competition: "High"
    },
    {
      keyword: "wedding invitation design",
      volume: 22100,
      difficulty: "Medium",
      cpc: 1.65,
      trend: "↗️ +12%",
      competition: "Medium"
    },
    {
      keyword: "social media templates",
      volume: 18700,
      difficulty: "High",
      cpc: 1.95,
      trend: "↗️ +20%",
      competition: "High"
    }
  ];

  const handleSearch = async () => {
    if (!keyword.trim()) {
      toast.error("Please enter a keyword to search");
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Filter and return relevant results based on search term
    const filteredResults = mockKeywordData.filter(item => 
      item.keyword.toLowerCase().includes(keyword.toLowerCase()) ||
      keyword.toLowerCase().split(' ').some(word => 
        item.keyword.toLowerCase().includes(word)
      )
    );

    setResults(filteredResults.length > 0 ? filteredResults : mockKeywordData.slice(0, 3));
    setIsSearching(false);
    toast.success(`Found ${filteredResults.length || 3} keyword suggestions`);
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
              Keyword Research Tool
            </h1>
            <p className="text-gray-600 mt-2">Discover high-value keywords with real SEO data</p>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-600" />
              Search Keywords
            </CardTitle>
            <CardDescription>
              Enter a keyword to get search volume, CPC, and competition data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter keyword (e.g., digital template, printable art)"
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
                {isSearching ? "Searching..." : "Search"}
                <Search className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
            <div className="grid grid-cols-1 gap-6">
              {results.map((result, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-purple-700">
                        {result.keyword}
                      </h3>
                      <Badge className={getDifficultyColor(result.difficulty)}>
                        {result.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <BarChart className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">
                          {result.volume.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Monthly Searches</div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">
                          ${result.cpc}
                        </div>
                        <div className="text-sm text-gray-600">Cost Per Click</div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">
                          {result.trend}
                        </div>
                        <div className="text-sm text-gray-600">Trend</div>
                      </div>
                      
                      <div className="text-center p-4 bg-amber-50 rounded-lg">
                        <Badge variant="outline" className="mb-2">
                          {result.competition}
                        </Badge>
                        <div className="text-sm text-gray-600">Competition</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordResearch;
