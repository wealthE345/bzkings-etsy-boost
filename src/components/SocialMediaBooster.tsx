
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Share2, Instagram, Facebook, Twitter, MessageSquare, Heart, Eye, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const SocialMediaBooster = () => {
  const [postContent, setPostContent] = useState("");
  const [platform, setPlatform] = useState("");

  const handleGeneratePost = () => {
    const templates = [
      "🎨 Transform your space with our stunning digital art collection! Perfect for instant download and printing. #DigitalArt #HomeDecor #PrintableArt",
      "✨ New digital planner templates just dropped! Stay organized in style with our beautiful designs. #DigitalPlanner #Productivity #Organization",
      "🎉 Limited time offer: 50% off all business templates! Perfect for entrepreneurs and small businesses. #BusinessTemplates #Entrepreneur #DigitalDownload",
      "📚 Educational printables that make learning fun! Perfect for teachers and homeschool parents. #Education #Printables #Learning"
    ];
    
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    setPostContent(randomTemplate);
    toast.success("Social media post generated!");
  };

  const socialMetrics = [
    { platform: "Instagram", followers: "2.4K", engagement: "4.8%", posts: 23, growth: "+12%" },
    { platform: "Facebook", followers: "1.8K", engagement: "3.2%", posts: 18, growth: "+8%" },
    { platform: "Pinterest", followers: "5.1K", engagement: "6.1%", posts: 45, growth: "+24%" },
    { platform: "Twitter", followers: "892", engagement: "2.9%", posts: 12, growth: "+5%" },
  ];

  const contentIdeas = [
    {
      title: "Behind the Scenes",
      description: "Show your design process",
      engagement: "High",
      platforms: ["Instagram", "TikTok"]
    },
    {
      title: "Customer Testimonials",
      description: "Share positive reviews",
      engagement: "Very High",
      platforms: ["Facebook", "Instagram"]
    },
    {
      title: "Design Tips",
      description: "Educational content",
      engagement: "Medium",
      platforms: ["Pinterest", "Instagram"]
    },
    {
      title: "Product Spotlights",
      description: "Feature best sellers",
      engagement: "High",
      platforms: ["All Platforms"]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Social Media Post Generator
            </CardTitle>
            <CardDescription>
              Create engaging posts for your digital products
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Platform</label>
              <Select onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="pinterest">Pinterest</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Post Content</label>
              <Textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Write your post content here..."
                className="min-h-[100px] border-blue-200 focus:border-blue-400"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleGeneratePost}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Generate Post
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  if (postContent) {
                    navigator.clipboard.writeText(postContent);
                    toast.success("Post copied to clipboard!");
                  }
                }}
              >
                Copy
              </Button>
            </div>
            
            <div className="text-sm text-gray-600">
              Character count: {postContent.length}/280
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-purple-600" />
              Social Media Performance
            </CardTitle>
            <CardDescription>
              Track your social media metrics across platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {socialMetrics.map((metric, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {metric.platform === "Instagram" && <Instagram className="h-4 w-4 text-pink-500" />}
                    {metric.platform === "Facebook" && <Facebook className="h-4 w-4 text-blue-600" />}
                    {metric.platform === "Pinterest" && <div className="h-4 w-4 bg-red-500 rounded-full" />}
                    {metric.platform === "Twitter" && <Twitter className="h-4 w-4 text-blue-400" />}
                    <span className="font-medium">{metric.platform}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={metric.growth.startsWith('+') ? "text-green-600 border-green-300" : "text-red-600 border-red-300"}
                  >
                    {metric.growth}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Followers</div>
                    <div className="font-medium">{metric.followers}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Engagement</div>
                    <div className="font-medium">{metric.engagement}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Posts</div>
                    <div className="font-medium">{metric.posts}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Ideas & Strategy</CardTitle>
          <CardDescription>
            Proven content strategies for digital product businesses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contentIdeas.map((idea, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium">{idea.title}</h4>
                  <Badge 
                    variant="outline"
                    className={
                      idea.engagement === "Very High" ? "border-green-300 text-green-600" :
                      idea.engagement === "High" ? "border-blue-300 text-blue-600" :
                      "border-yellow-300 text-yellow-600"
                    }
                  >
                    {idea.engagement}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">Best for:</span>
                  {idea.platforms.map((platform, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-700 mb-2">🚀 Pro Tip</h4>
            <p className="text-sm text-purple-600">
              Post consistently across platforms and engage with your audience within the first hour of posting for maximum reach.
            </p>
          </div>
          
          <div className="mt-6">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => window.open("https://bzkingsdigitalmall.etsy.com", "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Drive Traffic to Your Etsy Store
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaBooster;
