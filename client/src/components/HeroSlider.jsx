import React, { useState, useEffect, useRef } from 'react';

export default function HeroSlider({ onSelectProduct, onNavigateToArchitecture }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const totalSlides = 3;

  // Auto-play timer (6 seconds per slide, pause on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
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
      className="hero-slider-section hero-slider-fullwidth"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Edge-to-Edge Full Width Slider Frame */}
      <div className="slider-outer-frame slider-frame-fullwidth">
        <div className="slider-fade-viewport">
            
            {/* =======================================================
                SLIDE 1: Flagship Banner.png (Full, Crisp, Proportional)
                ======================================================= */}
            <div className={`slider-fade-slide ${currentSlide === 0 ? 'active' : ''}`}>
              <div className="banner-slide-inner">
                <img 
                  src="/Banner.png" 
                  alt="Devorme - Wujudkan Ide Anda dengan Mudah! Platform Ekosistem Software Terpadu"
                  className="banner-compact-img"
                />
                <div className="banner-quick-actions-bar">
                  <div className="banner-badge-live">
                    <span className="live-pulse-dot"></span>
                    <span>Devorme Software Ecosystem • Subdomain & Database Terpusat</span>
                  </div>
                  <div className="banner-actions-btns">
                    <a href="#solusi-produk" className="btn-slider-primary">
                      Lihat Produk Kami ▾
                    </a>
                    <a 
                      href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20konsultasi%20software"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-slider-glass"
                    >
                      💬 Konsultasi WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* =======================================================
                SLIDE 2: E-Sekolah Cloud Suite Highlight
                ======================================================= */}
            <div className={`slider-fade-slide ${currentSlide === 1 ? 'active' : ''}`}>
              <div className="feature-slide-inner slide-blue-gradient">
                <div className="compact-slide-grid">
                  <div className="compact-text-col">
                    <div className="hero-pill-blue">
                      <span className="pill-check-icon">✓</span>
                      <span>Solusi Manajemen Sekolah & Yayasan</span>
                    </div>
                    <h2 className="slide-title-compact">
                      E-Sekolah Cloud: <span className="text-cyan-glow">Akademik & Presensi Cerdas</span>
                    </h2>
                    <p className="slide-desc-compact">
                      Otomatisasi rekap presensi guru & siswa secara realtime, kenaikan kelas, penilaian rapor digital, dan jadwal pelajaran dalam satu aplikasi terintegrasi.
                    </p>
                    <div className="compact-tags-row">
                      <span className="slide-tag">📱 Android APK Ready</span>
                      <span className="slide-tag">🗄️ MySQL: e_sekolah_db</span>
                      <span className="slide-tag">⚡ Presensi Realtime</span>
                    </div>
                    <div className="compact-btns-row">
                      <a 
                        href="https://e-sekolah.devorme.site" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-slider-primary"
                      >
                        Buka e-sekolah.devorme.site ↗
                      </a>
                      <button 
                        className="btn-slider-glass-light"
                        onClick={() => onSelectProduct && onSelectProduct('e-sekolah')}
                      >
                        Detail Solusi
                      </button>
                    </div>
                  </div>

                  <div className="compact-visual-col">
                    <div className="compact-card-box">
                      <div className="compact-card-header">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="url-badge">e-sekolah.devorme.site</span>
                      </div>
                      <div className="compact-card-content">
                        <div className="mini-stat-grid">
                          <div className="mini-stat">
                            <strong>100%</strong>
                            <span>Rekap Otomatis</span>
                          </div>
                          <div className="mini-stat">
                            <strong>Realtime</strong>
                            <span>Absensi GPS/QR</span>
                          </div>
                          <div className="mini-stat">
                            <strong>Multi-User</strong>
                            <span>Guru & Wali</span>
                          </div>
                        </div>
                        <div className="mini-check-list">
                          <div>✓ Rekapitulasi Hadir, Izin, Sakit & Cuti</div>
                          <div>✓ Rapor Digital & Arsip Nilai Siswa</div>
                          <div>✓ Notifikasi & Portal Wali Murid</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =======================================================
                SLIDE 3: DIS Smart System & Central Database
                ======================================================= */}
            <div className={`slider-fade-slide ${currentSlide === 2 ? 'active' : ''}`}>
              <div className="feature-slide-inner slide-navy-deep">
                <div className="compact-slide-grid">
                  <div className="compact-text-col">
                    <div className="hero-pill-blue">
                      <span className="pill-check-icon">✓</span>
                      <span>Infrastruktur Server VPS & Multi-Subdomain</span>
                    </div>
                    <h2 className="slide-title-compact">
                      DIS Smart System: <span className="text-cyan-glow">Birokrasi & Pelaporan Cepat</span>
                    </h2>
                    <p className="slide-desc-compact">
                      Platform pelaporan dan dokumen digital dinas/institusi dengan alur approval bertingkat, keamanan enkripsi tinggi, dan uptime server 99.98%.
                    </p>
                    <div className="compact-tags-row">
                      <span className="slide-tag">🏛️ dis.devorme.site</span>
                      <span className="slide-tag">🛡️ SSL Nginx Enkripsi</span>
                      <span className="slide-tag">⚡ Uptime 99.98%</span>
                    </div>
                    <div className="compact-btns-row">
                      <a 
                        href="https://dis.devorme.site" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-slider-primary"
                      >
                        Buka dis.devorme.site ↗
                      </a>
                      <button 
                        className="btn-slider-glass-light"
                        onClick={onNavigateToArchitecture}
                      >
                        Pelajari Arsitektur
                      </button>
                    </div>
                  </div>

                  <div className="compact-visual-col">
                    <div className="compact-card-box">
                      <div className="compact-card-header">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="url-badge">Host: 31.97.109.165</span>
                      </div>
                      <div className="compact-card-content">
                        <div className="server-status-box">
                          <div className="server-row">
                            <span className="server-dot green"></span>
                            <span>devorme.site (Domain Induk)</span>
                          </div>
                          <div className="server-row">
                            <span className="server-dot blue"></span>
                            <span>e-sekolah.devorme.site (Akademik)</span>
                          </div>
                          <div className="server-row">
                            <span className="server-dot purple"></span>
                            <span>dis.devorme.site (Sistem Informasi)</span>
                          </div>
                          <div className="server-sync-hint">
                            🗄️ Seluruh Data Tersinkron di 1 Database MySQL VPS
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

          {/* Indicators Bar */}
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

      {/* Highlight Metric Strip below Slider in Container */}
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
