import React, { useState } from 'react';
import { Sparkles, Twitter, Github, Linkedin, HelpCircle, Mail, Globe, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 text-left">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <div className="w-3.5 h-3.5 border-2 border-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="font-display text-lg font-bold text-slate-800">
                RevTrack
              </span>
            </div>
            <p className="font-sans text-xs text-slate-500 leading-relaxed mb-6">
              Empowering brands to listen, analyze, and react to reviews using advanced natural language algorithms. Protect your online reputation in real-time.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#twitter" className="text-slate-400 hover:text-blue-500 transition-colors duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="text-slate-400 hover:text-blue-700 transition-colors duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#github" className="text-slate-400 hover:text-slate-900 transition-colors duration-200">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links / Navigation */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Resources & Support
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#features" className="text-slate-500 hover:text-blue-600 transition-colors duration-200">
                  Product Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-500 hover:text-blue-600 transition-colors duration-200">
                  SaaS Pricing
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-500 hover:text-blue-600 transition-colors duration-200">
                  How It Works
                </a>
              </li>
              <li className="flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href="#contact" className="text-slate-500 hover:text-blue-600 transition-colors duration-200">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#privacy" className="text-slate-500 hover:text-blue-600 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-slate-500 hover:text-blue-600 transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#gdpr" className="text-slate-500 hover:text-blue-600 transition-colors duration-200">
                  GDPR & Cookie Policy
                </a>
              </li>
              <li className="flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <a href="#faq" className="text-slate-500 hover:text-blue-600 transition-colors duration-200">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Reputation Weekly
            </h4>
            <p className="font-sans text-xs text-slate-500 leading-relaxed mb-4">
              Get the latest customer care guides and reputation strategies directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  disabled={subscribed}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 text-xs rounded-xl transition-all"
                />
                {subscribed && (
                  <span className="absolute right-3 top-3 text-green-500">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-all duration-200 text-xs shadow-sm cursor-pointer disabled:bg-green-600"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Globe className="w-4 h-4 text-slate-300" />
            <span>English (US)</span>
            <span className="text-slate-200">|</span>
            <span>Cloud Ingress</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} RevTrack. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
