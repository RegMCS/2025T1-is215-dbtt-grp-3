import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"
import { google } from "@ai-sdk/google"
import productsData from "@/data/products.json"
import analyticsData from "@/data/analytics.json"

export const maxDuration = 30

// Calculate analytics metrics
const totalCasketRevenue = productsData.caskets.reduce((sum, c) => sum + c.salesData.totalRevenue, 0)
const totalPackageRevenue = productsData.packages.reduce((sum, p) => sum + p.salesData.totalRevenue, 0)
const totalRevenue = totalCasketRevenue + totalPackageRevenue

const totalCasketsSold = productsData.caskets.reduce((sum, c) => sum + c.salesData.totalUnitsSold, 0)
const totalPackagesSold = productsData.packages.reduce((sum, p) => sum + p.salesData.totalPackagesSold, 0)

const lowStockItems = productsData.caskets.filter(
  (c) => !c.inventory.madeToOrder && c.inventory.inStock && c.inventory.quantity <= c.inventory.lowStockThreshold
)
const outOfStockItems = productsData.caskets.filter((c) => !c.inventory.madeToOrder && !c.inventory.inStock)
const madeToOrderItems = productsData.caskets.filter((c) => c.inventory.madeToOrder)

const trendingItems = productsData.caskets.filter((c) => c.salesData.trending)

// Build detailed data summary for AI
const dataContext = `
BUSINESS OVERVIEW:
- Total Revenue (YTD): $${totalRevenue.toLocaleString()}
- Total Units Sold: ${totalCasketsSold + totalPackagesSold} (${totalCasketsSold} caskets, ${totalPackagesSold} packages)
- Inventory Alerts: ${outOfStockItems.length} out of stock, ${lowStockItems.length} low stock
- Made-to-Order Items: ${madeToOrderItems.length} (custom items, always available)
- Trending Products: ${trendingItems.length} items currently trending

CASKET INVENTORY & SALES:
${productsData.caskets
  .map(
    (c) => `
- ${c.name} (${c.material}):
  * Stock: ${c.inventory.madeToOrder ? "Made-to-Order (always available)" : `${c.inventory.quantity} units (${!c.inventory.inStock ? "OUT OF STOCK" : c.inventory.quantity <= c.inventory.lowStockThreshold ? "LOW STOCK" : "Good"})`}
  * Price Range: ${c.priceRange.display}
  * YTD Sales: ${c.salesData.yearToDateSales} units
  * Total Revenue: $${c.salesData.totalRevenue.toLocaleString()}
  * Last Month: ${c.salesData.lastMonthSales} units ($${c.salesData.lastMonthRevenue.toLocaleString()})
  * Popularity Rank: #${c.salesData.popularityRank}
  * Rating: ${c.salesData.averageRating}/5.0 (${c.salesData.customerReviews} reviews)
  * Trending: ${c.salesData.trending ? "YES" : "No"}
  * Supplier: ${c.inventory.supplier}
  * Lead Time: ${c.inventory.leadTime}
`
  )
  .join("\n")}

FUNERAL PACKAGES:
${productsData.packages
  .map(
    (p) => `
- ${p.name} (${p.type}):
  * Price Range: ${p.priceRange.display}
  * YTD Sales: ${p.salesData.yearToDateSales} packages
  * Total Revenue: $${p.salesData.totalRevenue.toLocaleString()}
  * Last Month: ${p.salesData.lastMonthSales} packages ($${p.salesData.lastMonthRevenue.toLocaleString()})
  * Rating: ${p.salesData.averageRating}/5.0 (${p.salesData.customerReviews} reviews)
  * Trending: ${p.salesData.trending ? "YES" : "No"}
  * Popularity Rank: #${p.salesData.popularityRank}
  * Availability: ${p.inventory.nextAvailable}
  * Monthly Capacity: ${p.inventory.monthlyCapacity} (${p.inventory.currentMonthBooked} booked)
