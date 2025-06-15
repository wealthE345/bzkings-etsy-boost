
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
    },
    {
      keyword: "printable stickers",
      volume: 9800,
      difficulty: "Low",
      cpc: 0.75,
      trend: "↗️ +25%",
      competition: "Low"
    },
    {
      keyword: "digital art prints",
      volume: 14300,
      difficulty: "Medium",
      cpc: 1.35,
      trend: "↗️ +18%",
      competition: "Medium"
    },
    {
      keyword: "resume template",
      volume: 19500,
      difficulty: "High",
      cpc: 2.25,
      trend: "↗️ +10%",
      competition: "High"
    },
    {
      keyword: "printable calendar",
      volume: 11200,
      difficulty: "Low",
      cpc: 0.95,
      trend: "↗️ +5%",
      competition: "Low"
    },
    {
      keyword: "logo design template",
      volume: 16800,
      difficulty: "High",
      cpc: 2.40,
      trend: "↗️ +22%",
      competition: "High"
    },
    {
      keyword: "printable labels",
      volume: 7600,
      difficulty: "Low",
      cpc: 0.68,
      trend: "↗️ +12%",
      competition: "Low"
    },
    {
      keyword: "digital scrapbook paper",
      volume: 5400,
      difficulty: "Low",
      cpc: 0.55,
      trend: "↗️ +8%",
      competition: "Low"
    },
    {
      keyword: "invitation template",
      volume: 13700,
      difficulty: "Medium",
      cpc: 1.45,
      trend: "↗️ +15%",
      competition: "Medium"
    },
    {
      keyword: "printable quotes",
      volume: 8200,
      difficulty: "Low",
      cpc: 0.72,
      trend: "↗️ +20%",
      competition: "Low"
    },
    {
      keyword: "digital clipart",
      volume: 10500,
      difficulty: "Medium",
      cpc: 1.15,
      trend: "↗️ +18%",
      competition: "Medium"
    },
    {
      keyword: "printable journal pages",
      volume: 6800,
      difficulty: "Low",
      cpc: 0.65,
      trend: "↗️ +14%",
      competition: "Low"
    },
    {
      keyword: "powerpoint template",
      volume: 17200,
      difficulty: "High",
      cpc: 2.15,
      trend: "↗️ +16%",
      competition: "High"
    },
    {
      keyword: "printable party decorations",
      volume: 9100,
      difficulty: "Medium",
      cpc: 1.05,
      trend: "↗️ +28%",
      competition: "Medium"
    },
    {
      keyword: "digital patterns",
      volume: 4900,
      difficulty: "Low",
      cpc: 0.58,
      trend: "↗️ +10%",
      competition: "Low"
    },
    {
      keyword: "printable coloring pages",
      volume: 12800,
      difficulty: "Medium",
      cpc: 0.88,
      trend: "↗️ +22%",
      competition: "Medium"
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
    
    // Return all 20 results
    setResults(mockKeywordData);
    setIsSearching(false);
    toast.success(`Found ${mockKeywordData.length} keyword suggestions`);
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
            <h2 className="text-2xl font-bold text-gray-800">Search Results ({results.length} keywords found)</h2>
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
