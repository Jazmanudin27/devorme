import React from 'react';

export default function Navbar({ currentView, setCurrentView }) {
  return (
    <header className="site-header">
      <div className="container nav-container">
        <div className="brand-logo" onClick={() => setCurrentView('home')}>
          <svg className="logo-symbol" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#nav-grad)"/>
            <path d="M9 16L15 22L23 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="nav-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1"/>
                <stop offset="1" stopColor="#06B6D4"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="logo-text">Devorme<span style={{ color: '#06b6d4' }}>.</span></span>
        </div>

        <nav className="nav-menu">
          <button 
            className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            Beranda Induk
          </button>
          <button 
            className={`nav-item ${currentView === 'architecture' ? 'active' : ''}`}
            onClick={() => setCurrentView('architecture')}
          >
            Arsitektur Server
          </button>
        </nav>

        <div>
          <button 
            className="btn btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            onClick={() => setCurrentView('product-flowdesk')}
          >
            Tes Domain Produk
          </button>
        </div>
      </div>
    </header>
  );
}
