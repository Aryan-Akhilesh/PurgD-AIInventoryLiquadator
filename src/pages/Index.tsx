
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { InventoryAgeChart } from '@/components/dashboard/InventoryAgeChart';
import { LiquidationOpportunities } from '@/components/dashboard/LiquidationOpportunities';
import { CampaignPerformance } from '@/components/dashboard/CampaignPerformance';
import { InventoryHealthScore } from '@/components/dashboard/InventoryHealthScore';
import { Package, DollarSign, ShoppingCart, TrendingDown } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to InvenLiquidate - Your AI-powered inventory liquidation platform
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Inventory Value"
            value="$1,245,800"
            change={{ value: -3.2, label: "vs last month" }}
            icon={<Package className="h-4 w-4" />}
          />
          <StatCard
            title="Items to Liquidate"
            value="243"
            change={{ value: 12.5, label: "vs last month" }}
            icon={<TrendingDown className="h-4 w-4" />}
          />
          <StatCard
            title="Active Campaigns"
            value="3"
            icon={<ShoppingCart className="h-4 w-4" />}
          />
          <StatCard
            title="Recovery Value"
            value="$78,450"
            change={{ value: 8.3, label: "vs target" }}
            icon={<DollarSign className="h-4 w-4" />}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InventoryAgeChart />
          <CampaignPerformance />
          <InventoryHealthScore />
        </div>
        
        <LiquidationOpportunities />
      </div>
    </MainLayout>
  );
};

export default Index;
