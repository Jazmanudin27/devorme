import React from 'react';

export default function HeroSlider({ onSelectProduct }) {
  return (
    <section className="hero-slider-section hero-slider-fullwidth">
      {/* Edge-to-Edge Full Width Single Banner */}
      <div className="slider-outer-frame slider-frame-fullwidth">
        <div className="banner-image-container">
          <img 
            src="/Banner.png" 
            alt="Devorme - Platform Ekosistem Software Terpadu"
            className="banner-hero-full-img"
          />
        </div>

        {/* Quick Actions Bar */}
        <div className="banner-quick-actions-bar">
          <div className="banner-badge-live">
            <span className="live-pulse-dot"></span>
            <span>Portofolio Ekosistem Software Devorme • Database Terpusat</span>
          </div>
          <div className="banner-actions-btns">
            <a href="#solusi-produk" className="btn-slider-primary">
              Lihat Portofolio ▾
            </a>
            <a 
              href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20konsultasi%20dan%20melihat%20demo%20software"
              target="_blank"
              rel="noreferrer"
              className="btn-slider-glass"
            >
              💬 Konsultasi & Request Demo via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Highlight Metric Strip below Banner in Container */}
      <div className="container" style={{ marginTop: '24px' }}>
        <div className="slider-bottom-metrics">
          <div className="metric-item">
            <span className="metric-icon">🚀</span>
            <div>
              <strong>Multi-Domain Ecosystem</strong>
              <span>Subdomain mandiri untuk setiap produk institusi</span>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-icon">⚡</span>
            <div>
              <strong>Uptime Server 99.98%</strong>
              <span>Host VPS cepat & database MySQL terpusat</span>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-icon">📱</span>
            <div>
              <strong>Mobile Android Ready</strong>
              <span>Dukungan instalasi APK & Progressive Web App</span>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-icon">🛡️</span>
            <div>
              <strong>Keamanan Enterprise</strong>
              <span>Sertifikasi SSL aktif dan backup terstruktur</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
