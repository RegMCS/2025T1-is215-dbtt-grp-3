"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  PieChart,
  LineChart,
  Home,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  RefreshCw,
} from "lucide-react"
import productsData from "@/data/products.json"
import { Bar, BarChart, Line, LineChart as RechartsLineChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell, CartesianGrid, Area, AreaChart } from "recharts"
import AnalyticsChat from "@/components/analytics-chat"

export default function AnalyticsPage() {
  // Calculate aggregate metrics
  const totalCasketRevenue = productsData.caskets.reduce((sum, c) => sum + c.salesData.totalRevenue, 0)
  const totalPackageRevenue = productsData.packages.reduce((sum, p) => sum + p.salesData.totalRevenue, 0)
  const totalRevenue = totalCasketRevenue + totalPackageRevenue
  
  const totalCasketsSold = productsData.caskets.reduce((sum, c) => sum + c.salesData.totalUnitsSold, 0)
  const totalPackagesSold = productsData.packages.reduce((sum, p) => sum + p.salesData.totalPackagesSold, 0)
  
  const lastMonthCasketRevenue = productsData.caskets.reduce((sum, c) => sum + c.salesData.lastMonthRevenue, 0)
  const lastMonthPackageRevenue = productsData.packages.reduce((sum, p) => sum + p.salesData.lastMonthRevenue, 0)
  const lastMonthRevenue = lastMonthCasketRevenue + lastMonthPackageRevenue

  // Low stock items
  const lowStockCaskets = productsData.caskets.filter(c => c.inventory.inStock && c.inventory.quantity <= c.inventory.lowStockThreshold)
  const outOfStockCaskets = productsData.caskets.filter(c => !c.inventory.inStock)

  // Trending items
  const trendingCaskets = productsData.caskets.filter(c => c.salesData.trending)
  
  // Top sellers data
  const topSellingCaskets = [...productsData.caskets]
    .sort((a, b) => b.salesData.totalRevenue - a.salesData.totalRevenue)
    .slice(0, 5)
    .map(c => ({
      name: c.name,
      revenue: c.salesData.totalRevenue,
      units: c.salesData.totalUnitsSold,
      trend: c.salesData.trending
    }))

  const topSellingPackages = [...productsData.packages]
    .sort((a, b) => b.salesData.totalRevenue - a.salesData.totalRevenue)
    .slice(0, 5)
    .map(p => ({
      name: p.name,
      revenue: p.salesData.totalRevenue,
      units: p.salesData.totalPackagesSold,
      trend: p.salesData.trending
    }))

  // Category revenue breakdown
  const categoryRevenue = [
    { name: "Traditional Wood", value: productsData.caskets.filter(c => c.category === "Traditional Wood Caskets").reduce((sum, c) => sum + c.salesData.totalRevenue, 0) },
    { name: "Metal Caskets", value: productsData.caskets.filter(c => c.category === "Metal Caskets").reduce((sum, c) => sum + c.salesData.totalRevenue, 0) },
    { name: "Eco-Friendly", value: productsData.caskets.filter(c => c.category === "Eco-Friendly Options").reduce((sum, c) => sum + c.salesData.totalRevenue, 0) },
    { name: "Luxury", value: productsData.caskets.filter(c => c.category === "Premium Luxury Caskets").reduce((sum, c) => sum + c.salesData.totalRevenue, 0) },
  ]

  const packageCategoryRevenue = [
    { name: "Essential", value: productsData.packages.filter(p => p.category === "Essential Packages").reduce((sum, p) => sum + p.salesData.totalRevenue, 0) },
    { name: "Traditional", value: productsData.packages.filter(p => p.category === "Traditional Packages").reduce((sum, p) => sum + p.salesData.totalRevenue, 0) },
    { name: "Premium", value: productsData.packages.filter(p => p.category === "Premium Packages").reduce((sum, p) => sum + p.salesData.totalRevenue, 0) },
    { name: "Cremation", value: productsData.packages.filter(p => p.category === "Cremation Packages").reduce((sum, p) => sum + p.salesData.totalRevenue, 0) },
    { name: "Green", value: productsData.packages.filter(p => p.category === "Eco-Friendly Packages").reduce((sum, p) => sum + p.salesData.totalRevenue, 0) },
    { name: "Direct", value: productsData.packages.filter(p => p.category === "Simple Packages").reduce((sum, p) => sum + p.salesData.totalRevenue, 0) },
  ]

  // Simulated monthly trend data
  const monthlyTrends = [
    { month: "Jun", caskets: 45000, packages: 89000 },
    { month: "Jul", caskets: 52000, packages: 95000 },
    { month: "Aug", caskets: 48000, packages: 98000 },
    { month: "Sep", caskets: 54000, packages: 102000 },
    { month: "Oct", caskets: lastMonthCasketRevenue, packages: lastMonthPackageRevenue },
  ]

  // Inventory status
  const inventoryStatus = productsData.caskets.map(c => ({
    name: c.name.split(" ")[0],
    stock: c.inventory.quantity,
    threshold: c.inventory.lowStockThreshold,
    status: !c.inventory.inStock ? "Out" : c.inventory.quantity <= c.inventory.lowStockThreshold ? "Low" : "Good"
  }))

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57']

  // AI Predictions
  const predictions = [
    {
      title: "Steel Casket Demand Spike",
      description: "Based on trending data, Steel Casket sales are predicted to increase by 15% next month.",
      confidence: "High",
      impact: "Revenue increase of ~$9,000"
    },
    {
      title: "Eco-Friendly Growth",
      description: "Eco-friendly options showing 23% month-over-month growth. Consider increasing inventory.",
      confidence: "Medium",
      impact: "Potential 20% revenue boost"
    },
    {
      title: "Copper Casket Restocking",
      description: "Copper Casket is out of stock. Historical data shows lost revenue of ~$5,000/month when unavailable.",
      confidence: "High",
      impact: "Lost revenue prevention"
    },
    {
      title: "Premium Package Upsell Opportunity",
      description: "40% of Essential Package customers inquire about upgrades. Implementing targeted upselling could increase conversion.",
      confidence: "Medium",
      impact: "15-20% package revenue increase"
    }
  ]

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6 px-4 border-b-4 border-secondary">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Staff Analytics Dashboard</h1>
              <p className="text-sm md:text-base mt-2 opacity-90">Real-time insights and predictive analytics</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl p-4 md:p-8 flex-1">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(2)}M</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+12.5%</span> from last quarter
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Month Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(lastMonthRevenue / 1000).toFixed(0)}K</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+8.2%</span> vs previous month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Units Sold (YTD)</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCasketsSold + totalPackagesSold}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalCasketsSold} caskets • {totalPackagesSold} packages
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockCaskets.length + outOfStockCaskets.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {outOfStockCaskets.length} out of stock • {lowStockCaskets.length} low stock
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends (Last 5 Months)</CardTitle>
                  <CardDescription>Monthly revenue breakdown by product type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                      <Legend />
                      <Area type="monotone" dataKey="caskets" stackId="1" stroke="#8884d8" fill="#8884d8" name="Caskets" />
                      <Area type="monotone" dataKey="packages" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Packages" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Casket Category Revenue</CardTitle>
                  <CardDescription>Distribution by casket category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={categoryRevenue}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryRevenue.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Caskets</CardTitle>
                  <CardDescription>By revenue (Year to Date)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topSellingCaskets.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.units} units sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.revenue / 1000).toFixed(0)}K</p>
                          {item.trend && <Badge variant="secondary" className="text-xs">Trending</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Packages</CardTitle>
                  <CardDescription>By revenue (Year to Date)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topSellingPackages.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.units} packages sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.revenue / 1000).toFixed(0)}K</p>
                          {item.trend && <Badge variant="secondary" className="text-xs">Trending</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sales Analytics Tab */}
          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Package Category Performance</CardTitle>
                  <CardDescription>Revenue by package type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={packageCategoryRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                      <Bar dataKey="value" fill="#82ca9d" name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction Scores</CardTitle>
                  <CardDescription>Average ratings by product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {productsData.caskets.slice(0, 6).map((casket, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{casket.name}</span>
                          <span className="text-sm font-bold">{casket.salesData.averageRating}/5.0</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-secondary h-2 rounded-full transition-all"
                            style={{ width: `${(casket.salesData.averageRating / 5) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{casket.salesData.customerReviews} reviews</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sales Velocity & Popularity Ranking</CardTitle>
                <CardDescription>Products ranked by popularity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...productsData.caskets]
                    .sort((a, b) => a.salesData.popularityRank - b.salesData.popularityRank)
                    .slice(0, 6)
                    .map((casket) => (
                      <Card key={casket.id} className="border-2">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">Rank #{casket.salesData.popularityRank}</Badge>
                            {casket.salesData.trending && <Badge variant="secondary">🔥 Trending</Badge>}
                          </div>
                          <CardTitle className="text-base mt-2">{casket.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">YTD Sales:</span>
                            <span className="font-semibold">{casket.salesData.yearToDateSales} units</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Revenue:</span>
                            <span className="font-semibold">${(casket.salesData.totalRevenue / 1000).toFixed(0)}K</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Rating:</span>
                            <span className="font-semibold">{casket.salesData.averageRating} ⭐</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            {/* Alerts */}
            {(outOfStockCaskets.length > 0 || lowStockCaskets.length > 0) && (
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Inventory Alerts
                  </CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {outOfStockCaskets.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-destructive mb-2">Out of Stock ({outOfStockCaskets.length})</h4>
                      <div className="space-y-2">
                        {outOfStockCaskets.map((casket) => (
                          <div key={casket.id} className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                            <div>
                              <p className="font-medium">{casket.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Lead time: {casket.inventory.leadTime} • Supplier: {casket.inventory.supplier}
                              </p>
                            </div>
                            <Button size="sm" variant="destructive">Order Now</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {lowStockCaskets.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-2">Low Stock ({lowStockCaskets.length})</h4>
                      <div className="space-y-2">
                        {lowStockCaskets.map((casket) => (
                          <div key={casket.id} className="flex items-center justify-between p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                            <div>
                              <p className="font-medium">{casket.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Current: {casket.inventory.quantity} • Threshold: {casket.inventory.lowStockThreshold}
                              </p>
                            </div>
                            <Button size="sm" variant="outline">Reorder</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Inventory Status Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Current Inventory Levels</CardTitle>
                <CardDescription>Stock quantities vs low stock thresholds</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={inventoryStatus}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="stock" fill="#82ca9d" name="Current Stock" />
                    <Bar dataKey="threshold" fill="#ffc658" name="Low Stock Threshold" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Inventory Details Table */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Inventory Status</CardTitle>
                <CardDescription>Complete inventory breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Product</th>
                        <th className="text-left p-2">Category</th>
                        <th className="text-center p-2">Stock</th>
                        <th className="text-center p-2">Status</th>
                        <th className="text-left p-2">Supplier</th>
                        <th className="text-center p-2">Lead Time</th>
                        <th className="text-center p-2">Last Restocked</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsData.caskets.map((casket) => (
                        <tr key={casket.id} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{casket.name}</td>
                          <td className="p-2 text-muted-foreground">{casket.category.split(" ")[0]}</td>
                          <td className="p-2 text-center">{casket.inventory.quantity}</td>
                          <td className="p-2 text-center">
                            {!casket.inventory.inStock ? (
                              <Badge variant="destructive">Out</Badge>
                            ) : casket.inventory.quantity <= casket.inventory.lowStockThreshold ? (
                              <Badge className="bg-orange-500">Low</Badge>
                            ) : (
                              <Badge variant="secondary">Good</Badge>
                            )}
                          </td>
                          <td className="p-2 text-xs">{casket.inventory.supplier}</td>
                          <td className="p-2 text-center text-xs">{casket.inventory.leadTime}</td>
                          <td className="p-2 text-center text-xs">{casket.inventory.lastRestocked || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Predictions Tab */}
          <TabsContent value="predictions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Chat Assistant */}
              <div className="lg:col-span-2">
                <AnalyticsChat />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent AI-Generated Insights</CardTitle>
                <CardDescription>
                  Latest predictions and recommendations based on data analysis
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {predictions.map((prediction, index) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={prediction.confidence === "High" ? "default" : "secondary"}>
                        {prediction.confidence} Confidence
                      </Badge>
                      <TrendingUp className="h-5 w-5 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">{prediction.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{prediction.description}</p>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm font-semibold">Projected Impact:</p>
                      <p className="text-sm text-secondary">{prediction.impact}</p>
                    </div>
                    <Button size="sm" className="w-full" variant="outline">
                      View Details & Recommendations
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Forecasting */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecast (Next 6 Months)</CardTitle>
                <CardDescription>AI-generated predictions based on historical trends and seasonality</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart
                    data={[
                      { month: "Oct (Actual)", value: lastMonthRevenue },
                      { month: "Nov", value: lastMonthRevenue * 1.08 },
                      { month: "Dec", value: lastMonthRevenue * 1.15 },
                      { month: "Jan", value: lastMonthRevenue * 1.12 },
                      { month: "Feb", value: lastMonthRevenue * 1.06 },
                      { month: "Mar", value: lastMonthRevenue * 1.10 },
                      { month: "Apr", value: lastMonthRevenue * 1.14 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} name="Projected Revenue" />
                  </RechartsLineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm">
                    <strong>AI Analysis:</strong> December typically sees a 15% increase due to end-of-year planning. 
                    Inventory levels should be adjusted accordingly, particularly for Traditional and Premium packages.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle className="text-lg">Monthly Sales Report</CardTitle>
                  <CardDescription>Detailed breakdown of monthly performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Package className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle className="text-lg">Inventory Report</CardTitle>
                  <CardDescription>Stock levels, reorder points, suppliers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Users className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle className="text-lg">Customer Analytics</CardTitle>
                  <CardDescription>Pre-planning trends and demographics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <DollarSign className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle className="text-lg">Financial Summary</CardTitle>
                  <CardDescription>Revenue, costs, and profit margins</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                  <CardDescription>KPIs and business health indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate Report</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Calendar className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle className="text-lg">Custom Date Range</CardTitle>
                  <CardDescription>Create custom reports for any period</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Customize Report</Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>Download reports in your preferred format</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline">Export as PDF</Button>
                <Button variant="outline">Export as Excel</Button>
                <Button variant="outline">Export as CSV</Button>
                <Button variant="outline">Email Report</Button>
                <Button variant="outline">Schedule Automated Reports</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-primary text-primary-foreground py-4 px-4 border-t-4 border-secondary mt-auto">
        <div className="container mx-auto max-w-7xl text-center text-sm">
          <p>© 2025 Direct Funeral Services Staff Dashboard. Last updated: {new Date().toLocaleString()}</p>
        </div>
      </footer>
    </main>
  )
}

