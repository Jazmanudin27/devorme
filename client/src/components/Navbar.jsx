import React from 'react';

export default function Navbar({ currentView, setCurrentView }) {
  return (
    <header className="site-header">
      <div className="container nav-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => setCurrentView('home')}>
          <svg className="logo-symbol" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#nav-grad-bright)"/>
            <path d="M9 16L15 22L23 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="nav-grad-bright" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4F46E5"/>
                <stop offset="1" stopColor="#0284C7"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="logo-text">Devorme<span className="logo-dot">.</span></span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <button 
            className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            Beranda
          </button>
          <a href="#products-section" className="nav-item">
            Produk & Subdomain
          </a>
          <a href="#services-section" className="nav-item">
            Layanan
          </a>
          <button 
            className={`nav-item ${currentView === 'architecture' ? 'active' : ''}`}
            onClick={() => setCurrentView('architecture')}
          >
            Arsitektur Server
          </button>
        </nav>

        {/* Right Action: Admin Portal Button */}
        <div className="nav-actions">
          {currentView === 'admin' ? (
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentView('home')}
            >
              ← Kembali ke Beranda
            </button>
          ) : (
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setCurrentView('admin')}
            >
              🔐 Portal Admin
            </button>
          )}

          <a 
            href="#products-section" 
            className="btn btn-primary btn-sm"
            onClick={() => {
              if (currentView !== 'home') setCurrentView('home');
            }}
          >
            Katalog Produk
          </a>
        </div>
      </div>
    </header>
  );
}
