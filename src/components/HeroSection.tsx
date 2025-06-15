
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";

const HeroSection = () => {
  const handleGetStarted = () => {
    toast.success("🚀 Let's boost your Etsy traffic!");
    // Scroll to lead capture section
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-10"></div>
      <div className="container mx-auto px-4 py-20 relative">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 text-purple-700 border-purple-300 animate-pulse-slow">
            ✨ #1 Etsy Traffic Generation Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 bg-clip-text text-transparent animate-float">
            Drive More Traffic to Your Etsy Store
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Maximize your <span className="font-semibold text-purple-700">BZ Kings Digital Mall</span> revenue with our proven SEO strategies. 
            Our advanced backlink generation system creates 2000+ high-quality backlinks from 50+ authority domains, 
            driving targeted organic traffic that converts browsers into buyers. Boost your Etsy store rankings, 
            increase visibility in search results, and watch your sales grow with our comprehensive digital marketing toolkit 
            designed specifically for e-commerce success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="gradient-primary text-white hover:shadow-lg transition-all duration-300"
              onClick={handleGetStarted}
            >
              Start Generating Leads
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
              onClick={() => window.open("https://bzkingsdigitalmall.etsy.com", "_blank")}
            >
              Visit Your Store
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">500% Traffic Increase</h3>
              <p className="text-gray-600">Average traffic boost for our Etsy sellers</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg border border-amber-100 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-lg mb-4">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">10,000+ Qualified Leads</h3>
              <p className="text-gray-600">Generated for digital store owners</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4.9★ Success Rate</h3>
              <p className="text-gray-600">Customer satisfaction score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
