
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Organic Traffic Campaign Performance
        </CardTitle>
        <CardDescription>Performance metrics for SEO-focused email campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{campaignStats.openRate}%</div>
            <div className="text-sm text-gray-600">Open Rate</div>
            <Progress value={campaignStats.openRate} className="mt-2" />
            <div className="text-xs text-green-600 mt-1">+5% vs industry avg</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{campaignStats.clickRate}%</div>
            <div className="text-sm text-gray-600">Click Rate</div>
            <Progress value={campaignStats.clickRate} className="mt-2" />
            <div className="text-xs text-green-600 mt-1">+3% vs industry avg</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{campaignStats.totalSent.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Emails Sent</div>
            <div className="text-xs text-gray-500 mt-1">To organic traffic subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{campaignStats.unsubscribeRate}%</div>
            <div className="text-sm text-gray-600">Unsubscribe Rate</div>
            <div className="text-xs text-green-600 mt-1">-1% vs industry avg</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
