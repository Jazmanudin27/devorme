import React from 'react';

export default function Navbar({ currentView, setCurrentView }) {
  return (
    <>
      {/* Top Navy Announcement Strip (Leapfactor Style) */}
      <div className="top-bar-navy">
        <div className="container top-bar-inner">
          <div>
            <span>Butuh bantuan atau konsultasi software?</span>
          </div>
          <div className="top-contacts">
            <span>(021)-2056-9264</span>
            <span className="phone-gold">0812-2233-2376</span>
            <a href="mailto:info@devorme.site">info@devorme.site</a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="main-nav-bar">
        <div className="container nav-container">
          {/* Logo */}
          <div className="brand-wrapper" onClick={() => setCurrentView('home')}>
            <div className="brand-text">
              DEVOR<span className="brand-highlight">ME</span>
            </div>
            <span className="brand-subtitle">ENTERPRISE SOFTWARE ECOSYSTEM</span>
          </div>

          {/* Nav Links */}
          <nav className="nav-links-list">
            <button 
              className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              Beranda
            </button>
            <a href="#solusi-produk" className="nav-link-btn">
              Solusi Produk ▾
            </a>
            <a href="#tentang-kami" className="nav-link-btn">
              Tentang Kami
            </a>
            <button 
              className={`nav-link-btn ${currentView === 'architecture' ? 'active' : ''}`}
              onClick={() => setCurrentView('architecture')}
            >
              Arsitektur Server
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="nav-actions-group">
            {currentView === 'admin' ? (
              <button 
                className="btn-white-outline"
                onClick={() => setCurrentView('home')}
              >
                ← Ke Beranda
              </button>
            ) : (
              <button 
                className="btn-white-outline"
                onClick={() => setCurrentView('admin')}
              >
                🔐 Portal Admin
              </button>
            )}

            <a href="#kontak" className="btn-navy">
              Kontak Kami
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
