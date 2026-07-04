import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Review, BrandMetrics } from '../types';
import { 
  ArrowLeft, Star, MessageSquare, Flame, CheckCircle2, AlertTriangle, 
  Lightbulb, ShieldCheck, Share2, Filter, ThumbsUp, ChevronRight, Globe, TrendingUp,
  Lock, Check, Sparkles, X, Crown
} from 'lucide-react';

interface ResultsProps {
  brandName: string;
  metrics: BrandMetrics;
  reviews: Review[];
  onReset: () => void;
  initialMonitoredSites?: number;
  initialIsUpgraded?: boolean;
}

export default function Results({ 
  brandName, 
  metrics, 
  reviews, 
  onReset,
  initialMonitoredSites = 5,
  initialIsUpgraded = false
}: ResultsProps) {
  // Monitored Sites configuration
  const [monitoredSites, setMonitoredSites] = useState<number>(initialMonitoredSites);
  const [previousSites, setPreviousSites] = useState<number>(initialMonitoredSites);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [selectedPaidSites, setSelectedPaidSites] = useState<number>(20);
  const [isUpgraded, setIsUpgraded] = useState<boolean>(initialIsUpgraded);

  // Filters state
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Platforms options
  const platforms = ['all', 'Google', 'Yelp', 'Trustpilot'];
  // Sentiment options
  const sentiments = ['all', 'positive', 'neutral', 'negative'];

  // Handle dropdown site limit selection changes
  const handleSitesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    if ([20, 40].includes(value) && !isUpgraded) {
      setSelectedPaidSites(value);
      setShowUpgradeModal(true);
      // Maintain previous select value temporarily until upgraded
      setMonitoredSites(previousSites);
    } else {
      setMonitoredSites(value);
      setPreviousSites(value);
    }
  };

  const handleUpgradeSuccess = () => {
    setIsUpgraded(true);
    setMonitoredSites(selectedPaidSites);
    setPreviousSites(selectedPaidSites);
    setShowUpgradeModal(false);
  };

  const handleCancelUpgrade = () => {
    setShowUpgradeModal(false);
    // Keep it on the previously selected free limit
    setMonitoredSites(previousSites);
  };

  // Adjust metrics based on monitored sites to simulate real system growth
  const siteMultiplier = monitoredSites === 5 ? 1.0 :
                         monitoredSites === 10 ? 1.8 :
                         monitoredSites === 20 ? 3.4 : 6.2;

  const displayTotalReviews = Math.round(metrics.totalReviews * siteMultiplier);
  const displayNPS = Math.min(100, Math.round(metrics.netPromoterScore * (1 + (siteMultiplier - 1) * 0.05)));

  // Filter logic
  const filteredReviews = reviews.filter((r) => {
    const matchesPlatform = selectedPlatform === 'all' || r.platform === selectedPlatform;
    const matchesSentiment = selectedSentiment === 'all' || r.sentiment === selectedSentiment;
    const matchesSearch = searchQuery === '' || 
      r.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSentiment && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] animate-fadeIn" id="results-view-wrapper">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BAR: back action and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center space-x-3.5 text-left">
            <button 
              onClick={onReset}
              className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full transition-all duration-200 shadow-sm"
              id="back-to-home-btn"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full">
                Scan Report Active
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5">
                {brandName} Analysis
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
              const text = `Check out the RevTrack report for ${brandName}!`;
                navigator.clipboard.writeText(window.location.href);
                alert('Analysis URL copied to clipboard! (Demo URL)');
              }}
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm flex items-center space-x-1.5 cursor-pointer"
              id="share-report-btn"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Report</span>
            </button>
            <button 
              onClick={onReset}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-lg shadow-blue-600/15 cursor-pointer"
              id="run-new-scan-btn"
            >
              Run New Scan
            </button>
          </div>
        </div>

        {/* MONITORED SITES CONTROLLER */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left shadow-sm" id="sites-monitoring-controller">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
              <Globe className="w-5 h-5 text-blue-600 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>Active Review Sites Monitored</span>
                {isUpgraded && (
                  <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Crown className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                    PRO MEMBER
                  </span>
                )}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Adjust the number of directories and channels scraped for {brandName}.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="monitored-sites-select" className="text-xs font-bold text-slate-600 shrink-0">
              Select Limit:
            </label>
            <div className="relative">
              <select
                id="monitored-sites-select"
                value={monitoredSites}
                onChange={handleSitesChange}
                className="bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer appearance-none transition-all shadow-sm"
              >
                <option value="5">5 Sites (Free Plan)</option>
                <option value="10">10 Sites (Free Plan)</option>
                <option value="20">20 Sites (Pro Plan) 💎</option>
                <option value="40">40 Sites (Pro Plan) 💎</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronRight className="w-4 h-4 transform rotate-90" />
              </div>
            </div>
          </div>
        </div>

        {/* METRICS SECTION: GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Average Rating */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xl shadow-blue-500/5 flex flex-col justify-between" id="metric-rating">
            <div className="flex items-center justify-between text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Rating</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                <Star className="w-4 h-4 fill-amber-500" />
              </div>
            </div>
            <div className="mt-4 text-left">
              <h3 className="text-3xl font-extrabold font-display text-slate-900">{metrics.averageRating}</h3>
              <p className="text-xs font-semibold text-slate-400 mt-1">
                Weighted cross-platform score
              </p>
            </div>
          </div>

          {/* Total Reviews Discovered */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xl shadow-blue-500/5 flex flex-col justify-between" id="metric-total">
            <div className="flex items-center justify-between text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reviews Audited</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4 text-left">
              <h3 className="text-3xl font-extrabold font-display text-slate-900">{displayTotalReviews}</h3>
              <p className="text-xs font-semibold text-slate-400 mt-1">
                Discovered across the web
              </p>
            </div>
          </div>

          {/* Net Promoter Score (NPS) */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xl shadow-blue-500/5 flex flex-col justify-between" id="metric-nps">
            <div className="flex items-center justify-between text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Promoter (NPS)</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4 text-left">
              <h3 className="text-3xl font-extrabold font-display text-slate-900">+{displayNPS}</h3>
              <p className="text-xs font-semibold text-green-600 mt-1 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                <span>Strong Brand Advocate Pool</span>
              </p>
            </div>
          </div>

          {/* Net Sentiment Breakdown */}
          <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xl shadow-blue-500/5 flex flex-col justify-between" id="metric-sentiment">
            <div className="flex items-center justify-between text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Sentiment</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            {/* Custom high-fidelity sentiment progress bar */}
            <div className="mt-4 text-left">
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>{metrics.sentimentDistribution.positive}% Pos</span>
                <span>{metrics.sentimentDistribution.negative}% Neg</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full" 
                  style={{ width: `${metrics.sentimentDistribution.positive}%` }}
                  title="Positive"
                ></div>
                <div 
                  className="bg-amber-400 h-full" 
                  style={{ width: `${metrics.sentimentDistribution.neutral}%` }}
                  title="Neutral"
                ></div>
                <div 
                  className="bg-red-500 h-full" 
                  style={{ width: `${metrics.sentimentDistribution.negative}%` }}
                  title="Negative"
                ></div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 mt-1">
                <span>Green = Pos</span>
                <span>Amber = Neu</span>
                <span>Red = Neg</span>
              </div>
            </div>
          </div>

        </div>

        {/* EXECUTIVE REPORT CARD: AI Summary & Insight lists */}
        <div className="bg-white border border-slate-100 rounded-xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 mb-8 text-left" id="executive-summary-card">
          <div className="flex items-center space-x-2 pb-4 border-b border-slate-100 mb-6">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="font-display text-lg font-bold text-slate-800">
              Executive Summary
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-600 leading-relaxed mb-8 bg-slate-50/50 p-5 rounded-xl border border-slate-100">
            {metrics.aiInsightSummary.executiveSummary}
          </p>

          {/* Strengths and Weaknesses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Strengths */}
            <div className="space-y-4" id="insights-strengths">
              <h3 className="font-display text-xs font-bold text-emerald-800 flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-lg w-max">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Primary Brand Strengths</span>
              </h3>
              <ul className="space-y-3">
                {metrics.aiInsightSummary.strengths.map((str, i) => (
                  <li key={i} className="flex items-start text-xs font-medium text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2.5 mt-1.5 shrink-0"></span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="space-y-4" id="insights-weaknesses">
              <h3 className="font-display text-xs font-bold text-red-800 flex items-center space-x-2 bg-red-50 px-3 py-1.5 rounded-lg w-max">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Primary Friction Points</span>
              </h3>
              <ul className="space-y-3">
                {metrics.aiInsightSummary.weaknesses.map((weak, i) => (
                  <li key={i} className="flex items-start text-xs font-medium text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2.5 mt-1.5 shrink-0"></span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Strategy recommendations */}
          <div className="pt-6 border-t border-slate-100" id="insights-recommendations">
            <h3 className="font-display text-xs font-bold text-blue-900 flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-lg w-max mb-4">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <span>Recommended Action Strategy</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics.aiInsightSummary.recommendations.map((rec, i) => (
                <div key={i} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TWO COLUMN GRID: Review feed vs Competitor benchmarking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          
          {/* COLUMN 1 & 2: Detailed Review feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-100 rounded-xl p-6 sm:p-8 shadow-xl shadow-blue-500/5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-blue-600" />
                  <h2 className="font-display text-lg font-bold text-slate-800">Discovered Feed</h2>
                </div>
                <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
                  Showing {filteredReviews.length} of {reviews.length} feed samples (indexing {monitoredSites} channels)
                </div>
              </div>

              {/* FILTER BAR: Platform, Sentiment, Search query */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {/* Search */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Search Feed</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search terms, authors..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>

                {/* Platform select */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Platform</label>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer text-slate-800"
                  >
                    {platforms.map((p) => (
                      <option key={p} value={p}>{p === 'all' ? 'All Networks' : p}</option>
                    ))}
                  </select>
                </div>

                {/* Sentiment select */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Sentiment</label>
                  <select
                    value={selectedSentiment}
                    onChange={(e) => setSelectedSentiment(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer text-slate-800"
                  >
                    {sentiments.map((s) => (
                      <option key={s} value={s}>{s === 'all' ? 'All Sentiments' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* REVIEWS GRID LIST */}
              {filteredReviews.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-sm font-semibold text-slate-400">No reviews match your current filter settings.</p>
                  <button 
                    onClick={() => { setSelectedPlatform('all'); setSelectedSentiment('all'); setSearchQuery(''); }}
                    className="mt-3 text-xs font-bold text-blue-600 hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredReviews.map((rev) => {
                    const sentimentBadgeColor = 
                      rev.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-700 border-emerald-100/50' :
                      rev.sentiment === 'neutral' ? 'bg-amber-50 text-amber-700 border-amber-100/50' :
                      'bg-red-50 text-red-700 border-red-100/50';

                    return (
                      <div 
                        key={rev.id} 
                        className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-200 flex flex-col justify-between"
                        id={`review-item-${rev.id}`}
                      >
                        <div>
                          {/* Header of card */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-display font-bold text-xs text-slate-600">
                                {rev.author.charAt(0)}
                              </div>
                              <div>
                                <span className="text-xs font-bold text-slate-800 block leading-tight">{rev.author}</span>
                                <span className="text-[10px] font-medium text-slate-400">{rev.date}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                              {rev.platform}
                            </span>
                          </div>

                          {/* Stars */}
                          <div className="flex items-center space-x-1.5 mb-3.5">
                            <div className="flex space-x-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-slate-200">|</span>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                              {rev.topic}
                            </span>
                          </div>

                          {/* Text Body */}
                          <p className="font-sans text-xs text-slate-600 leading-relaxed mb-4">
                            "{rev.content}"
                          </p>
                        </div>

                        {/* Footer details: AI confidence */}
                        <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                          <div className="flex items-center space-x-1.5">
                            <span className={`px-2 py-0.5 rounded-full border ${sentimentBadgeColor} uppercase font-bold text-[9px]`}>
                              {rev.sentiment}
                            </span>
                            <span>Score: {rev.sentimentScore}%</span>
                          </div>
                          <button 
                            onClick={() => alert('Feature disabled for demo report')}
                            className="text-blue-600 hover:underline flex items-center space-x-0.5"
                          >
                            <span>Reply to review</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 3: Competitor Tracking Table & Industry Insights */}
          <div className="space-y-6">
            
            {/* Competitor Compare Table Card */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xl shadow-blue-500/5">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-100 mb-4">
                <Globe className="w-4 h-4 text-indigo-600" />
                <h2 className="font-display text-sm font-bold text-slate-800">Competitor Compare</h2>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                See how {brandName} compares against top-indexed brands on major reputation metrics.
              </p>

              <div className="space-y-4">
                {/* Brand row (Primary) */}
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-blue-900">{brandName} (You)</span>
                    <span className="text-xs font-bold text-blue-600">{metrics.sentimentDistribution.positive}% Pos</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                    <span>★ {metrics.averageRating} Rating</span>
                    <span>{displayTotalReviews} Audits</span>
                  </div>
                </div>

                {/* Competitor rows */}
                {metrics.competitorCompare.map((comp, idx) => (
                  <div key={idx} className="border border-slate-100 p-4 rounded-xl hover:bg-slate-50/50 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-800">{comp.name}</span>
                      <span className="text-xs font-semibold text-slate-500">{comp.sentimentScore}% Pos</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                      <span>★ {comp.rating} Rating</span>
                      <span>{comp.reviewsCount} Audits</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Review Monitor Certificate */}
            <div className="bg-slate-900 border border-slate-800 text-white rounded-xl p-6 shadow-xl text-center">
              <div className="w-12 h-12 rounded-lg bg-white/10 text-white flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="font-display text-base font-bold mb-2">Reputation Audited</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                This brand reputation and customer sentiment profile is certified by the RevTrack indexing algorithm.
              </p>
              <div className="text-[10px] font-bold text-blue-300 tracking-wider uppercase bg-white/5 py-1.5 rounded-lg">
                Verified: {new Date().toLocaleDateString()}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* PREMIUM UPGRADE MODAL */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancelUpgrade}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden text-left z-10"
              id="premium-upgrade-modal-dialog"
            >
              {/* Background Accent glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>
              
              {/* Close Button */}
              <button 
                onClick={handleCancelUpgrade}
                className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                id="close-upgrade-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                  <Crown className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">Upgrade Required</span>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Unlock {selectedPaidSites} Monitored Sites</h3>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Monitored limits of <strong>20</strong>, <strong>40</strong>, and <strong>50</strong> sites are reserved for users on our premium subscriptions. Upgrade to unlock multi-channel scraping, auto-reply agents, and daily cron integrations.
              </p>

              {/* Perk list */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start space-x-3 text-xs">
                  <div className="bg-emerald-50 text-emerald-600 p-0.5 rounded-full mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">Deep Scrape & Synergy</span>
                    <span className="text-slate-500 text-[11px]">Track Google Maps, Yelp, Facebook, Glassdoor, and 30+ directories.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs">
                  <div className="bg-emerald-50 text-emerald-600 p-0.5 rounded-full mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">Autopilot AI Agent Replies</span>
                    <span className="text-slate-500 text-[11px]">Generates smart drafts and automatically publishes responses to save time.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs">
                  <div className="bg-emerald-50 text-emerald-600 p-0.5 rounded-full mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">Instant Slack/Email Alerts</span>
                    <span className="text-slate-500 text-[11px]">Receive push alerts within 3 minutes of a critical negative review.</span>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="space-y-3">
                <button
                  onClick={handleUpgradeSuccess}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/15 transition-all text-sm flex items-center justify-center space-x-2 cursor-pointer"
                  id="activate-trial-btn"
                >
                  <Sparkles className="w-4 h-4 text-blue-100" />
                  <span>Start 7-Day Free Trial</span>
                </button>
                <button
                  onClick={handleCancelUpgrade}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl transition-all text-sm cursor-pointer"
                  id="cancel-upgrade-btn"
                >
                  Keep Free Plan (10 Sites max)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
