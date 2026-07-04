import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Showcase from './components/Showcase';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Results from './components/Results';
import ScanConfig from './components/ScanConfig';
import { generateMockData } from './utils/generator';
import { BrandMetrics, Review } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<'/' | '/config' | '/results'>('/');
  const [brandName, setBrandName] = useState<string>('');
  const [metrics, setMetrics] = useState<BrandMetrics | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [configuredSitesCount, setConfiguredSitesCount] = useState<number>(5);
  const [isPro, setIsPro] = useState<boolean>(false);

  // Synchronize browser history / URL paths for high-end SPA feeling
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === '/results' && brandName) {
        setCurrentPath('/results');
      } else if (path === '/config' && brandName) {
        setCurrentPath('/config');
      } else {
        setCurrentPath('/');
      }
    };

    // Initial check
    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [brandName]);

  const navigateTo = (path: '/' | '/config' | '/results') => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScanStart = (name: string) => {
    setBrandName(name);
    navigateTo('/config');
  };

  const handleScanComplete = (name: string, selectedSitesCount: number, upgradedStatus: boolean) => {
    const { metrics: generatedMetrics, reviews: generatedReviews } = generateMockData(name);
    setBrandName(name);
    setConfiguredSitesCount(selectedSitesCount);
    setIsPro(upgradedStatus);
    setMetrics(generatedMetrics);
    setReviews(generatedReviews);
    navigateTo('/results');
  };

  const handleReset = () => {
    setBrandName('');
    setMetrics(null);
    setReviews(null);
    setConfiguredSitesCount(5);
    setIsPro(false);
    navigateTo('/');
  };

  const handleScrollToSection = (id: string) => {
    if (currentPath !== '/') {
      navigateTo('/');
      // Delay slightly to allow component rendering before scroll
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-500/20 selection:text-blue-900 antialiased">
      {/* Dynamic Navigation */}
      <Navigation 
        onNavigateHome={handleReset} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Main Content Router */}
      <main>
        {currentPath === '/' && (
          <>
            {/* Landing Page Content */}
            <Hero onScanStart={handleScanStart} />
            <Features />
            <HowItWorks />
            <Showcase />
            <Testimonials />
          </>
        )}

        {currentPath === '/config' && (
          <ScanConfig 
            initialBrandName={brandName}
            onScanComplete={handleScanComplete}
            onBack={handleReset}
          />
        )}

        {currentPath === '/results' && metrics && reviews && (
          <Results 
            brandName={brandName} 
            metrics={metrics} 
            reviews={reviews} 
            onReset={handleReset} 
            initialMonitoredSites={configuredSitesCount}
            initialIsUpgraded={isPro}
          />
        )}
      </main>

      {/* Unified Footer */}
      <Footer />
    </div>
  );
}
