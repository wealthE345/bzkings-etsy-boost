
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, FunnelChart } from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Eye, MousePointer, ExternalLink, Target } from "lucide-react";

const ConversionTracker = () => {
  const conversionFunnelData = [
    { stage: "Store Views", visitors: 1000, percentage: 100 },
    { stage: "Product Views", visitors: 650, percentage: 65 },
    { stage: "Add to Cart", visitors: 180, percentage: 18 },
    { stage: "Checkout Started", visitors: 120, percentage: 12 },
    { stage: "Purchase Completed", visitors: 85, percentage: 8.5 },
  ];

  const productPerformance = [
    { name: "Digital Planners", sales: 45, revenue: 1350, conversion: 12.5 },
    { name: "Business Templates", sales: 32, revenue: 1280, conversion: 8.9 },
    { name: "Printable Art", sales: 28, revenue: 420, conversion: 15.2 },
    { name: "Social Media Templates", sales: 23, revenue: 690, conversion: 10.1 },
  ];

  const timeData = [
    { period: "Week 1", conversions: 12, revenue: 360 },
    { period: "Week 2", conversions: 18, revenue: 540 },
    { period: "Week 3", conversions: 25, revenue: 750 },
    { period: "Week 4", conversions: 22, revenue: 660 },
  ];

  const COLORS = ['#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#3b82f6'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$3,240</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18.7%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">128</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">$25.31</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.8%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>
              Track how visitors move through your sales process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnelData.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold">{stage.visitors}</div>
                      <div className="text-xs text-gray-500">{stage.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={stage.percentage} className="h-3" />
                  {index < conversionFunnelData.length - 1 && (
                    <div className="text-xs text-red-500 text-center">
                      ↓ {conversionFunnelData[index].visitors - conversionFunnelData[index + 1].visitors} drop-off
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>
              Revenue and conversion rates by product category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversion Trends</CardTitle>
            <CardDescription>
              Weekly conversion and revenue trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conversions" fill="#10b981" />
                <Bar dataKey="revenue" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Optimize your conversions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 text-sm">✅ High Performer</h4>
                <p className="text-xs text-green-600 mt-1">Printable Art has 15.2% conversion rate</p>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 text-sm">⚠️ Needs Attention</h4>
                <p className="text-xs text-yellow-600 mt-1">Business Templates conversion dropping</p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 text-sm">💡 Opportunity</h4>
                <p className="text-xs text-blue-600 mt-1">18% cart abandonment rate</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button className="w-full" variant="outline" size="sm">
                <MousePointer className="mr-2 h-4 w-4" />
                A/B Test Product Pages
              </Button>
              <Button className="w-full" variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Optimize Checkout Flow
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Optimization Recommendations</CardTitle>
          <CardDescription>
            AI-powered suggestions to improve your sales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium">Reduce Cart Abandonment</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                18% of users abandon carts. Add exit-intent popups with discount codes.
              </p>
              <Badge variant="outline" className="text-purple-600 border-purple-300">
                +15% Revenue Potential
              </Badge>
            </div>
            
            <div className="p-4 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h4 className="font-medium">Upsell Digital Bundles</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Customers buying planners often buy templates. Create bundle offers.
              </p>
              <Badge variant="outline" className="text-green-600 border-green-300">
                +25% AOV Increase
              </Badge>
            </div>
            
            <div className="p-4 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium">Improve Product Images</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Add lifestyle images showing products in use to increase engagement.
              </p>
              <Badge variant="outline" className="text-blue-600 border-blue-300">
                +8% Conversion Rate
              </Badge>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              className="w-full gradient-primary text-white" 
              onClick={() => window.open("https://bzkingsdigitalmall.etsy.com", "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Apply Optimizations to Your Store
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversionTracker;
