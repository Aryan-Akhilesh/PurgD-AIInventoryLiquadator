
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Package, TrendingDown, DollarSign, Truck, ShoppingBag } from 'lucide-react';

const opportunitiesByCriteria = [
  {
    id: 1,
    name: 'Summer T-Shirts (2023)',
    sku: 'STS-2023-L',
    quantity: 128,
    value: '$2,560',
    recovery: '65%',
    method: 'Discount: 35% Off',
    badge: 'Immediate',
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: 2,
    name: 'Leather Jackets (Fall)',
    sku: 'LJF-2022-M',
    quantity: 42,
    value: '$5,880',
    recovery: '80%',
    method: 'Bundle with Accessories',
    badge: 'High',
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: 3,
    name: 'Fitness Trackers (v2)',
    sku: 'FTK-V2-BLK',
    quantity: 85,
    value: '$8,500',
    recovery: '70%',
    method: 'Flash Sale + Email',
    badge: 'Medium',
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: 4,
    name: 'Wireless Earbuds',
    sku: 'WEB-PROX-WHT',
    quantity: 64,
    value: '$3,840',
    recovery: '75%',
    method: 'Marketplace Listing',
    badge: 'Medium',
    icon: <Package className="h-4 w-4" />,
  },
];

const opportunitiesByChannel = [
  {
    id: 1,
    name: 'Direct Website',
    value: '$14,680',
    badge: 'Primary',
    icon: <ShoppingBag className="h-4 w-4" />,
    products: 4,
    message: 'Email campaign + homepage banner',
  },
  {
    id: 2,
    name: 'Amazon Marketplace',
    value: '$8,920',
    badge: 'Secondary',
    icon: <Truck className="h-4 w-4" />,
    products: 3,
    message: 'Create FBA bundles for fast liquidation',
  },
  {
    id: 3,
    name: 'Wholesale Partners',
    value: '$21,400',
    badge: 'High Volume',
    icon: <DollarSign className="h-4 w-4" />,
    products: 7,
    message: 'Offer to existing partners at 65% discount',
  },
];

export function LiquidationOpportunities() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-brand-orange" />
          Liquidation Opportunities
        </CardTitle>
        <CardDescription>Top recommendations based on AI analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="products">
          <TabsList className="mb-4">
            <TabsTrigger value="products">By Product</TabsTrigger>
            <TabsTrigger value="channels">By Channel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm text-muted-foreground">
                    <th className="text-left font-medium py-3 px-4">Product</th>
                    <th className="text-left font-medium py-3 px-4">SKU</th>
                    <th className="text-right font-medium py-3 px-4">Qty</th>
                    <th className="text-right font-medium py-3 px-4">Value</th>
                    <th className="text-right font-medium py-3 px-4">Recovery</th>
                    <th className="text-left font-medium py-3 px-4">Recommended Method</th>
                    <th className="text-center font-medium py-3 px-4">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunitiesByCriteria.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50 text-sm">
                      <td className="py-3 px-4 flex items-center gap-2">
                        {item.icon}
                        {item.name}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{item.sku}</td>
                      <td className="py-3 px-4 text-right">{item.quantity}</td>
                      <td className="py-3 px-4 text-right">{item.value}</td>
                      <td className="py-3 px-4 text-right">{item.recovery}</td>
                      <td className="py-3 px-4">{item.method}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge
                          variant="outline"
                          className={
                            item.badge === 'Immediate'
                              ? 'border-brand-red text-brand-red'
                              : item.badge === 'High'
                              ? 'border-brand-orange text-brand-orange'
                              : 'border-brand-teal text-brand-teal'
                          }
                        >
                          {item.badge}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="channels" className="mt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm text-muted-foreground">
                    <th className="text-left font-medium py-3 px-4">Channel</th>
                    <th className="text-left font-medium py-3 px-4">Products</th>
                    <th className="text-right font-medium py-3 px-4">Potential Value</th>
                    <th className="text-left font-medium py-3 px-4">Recommendation</th>
                    <th className="text-center font-medium py-3 px-4">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunitiesByChannel.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50 text-sm">
                      <td className="py-3 px-4 flex items-center gap-2">
                        {item.icon}
                        {item.name}
                      </td>
                      <td className="py-3 px-4">{item.products} items</td>
                      <td className="py-3 px-4 text-right">{item.value}</td>
                      <td className="py-3 px-4">{item.message}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge
                          variant="outline"
                          className={
                            item.badge === 'Primary'
                              ? 'border-brand-green text-brand-green'
                              : item.badge === 'Secondary'
                              ? 'border-brand-teal text-brand-teal'
                              : 'border-brand-purple text-brand-purple'
                          }
                        >
                          {item.badge}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
