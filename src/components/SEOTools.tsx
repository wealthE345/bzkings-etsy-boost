
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, TrendingUp, Target, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const SEOTools = () => {
  const [keyword, setKeyword] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const handleKeywordAnalysis = () => {
    if (!keyword.trim()) {
      toast.error("Please enter a keyword to analyze");
      return;
    }

    setAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalyzing(false);
      toast.success(`SEO analysis completed for "${keyword}"`);
    }, 2000);
  };

  const seoMetrics = [
    { metric: "Store Visibility", score: 78, status: "good" },
    { metric: "Keyword Optimization", score: 65, status: "warning" },
    { metric: "Product Descriptions", score: 89, status: "excellent" },
    { metric: "Image SEO", score: 72, status: "good" },
    { metric: "Tags Usage", score: 58, status: "warning" },
  ];

  const keywordSuggestions = [
    { keyword: "digital planner template", volume: "12K", difficulty: "Medium", cpc: "$1.20" },
    { keyword: "printable wall art", volume: "8.5K", difficulty: "Low", cpc: "$0.85" },
    { keyword: "business card template", volume: "15K", difficulty: "High", cpc: "$2.10" },
    { keyword: "wedding invitation design", volume: "22K", difficulty: "Medium", cpc: "$1.65" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-600" />
              Keyword Research Tool
            </CardTitle>
            <CardDescription>
              Discover high-converting keywords for your Etsy listings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">Enter Target Keyword</Label>
              <Input
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., digital template, printable art"
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
            <Button 
              onClick={handleKeywordAnalysis}
              disabled={analyzing}
              className="w-full gradient-primary text-white"
            >
              {analyzing ? "Analyzing..." : "Analyze Keyword"}
              <Search className="ml-2 h-4 w-4" />
            </Button>
            
            {keyword && !analyzing && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-700 mb-2">Quick Analysis: "{keyword}"</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Search Volume:</span>
                    <span className="font-medium ml-2">8.2K/month</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Competition:</span>
                    <Badge variant="outline" className="ml-2">Medium</Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              SEO Score Overview
            </CardTitle>
            <CardDescription>
              Your current Etsy store SEO performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {seoMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{metric.score}%</span>
                    {metric.status === "excellent" && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {metric.status === "good" && <CheckCircle className="h-4 w-4 text-blue-500" />}
                    {metric.status === "warning" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                  </div>
                </div>
                <Progress 
                  value={metric.score} 
                  className={`h-2 ${
                    metric.status === "excellent" ? "text-green-500" :
                    metric.status === "good" ? "text-blue-500" : "text-yellow-500"
                  }`}
                />
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-medium text-amber-800 mb-2">💡 Quick Win</h4>
              <p className="text-sm text-amber-700">
                Optimize your tags usage to improve visibility by an estimated 15-20%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>High-Opportunity Keywords</CardTitle>
          <CardDescription>
            Keywords with high potential for your digital products niche
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keywordSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                <div className="space-y-1">
                  <h4 className="font-medium">{suggestion.keyword}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Volume: {suggestion.volume}/month</span>
                    <Badge 
                      variant="outline" 
                      className={
                        suggestion.difficulty === "Low" ? "border-green-300 text-green-600" :
                        suggestion.difficulty === "Medium" ? "border-yellow-300 text-yellow-600" :
                        "border-red-300 text-red-600"
                      }
                    >
                      {suggestion.difficulty}
                    </Badge>
                    <span>CPC: {suggestion.cpc}</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setKeyword(suggestion.keyword);
                    toast.success(`Keyword "${suggestion.keyword}" added for analysis`);
                  }}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Target
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => window.open("https://bzkingsdigitalmall.etsy.com", "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Apply SEO Optimizations to Your Store
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOTools;
