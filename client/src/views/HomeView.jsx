import React, { useEffect, useState } from 'react';
import DomainSimulator from '../components/DomainSimulator';
import { productService } from '../api/productService';

export default function HomeView({ onSelectProduct, onNavigateToArchitecture, onNavigateToAdmin }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await productService.getAllProducts();
      setProducts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div>
      {/* ==================================================================
          1. HERO SECTION (Persis Gaya Visual Leapfactor)
          ================================================================== */}
      <section className="hero-wrapper-leap">
        <div className="container">
          <div className="hero-grid-two-col">
            
            {/* Left Column: Headline & Action Buttons */}
            <div>
              <div className="hero-pill-orange">
                <span className="pill-check-icon">✓</span>
                <span>Solusi Software & Digitalisasi Ekosistem Terpadu</span>
              </div>

              <h1 className="hero-title-lead">
                <span className="title-orange-text">Software Terpadu</span>
                untuk Ekosistem Bisnis yang Lebih Efisien
              </h1>

              <p className="hero-sub-description">
                Atasi kendala operasional, tingkatkan produktivitas, dan dukung pertumbuhan institusi Anda dengan ekosistem software multi-subdomain Devorme yang terhubung langsung ke satu server dan database MySQL terpusat.
              </p>

              <div className="hero-cta-btns">
                <a href="#kontak" className="btn-navy" style={{ padding: '14px 30px', fontSize: '1rem' }}>
                  Konsultasi Gratis
                </a>
                <a href="#solusi-produk" className="btn-white-outline" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  Lihat Solusi Kami →
                </a>
              </div>
            </div>

            {/* Right Column: Hero Specialist Image with Floating Badges */}
            <div className="hero-person-stage">
              <div className="hero-person-img-wrapper">
                <img 
                  src="/hero-person.jpg" 
                  alt="Devorme Software Specialist" 
                  className="hero-person-img"
                />
              </div>

              {/* Floating Stat Badge 1 (Top Left) */}
              <div className="floating-stat-card stat-card-top-left">
                <div className="stat-icon-box">📊</div>
                <div>
                  <span className="stat-val-bold">Efisiensi Naik 35%</span>
                  <span className="stat-label-small">Digitalisasi Operasional</span>
                </div>
              </div>

              {/* Floating Stat Badge 2 (Bottom Right) */}
              <div className="floating-stat-card stat-card-bottom-right">
                <div className="stat-icon-box" style={{ background: '#ecfdf5', color: '#16a34a' }}>⚡</div>
                <div>
                  <span className="stat-val-bold">Uptime 99.98%</span>
                  <span className="stat-label-small">Server VPS Aktif</span>
                </div>
              </div>

              {/* Floating Stat Badge 3 (Bottom Left Dark Navy) */}
              <div className="floating-stat-card stat-card-bottom-left">
                <div style={{ fontSize: '1.2rem' }}>🚀</div>
                <div>
                  <span className="stat-val-bold" style={{ color: '#ffffff' }}>Produktivitas Naik 25%</span>
                  <span className="stat-label-small" style={{ color: '#94a3b8' }}>Multi-Subdomain Terpadu</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================================
          2. TRUST STRIP / PARTNERS
          ================================================================== */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-label">
            Ekosistem Teknologi Terintegrasi untuk Institusi & Korporasi
          </div>
          <div className="trust-badges">
            <span className="trust-badge-item">🏛️ Dinas & Pemerintahan</span>
            <span className="trust-badge-item">🎓 Sekolah & Yayasan Pendidikan</span>
            <span className="trust-badge-item">🏢 Korporasi & Manufaktur</span>
            <span className="trust-badge-item">📱 Mobile Android Ready</span>
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. SOLUSI PRODUK EKOSISTEM (Cards dengan Aksen Oranye & Navy)
          ================================================================== */}
      <section id="solusi-produk" className="products-section-leap">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
            <div className="hero-pill-orange">
              <span>Portofolio Produk Kami</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '14px' }}>
              Solusi Software Spesifik Berbasis Subdomain
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Setiap aplikasi beroperasi mandiri dengan domain resminya masing-masing, namun seluruh data tersinkronisasi aman dalam satu basis data server.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              Memuat data solusi produk dari server...
            </div>
          ) : (
            <div className="solution-grid">
              {/* Product 1: E-Sekolah Cloud */}
              <div className="solution-card">
                <span className="card-top-tag">🎓 Solusi Akademik & Sekolah</span>
                <span className="domain-pill" style={{ marginBottom: '14px' }}>
                  🌐 e-sekolah.devorme.site
                </span>
                <h3 className="solution-title">E-Sekolah Cloud Platform</h3>
                <p className="solution-desc">
                  Sistem informasi manajemen sekolah terpadu yang mengotomasi rekap presensi guru & siswa, jadwal pelajaran, penilaian rapor, serta kenaikan kelas dan alumni.
                </p>

                <ul className="solution-features-list">
                  <li>
                    <span className="feature-check-orange">✓</span>
                    <span>Presensi Guru & Siswa Real-time</span>
                  </li>
                  <li>
                    <span className="feature-check-orange">✓</span>
                    <span>Kenaikan Kelas & Manajemen Alumni</span>
                  </li>
                  <li>
                    <span className="feature-check-orange">✓</span>
                    <span>Database MySQL: <strong>e_sekolah_db</strong></span>
                  </li>
                  <li>
                    <span className="feature-check-orange">✓</span>
                    <span>Tersedia Aplikasi Mobile Android (.apk)</span>
                  </li>
                </ul>

                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <a 
                    href="https://e-sekolah.devorme.site" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-navy" 
                    style={{ flex: 1, padding: '12px', fontSize: '0.9rem' }}
                  >
                    Buka e-sekolah.devorme.site ↗
                  </a>
                  <button 
                    className="btn-white-outline"
                    style={{ padding: '12px 18px', fontSize: '0.9rem' }}
                    onClick={() => onSelectProduct('e-sekolah')}
                  >
                    Detail
                  </button>
                </div>
              </div>

              {/* Product 2: DIS Smart System */}
              <div className="solution-card">
                <span className="card-top-tag">🏛️ Layanan Publik & Korporasi</span>
                <span className="domain-pill" style={{ marginBottom: '14px' }}>
                  🌐 dis.devorme.site
                </span>
                <h3 className="solution-title">DIS Smart System</h3>
                <p className="solution-desc">
                  Platform Digital Information System yang menghubungkan birokrasi dan pelaporan publik dengan alur approval bertingkat dan analitik kinerja instansi.
                </p>

                <ul className="solution-features-list">
                  <li>
                    <span className="feature-check-orange">✓</span>
                    <span>Digitalisasi Dokumen & Approval Alur Dinas</span>
                  </li>
                  <li>
                    <span className="feature-check-orange">✓</span>
                    <span>Dashboard Pelaporan Publik Real-time</span>
                  </li>
                  <li>
                    <span className="feature-check-orange">✓</span>
                    <span>Database MySQL: <strong>dis_db</strong></span>
                  </li>
                  <li>
                    <span className="feature-check-orange">✓</span>
                    <span>Enkripsi Data Tingkat Tinggi</span>
                  </li>
                </ul>

                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <a 
                    href="https://dis.devorme.site" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-navy" 
                    style={{ flex: 1, padding: '12px', fontSize: '0.9rem' }}
                  >
                    Buka dis.devorme.site ↗
                  </a>
                  <button 
                    className="btn-white-outline"
                    style={{ padding: '12px 18px', fontSize: '0.9rem' }}
                    onClick={() => onSelectProduct('dis')}
                  >
                    Detail
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==================================================================
          4. MENGAPA MEMILIH DEVORME (Bento Fitur Keunggulan)
          ================================================================== */}
      <section id="tentang-kami" style={{ padding: '80px 0', background: 'var(--bg-warm)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
            <div className="hero-pill-orange">
              <span>Keunggulan Sistem</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '14px' }}>
              Infrastruktur Andal untuk Ketenangan Bisnis Anda
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Kombinasi fleksibilitas multi-subdomain dengan keamanan server terpusat.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '30px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🎯</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>1 Domain, Banyak Aplikasi</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Hanya butuh 1 domain utama <code>devorme.site</code> untuk membuat puluhan subdomain produk baru tanpa biaya pembelian domain tambahan.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '30px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🗄️</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Database Terpusat di Server</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                MySQL 8.0 berjalan di server VPS yang sama, memudahkan sinkronisasi data antar produk, backup otomatis, dan efisiensi resource server.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '30px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>📱</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Mobile Android Siap Pakai</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Didukung arsitektur PWA dan Capacitor, kode web produk Anda langsung bisa diubah menjadi aplikasi native Android (.apk).
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '30px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🛡️</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Keamanan SSL Otomatis</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Konfigurasi Nginx teroptimasi dengan sertifikat SSL Let's Encrypt menjamin seluruh transaksi data terenkripsi aman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. SUBDOMAIN SIMULATOR INTERAKTIF
          ================================================================== */}
      <section style={{ padding: '0 0 80px', background: 'var(--bg-warm)' }}>
        <div className="container">
          <DomainSimulator onSelectProduct={onSelectProduct} />
        </div>
      </section>

      {/* ==================================================================
          6. KONTAK & KONSULTASI
          ================================================================== */}
      <section id="kontak" style={{ padding: '80px 0', background: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div className="hero-pill-orange">
            <span>Mulai Konsultasi</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '14px' }}>
            Siap Mengembangkan Ekosistem Software Anda?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
            Hubungi tim pengembang Devorme untuk mendiskusikan implementasi E-Sekolah, DIS, atau kebutuhan software custom perusahaan Anda.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a 
              href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20ingin%20konsultasi%20software" 
              target="_blank" 
              rel="noreferrer"
              className="btn-orange" 
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              💬 Hubungi via WhatsApp
            </a>
            <button className="btn-navy" onClick={onNavigateToAdmin} style={{ padding: '14px 28px', fontSize: '1rem' }}>
              🔐 Buka Portal Admin
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================================
          7. FLOATING WHATSAPP US BUTTON (Leapfactor Signature)
          ================================================================== */}
      <a 
        href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20ingin%20konsultasi%20software" 
        target="_blank" 
        rel="noreferrer" 
        className="floating-whatsapp-btn"
        aria-label="Chat WhatsApp Devorme"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.518 0-10 4.482-10 10 0 1.764.461 3.42 1.267 4.869l-1.344 4.912 5.044-1.323c1.401.765 2.999 1.197 4.697 1.197 5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18.232c-1.545 0-2.989-.43-4.226-1.176l-.303-.182-2.99.784.798-2.916-.2-.319c-.818-1.299-1.26-2.812-1.26-4.423 0-4.542 3.693-8.235 8.235-8.235 4.543 0 8.235 3.693 8.235 8.235 0 4.542-3.692 8.235-8.235 8.235z"/>
        </svg>
        <span>WhatsApp Us</span>
      </a>
    </div>
  );
}
