import React, { useState } from 'react';

export default function Navbar({ currentView, setCurrentView, onNavigateToAdmin, onNavigateToPortfolio, onBackToHome }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (action) => {
    setMobileOpen(false);
    if (typeof action === 'function') {
      action();
    }
  };

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
          <div className="brand-wrapper" onClick={() => handleNavClick(onBackToHome)}>
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

          {/* Desktop Nav Links */}
          <nav className="nav-links-list">
            <button 
              className={`nav-link-btn nav-link-colored ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick(onBackToHome)}
            >
              Beranda
            </button>
            <button 
              className={`nav-link-btn nav-link-colored ${currentView === 'portfolio' ? 'active' : ''}`}
              onClick={() => handleNavClick(onNavigateToPortfolio)}
            >
              Portofolio
            </button>
            <a href="#layanan" className="nav-link-btn nav-link-colored">
              Layanan
            </a>
            <a href="#harga" className="nav-link-btn nav-link-colored">
              Harga
            </a>
            <a href="#faq" className="nav-link-btn nav-link-colored">
              FAQ
            </a>
            <button 
              className={`nav-link-btn nav-link-colored ${currentView === 'architecture' ? 'active' : ''}`}
              onClick={() => setCurrentView('architecture')}
            >
              Arsitektur
            </button>

          </nav>

          {/* Right Action Buttons & Mobile Hamburger Toggle */}
          <div className="nav-actions-group">
            {currentView === 'admin' && (
              <button 
                className="btn-nav-glass"
                onClick={() => setCurrentView('home')}
              >
                ← Ke Beranda
              </button>
            )}

            <a href="#kontak" className="btn-nav-accent desktop-only-btn">
              Kontak Kami
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button 
              className="mobile-hamburger-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileOpen(false)}>
          <div className="mobile-nav-drawer" onClick={e => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/Logo.png" alt="Devorme Logo" style={{ width: '32px', height: '32px' }} />
                <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.2rem' }}>DEVORME</span>
              </div>
              <button className="mobile-drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            <div className="mobile-drawer-links">
              <button 
                className={`mobile-drawer-link ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick(() => setCurrentView('home'))}
              >
                🏠 Beranda
              </button>
              <button 
                className={`mobile-drawer-link ${currentView === 'portfolio' ? 'active' : ''}`}
                onClick={() => handleNavClick(onNavigateToPortfolio)}
              >
                🖼️ Galeri Portofolio
              </button>
              <a 
                href="#layanan" 
                className="mobile-drawer-link"
                onClick={() => setMobileOpen(false)}
              >
                ⚙️ Layanan Software
              </a>
              <a 
                href="#harga" 
                className="mobile-drawer-link"
                onClick={() => setMobileOpen(false)}
              >
                💎 Paket Harga & Lisensi
              </a>
              <a 
                href="#faq" 
                className="mobile-drawer-link"
                onClick={() => setMobileOpen(false)}
              >
                ❓ FAQ
              </a>
              <a 
                href="#kontak" 
                className="mobile-drawer-link"
                onClick={() => setMobileOpen(false)}
              >
                📩 Minta Demo / Konsultasi
              </a>
              <button 
                className={`mobile-drawer-link ${currentView === 'architecture' ? 'active' : ''}`}
                onClick={() => handleNavClick(() => setCurrentView('architecture'))}
              >
                🖥️ Arsitektur Server VPS
              </button>

              <a 
                href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20konsultasi%20software"
                target="_blank"
                rel="noreferrer"
                className="btn-blue"
                style={{ marginTop: '16px', padding: '14px', width: '100%', justifyContent: 'center', borderRadius: '12px' }}
                onClick={() => setMobileOpen(false)}
              >
                💬 Konsultasi via WA
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
