export interface Review {
  id: string;
  author: string;
  platform: 'Google' | 'Yelp' | 'Trustpilot';
  rating: number;
  content: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number; // 0 to 100
  topic: string;
}

export interface SentimentDistribution {
  positive: number;
  neutral: number;
  negative: number;
}

export interface CompetitorMetric {
  name: string;
  rating: number;
  reviewsCount: number;
  sentimentScore: number; // % positive
}

export interface BrandMetrics {
  brandName: string;
  averageRating: number;
  totalReviews: number;
  sentimentDistribution: SentimentDistribution;
  netPromoterScore: number;
  aiInsightSummary: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    executiveSummary: string;
  };
  competitorCompare: CompetitorMetric[];
}
