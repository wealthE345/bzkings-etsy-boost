
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Gift, Target } from "lucide-react";
import { toast } from "sonner";

const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    budget: "",
    message: "",
    newsletter: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate lead capture
    toast.success("🎉 Welcome! Your lead has been captured. Expect premium digital products recommendations!");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      interest: "",
      budget: "",
      message: "",
      newsletter: false
    });
    
    // Redirect to Etsy store
    setTimeout(() => {
      window.open("https://bzkingsdigitalmall.etsy.com", "_blank");
    }, 2000);
  };

  return (
    <Card id="lead-capture" className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
          <Target className="h-6 w-6 text-purple-600" />
        </div>
        <CardTitle className="text-2xl text-purple-700">Capture High-Quality Leads</CardTitle>
        <CardDescription>
          Get instant access to premium digital products and exclusive offers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your name"
                required
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
                required
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest">What are you looking for?</Label>
            <Select onValueChange={(value) => setFormData({...formData, interest: value})}>
              <SelectTrigger className="border-purple-200 focus:border-purple-400">
                <SelectValue placeholder="Select your interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="digital-templates">Digital Templates</SelectItem>
                <SelectItem value="printables">Printables</SelectItem>
                <SelectItem value="business-tools">Business Tools</SelectItem>
                <SelectItem value="educational-content">Educational Content</SelectItem>
                <SelectItem value="graphics-design">Graphics & Design</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range</Label>
            <Select onValueChange={(value) => setFormData({...formData, budget: value})}>
              <SelectTrigger className="border-purple-200 focus:border-purple-400">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-25">Under $25</SelectItem>
                <SelectItem value="25-50">$25 - $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-250">$100 - $250</SelectItem>
                <SelectItem value="250-plus">$250+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell us more about your needs..."
              className="border-purple-200 focus:border-purple-400"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => setFormData({...formData, newsletter: checked as boolean})}
            />
            <Label htmlFor="newsletter" className="text-sm">
              Subscribe to get exclusive offers and new product updates
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-primary text-white hover:shadow-lg transition-all duration-300"
            size="lg"
          >
            <Gift className="mr-2 h-4 w-4" />
            Get Instant Access to Premium Products
          </Button>
        </form>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-800">
            <Mail className="h-4 w-4" />
            <span className="font-medium">Instant Benefits:</span>
          </div>
          <ul className="mt-2 text-sm text-amber-700 space-y-1">
            <li>• Access to exclusive digital templates</li>
            <li>• 20% discount on first purchase</li>
            <li>• Priority customer support</li>
            <li>• Monthly product updates</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;
