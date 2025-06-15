
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Mail, Target, BarChart3, ArrowUpRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface CampaignStatsProps {
  campaignStats: {
    totalSent: number;
    totalOpened: number;
    totalClicked: number;
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
  };
}

export const CampaignStats = ({ campaignStats }: CampaignStatsProps) => {
  const performanceData = [
    { name: 'Week 1', opens: 520, clicks: 156, conversions: 23 },
    { name: 'Week 2', opens: 638, clicks: 191, conversions: 34 },
    { name: 'Week 3', opens: 768, clicks: 230, conversions: 41 },
    { name: 'Week 4', opens: 925, clicks: 278, conversions: 52 },
  ];

  const engagementData = [
    { metric: 'Open Rate', value: campaignStats.openRate, benchmark: 21.3, color: 'bg-blue-500' },
    { metric: 'Click Rate', value: campaignStats.clickRate, benchmark: 2.6, color: 'bg-green-500' },
    { metric: 'Conversion Rate', value: 5.2, benchmark: 1.8, color: 'bg-purple-500' },
    { metric: 'Unsubscribe Rate', value: campaignStats.unsubscribeRate, benchmark: 2.1, color: 'bg-red-500' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Organic Traffic Campaign Performance
          <Badge variant="outline" className="text-green-600 border-green-300">
            <Target className="h-3 w-3 mr-1" />
            SEO-Optimized
          </Badge>
        </CardTitle>
        <CardDescription>Advanced analytics for organic traffic email campaigns with AI insights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{campaignStats.openRate}%</div>
            <div className="text-sm text-gray-600">Open Rate</div>
            <Progress value={campaignStats.openRate} className="mt-2" />
            <div className="text-xs text-green-600 mt-1 flex items-center justify-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +{(campaignStats.openRate - 21.3).toFixed(1)}% vs industry
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{campaignStats.clickRate}%</div>
            <div className="text-sm text-gray-600">Click Rate</div>
            <Progress value={campaignStats.clickRate} className="mt-2" />
            <div className="text-xs text-green-600 mt-1 flex items-center justify-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +{(campaignStats.clickRate - 2.6).toFixed(1)}% vs industry
            </div>
          </div>
        </div>

        {/* Audience Insights */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-600" />
            Organic Traffic Audience Insights
          </h4>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center p-3 border rounded">
              <div className="font-bold text-purple-600">{campaignStats.totalSent.toLocaleString()}</div>
              <div className="text-gray-600">Total Subscribers</div>
              <div className="text-xs text-gray-500">SEO-driven audience</div>
            </div>
            <div className="text-center p-3 border rounded">
              <div className="font-bold text-orange-600">68%</div>
              <div className="text-gray-600">Engagement Score</div>
              <div className="text-xs text-green-600">+12% this month</div>
            </div>
            <div className="text-center p-3 border rounded">
              <div className="font-bold text-blue-600">$4.20</div>
              <div className="text-gray-600">Revenue per Email</div>
              <div className="text-xs text-green-600">+25% vs last month</div>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-green-600" />
            Performance vs Industry Benchmarks
          </h4>
          <div className="space-y-2">
            {engagementData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${item.color}`}></div>
                  <span className="text-sm font-medium">{item.metric}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{item.value}%</span>
                  <span className="text-xs text-gray-500">vs {item.benchmark}%</span>
                  {item.value > item.benchmark ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowUpRight className="h-3 w-3 text-red-600 rotate-180" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Trends Chart */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-600" />
            Campaign Performance Trends
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="opens" stackId="1" stroke="#3b82f6" fill="#dbeafe" />
              <Area type="monotone" dataKey="clicks" stackId="1" stroke="#10b981" fill="#d1fae5" />
              <Area type="monotone" dataKey="conversions" stackId="1" stroke="#8b5cf6" fill="#ede9fe" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <h4 className="font-medium text-purple-800 mb-2">🤖 AI Performance Insights</h4>
          <div className="text-sm text-purple-700 space-y-1">
            <p>• Your organic traffic audience shows 23% higher engagement than paid traffic</p>
            <p>• Best performing content: SEO strategy and digital marketing topics</p>
            <p>• Optimal send time: Tuesday 10 AM (based on organic traffic behavior)</p>
            <p>• Suggested focus: Educational content performs 35% better than promotional</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
