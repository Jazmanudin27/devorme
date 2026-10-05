import React, { useState, useEffect, useRef } from 'react';

export default function HeroSlider({ onSelectProduct, onNavigateToArchitecture }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const totalSlides = 3;

  // Auto-play timer (5.5 seconds per slide, pause on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section 
      className="hero-slider-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container">
        {/* Main Slider Frame */}
        <div className="slider-outer-frame">
          <div className="slider-viewport">
            <div 
              className="slider-track" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {/* =======================================================
                  SLIDE 1: Flagship Banner (Banner.png Full Slider)
                  ======================================================= */}
              <div className="slider-slide banner-slide">
                <div className="banner-image-container">
                  <img 
                    src="/Banner.png" 
                    alt="Devorme - Wujudkan Ide Anda dengan Mudah! Platform Ekosistem Software Terpadu"
                    className="full-slider-banner-img"
                  />
                  {/* Subtle Interactive Quick-CTA Strip over or under banner */}
                  <div className="banner-quick-actions-bar">
                    <div className="banner-badge-live">
                      <span className="live-pulse-dot"></span>
                      <span>Ekosistem Software Terpadu Devorme</span>
                    </div>
                    <div className="banner-actions-btns">
                      <a href="#solusi-produk" className="btn-slider-primary">
                        Jelajahi Produk Kami ▾
                      </a>
                      <a 
                        href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20konsultasi%20software"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-slider-glass"
                      >
                        💬 Konsultasi Sekarang
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* =======================================================
                  SLIDE 2: E-Sekolah Cloud Suite Highlight
                  ======================================================= */}
              <div className="slider-slide feature-slide slide-blue-gradient">
                <div className="slide-content-grid">
                  <div className="slide-text-col">
                    <div className="hero-pill-blue">
                      <span className="pill-check-icon">✓</span>
                      <span>Solusi Manajemen Sekolah & Yayasan</span>
                    </div>
                    <h2 className="slide-title">
                      E-Sekolah Cloud Platform: <span className="text-cyan-glow">Cerdas, Cepat & Terintegrasi</span>
                    </h2>
                    <p className="slide-desc">
                      Kelola presensi siswa & guru secara realtime, otomatisasi kenaikan kelas, rekap nilai rapor digital, dan jadwal pelajaran dalam satu aplikasi modern yang siap dipakai di web maupun smartphone Android.
                    </p>
                    <div className="slide-pills-row">
                      <span className="slide-tag">📱 Aplikasi Android (.apk)</span>
                      <span className="slide-tag">🗄️ MySQL: e_sekolah_db</span>
                      <span className="slide-tag">⚡ Presensi QR & Realtime</span>
                    </div>
                    <div className="slide-cta-row">
                      <a 
                        href="https://e-sekolah.devorme.site" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-slider-primary"
                      >
                        Buka e-sekolah.devorme.site ↗
                      </a>
                      <button 
                        className="btn-slider-glass"
                        onClick={() => onSelectProduct && onSelectProduct('e-sekolah')}
                      >
                        Lihat Detail Produk
                      </button>
                    </div>
                  </div>

                  <div className="slide-visual-col">
                    <div className="mockup-glass-card">
                      <div className="mockup-header-bar">
                        <div className="browser-dots">
                          <span className="dot red"></span>
                          <span className="dot yellow"></span>
                          <span className="dot green"></span>
                        </div>
                        <span className="browser-url-text">https://e-sekolah.devorme.site</span>
                        <span className="status-badge-green">Online 99.9%</span>
                      </div>
                      <div className="mockup-card-body">
                        <div className="mockup-stat-row">
                          <div className="mockup-stat-box">
                            <span className="mockup-stat-num">100%</span>
                            <span className="mockup-stat-lbl">Otomasi Rekap</span>
                          </div>
                          <div className="mockup-stat-box">
                            <span className="mockup-stat-num">Realtime</span>
                            <span className="mockup-stat-lbl">Presensi Guru & Siswa</span>
                          </div>
                          <div className="mockup-stat-box">
                            <span className="mockup-stat-num">Terpusat</span>
                            <span className="mockup-stat-lbl">Server VPS MySQL</span>
                          </div>
                        </div>
                        <div className="mockup-feature-list">
                          <div className="mockup-feature-item">
                            <span className="feat-icon">✅</span>
                            <span>Manajemen Rombel, Kelas & Kenaikan Tingkat</span>
                          </div>
                          <div className="mockup-feature-item">
                            <span className="feat-icon">✅</span>
                            <span>Tracking Kehadiran Sakit, Izin, & Alpa Otomatis</span>
                          </div>
                          <div className="mockup-feature-item">
                            <span className="feat-icon">✅</span>
                            <span>Login Khusus Admin, Guru, & Siswa/Wali Murid</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =======================================================
                  SLIDE 3: DIS Smart System & Server Architecture
                  ======================================================= */}
              <div className="slider-slide feature-slide slide-navy-deep">
                <div className="slide-content-grid">
                  <div className="slide-text-col">
                    <div className="hero-pill-blue">
                      <span className="pill-check-icon">✓</span>
                      <span>Arsitektur Server Enterprise & Multi-Subdomain</span>
                    </div>
                    <h2 className="slide-title">
                      DIS Smart System & <span className="text-cyan-glow">Server Database Terpusat</span>
                    </h2>
                    <p className="slide-desc">
                      Devorme merancang seluruh subdomain produk software agar beroperasi independen namun tetap terhubung dalam satu server VPS berkecepatan tinggi dengan proteksi SSL Nginx dan backup database berkala.
                    </p>
                    <div className="slide-pills-row">
                      <span className="slide-tag">🏛️ dis.devorme.site</span>
                      <span className="slide-tag">🛡️ Enkripsi SSL Otomatis</span>
                      <span className="slide-tag">📊 Multi-Tenant Cloud</span>
                    </div>
                    <div className="slide-cta-row">
                      <a 
                        href="https://dis.devorme.site" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-slider-primary"
                      >
                        Buka dis.devorme.site ↗
                      </a>
                      <button 
                        className="btn-slider-glass"
                        onClick={onNavigateToArchitecture}
                      >
                        Pelajari Arsitektur Server
                      </button>
                    </div>
                  </div>

                  <div className="slide-visual-col">
                    <div className="mockup-glass-card">
                      <div className="mockup-header-bar">
                        <div className="browser-dots">
                          <span className="dot red"></span>
                          <span className="dot yellow"></span>
                          <span className="dot green"></span>
                        </div>
                        <span className="browser-url-text">Host: 31.97.109.165</span>
                        <span className="status-badge-blue">Database Cluster</span>
                      </div>
                      <div className="mockup-card-body">
                        <div className="server-cluster-preview">
                          <div className="server-unit-card">
                            <span className="server-unit-icon">🌐</span>
                            <div>
                              <strong>devorme.site</strong>
                              <p>Main Portal & Branding</p>
                            </div>
                          </div>
                          <div className="server-unit-arrow">⬇ 1 Server Terpusat ⬇</div>
                          <div className="server-db-box">
                            <span className="db-icon">🗄️</span>
                            <div>
                              <strong>MySQL Server VPS</strong>
                              <p>e_sekolah_db • dis_db • devorme_master</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Navigation Controls: Prev & Next */}
          <button 
            className="slider-nav-btn slider-nav-prev" 
            onClick={handlePrev}
            aria-label="Slide Sebelumnya"
          >
            ‹
          </button>
          <button 
            className="slider-nav-btn slider-nav-next" 
            onClick={handleNext}
            aria-label="Slide Selanjutnya"
          >
            ›
          </button>

          {/* Pagination Indicators / Dots */}
          <div className="slider-indicators-bar">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                className={`slider-dot-btn ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Pindah ke slide ${idx + 1}`}
              >
                <span className="dot-fill"></span>
                <span className="dot-label">
                  {idx === 0 ? 'Banner Utama' : idx === 1 ? 'E-Sekolah' : 'DIS & Server'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Metric Strip below Slider */}
        <div className="slider-bottom-metrics">
          <div className="metric-item">
            <span className="metric-icon">🚀</span>
            <div>
              <strong>Multi-Domain Ecosystem</strong>
              <span>Subdomain mandiri untuk setiap produk institusi</span>
            </div>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-icon">⚡</span>
            <div>
              <strong>Uptime Server 99.98%</strong>
              <span>Host VPS cepat & database MySQL terpusat</span>
            </div>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-icon">📱</span>
            <div>
              <strong>Mobile Android Ready</strong>
              <span>Dukungan instalasi APK & Progressive Web App</span>
            </div>
          </div>
          <div className="metric-divider"></div>
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
