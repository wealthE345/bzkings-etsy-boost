
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const Payment = () => {
  const [campaignBudget, setCampaignBudget] = useState(50);
  const [estimatedImpressions, setEstimatedImpressions] = useState(2500);

  const handleBudgetChange = (value: string) => {
    const budget = parseInt(value) || 50;
    setCampaignBudget(budget);
    setEstimatedImpressions(budget * 50); // $0.02 per impression
  };

  const handlePayment = () => {
    toast.success("Payment processed! Your organic campaign will start within 24 hours.");
  };

  return (
    <div className="min-h-screen animated-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mb-6">
          <Link to="/app-hub">
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to App Hub
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-green-700 border-green-300 glass-effect">
              💳 Campaign Payment
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
              Launch Your Organic Traffic Campaign
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
              Pay per impression and watch your Etsy store traffic soar
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Campaign Details */}
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <CardTitle className="text-white">Campaign Configuration</CardTitle>
                </div>
                <CardDescription className="text-white/70">
                  Configure your organic traffic campaign settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="budget" className="text-white mb-2 block">
                    Campaign Budget ($)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    min="50"
                    value={campaignBudget}
                    onChange={(e) => handleBudgetChange(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <p className="text-white/60 text-sm mt-1">Minimum budget: $50</p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Campaign Estimates:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70">Estimated Impressions:</span>
                      <span className="text-green-400 font-semibold">{estimatedImpressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Cost per Impression:</span>
                      <span className="text-white">$0.02</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Expected Click-through Rate:</span>
                      <span className="text-white">2.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Estimated Clicks:</span>
                      <span className="text-blue-400 font-semibold">{Math.round(estimatedImpressions * 0.025).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-2">Campaign Benefits:</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>✅ 100% organic traffic</li>
                    <li>✅ Targeted audience matching</li>
                    <li>✅ Real-time analytics dashboard</li>
                    <li>✅ 24/7 campaign optimization</li>
                    <li>✅ 30-day performance guarantee</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-blue-400" />
                  <CardTitle className="text-white">Payment Details</CardTitle>
                </div>
                <CardDescription className="text-white/70">
                  Secure payment processing with 256-bit encryption
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="cardNumber" className="text-white mb-2 block">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-white mb-2 block">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvc" className="text-white mb-2 block">
                      CVC
                    </Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="name" className="text-white mb-2 block">
                    Cardholder Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70">Campaign Budget:</span>
                    <span className="text-white font-semibold">${campaignBudget}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70">Processing Fee (3%):</span>
                    <span className="text-white">${(campaignBudget * 0.03).toFixed(2)}</span>
                  </div>
                  <hr className="border-white/20 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total Amount:</span>
                    <span className="text-green-400 font-bold text-xl">${(campaignBudget * 1.03).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Process Secure Payment
                </Button>

                <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
