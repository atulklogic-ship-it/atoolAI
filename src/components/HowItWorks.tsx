import React from 'react';
import { Search, BrainCircuit, LineChart, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Submit Brand Name',
      desc: 'Type your company name into our scanner and watch it calibrate to your industry.',
      icon: Search,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      num: '02',
      title: 'Scrape & Sift',
      desc: 'Our engine maps active profiles across search engines, review vaults, and social pages.',
      icon: BrainCircuit,
      color: 'from-blue-600 to-cyan-500'
    },
    {
      num: '03',
      title: 'Analyze Insights',
      desc: 'Unlock clear strength indices, competitor benchmarks, and tailored feedback summaries.',
      icon: LineChart,
      color: 'from-indigo-600 to-blue-600'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
            Simple 3-Step Setup
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 mb-4">
            How RevTrack Works
          </h2>
          <p className="font-sans text-base text-slate-500">
            No API configurations or complex developer keys required. Our platform runs securely in the cloud to discover reviews with one search.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/3 left-[15%] right-[15%] h-px bg-slate-100 -z-10"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex flex-col items-center group relative">
                {/* Geometric Number Badge */}
                <div className="w-14 h-14 rounded-xl border border-slate-200 bg-white text-slate-800 flex items-center justify-center font-display font-bold text-lg shadow-sm group-hover:border-blue-500 transition-all duration-300 relative">
                  <Icon className="w-5 h-5 absolute -top-1 -right-1 bg-blue-50 text-blue-600 p-1 rounded-md border border-slate-200" />
                  <span>{step.num}</span>
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-bold text-slate-800 mt-6 mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-slate-500 leading-relaxed max-w-xs">
                  {step.desc}
                </p>

                {/* Tiny Connector Chevron for Mobile */}
                {idx < 2 && (
                  <div className="md:hidden mt-6 text-slate-300">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
