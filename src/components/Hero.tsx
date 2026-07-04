import React, { useState } from 'react';
import { Search, Sparkles, Shield, Globe, Award, Star } from 'lucide-react';

interface HeroProps {
  onScanStart: (brandName: string) => void;
}

export default function Hero({ onScanStart }: HeroProps) {
  // Sync states between Hero quick-input and Detailed form
  const [brandName, setBrandName] = useState('');
  const [error, setError] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  // Validation function
  const validateValue = (val: string): string => {
    const trimmed = val.trim();
    if (val.length > 0 && !trimmed) {
      return 'Brand Name cannot consist of only spaces.';
    }
    if (trimmed.length === 0) {
      return 'Brand Name is required.';
    }
    if (trimmed.length < 2) {
      return 'Brand name must be at least 2 characters long.';
    }
    if (trimmed.length > 100) {
      return 'Brand name cannot exceed 100 characters.';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBrandName(val);
    if (isTouched) {
      setError(validateValue(val));
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    setError(validateValue(brandName));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);
    
    const validationError = validateValue(brandName);
    if (validationError) {
      setError(validationError);
      return;
    }

    const finalBrand = brandName.trim();
    onScanStart(finalBrand);
  };

  // Quick action from hero button: syncs and focuses/submits
  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);
    const valErr = validateValue(brandName);
    if (valErr) {
      setError(valErr);
      // Scroll to main form if error
      const formElem = document.getElementById('brand-scan-form');
      if (formElem) {
        formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    handleSubmit(e);
  };

  // Check if button should be disabled (needs at least 2 characters)
  const isButtonDisabled = brandName.trim().length < 2;

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-white overflow-hidden flex flex-col items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
      {/* Radiant Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {/* Sparkle Tagline */}
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-slate-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-sm animate-fadeIn">
          <Sparkles className="w-4 h-4 text-blue-500 animate-spin-slow" />
          <span>Discover Your Customer Voice in Real-Time</span>
        </div>

        {/* Hero Heading */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight max-w-3xl">
          Monitor Your Brand Reviews in <span className="text-blue-600 relative inline-block">Real-Time</span>
        </h1>

        {/* HERO QUICK FORM: large centered input & button */}
        <div className="w-full max-w-2xl mb-14" id="hero-quick-container">
          <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-3 bg-white p-2.5 rounded-2xl sm:rounded-full border border-slate-200 shadow-xl shadow-blue-500/5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
            <div className="flex-1 flex items-center px-4 py-1 text-left">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                value={brandName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your Brand Name"
                className="w-full bg-transparent border-0 p-0 text-slate-900 placeholder-slate-400 focus:outline-none text-base disabled:opacity-50"
                id="hero-brand-quick-input"
              />
            </div>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 sm:py-3 rounded-xl sm:rounded-full font-bold transition-all duration-200 shadow-lg shadow-blue-600/15 cursor-pointer disabled:opacity-50 shrink-0 text-base flex items-center justify-center space-x-2"
              id="hero-start-monitoring-btn"
            >
              <span>Start Free Scan</span>
            </button>
          </form>

          {/* Inline Validation Error Message */}
          {error && (
            <p className="mt-3 text-sm text-red-600 font-medium flex items-center justify-center animate-slideUp" id="brand-name-error">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 shrink-0"></span>
              {error}
            </p>
          )}

          {/* Guarantee Badges */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span>Real-time analysis ready</span>
          </div>
        </div>

        {/* Realtime Scan Ticker for Social Proof */}
        <div className="mt-4 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-medium text-slate-400">
          <span>Trusted by modern managers:</span>
          <div className="flex items-center space-x-1.5">
            <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
            <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
            <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
            <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
            <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
            <span className="text-slate-600 font-semibold ml-1">4.9/5 Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
