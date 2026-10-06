import React, { useEffect, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
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
          1. FULL HERO SLIDER (Banner.png & Interactive Ekosistem Showcase)
          ================================================================== */}
      <HeroSlider 
        onSelectProduct={onSelectProduct} 
        onNavigateToArchitecture={onNavigateToArchitecture} 
      />

      {/* ==================================================================
          2. TRUST STRIP / PARTNERS & CLIENTS
          ================================================================== */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-label">
            Dipercaya oleh Perusahaan dan Terkemuka..
          </div>
          <div className="trust-badges">
            <span className="trust-badge-item">🏢 CV Makmur Permata</span>
            <span className="trust-badge-item">🍲 Seblak Katel NDR</span>
            <span className="trust-badge-item">🍚 Warung Nasi Haji Aah Putra</span>
            <span className="trust-badge-item">🎓 SMK ARTANITA TASIKMALAYA</span>
            <span className="trust-badge-item">🚚 CV MITRA JAYA ABADI DISTRIBUTOR</span>
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. SOLUSI PRODUK & GALERI PORTOFOLIO INTERAKTIF
          ================================================================== */}
      <section id="solusi-produk" className="products-section-leap" style={{ background: '#f8fafc', padding: '84px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
            <div className="hero-pill-blue">
              <span>🖼️ Galeri Portofolio & Sistem Teruji</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '14px', color: 'var(--navy-dark)' }}>
              Galeri Portofolio Solusi Software Devorme
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Kumpulan produk dan ekosistem digital mandiri yang telah kami kembangkan. Lihat pratinjau galeri sistem di bawah atau minta akses demo aplikasi secara langsung via WhatsApp.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              Memuat galeri portofolio produk...
            </div>
          ) : (
            <div className="solution-grid" style={{ gap: '32px' }}>

              {/* Product 1: E-Sekolah Cloud */}
              <div className="solution-card" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 12px 30px -10px rgba(0, 102, 255, 0.1)', display: 'flex', flexDirection: 'column' }}>
                
                {/* Gallery Visual Header Mockup */}
                <div style={{ background: 'linear-gradient(135deg, #07153b, #0d2861)', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                    </div>
                    <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '99px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      🟢 LIVE SYSTEM
                    </span>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '8px', padding: '6px 12px', fontSize: '0.78rem', color: '#93c5fd', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🔒 https://e-sekolah.devorme.site
                  </div>

                  <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                      <span>📊 Dashboard Akademik Realtime</span>
                      <span style={{ color: '#38bdf8' }}>99.98% Uptime</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
                      <div style={{ background: 'rgba(255,255,255,0.08)', padding: '6px', borderRadius: '6px' }}>
                        <strong style={{ color: '#00c4ff', fontSize: '0.9rem', display: 'block' }}>1,250+</strong>
                        <span style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>Siswa Aktif</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.08)', padding: '6px', borderRadius: '6px' }}>
                        <strong style={{ color: '#34d399', fontSize: '0.9rem', display: 'block' }}>100%</strong>
                        <span style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>Absensi QR</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.08)', padding: '6px', borderRadius: '6px' }}>
                        <strong style={{ color: '#fbbf24', fontSize: '0.9rem', display: 'block' }}>Mobile</strong>
                        <span style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>Android .APK</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <span className="card-top-tag" style={{ margin: 0 }}>🎓 Sekolah & Yayasan</span>
                    <span className="domain-pill" style={{ margin: 0, fontSize: '0.78rem' }}>💼 Akademik & Rapor</span>
                  </div>

                  <h3 className="solution-title" style={{ fontSize: '1.45rem', marginBottom: '8px' }}>E-Sekolah Cloud Platform</h3>
                  <p className="solution-desc" style={{ fontSize: '0.92rem', marginBottom: '20px' }}>
                    Sistem informasi manajemen sekolah terpadu yang mengotomasi rekap presensi guru & siswa, jadwal pelajaran, penilaian rapor, serta kenaikan kelas dan alumni.
                  </p>

                  <ul className="solution-features-list" style={{ marginBottom: '24px' }}>
                    <li>
                      <span className="feature-check-blue">✓</span>
                      <span>Presensi Guru & Siswa Real-time (QR & GPS)</span>
                    </li>
                    <li>
                      <span className="feature-check-blue">✓</span>
                      <span>Kenaikan Kelas & Manajemen Alumni Otomatis</span>
                    </li>
                    <li>
                      <span className="feature-check-blue">✓</span>
                      <span>Database Terpusat & Sinkronisasi Realtime</span>
                    </li>
                    <li>
                      <span className="feature-check-blue">✓</span>
                      <span>Aplikasi Mobile Android Native (.apk ready)</span>
                    </li>
                  </ul>

                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <a 
                      href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20melihat%20demo%20E-Sekolah%20Cloud" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn-blue" 
                      style={{ flex: 1, padding: '12px', fontSize: '0.88rem', justifyContent: 'center' }}
                    >
                      💬 Request Demo via WA
                    </a>
                    <button 
                      className="btn-white-outline"
                      style={{ padding: '12px 16px', fontSize: '0.88rem' }}
                      onClick={() => onSelectProduct('e-sekolah')}
                    >
                      Detail Portofolio
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 2: DIS Smart System */}
              <div className="solution-card" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 12px 30px -10px rgba(0, 102, 255, 0.1)', display: 'flex', flexDirection: 'column' }}>
                
                {/* Gallery Visual Header Mockup */}
                <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                    </div>
                    <span style={{ background: 'rgba(168, 85, 247, 0.25)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: '99px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      🛡️ ENTERPRISE SECURE
                    </span>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '8px', padding: '6px 12px', fontSize: '0.78rem', color: '#e9d5ff', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🔒 https://dis.devorme.site
                  </div>

                  <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                      <span>🏛️ Birokrasi & Pelaporan Dinas</span>
                      <span style={{ color: '#c084fc' }}>SSL Active</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
                      <div style={{ background: 'rgba(255,255,255,0.08)', padding: '6px', borderRadius: '6px' }}>
                        <strong style={{ color: '#c084fc', fontSize: '0.9rem', display: 'block' }}>Surat/Dispo</strong>
                        <span style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>Digital Approval</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.08)', padding: '6px', borderRadius: '6px' }}>
                        <strong style={{ color: '#38bdf8', fontSize: '0.9rem', display: 'block' }}>Multi-Tier</strong>
                        <span style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>Hierarki Instansi</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.08)', padding: '6px', borderRadius: '6px' }}>
                        <strong style={{ color: '#f43f5e', fontSize: '0.9rem', display: 'block' }}>256-Bit</strong>
                        <span style={{ fontSize: '0.68rem', color: '#cbd5e1' }}>AES Encryption</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <span className="card-top-tag" style={{ margin: 0, background: '#f3e8ff', color: '#9333ea', borderColor: '#d8b4fe' }}>🏛️ Layanan Publik & Dinas</span>
                    <span className="domain-pill" style={{ margin: 0, fontSize: '0.78rem' }}>💼 Digital Information System</span>
                  </div>

                  <h3 className="solution-title" style={{ fontSize: '1.45rem', marginBottom: '8px' }}>DIS Smart System</h3>
                  <p className="solution-desc" style={{ fontSize: '0.92rem', marginBottom: '20px' }}>
                    Platform Digital Information System yang menghubungkan birokrasi dan pelaporan publik dengan alur approval bertingkat dan analitik kinerja instansi.
                  </p>

                  <ul className="solution-features-list" style={{ marginBottom: '24px' }}>
                    <li>
                      <span className="feature-check-blue">✓</span>
                      <span>Digitalisasi Dokumen & Approval Alur Dinas</span>
                    </li>
                    <li>
                      <span className="feature-check-blue">✓</span>
                      <span>Dashboard Pelaporan Publik & Statistik Real-time</span>
                    </li>
                    <li>
                      <span className="feature-check-blue">✓</span>
                      <span>Enkripsi Enterprise & Database Terpusat</span>
                    </li>
                    <li>
                      <span className="feature-check-blue">✓</span>
                      <span>Enkripsi Data & Hak Akses Berjenjang Tingkat Tinggi</span>
                    </li>
                  </ul>

                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <a 
                      href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20melihat%20demo%20DIS%20Smart%20System" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn-blue" 
                      style={{ flex: 1, padding: '12px', fontSize: '0.88rem', justifyContent: 'center' }}
                    >
                      💬 Request Demo via WA
                    </a>
                    <button 
                      className="btn-white-outline"
                      style={{ padding: '12px 16px', fontSize: '0.88rem' }}
                      onClick={() => onSelectProduct('dis')}
                    >
                      Detail Portofolio
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* High Trust Proof Footer Strip */}
          <div style={{ marginTop: '48px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.6rem' }}>🛡️</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--navy-dark)' }}>Garansi Maintenance 24/7</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dukungan teknis tim arsitek senior</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.6rem' }}>⚡</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--navy-dark)' }}>Pendampingan & Training</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bimbingan penggunaan hingga lancar</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.6rem' }}>🔒</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--navy-dark)' }}>Data Full Ownership</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Database 100% milik instansi Anda</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. MENGAPA MEMILIH DEVORME (Bento Fitur Keunggulan)
          ================================================================== */}
      <section id="tentang-kami" style={{ padding: '80px 0', background: 'var(--bg-warm)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
            <div className="hero-pill-blue">
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
            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }} className="bento-card-hover">
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🎯</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Arsitektur Modular Terpadu</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Setiap modul aplikasi berjalan independen sesuai perannya, namun seluruh ekosistem tersinkronisasi mulus di bawah satu database terpusat.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }} className="bento-card-hover">
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🗄️</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Database Terpusat di Server</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                MySQL 8.0 berjalan di server VPS yang sama, memudahkan sinkronisasi data antar produk, backup otomatis, dan efisiensi resource server.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }} className="bento-card-hover">
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>📱</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Mobile Android Siap Pakai</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Didukung arsitektur PWA dan instalasi Android (.apk), klien Anda dapat mengakses platform langsung dari ponsel secara mandiri.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }} className="bento-card-hover">
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
          <div className="hero-pill-blue">
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
              className="btn-blue" 
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
          7. FLOATING WHATSAPP US BUTTON
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
