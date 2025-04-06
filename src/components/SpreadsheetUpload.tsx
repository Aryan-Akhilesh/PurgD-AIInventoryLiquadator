import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import OpenAI from 'openai';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { FileSpreadsheet, Sparkles, BarChart2, TrendingUp, Store } from 'lucide-react';

interface Product {
  sku: string;
  name: string;
  quantity: number;
  sales: number;
  price: number;
}

interface ShopifyProduct {
  id: string;
  title: string;
  variants: {
    sku: string;
    inventory_quantity: number;
    price: string;
  }[];
  total_sales?: number;
}

interface Campaign {
  product: Product;
  promotionalCopy: string;
  suggestedDiscount: number;
  analysis: {
    salesTrend: string;
    inventoryRisk: string;
    marketTiming: string;
    competitiveAnalysis: string;
  };
}

export function SpreadsheetUpload() {
  const [products, setProducts] = useState<Product[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shopifyStore, setShopifyStore] = useState('');
  const [shopifyAccessToken, setShopifyAccessToken] = useState('');

  const fetchShopifyProducts = async () => {
    if (!shopifyStore || !shopifyAccessToken) {
      toast.error('Please enter your Shopify store details');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${shopifyStore}.myshopify.com/admin/api/2024-01/products.json`,
        {
          headers: {
            'X-Shopify-Access-Token': shopifyAccessToken,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch Shopify products');
      }

      const data = await response.json();
      const formattedProducts: Product[] = data.products.map((product: ShopifyProduct) => ({
        sku: product.variants[0]?.sku || '',
        name: product.title,
        quantity: product.variants[0]?.inventory_quantity || 0,
        sales: product.total_sales || 0,
        price: parseFloat(product.variants[0]?.price || '0'),
      }));

      setProducts(formattedProducts);
      toast.success('Shopify products loaded successfully!');
    } catch (error) {
      toast.error('Failed to fetch Shopify products');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as Product[];
      setProducts(jsonData);
      toast.success('Spreadsheet uploaded successfully!');
    };
    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    }
  });

  const generateCampaigns = async () => {
    if (!products.length) {
      toast.error('Please upload a spreadsheet first');
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      const slowMovingProducts = products
        .sort((a, b) => a.sales - b.sales)
        .slice(0, 2);

      const generatedCampaigns: Campaign[] = [];

      for (let i = 0; i < slowMovingProducts.length; i++) {
        const product = slowMovingProducts[i];
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are a retail inventory and marketing expert. Analyze the product data and provide detailed insights and recommendations for liquidation."
            },
            {
              role: "user",
              content: `Analyze this product and create a detailed promotional strategy:
                Name: ${product.name}
                SKU: ${product.sku}
                Current Price: $${product.price}
                Current Sales: ${product.sales}
                Quantity in Stock: ${product.quantity}
                
                Please provide:
                1. Sales trend analysis
                2. Inventory risk assessment
                3. Market timing recommendations
                4. Competitive analysis
                5. A compelling promotional copy
                6. A suggested discount percentage (0-50%) with justification`
            }
          ],
          model: "gpt-4",
        });

        const response = completion.choices[0].message.content;
        const sections = response?.split('\n\n') || [];
        
        const analysis = {
          salesTrend: sections[0] || 'No sales trend analysis available',
          inventoryRisk: sections[1] || 'No inventory risk assessment available',
          marketTiming: sections[2] || 'No market timing recommendations available',
          competitiveAnalysis: sections[3] || 'No competitive analysis available'
        };

        const promotionalCopy = sections[4] || 'No promotional copy available';
        const discountSection = sections[5] || 'No discount recommendation available';
        const suggestedDiscount = parseInt(discountSection.match(/\d+/)?.[0] || '20');

        generatedCampaigns.push({
          product,
          promotionalCopy,
          suggestedDiscount,
          analysis
        });

        setProgress(((i + 1) / slowMovingProducts.length) * 100);
      }

      setCampaigns(generatedCampaigns);
      toast.success('Campaigns generated successfully!');
    } catch (error) {
      toast.error('Failed to generate campaigns. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="mb-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Store className="w-6 h-6" />
            Connect Shopify Store
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shopify Store Name
              </label>
              <input
                type="text"
                placeholder="your-store-name"
                value={shopifyStore}
                onChange={(e) => setShopifyStore(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin API Access Token
              </label>
              <input
                type="password"
                placeholder="shpat_..."
                value={shopifyAccessToken}
                onChange={(e) => setShopifyAccessToken(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <Button
              onClick={fetchShopifyProducts}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Connect to Shopify
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-2 border-dashed border-gray-200 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <FileSpreadsheet className="w-6 h-6" />
            Or Upload Inventory Spreadsheet
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive 
                ? 'border-blue-500 bg-blue-50 shadow-inner' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-lg text-blue-600 font-medium">Drop the spreadsheet here...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-lg text-gray-700 font-medium">Drag and drop a spreadsheet here</p>
                <p className="text-sm text-gray-500">or click to select files</p>
                <p className="text-xs text-gray-400 mt-4">Supported formats: XLSX, XLS, CSV</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {products.length > 0 && (
        <Card className="mb-8 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <BarChart2 className="w-6 h-6" />
              Uploaded Products ({products.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.slice(0, 5).map((product, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sales}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {products.length > 0 && (
        <Button
          onClick={generateCampaigns}
          disabled={isLoading}
          className="w-full mb-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Promotional Campaigns
        </Button>
      )}

      {isLoading && (
        <div className="mb-8">
          <Progress value={progress} className="w-full h-2 bg-blue-100" />
          <p className="text-center mt-2 text-gray-600 font-medium">Generating campaigns...</p>
        </div>
      )}

      {campaigns.length > 0 && (
        <div className="space-y-6">
          {campaigns.map((campaign, index) => (
            <Card key={index} className="border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <span className="text-blue-800">{campaign.product.name}</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold shadow-sm">
                    {campaign.suggestedDiscount}% OFF
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                      <h3 className="font-semibold text-gray-700 mb-2">Sales Trend Analysis</h3>
                      <p className="text-gray-600">{campaign.analysis.salesTrend}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                      <h3 className="font-semibold text-gray-700 mb-2">Inventory Risk Assessment</h3>
                      <p className="text-gray-600">{campaign.analysis.inventoryRisk}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                      <h3 className="font-semibold text-gray-700 mb-2">Market Timing</h3>
                      <p className="text-gray-600">{campaign.analysis.marketTiming}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                      <h3 className="font-semibold text-gray-700 mb-2">Competitive Analysis</h3>
                      <p className="text-gray-600">{campaign.analysis.competitiveAnalysis}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <h3 className="font-semibold text-blue-700 mb-2">Promotional Copy</h3>
                  <p className="text-blue-900">{campaign.promotionalCopy}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 