
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Megaphone } from 'lucide-react';

const campaignData = [
  { name: 'Day 1', sales: 12, clicks: 145 },
  { name: 'Day 2', sales: 19, clicks: 238 },
  { name: 'Day 3', sales: 14, clicks: 198 },
  { name: 'Day 4', sales: 28, clicks: 320 },
  { name: 'Day 5', sales: 32, clicks: 402 },
  { name: 'Day 6', sales: 38, clicks: 450 },
  { name: 'Day 7', sales: 30, clicks: 380 },
];

export function CampaignPerformance() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border shadow-sm rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-brand-blue">
            {`Sales: ${payload[0].value}`}
          </p>
          <p className="text-sm text-brand-purple">
            {`Clicks: ${payload[1].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-brand-purple" />
            Active Campaign Performance
          </CardTitle>
          <CardDescription>Summer Clearance - Day 7 of 14</CardDescription>
        </div>
        <Badge className="bg-brand-green">Active</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={campaignData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A365D" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1A365D" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#805AD5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#805AD5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={30} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#1A365D"
                  fillOpacity={1}
                  fill="url(#salesGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#805AD5"
                  fillOpacity={0.3}
                  fill="url(#clicksGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Inventory Cleared</div>
              <div className="text-sm font-medium">58%</div>
            </div>
            <Progress value={58} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
              <div className="text-2xl font-bold">8.24%</div>
              <div className="text-sm text-brand-green flex items-center gap-1">+1.2% vs target</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Revenue Generated</div>
              <div className="text-2xl font-bold">$14,320</div>
              <div className="text-sm text-muted-foreground">From 173 sales</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
