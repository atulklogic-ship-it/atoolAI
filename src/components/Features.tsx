import React from 'react';
import { Search, Brain, BarChart3, Globe, Shield, MessageSquareText } from 'lucide-react';

export default function Features() {
  const features = [
    {
      id: 'feat-1',
      title: 'Automated Review Detection',
      description: 'Automatically discovers reviews across multiple websites.',
      icon: Search,
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      badge: 'Real-time Discover'
    },
    {
      id: 'feat-2',
      title: 'Sentiment Analysis',
      description: 'Identifies positive, neutral and negative sentiment.',
      icon: Brain,
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      badge: 'Natural Language Processing'
    },
    {
      id: 'feat-3',
      title: 'Competitor Tracking',
      description: 'Compare your brand against competitors.',
      icon: BarChart3,
      bg: 'bg-sky-50',
      text: 'text-sky-600',
      badge: 'Market Intelligence'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white border-y border-slate-100 relative">
      <div className="absolute inset-0 bg-radial-gradient from-blue-50/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
            Powerful Platform Capabilities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 mb-4">
            Everything You Need to Guard Your Reputation
          </h2>
          <p className="font-sans text-base text-slate-500">
            RevTrack unifies comments, ratings, and social feedback from the entire web, synthesizing them into a clear plan to boost your customer happiness.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.id} 
                className="bg-white/50 p-6 rounded-xl border border-slate-100 flex flex-col gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
                id={`feature-card-${feature.id}`}
              >
                <div>
                  {/* Icon */}
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-2">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Feature Title & Description */}
                  <h3 className="font-display text-lg font-bold text-slate-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Simulated Link */}
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
                  <span>Learn more</span>
                  <span className="ml-1">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Trust Banner */}
        <div className="mt-16 bg-white border border-slate-100 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center space-x-4 text-left">
            <div className="w-10 h-10 bg-blue-50 rounded-lg text-blue-600 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-800 text-sm">Scan 100+ review hubs globally</h4>
              <p className="text-xs text-slate-500 mt-0.5">Google Maps, Yelp, Trustpilot, G2, AppStore, TripAdvisor, and more.</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-green-500" /> Fully GDPR Compliant</span>
            <span className="text-slate-200">|</span>
            <span className="flex items-center gap-1"><MessageSquareText className="w-4 h-4 text-blue-500" /> Webhook Actions</span>
          </div>
        </div>

      </div>
    </section>
  );
}
