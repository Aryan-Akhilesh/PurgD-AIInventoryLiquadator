
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { category: '0-30 Days', count: 124, value: 18500, color: '#38A169' },
  { category: '31-60 Days', count: 85, value: 12750, color: '#68D391' },
  { category: '61-90 Days', count: 147, value: 22050, color: '#F6E05E' },
  { category: '91-120 Days', count: 78, value: 11700, color: '#F6AD55' },
  { category: '121-180 Days', count: 92, value: 13800, color: '#ED8936' },
  { category: '181+ Days', count: 63, value: 9450, color: '#E53E3E' },
];

export function InventoryAgeChart() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border shadow-sm rounded-md">
          <p className="font-medium">{payload[0].payload.category}</p>
          <p className="text-sm text-muted-foreground">{`${payload[0].value} Items`}</p>
          <p className="text-sm text-muted-foreground">${payload[0].payload.value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Age Distribution</CardTitle>
        <CardDescription>Breakdown of inventory by age category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
