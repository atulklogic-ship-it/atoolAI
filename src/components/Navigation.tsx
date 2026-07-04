import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight, Lock } from 'lucide-react';

interface NavigationProps {
  onNavigateHome: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Navigation({ onNavigateHome, onScrollToSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const menuItems = [
    { label: 'Features', id: 'features' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'About', id: 'about' },
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg('Successfully logged in! (Demo Mode)');
      setTimeout(() => {
        setShowLoginModal(false);
        setSuccessMsg('');
        setEmail('');
        setPassword('');
      }, 1500);
    }, 1200);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={onNavigateHome}
              id="nav-logo-container"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white transition-all duration-300">
                <div className="w-3.5 h-3.5 border-2 border-white rounded-sm transform rotate-45 transition-transform group-hover:rotate-[135deg] duration-500"></div>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-slate-800">
                RevTrack
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onScrollToSection(item.id)}
                  className="font-sans text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setShowLoginModal(true)}
                className="font-sans text-sm font-medium text-slate-800 hover:bg-slate-50 border border-slate-200 px-5 py-2 rounded-full transition-all duration-200 cursor-pointer"
                id="nav-login-btn"
              >
                Login
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
                id="mobile-menu-toggle"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 animate-fadeIn" id="mobile-menu-drawer">
            <div className="px-4 pt-2 pb-6 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onScrollToSection(item.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all duration-200"
                  id={`mobile-nav-link-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 text-center border border-slate-200 hover:bg-slate-50 text-slate-800 px-4 py-3 rounded-xl font-medium transition-all duration-200"
                  id="mobile-nav-login"
                >
                  <span>Login</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fadeIn" id="login-modal-overlay">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 relative animate-scaleIn" id="login-modal-content">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-colors"
              id="close-login-modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900">Welcome Back</h3>
              <p className="text-sm text-gray-500 mt-1">Access your brand tracking dashboard</p>
            </div>

            {successMsg ? (
              <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-center text-green-700 font-medium animate-fadeIn">
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm transition-all"
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-gray-500 pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" className="text-blue-600 hover:underline">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 mt-2 cursor-pointer flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 text-center text-xs text-gray-400">
              By logging in, you agree to RevTrack's{' '}
              <a href="#terms" className="underline hover:text-gray-600">Terms of Service</a>.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
