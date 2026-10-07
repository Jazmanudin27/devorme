import React from 'react';

export default function HeroSlider({ heroBanner, onSelectProduct, onNavigateToArchitecture }) {
  return (
    <section className="banner-showcase-section" id="bannerShowcase" style={{ padding: '24px 0 40px' }}>
      <div className="container">
        <div className="banner-glass-wrapper">
          {/* Header Bar */}
          <div className="banner-header-bar">
            <div className="banner-mac-dots">
              <span className="dot-btn red"></span>
              <span className="dot-btn yellow"></span>
              <span className="dot-btn green"></span>
            </div>
            <div className="banner-title-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span>https://devorme.site • Enterprise Software Ecosystem</span>
            </div>
            <div className="banner-live-indicator">
              <span class="pulse-dot"></span> Live Prototype
            </div>
          </div>

          {/* Banner Image Frame */}
          <div className="banner-image-container">
            <img 
              src={heroBanner || '/Banner4.png?v=5.0'} 
              alt="Devorme - Platform Ekosistem Software Terpadu"
              className="banner-img-main"
            />
            <div className="banner-gradient-overlay"></div>

            {/* Floating Glass Badges */}
            <div className="banner-floating-badge badge-pos-1">
              <span>🌐</span> Multi-Subdomain System
            </div>
            <div className="banner-floating-badge badge-pos-2">
              <span>🛡️</span> Enterprise SSL & Auto-Backup
            </div>
            <div className="banner-floating-badge badge-pos-3">
              <span>📱</span> Mobile Android Ready (APK & PWA)
            </div>
            <div className="banner-floating-badge badge-pos-4">
              <span>⚡</span> Uptime SLA 99.98%
            </div>
          </div>

          {/* Banner Action Bar */}
          <div className="banner-footer-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
              <span style={{ fontSize: '1.5rem' }}>🚀</span>
              <div>
                <strong style={{ color: '#ffffff', fontSize: '1.05rem', display: 'block' }}>
                  Solusi Software Terintegrasi Multi-Domain
                </strong>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                  Bangun platform bisnis modern dengan domain mandiri & server database terpusat.
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#solusi-produk" className="btn btn-primary">
                <span>Jelajahi Portofolio</span>
              </a>
              <a 
                href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20konsultasi%20software"
                target="_blank"
                rel="noreferrer"
                className="btn btn-success"
              >
                <span>💬 Konsultasi Live WA</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
