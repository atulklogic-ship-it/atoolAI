import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 'test-1',
      author: 'Marcus Aurelius',
      role: 'Head of Brand at Stoic Apparel',
      rating: 5,
      content: 'RevTrack discovered over 400 Google and Yelp reviews we had completely lost track of. The sentiment tracking helps us handle negatives before they grow into support issues.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 'test-2',
      author: 'Clara Oswald',
      role: 'Growth Lead at Space Saas',
      rating: 5,
      content: 'The competitor compare feature alone is worth 10x the monthly price. Being able to compare our NPS and review count against our three largest rivals gives us incredible leverage in pitch meetings.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 'test-3',
      author: 'Aria Sterling',
      role: 'Founder of FreshBites Bistro',
      rating: 5,
      content: 'As a restaurant founder, keeping up with Yelp reviews was exhausting. Now I just check RevTrack once a week to get a summary of our weekly strengths and complaints. Beautifully simple.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white border-t border-slate-100 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
            Customer Success Stories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 mb-4">
            Loved by Modern Reputation Managers
          </h2>
          <p className="font-sans text-base text-slate-500">
            See how teams of all sizes leverage RevTrack to keep customer satisfaction elevated and brand loyalty strong.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div 
              key={test.id} 
              className="bg-white/50 border border-slate-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between"
              id={`testimonial-card-${test.id}`}
            >
              {/* Quote Icon Background decoration */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-50/50 -z-0" />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex space-x-1 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="font-sans text-sm text-slate-600 italic leading-relaxed mb-8">
                  "{test.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3.5 relative z-10 pt-6 border-t border-slate-50">
                <img 
                  src={test.image} 
                  alt={test.author} 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-100 shrink-0" 
                />
                <div className="text-left">
                  <h4 className="font-display text-sm font-bold text-slate-800">
                    {test.author}
                  </h4>
                  <p className="font-sans text-xs text-slate-400">
                    {test.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Pricing Callout */}
        <div className="mt-16 bg-white border border-slate-200 rounded-xl p-8 sm:p-12 text-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl shadow-blue-500/5">
          <div className="text-left max-w-xl">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">Ready to track your brand?</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Get started with our basic scan today. Upgrade to daily active scraping, automated email alerts, and Slack/Discord integrations when you grow.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Starting at</span>
              <span className="text-2xl font-bold font-display text-slate-900">$29<span className="text-xs font-medium text-slate-400">/mo</span></span>
            </div>
            <a 
              href="#brand-scan-form"
              onClick={(e) => {
                e.preventDefault();
                const formElem = document.getElementById('brand-scan-form');
                if (formElem) {
                  formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md text-sm cursor-pointer"
            >
              Start Free Scan
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
