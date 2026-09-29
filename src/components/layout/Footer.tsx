import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top-grid">
          {/* Brand */}
          <div className="footer-brand-bio">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white p-0.5 border border-white/20 shadow-sm overflow-hidden shrink-0">
                <img 
                  src="/smriti-setu-emblem.png" 
                  alt="Smriti Setu" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-base font-bold text-white tracking-wide">
                SmritiSetu (स्मृतिसेतु)
              </span>
            </div>
            
            <p className="text-sm text-slate-500 leading-relaxed mt-2 max-w-sm">
              AI-powered digital heritage archive dedicated to Dr. B. R. Ambedkar. 
              Built for Smart India Hackathon 2026 (SIH26096).
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-col-title">Explore</div>
            <ul className="footer-links">
              <li><Link to="/archive">Document Archive</Link></li>
              <li><Link to="/chat">AI Q&A</Link></li>
              <li><Link to="/avatar">Dr. Ambedkar Avatar</Link></li>
              <li><Link to="/timeline">Life Timeline</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <div className="footer-col-title">Project</div>
            <ul className="footer-links">
              <li><Link to="/about">About & Architecture</Link></li>
              <li><Link to="/admin">Curator Portal</Link></li>
              <li><span className="text-sm text-slate-600">12 Indian Languages</span></li>
              <li><span className="text-sm text-slate-600">WCAG 2.2 AA Compliant</span></li>
            </ul>
          </div>

          {/* Provenance */}
          <div>
            <div className="footer-col-title">Integrity</div>
            <p className="text-sm text-slate-500 leading-relaxed">
              All answers are strictly grounded in verified historical documents with inline citations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <span>SIH 2026 • Ministry of Social Justice & Empowerment</span>
          <span>Open Heritage Archive • CC-BY-SA 4.0</span>
        </div>
      </div>
    </footer>
  );
};
