import React, { useState } from 'react';

export default function Navbar({ currentView, setCurrentView, onNavigateToAdmin, onNavigateToPortfolio, onNavigateToServices, onBackToHome }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setMobileOpen(false);
    if (currentView !== 'home') {
      if (typeof onBackToHome === 'function') {
        onBackToHome();
      } else if (typeof setCurrentView === 'function') {
        setCurrentView('home');
      }
      setTimeout(() => {
        if (sectionId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 120);
    } else {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
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
          <div className="brand-wrapper" onClick={() => scrollToSection('top')}>
            <img 
              src="/ruang-tech.png" 
              alt="Ruang Tech Ecosystem Logo" 
              className="brand-logo-img" 
            />
            <div className="brand-text-block">
              <div className="brand-text brand-text-white">
                RUANG <span className="brand-highlight-cyan">TECH</span>
              </div>
              <span className="brand-subtitle brand-subtitle-light">ENTERPRISE SOFTWARE ECOSYSTEM</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="nav-links-list">
            <button 
              className={`nav-link-btn nav-link-colored ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('top')}
            >
              Beranda
            </button>
            <button 
              className="nav-link-btn nav-link-colored"
              onClick={() => scrollToSection('portofolio')}
            >
              Portofolio
            </button>
            <button 
              className="nav-link-btn nav-link-colored"
              onClick={() => scrollToSection('pelayanan')}
            >
              Pelayanan
            </button>
            <button 
              className="nav-link-btn nav-link-colored"
              onClick={() => scrollToSection('harga')}
            >
              Harga
            </button>
            <button 
              className="nav-link-btn nav-link-colored"
              onClick={() => scrollToSection('faq')}
            >
              FAQ
            </button>
            <button 
              className="nav-link-btn nav-link-colored"
              onClick={() => scrollToSection('arsitektur')}
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

            <a 
              href="https://wa.me/6281222332376?text=Halo%20Ruang%20Tech,%20saya%20ingin%20konsultasi%20software"
              target="_blank"
              rel="noreferrer"
              className="btn-nav-accent desktop-only-btn"
              style={{ background: '#16a34a', textDecoration: 'none' }}
            >
              💬 WA
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
                <img src="/ruang-tech.png" alt="Ruang Tech Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.2rem' }}>RUANG TECH</span>
              </div>
              <button className="mobile-drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            <div className="mobile-drawer-links">
              <button 
                className={`mobile-drawer-link ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => scrollToSection('top')}
              >
                🏠 Beranda
              </button>
              <button 
                className="mobile-drawer-link"
                onClick={() => scrollToSection('portofolio')}
              >
                🖼️ Portofolio
              </button>
              <button 
                className="mobile-drawer-link"
                onClick={() => scrollToSection('pelayanan')}
              >
                🛠️ Pelayanan
              </button>
              <button 
                className="mobile-drawer-link"
                onClick={() => scrollToSection('harga')}
              >
                💎 Paket Harga
              </button>
              <button 
                className="mobile-drawer-link"
                onClick={() => scrollToSection('faq')}
              >
                ❓ FAQ
              </button>
              <button 
                className="mobile-drawer-link"
                onClick={() => scrollToSection('arsitektur')}
              >
                🖥️ Arsitektur Server
              </button>
              <button 
                className="mobile-drawer-link"
                onClick={() => scrollToSection('kontak')}
              >
                📩 Kontak & Konsultasi
              </button>

              <a 
                href="https://wa.me/6281222332376?text=Halo%20Ruang%20Tech,%20saya%20tertarik%20konsultasi%20software"
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
