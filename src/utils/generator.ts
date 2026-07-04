import { Review, BrandMetrics } from '../types';

// Helper to generate a random date in the last 30 days
function getRandomDate(): string {
  const date = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Generate reviews custom-tailored to the brand name and category
export function generateMockData(brandName: string): { metrics: BrandMetrics; reviews: Review[] } {
  const normalizedName = brandName.trim();
  const lowerName = normalizedName.toLowerCase();

  let category: 'tech' | 'retail' | 'food' | 'general' = 'general';
  if (
    lowerName.includes('tech') ||
    lowerName.includes('software') ||
    lowerName.includes('app') ||
    lowerName.includes('saas') ||
    lowerName.includes('ai') ||
    lowerName.includes('cloud') ||
    lowerName.includes('system') ||
    lowerName.includes('data')
  ) {
    category = 'tech';
  } else if (
    lowerName.includes('nike') ||
    lowerName.includes('adidas') ||
    lowerName.includes('shoe') ||
    lowerName.includes('apparel') ||
    lowerName.includes('store') ||
    lowerName.includes('wear') ||
    lowerName.includes('brand') ||
    lowerName.includes('shop')
  ) {
    category = 'retail';
  } else if (
    lowerName.includes('cafe') ||
    lowerName.includes('pizza') ||
    lowerName.includes('food') ||
    lowerName.includes('restaurant') ||
    lowerName.includes('burger') ||
    lowerName.includes('eat') ||
    lowerName.includes('coffee')
  ) {
    category = 'food';
  }

  // Templates for different categories
  const templates = {
    tech: [
      {
        author: 'Sarah Jenkins',
        platform: 'Google' as const,
        rating: 5,
        sentiment: 'positive' as const,
        sentimentScore: 94,
        topic: 'Product Usability',
        content: `I've been using ${normalizedName} for my team for 3 months now. The UI is exceptionally intuitive and has saved us hours of manual work. Highly recommend their automation features!`,
      },
      {
        author: 'David Chen',
        platform: 'Trustpilot' as const,
        rating: 5,
        sentiment: 'positive' as const,
        sentimentScore: 98,
        topic: 'Customer Support',
        content: `Had an onboarding issue with ${normalizedName} but their support representative resolved it in under 5 minutes. Amazing service, and the product itself is outstandingly robust.`,
      },
      {
        author: 'Michael R.',
        platform: 'Yelp' as const,
        rating: 4,
        sentiment: 'positive' as const,
        sentimentScore: 82,
        topic: 'Pricing',
        content: `Overall, ${normalizedName} is a solid platform. Features are top-notch. It's a bit pricier than competitors, but you definitely get what you pay for in terms of stability and speed.`,
      },
      {
        author: 'Elena Rostova',
        platform: 'Google' as const,
        rating: 3,
        sentiment: 'neutral' as const,
        sentimentScore: 50,
        topic: 'Integrations',
        content: `${normalizedName} works well for basic workflows, but we are waiting on deeper API integrations. The current Webhook system is a bit limited for enterprise needs. Good potential.`,
      },
      {
        author: 'James McAvoy',
        platform: 'Trustpilot' as const,
        rating: 2,
        sentiment: 'negative' as const,
        sentimentScore: 24,
        topic: 'Performance',
        content: `The dashboard on ${normalizedName} runs incredibly slow during peak hours. We've experienced multiple timeout errors when generating weekly reports. Hopefully, they upgrade their servers soon.`,
      },
      {
        author: 'Tariq Al-Mansoor',
        platform: 'Google' as const,
        rating: 1,
        sentiment: 'negative' as const,
        sentimentScore: 12,
        topic: 'Billing',
        content: `Extremely disappointed with ${normalizedName}'s billing policy. I was charged after canceling my trial and support has been ignoring my refund requests for a week. Beware of the auto-renewal.`,
      },
    ],
    retail: [
      {
        author: 'Marcus Vance',
        platform: 'Google' as const,
        rating: 5,
        sentiment: 'positive' as const,
        sentimentScore: 96,
        topic: 'Product Quality',
        content: `Absolutely in love with my new purchase from ${normalizedName}. The material is top-grade and the sizing is exact. Best buy of the year so far!`,
      },
      {
        author: 'Chloe Simmons',
        platform: 'Trustpilot' as const,
        rating: 5,
        sentiment: 'positive' as const,
        sentimentScore: 91,
        topic: 'Shipping',
        content: `Super fast delivery! Ordered from ${normalizedName} on Tuesday and it arrived on Thursday afternoon. Well packaged and exactly as described on the website.`,
      },
      {
        author: 'Robert Taylor',
        platform: 'Yelp' as const,
        rating: 4,
        sentiment: 'positive' as const,
        sentimentScore: 85,
        topic: 'Customer Service',
        content: `The staff at ${normalizedName} was incredibly helpful when I needed to exchange an item for a different size. Smooth transaction, though the store was quite crowded.`,
      },
      {
        author: 'Jessica Miller',
        platform: 'Google' as const,
        rating: 3,
        sentiment: 'neutral' as const,
        sentimentScore: 48,
        topic: 'Pricing',
        content: `${normalizedName} has trendy designs, but the prices are creeping up. The value is decent, but I recommend waiting for their seasonal sales.`,
      },
      {
        author: 'Danielle K.',
        platform: 'Trustpilot' as const,
        rating: 2,
        sentiment: 'negative' as const,
        sentimentScore: 30,
        topic: 'Sizing & Fit',
        content: `Sizing with ${normalizedName} is completely inconsistent. I ordered my usual medium and it fits like an extra-large. Returning it is proving to be a hassle as I have to pay for return shipping.`,
      },
      {
        author: 'Kevin Peterson',
        platform: 'Google' as const,
        rating: 1,
        sentiment: 'negative' as const,
        sentimentScore: 15,
        topic: 'Durability',
        content: `Terrible quality. The seams on my ${normalizedName} item literally started coming apart after the very first wash. For this price, I expected something that would last. Won't buy again.`,
      },
    ],
    food: [
      {
        author: 'Emily Watson',
        platform: 'Yelp' as const,
        rating: 5,
        sentiment: 'positive' as const,
        sentimentScore: 98,
        topic: 'Food Quality',
        content: `Hands down the best food in town. Everything we ordered at ${normalizedName} was seasoned to perfection and beautifully presented. The signature dish is a must-try!`,
      },
      {
        author: 'Brad Pittman',
        platform: 'Google' as const,
        rating: 5,
        sentiment: 'positive' as const,
        sentimentScore: 93,
        topic: 'Service',
        content: `The atmosphere at ${normalizedName} is wonderful, but what really blew me away was the service. Our waiter was attentive, knowledgeable, and made us feel like royalty.`,
      },
      {
        author: 'Monica Geller',
        platform: 'Yelp' as const,
        rating: 4,
        sentiment: 'positive' as const,
        sentimentScore: 88,
        topic: 'Ambiance',
        content: `A delightful dining experience at ${normalizedName}. Great music, perfect ambient lighting, and delicious appetizers. Service was slightly slow because they were fully booked, but worth the wait.`,
      },
      {
        author: 'Arthur Dent',
        platform: 'Google' as const,
        rating: 3,
        sentiment: 'neutral' as const,
        sentimentScore: 52,
        topic: 'Value',
        content: `The food at ${normalizedName} is good, but the portions are relatively small for the price. It's a nice place for a special occasion, but not my go-to for a casual meal.`,
      },
      {
        author: 'Linus T.',
        platform: 'Yelp' as const,
        rating: 2,
        sentiment: 'negative' as const,
        sentimentScore: 28,
        topic: 'Waiting Time',
        content: `Even with a reservation, we had to wait 35 minutes to be seated at ${normalizedName}. The table was sticky and the noise level was so high we could barely hear each other speak.`,
      },
      {
        author: 'Gordon R.',
        platform: 'Google' as const,
        rating: 1,
        sentiment: 'negative' as const,
        sentimentScore: 9,
        topic: 'Hygiene & Quality',
        content: `Absolutely dreadful experience at ${normalizedName}. The chicken was severely undercooked and cold in the middle. When I complained, the manager was defensive instead of apologetic. Disgusting.`,
      },
    ],
    general: [
      {
        author: 'Alice Cooper',
        platform: 'Google' as const,
        rating: 5,
        sentiment: 'positive' as const,
        sentimentScore: 95,
        topic: 'Overall Experience',
        content: `I've had nothing but fantastic experiences with ${normalizedName}. They are extremely professional, deliver on time, and their customer care is unmatched. Highly recommended!`,
      },
      {
        author: 'Jonathan Swift',
        platform: 'Trustpilot' as const,
        rating: 5,
        sentiment: 'positive' as const,
        sentimentScore: 91,
        topic: 'Reliability',
        content: `${normalizedName} is incredibly reliable. I have recommended their services to several colleagues and everyone has thanked me. A top-tier business!`,
      },
      {
        author: 'Patricia Neal',
        platform: 'Yelp' as const,
        rating: 4,
        sentiment: 'positive' as const,
        sentimentScore: 84,
        topic: 'Value for Money',
        content: `Great value and helpful team at ${normalizedName}. They took care of everything we needed. Minor delay on communication, but they resolved everything beautifully.`,
      },
      {
        author: 'Sanjay Gupta',
        platform: 'Google' as const,
        rating: 3,
        sentiment: 'neutral' as const,
        sentimentScore: 50,
        topic: 'Product Selection',
        content: `${normalizedName} provides a solid, decent service. It's not extraordinary, but they do exactly what's advertised on their website. Standard pricing.`,
      },
      {
        author: 'Rebecca Thorne',
        platform: 'Trustpilot' as const,
        rating: 2,
        sentiment: 'negative' as const,
        sentimentScore: 35,
        topic: 'Communication',
        content: `Communication with ${normalizedName} is a struggle. It takes them days to respond to simple emails. The actual delivery was fine, but the anxiety of not hearing back is not worth it.`,
      },
      {
        author: 'Gary Oldman',
        platform: 'Google' as const,
        rating: 1,
        sentiment: 'negative' as const,
        sentimentScore: 14,
        topic: 'Customer Care',
        content: `Worst experience ever. ${normalizedName} failed to deliver what was promised and then refused to issue a refund. Their customer support team was outright rude. Save your money!`,
      },
    ],
  };

  const selectedReviews = templates[category].map((r, index) => ({
    ...r,
    id: `rev-${category}-${index}`,
    date: getRandomDate(),
  }));

  // Calculate dynamic metrics based on reviews
  const totalReviews = 100 + Math.floor(Math.random() * 150); // Simulated total pool
  const averageRating = 4.2;
  const netPromoterScore = 48; // NPS is usually between -100 and +100

  // Category specific Strengths and Weaknesses
  let executiveSummary = '';
  let strengths: string[] = [];
  let weaknesses: string[] = [];
  let recommendations: string[] = [];
  let competitors: { name: string; rating: number; reviewsCount: number; sentimentScore: number }[] = [];

  if (category === 'tech') {
    executiveSummary = `${normalizedName} exhibits a strong market presence with high customer satisfaction around user experience and customer service responsiveness. However, performance bottlenecks during high-volume periods and limitations in native API integrations are causing friction for power users.`;
    strengths = ['Intuitive UI and dashboard layout', 'Fast and effective customer support', 'Powerful automation features'];
    weaknesses = ['Slow dashboard loading times at peak hours', 'Limited native API/webhook integrations', 'Auto-renewal billing complaints'];
    recommendations = [
      'Optimize database queries and server capacity for report generation',
      'Expand public API capabilities and document native integrations',
      'Implement transparent subscription renewal notices before charging users',
    ];
    competitors = [
      { name: 'SaaSify Inc.', rating: 4.5, reviewsCount: 420, sentimentScore: 88 },
      { name: 'CloudFlow Tech', rating: 4.1, reviewsCount: 290, sentimentScore: 78 },
      { name: 'DataCore App', rating: 3.8, reviewsCount: 150, sentimentScore: 65 },
    ];
  } else if (category === 'retail') {
    executiveSummary = `Customers praise ${normalizedName} for premium material quality and exceptionally fast delivery times. Sizing discrepancies and return shipping costs represent the primary drivers of negative sentiment and high return rates.`;
    strengths = ['High-grade product materials and craftsmanship', 'Extremely fast 2-day delivery', 'Helpful in-store service staff'];
    weaknesses = ['Inconsistent clothing/shoe sizing standards', 'Customer-paid return shipping policy', 'Wear and tear after early washing'];
    recommendations = [
      'Provide interactive sizing calculators on product pages',
      'Offer free prepaid return shipping labels to improve buyer confidence',
      'Upgrade fabric pre-washing processes to prevent seam decay',
    ];
    competitors = [
      { name: 'TrendWear Co', rating: 4.3, reviewsCount: 940, sentimentScore: 82 },
      { name: 'Apex Apparel', rating: 4.0, reviewsCount: 510, sentimentScore: 74 },
      { name: 'Luxe Goods', rating: 4.6, reviewsCount: 210, sentimentScore: 92 },
    ];
  } else if (category === 'food') {
    executiveSummary = `${normalizedName} receives glowing acclaim for food taste, presentation, and friendly staff service. Long waiting times (even with reservations) and elevated ambient noise are the core negative factors affecting customer dining satisfaction.`;
    strengths = ['Outstanding culinary quality and seasoning', 'Impeccable waiter service and engagement', 'Great ambient lighting and playlist'];
    weaknesses = ['Excessive table wait times with active bookings', 'Loud restaurant acoustics', 'Small portion sizes relative to price'];
    recommendations = [
      'Optimize reservation booking intervals to prevent seating overlaps',
      'Install acoustic dampening panels to lower ambient noise levels',
      'Introduce premium platters or slight increases in portion size',
    ];
    competitors = [
      { name: 'Bistro 21', rating: 4.4, reviewsCount: 310, sentimentScore: 86 },
      { name: 'The Foodery', rating: 3.9, reviewsCount: 180, sentimentScore: 70 },
      { name: 'Gourmet House', rating: 4.7, reviewsCount: 420, sentimentScore: 94 },
    ];
  } else {
    executiveSummary = `${normalizedName} maintains a highly professional service reputation. Delivering reliable, on-time output represents their key differentiator. Improving response turnaround times for email support tickets remains their biggest growth area.`;
    strengths = ['On-time service delivery and execution', 'High level of overall team professionalism', 'Delivers exact feature scope as advertised'];
    weaknesses = ['Delayed response times for email tickets', 'Average or plain pricing tiers', 'Rude support interactions reported in billing'];
    recommendations = [
      'Deploy a real-time live chat widget on the home dashboard',
      'Introduce flexible custom pricing bundles for small-sized businesses',
      'Train support agents in modern empathy-driven resolution protocols',
    ];
    competitors = [
      { name: 'Universal Services', rating: 4.2, reviewsCount: 210, sentimentScore: 80 },
      { name: 'Global Solution Group', rating: 4.0, reviewsCount: 340, sentimentScore: 76 },
      { name: 'Direct Prime Co', rating: 4.5, reviewsCount: 110, sentimentScore: 90 },
    ];
  }

  return {
    metrics: {
      brandName: normalizedName,
      averageRating,
      totalReviews,
      sentimentDistribution: {
        positive: 65, // % positive
        neutral: 20,  // % neutral
        negative: 15, // % negative
      },
      netPromoterScore,
      aiInsightSummary: {
        strengths,
        weaknesses,
        recommendations,
        executiveSummary,
      },
      competitorCompare: competitors,
    },
    reviews: selectedReviews,
  };
}
