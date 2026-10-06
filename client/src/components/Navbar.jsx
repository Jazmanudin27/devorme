import React from 'react';

export default function Navbar({ currentView, setCurrentView }) {
  return (
    <>
      {/* Top Announcement Strip (Deep Dark Navy) */}
      <div className="top-bar-navy">
        <div className="container top-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }}></span>
            <span>Butuh bantuan atau konsultasi arsitektur software?</span>
          </div>
          <div className="top-contacts">
            <span>📞 (021)-2056-9264</span>
            <span className="phone-cyan">📱 0812-2233-2376</span>
            <a href="mailto:info@devorme.site">✉️ info@devorme.site</a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header (Berwarna: Gradient Royal Navy & Electric Blue) */}
      <header className="main-nav-bar main-nav-colored">
        <div className="container nav-container">
          {/* Brand Logo with Logo.png */}
          <div className="brand-wrapper" onClick={() => setCurrentView('home')}>
            <img 
              src="/Logo.png" 
              alt="Devorme Ecosystem Logo" 
              className="brand-logo-img" 
            />
            <div className="brand-text-block">
              <div className="brand-text brand-text-white">
                DEVOR<span className="brand-highlight-cyan">ME</span>
              </div>
              <span className="brand-subtitle brand-subtitle-light">ENTERPRISE SOFTWARE ECOSYSTEM</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="nav-links-list">
            <button 
              className={`nav-link-btn nav-link-colored ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              Beranda
            </button>
            <a href="#solusi-produk" className="nav-link-btn nav-link-colored">
              Portofolio Produk
            </a>
            <a href="#tentang-kami" className="nav-link-btn nav-link-colored">
              Tentang Kami
            </a>
            <button 
              className={`nav-link-btn nav-link-colored ${currentView === 'architecture' ? 'active' : ''}`}
              onClick={() => setCurrentView('architecture')}
            >
              Arsitektur Server
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="nav-actions-group">
            {currentView === 'admin' ? (
              <button 
                className="btn-nav-glass"
                onClick={() => setCurrentView('home')}
              >
                ← Ke Beranda
              </button>
            ) : (
              <button 
                className="btn-nav-glass"
                onClick={() => setCurrentView('admin')}
              >
                🔐 Portal Admin
              </button>
            )}

            <a href="#kontak" className="btn-nav-accent">
              Kontak Kami
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
