import React from 'react';

export default function HeroSlider({ heroBanner }) {
  return (
    <section className="hero-slider-section hero-slider-fullwidth">
      {/* Edge-to-Edge Full Width Single Banner with Floating Overlay Buttons */}
      <div className="slider-outer-frame slider-frame-fullwidth">
        <div className="banner-image-container">
          <img 
            src={heroBanner || '/Banner.png'} 
            alt="Devorme - Platform Ekosistem Software Terpadu"
            className="banner-hero-full-img"
          />


          {/* Floating Actions Overlay directly on Banner (Right Bottom) */}
          <div className="banner-floating-actions-overlay">
            <a href="#solusi-produk" className="btn-hero-overlay btn-hero-portfolio">
              <span>Portofolio</span>
            </a>
            <a 
              href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20konsultasi%20software"
              target="_blank"
              rel="noreferrer"
              className="btn-hero-overlay btn-hero-whatsapp"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.518 0-10 4.482-10 10 0 1.764.461 3.42 1.267 4.869l-1.344 4.912 5.044-1.323c1.401.765 2.999 1.197 4.697 1.197 5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18.232c-1.545 0-2.989-.43-4.226-1.176l-.303-.182-2.99.784.798-2.916-.2-.319c-.818-1.299-1.26-2.812-1.26-4.423 0-4.542 3.693-8.235 8.235-8.235 4.543 0 8.235 3.693 8.235 8.235 0 4.542-3.692 8.235-8.235 8.235z"/>
              </svg>
              <span>Konsultasi</span>
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
