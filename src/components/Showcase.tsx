import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Star, TrendingUp, ThumbsUp, MessageSquare } from 'lucide-react';

export default function Showcase() {
  const [activeTab, setActiveTab] = useState<'positive' | 'negative' | 'stats'>('positive');

  const handleLaunchScan = () => {
    const heroInput = document.getElementById('hero-brand-quick-input');
    if (heroInput) {
      heroInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      heroInput.focus();
    }
  };

  return (
    <section className="py-20 bg-slate-50/30 border-t border-b border-slate-100" id="reputation-showcase-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-5 text-left space-y-6">
            
            {/* Pill tag */}
            <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100/50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Reputation Growth (Sonic 2.0 Engine)</span>
            </div>

            {/* Main Display Heading */}
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Stop guessing your <span className="text-blue-600 block">reputation.</span>
            </h2>

            {/* Paragraph Text */}
            <p className="font-sans text-sm text-slate-500 leading-relaxed">
              Instantly track every customer review across Google, Yelp, and Trustpilot. RevTrack acts as your ultimate brand vanguard, analyzing sentiment trends, compiling growth insights, and tracking competitors to optimize your business score.
            </p>

            {/* Actions Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleLaunchScan}
                className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg cursor-pointer"
              >
                <span>Launch Live Scan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    handleLaunchScan();
                  }
                }}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Explore Pro Features &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: Mock Dashboard Visual & Interactive State */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden" id="interactive-preview-dashboard">
              
              {/* Browser Header Mac dots */}
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">app.revtrack.co/dashboard</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-200/50 px-2 py-0.5 rounded-full">
                  System Live Code
                </span>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-6 text-left">
                
                {/* Micro Metric Blocks */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Reviews Boost</span>
                    <span className="text-base sm:text-lg font-extrabold text-emerald-600 mt-1 block">+84%</span>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Audits Run</span>
                    <span className="text-base sm:text-lg font-extrabold text-slate-800 mt-1 block">3.2k</span>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Health Level</span>
                    <span className="text-base sm:text-lg font-extrabold text-blue-600 mt-1 block">Optimal</span>
                  </div>
                </div>

                {/* Simulated Tabs */}
                <div className="flex border-b border-slate-100 pb-px gap-2">
                  <button
                    onClick={() => setActiveTab('positive')}
                    className={`pb-2 px-1 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                      activeTab === 'positive' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Positive Scraped
                  </button>
                  <button
                    onClick={() => setActiveTab('negative')}
                    className={`pb-2 px-1 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                      activeTab === 'negative' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Action Needed
                  </button>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`pb-2 px-1 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                      activeTab === 'stats' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Growth Metrics
                  </button>
                </div>

                {/* Live Sandbox Display */}
                <div className="min-h-[160px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {activeTab === 'positive' && (
                      <motion.div
                        key="pos"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                              SJ
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-800 block">Sarah Jenkins 1st</span>
                              <span className="text-[10px] text-slate-400 font-medium">Founder @ NexusGrowth • Google Local Guide</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-blue-600 bg-blue-50/50 p-2 rounded-lg inline-block">
                          🚀 Brand response rate has changed our business forever.
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans">
                          "Yesterday, a customer told me they chose us solely because of our swift Google review response. RevTrack keeps us so sharp with zero effort. Total game-changer."
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-slate-400 font-medium">
                          <span>114 words</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                            <ThumbsUp className="w-3 h-3" /> Sentiment positive (98%)
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'negative' && (
                      <motion.div
                        key="neg"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                              DK
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-800 block">David K.</span>
                              <span className="text-[10px] text-slate-400 font-medium">Verified Customer • Yelp</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(2)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                            {[...Array(3)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-slate-200" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-red-600 bg-red-50 p-2 rounded-lg inline-block">
                          ⚠️ Action Recommended: Slow delivery reported
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans">
                          "The food arrived after 45 minutes and was cold. Really disappointed by the service tonight."
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                            <span className="text-red-500 font-semibold flex items-center gap-0.5">
                              Sentiment critical (15%)
                            </span>
                          </div>
                          <button
                            onClick={() => alert("Simulated: AI response draft created with perfect apology and customer coupon.")}
                            className="text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-md transition-colors"
                          >
                            Draft Apology Auto-Reply
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'stats' && (
                      <motion.div
                        key="stats"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-4"
                      >
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                              <span>Customer Advocacy Score</span>
                              <span className="text-emerald-600">89%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '89%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                              <span>Response Sla Speed</span>
                              <span className="text-blue-600">95% (Within 2 Hours)</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-blue-500 h-full rounded-full" style={{ width: '95%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                              <span>Platform Synergy</span>
                              <span className="text-indigo-600">Optimal (All channels matched)</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5 text-[10px] font-semibold text-slate-400 pt-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Stats automatically verified across Google, Yelp, and Trustpilot.</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
