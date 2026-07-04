import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Shield, Sparkles, ArrowRight, Lock, Check, X, Crown, 
  HelpCircle, ChevronDown, CheckCircle, Loader2 
} from 'lucide-react';

interface ScanConfigProps {
  initialBrandName: string;
  onScanComplete: (brandName: string, selectedSitesCount: number, isPro: boolean) => void;
  onBack: () => void;
}

export default function ScanConfig({ initialBrandName, onScanComplete, onBack }: ScanConfigProps) {
  const [brandName, setBrandName] = useState(initialBrandName);
  const [error, setError] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [sitesCount, setSitesCount] = useState<number>(5);
  const [previousSitesCount, setPreviousSitesCount] = useState<number>(5);
  
  // Premium and subscription upgrade states
  const [isUpgraded, setIsUpgraded] = useState<boolean>(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [pendingSitesSelection, setPendingSitesSelection] = useState<number>(20);

  // Scanning progress states
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState(0);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scanStatuses = [
    'Initializing RevTrack engine...',
    'Establishing secure connection with review hubs...',
    'Scraping Google Maps & Local Business registers...',
    'Indexing Yelp reviews and customer comments...',
    'Retrieving Trustpilot ratings and verified tags...',
    'Aggregating sentiment profiles and keyword density...',
    'Generating real-time executive brand report...'
  ];

  useEffect(() => {
    if (isScanning) {
      setScanStep(0);
      scanIntervalRef.current = setInterval(() => {
        setScanStep((prev) => {
          if (prev < scanStatuses.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 500);
    } else {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
      setScanStep(0);
    }

    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, [isScanning]);

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

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBrandName(val);
    if (isTouched) {
      setError(validateValue(val));
    }
  };

  const handleSitesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    if ([20, 40].includes(value) && !isUpgraded) {
      setPendingSitesSelection(value);
      setShowUpgradeModal(true);
      // Temporarily revert select to previous free state
      setSitesCount(previousSitesCount);
    } else {
      setSitesCount(value);
      setPreviousSitesCount(value);
    }
  };

  const handleUpgradeSuccess = () => {
    setIsUpgraded(true);
    setSitesCount(pendingSitesSelection);
    setPreviousSitesCount(pendingSitesSelection);
    setShowUpgradeModal(false);
  };

  const handleCancelUpgrade = () => {
    setShowUpgradeModal(false);
    setSitesCount(previousSitesCount);
  };

  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);

    const valErr = validateValue(brandName);
    if (valErr) {
      setError(valErr);
      return;
    }

    // Fire webhook POST request with parameters as requested
    fetch('https://atoolai.app.n8n.cloud/webhook-test/ca6e7625-8778-4b5f-90d3-23d5e752f89c', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        brandName: brandName.trim(),
        sitesCount: sitesCount,
        isUpgraded: isUpgraded,
        timestamp: new Date().toISOString()
      }),
    }).catch((err) => {
      console.error('Failed to report scan launch to webhook:', err);
    });

    setIsScanning(true);

    // Simulate 3.5s real-time scraping before final transition
    setTimeout(() => {
      setIsScanning(false);
      onScanComplete(brandName.trim(), sitesCount, isUpgraded);
    }, 3500);
  };

  return (
    <div className="min-h-[85vh] py-16 px-4 bg-slate-50/50 flex items-center justify-center bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px]" id="scan-config-page">
      <div className="w-full max-w-xl">
        
        {/* Top brand header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100/60 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>Setup Scan Parameters</span>
          </span>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 tracking-tight">
            Configure Your Live Monitor
          </h1>
          <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
            Specify your brand and select the total review websites you want to crawl and index.
          </p>
        </div>

        {/* Configuration Card Container */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden" id="config-panel">
          {/* Subtle decoration lines */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500"></div>

          <AnimatePresence mode="wait">
            {!isScanning ? (
              <motion.form 
                key="config-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleStartAnalysis} 
                className="space-y-6"
              >
                {/* Brand Name Input Field */}
                <div className="text-left">
                  <label 
                    htmlFor="config-brand-input" 
                    className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-0.5 mb-2"
                  >
                    Target Brand Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="config-brand-input"
                      value={brandName}
                      onChange={handleBrandChange}
                      onBlur={() => setIsTouched(true)}
                      placeholder="e.g. Nike, Starbucks, local bakery"
                      className={`w-full px-5 py-3.5 border ${
                        error ? 'border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-slate-200 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500'
                      } rounded-xl outline-none text-slate-800 placeholder-slate-400 font-medium text-base transition-all`}
                    />
                    
                    {!error && brandName.trim().length >= 2 && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>

                  {error && (
                    <p className="mt-1.5 text-xs text-red-600 font-semibold flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2"></span>
                      {error}
                    </p>
                  )}
                </div>

                {/* Number of Websites Select Dropdown */}
                <div className="text-left">
                  <div className="flex justify-between items-center mb-2">
                    <label 
                      htmlFor="config-sites-select" 
                      className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-0.5"
                    >
                      Websites to be Monitored
                    </label>
                    {isUpgraded && (
                      <span className="bg-amber-50 text-amber-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-amber-100">
                        <Crown className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                        PRO PLAN UNLOCKED
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <select
                      id="config-sites-select"
                      value={sitesCount}
                      onChange={handleSitesChange}
                      className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl pl-5 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer appearance-none transition-all shadow-sm"
                    >
                      <option value="5">5 Sites (Free Plan)</option>
                      <option value="10">10 Sites (Free Plan)</option>
                      <option value="20">20 Sites (Pro Plan) — Premium 💎</option>
                      <option value="40">40 Sites (Pro Plan) — Premium 💎</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-normal">
                    Free plans scan standard Google & Yelp. Pro reviews unlock indexation of Trustpilot, Facebook Pages, Glassdoor, and specific niche aggregators.
                  </p>
                </div>

                {/* Feature highlights of the selected tier */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-left">
                  <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-500" />
                    <span>Scan Inclusions & SLA</span>
                  </h4>
                  <ul className="space-y-1.5 text-slate-500 text-[11px]">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span>Scrapes up to <strong className="text-slate-700">{sitesCount} different websites</strong> & indexes comments</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span>Computes general Average Rating & Net Sentiment Index</span>
                    </li>
                    {sitesCount >= 20 ? (
                      <li className="flex items-center gap-1.5 text-blue-600 font-semibold">
                        <Sparkles className="w-3 h-3 text-blue-500 shrink-0" />
                        <span>Includes automated Response Draft Autopilot and real-time alerts</span>
                      </li>
                    ) : (
                      <li className="flex items-center gap-1.5 text-slate-400">
                        <Lock className="w-3 h-3 shrink-0" />
                        <span>AI Response Autopilot, Slack, and Email alerts (Pro only)</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA Action Row */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onBack}
                    className="w-1/3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold py-3.5 rounded-xl transition-all text-xs cursor-pointer"
                  >
                    Back to Home
                  </button>
                  <button
                    type="submit"
                    disabled={brandName.trim().length < 2}
                    className="w-2/3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 transition-all text-xs flex items-center justify-center space-x-2 cursor-pointer"
                    id="trigger-live-audit-btn"
                  >
                    <span>Launch Free Live Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            ) : (
              /* REAL-TIME PROGRESS LOADER SCREEN */
              <motion.div
                key="scanning-loader"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="py-6 text-center space-y-6"
              >
                {/* Spinner Ring and Active Badge */}
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-blue-50 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                  <Globe className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>

                {/* Progress Logs */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
                    SCANNING IN PROGRESS
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-800 font-display">
                    Scraping reviews for "{brandName}"
                  </h3>
                  
                  {/* Status Indicator text block */}
                  <div className="h-10 flex items-center justify-center px-4">
                    <p className="text-xs font-medium text-slate-500 animate-pulse">
                      {scanStatuses[scanStep]}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-sm mx-auto bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((scanStep + 1) / scanStatuses.length) * 100}%` }}
                  ></div>
                </div>

                {/* Secure certificate reassurance */}
                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  <span>Secure read-only directory crawlers running via proxy.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* DETAILED PREMIUM TRIAL / UPGRADE MODAL */}
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
              id="premium-upgrade-modal-config"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>
              
              <button 
                onClick={handleCancelUpgrade}
                className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                  <Crown className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">Upgrade Required</span>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Unlock {pendingSitesSelection} Monitored Sites</h3>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Crawl limits of <strong>20</strong> and <strong>40</strong> are reserved for premium subscribers. Activate a free test trial to crawl Yelp, Trustpilot, Glassdoor, and other high-authority channels immediately.
              </p>

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
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleUpgradeSuccess}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/15 transition-all text-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-blue-100" />
                  <span>Start 7-Day Free Trial</span>
                </button>
                <button
                  onClick={handleCancelUpgrade}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl transition-all text-sm cursor-pointer"
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