`
  )
  .join("\n")}

METADATA:
- Last Updated: ${productsData.metadata.lastUpdated}
- Total Inventory Value: $${productsData.metadata.totalCasketInventoryValue.toLocaleString()}
- Packages Booked This Month: ${productsData.metadata.totalPackagesBookedThisMonth}
- Overall Customer Satisfaction: ${productsData.metadata.overallCustomerSatisfaction}/5.0
- Top Selling Category: ${productsData.metadata.topSellingCategory}
- Fastest Growing Category: ${productsData.metadata.fastestGrowingCategory}

MONTHLY REVENUE TRENDS (Last 10 Months):
${analyticsData.monthlyRevenue.map(m => `- ${m.month} ${m.year}: $${m.total.toLocaleString()} (Caskets: $${m.caskets.toLocaleString()}, Packages: $${m.packages.toLocaleString()}) | Units: ${m.casketsSold + m.packagesSold}`).join('\n')}

QUARTERLY PERFORMANCE:
${analyticsData.quarterlyPerformance.map(q => `- ${q.quarter}: $${q.revenue.toLocaleString()} revenue, ${q.unitsSold} units sold, ${q.growthRate}% growth`).join('\n')}

REVENUE FORECASTS (Next 6 Months):
${analyticsData.forecasts.nextSixMonths.map(f => `- ${f.month} ${f.year}: $${f.projectedRevenue.toLocaleString()} (Confidence: ${f.confidenceInterval})`).join('\n')}

CUSTOMER INSIGHTS:
- Average Customer Age: ${analyticsData.customerMetrics.averageAge}
- Pre-Need Planning Rate: ${analyticsData.customerMetrics.preNeedPlanningPercentage}%
- Repeat Family Rate: ${analyticsData.customerMetrics.repeatFamilyPercentage}%
- Referral Rate: ${analyticsData.customerMetrics.referralRate}%
- Online Inquiry Rate: ${analyticsData.customerMetrics.onlineInquiryRate}%
- Average Satisfaction Score: ${analyticsData.customerMetrics.averageSatisfactionScore}/5.0
- 24h Response Rate: ${analyticsData.customerMetrics.responseTime24h}

SEASONAL TRENDS:
- High Season Months: ${analyticsData.seasonalTrends.highSeasonMonths.join(', ')}
- Low Season Months: ${analyticsData.seasonalTrends.lowSeasonMonths.join(', ')}
- Peak Day: ${analyticsData.dailyAverages.peakDay}
- Average Transaction Value: $${analyticsData.dailyAverages.averageTransactionValue.toLocaleString()}

INVENTORY PERFORMANCE:
- Average Turnover Rate: ${analyticsData.inventoryMetrics.averageTurnoverRate}x per year
- Stockout Incidents: ${analyticsData.inventoryMetrics.stockoutIncidents}
- Supplier On-Time Delivery: ${analyticsData.inventoryMetrics.supplierOnTimeDelivery}
- Warehouse Utilization: ${analyticsData.inventoryMetrics.warehouseUtilization}
`

const SYSTEM_PROMPT = `You are an expert AI business analyst for Direct Funeral Services, specializing in data analysis, sales forecasting, and inventory optimization.

Your role is to:
- Analyze sales and inventory data to provide actionable insights
- Identify trends, opportunities, and risks
- Make predictions based on historical data and patterns
- Provide specific, data-driven recommendations
- Answer questions about business performance, inventory, and strategy
- Use the actual data provided to make accurate assessments

CURRENT BUSINESS DATA:
${dataContext}

When analyzing data:
- Be specific with numbers and percentages
- Identify cause-and-effect relationships
- Highlight urgent issues (out of stock, declining sales)
- Suggest concrete actions (reorder amounts, marketing strategies)
- Compare performance across products and categories
- Consider seasonality and trends
- Provide short-term and long-term recommendations

Always format your responses clearly with:
- **Bold headings** for sections
- Bullet points for lists
- Specific data points and metrics
- Clear action items when applicable

Be concise but thorough. Focus on actionable intelligence.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: google("gemini-2.0-flash-exp"),
    system: SYSTEM_PROMPT,
    messages: prompt,
    abortSignal: req.signal,
    maxOutputTokens: 1000,
    temperature: 0.3, // Lower temperature for more factual, analytical responses
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("[Analytics AI] Chat request aborted")
      }
    },
    consumeSseStream: consumeStream,
  })
}

