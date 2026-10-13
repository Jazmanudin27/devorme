import React from 'react';

export default function HeroSlider({ heroBanner }) {
  return (
    <section className="hero-slider-section hero-slider-fullwidth">
      {/* Edge-to-Edge Full Width Single Banner with Floating Overlay Buttons */}
      <div className="slider-outer-frame slider-frame-fullwidth">
        <div className="banner-image-container">
          <img 
            src={heroBanner || '/Ruang Tech.png'} 
            alt="Ruang Tech - Platform Ekosistem Software Terpadu"
            className="banner-hero-full-img"
          />
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
