import React, { useEffect, useState } from 'react';
import DomainSimulator from '../components/DomainSimulator';
import { productService } from '../api/productService';

export default function HomeView({ onSelectProduct, onNavigateToArchitecture, onNavigateToAdmin }) {
  const [products, setProducts] = useState([]);
  const [activeHeroTab, setActiveHeroTab] = useState('e-sekolah');
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
    <div style={{ position: 'relative' }}>
      {/* Ambient Mesh Glows */}
      <div className="mesh-bg" aria-hidden="true"></div>

      <main className="container" style={{ paddingTop: '60px', paddingBottom: '90px' }}>
        
        {/* ==================================================================
            1. HERO SECTION (High-Impact World-Class SaaS Look)
            ================================================================== */}
        <section style={{ textAlign: 'center', marginBottom: '80px' }}>
          
          <div className="badge-pill" style={{ marginBottom: '24px' }}>
            <span className="pulse-dot"></span>
            <span>Ekosistem Software Multi-Subdomain • Devorme Technologies</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', maxWidth: '980px', margin: '0 auto 24px', letterSpacing: '-0.035em', lineHeight: 1.12 }}>
            Satu Server Terpusat, <br />
            <span className="text-gradient">Multi-Produk Subdomain Mandiri.</span>
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', maxWidth: '740px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Devorme membangun arsitektur software cerdas di mana setiap produk berdiri di bawah nama subdomain independen (<code>e-sekolah.devorme.site</code>), namun seluruh data dan autentikasi tersimpan aman di database MySQL server terpusat.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href="#products-showcase" className="btn btn-primary" style={{ padding: '15px 34px', fontSize: '1.02rem' }}>
              Eksplorasi Produk Kami ↓
            </a>
            <button className="btn btn-secondary" onClick={onNavigateToArchitecture} style={{ padding: '15px 30px', fontSize: '1.02rem' }}>
              Lihat Arsitektur Server
            </button>
            <button className="btn btn-ghost" onClick={onNavigateToAdmin} style={{ padding: '15px 24px', fontSize: '0.98rem' }}>
              🔐 Portal Admin
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '32px', background: '#ffffff', border: '1px solid var(--border-light)', padding: '14px 36px', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-card)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pulse-dot"></span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>VPS Online: 31.97.109.165</span>
            </div>
            <div style={{ width: '1px', height: '20px', background: 'var(--border-light)' }}></div>
            <div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>MySQL 8.0 Active</span>
            </div>
            <div style={{ width: '1px', height: '20px', background: 'var(--border-light)' }}></div>
            <div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#16a34a' }}>Nginx Reverse Proxy</span>
            </div>
          </div>

          {/* Live Interactive Hero Window Mockup */}
          <div className="hero-mockup-window">
            <div className="mockup-top-bar">
              <div className="traffic-dots">
                <span className="dot-red"></span>
                <span className="dot-yellow"></span>
                <span className="dot-green"></span>
              </div>

              <div className="mockup-tabs">
                <div 
                  className={`mockup-tab ${activeHeroTab === 'e-sekolah' ? 'active' : ''}`}
                  onClick={() => setActiveHeroTab('e-sekolah')}
                >
                  <span>🎓</span>
                  <span>e-sekolah.devorme.site</span>
                </div>
                <div 
                  className={`mockup-tab ${activeHeroTab === 'dis' ? 'active' : ''}`}
                  onClick={() => setActiveHeroTab('dis')}
                >
                  <span>🏛️</span>
                  <span>dis.devorme.site</span>
                </div>
                <div 
                  className={`mockup-tab ${activeHeroTab === 'central' ? 'active' : ''}`}
                  onClick={() => setActiveHeroTab('central')}
                >
                  <span>⚙️</span>
                  <span>api.devorme.site</span>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🔒 HTTPS Ready</span>
              </div>
            </div>

            {/* Dynamic View Inside Hero Mockup */}
            <div style={{ padding: '36px 32px', background: '#ffffff', textAlign: 'left' }}>
              {activeHeroTab === 'e-sekolah' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
                  <div>
                    <span className="domain-pill" style={{ marginBottom: '12px' }}>
                      🌐 https://e-sekolah.devorme.site
                    </span>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>E-Sekolah Cloud Platform</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                      Sistem informasi sekolah terpadu yang mengelola presensi guru/siswa, jadwal pelajaran, manajemen kenaikan kelas, alumni, dan rekap nilai otomatis.
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <a href="https://e-sekolah.devorme.site" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                        Buka Website e-sekolah ↗
                      </a>
                      <button className="btn btn-secondary btn-sm" onClick={() => onSelectProduct('e-sekolah')}>
                        Detail Fitur
                      </button>
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Live Status Modul E-Sekolah</strong>
                      <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Online</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '8px 12px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <span>Presensi Guru & Siswa</span>
                        <strong style={{ color: '#16a34a' }}>Terhubung</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '8px 12px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <span>Database MySQL Server</span>
                        <strong style={{ color: 'var(--primary)' }}>e_sekolah_db</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '8px 12px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <span>Aplikasi Android (Capacitor)</span>
                        <strong style={{ color: '#0284c7' }}>Ready (.apk)</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeHeroTab === 'dis' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
                  <div>
                    <span className="domain-pill" style={{ marginBottom: '12px' }}>
                      🌐 https://dis.devorme.site
                    </span>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>DIS Smart System</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                      Platform Digital Information System & Layanan Publik dengan dashboard analitik terpadu dan pelaporan dokumen dinas secara real-time.
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <a href="https://dis.devorme.site" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                        Buka Website dis ↗
                      </a>
                      <button className="btn btn-secondary btn-sm" onClick={() => onSelectProduct('dis')}>
                        Detail Fitur
                      </button>
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Live Status Modul DIS</strong>
                      <span style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Ready</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '8px 12px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <span>Layanan Publik Digital</span>
                        <strong style={{ color: '#16a34a' }}>Aktif</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '8px 12px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <span>Database MySQL Server</span>
                        <strong style={{ color: 'var(--primary)' }}>dis_db</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeHeroTab === 'central' && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <span className="badge-pill" style={{ marginBottom: '12px' }}>
                    ⚙️ https://api.devorme.site/v1
                  </span>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Central API Gateway & Single Sign-On (SSO)</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 20px' }}>
                    Pusat kendali autentikasi dan pertukaran data antar subdomain yang terhubung langsung ke port 5001 dan basis data MySQL <code>devorme</code>.
                  </p>
                  <button className="btn btn-primary btn-sm" onClick={onNavigateToAdmin}>
                    Kelola Database di Portal Admin
                  </button>
                </div>
              )}
            </div>
          </div>

        </section>

        {/* ==================================================================
            2. PRODUCT SHOWCASE BENTO GRID
            ================================================================== */}
        <section id="products-showcase" style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
            <div className="badge-pill">
              <span>Portofolio Produk Unggulan</span>
            </div>
            <h2 style={{ fontSize: '2.6rem', marginBottom: '14px' }}>Ekosistem Software Berbasis Subdomain</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Setiap produk dikembangkan dengan arsitektur modern yang berdiri di bawah subdomain resmi masing-masing untuk pengalaman pengguna terbaik.
            </p>
          </div>

          <div className="bento-grid">
            {/* Card 1: E-Sekolah (Featured Bento Card - 7 Columns) */}
            <div className="bento-card-main">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)' }}>
                  🎓
                </div>
                <span className="domain-pill">
                  e-sekolah.devorme.site
                </span>
              </div>

              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                PRODUK PENDIDIKAN & AKADEMIK
              </div>

              <h3 style={{ fontSize: '1.9rem', marginBottom: '10px' }}>E-Sekolah Cloud System</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Solusi digital terpadu untuk sekolah modern: manajemen rekap presensi guru & siswa, absensi mapel, input nilai rapor, serta alur kenaikan kelas dan alumni otomatis.
              </p>

              <div className="feature-badge-list">
                <span className="feature-tag-chip">✓ Presensi Guru & Siswa</span>
                <span className="feature-tag-chip">✓ Manajemen Kenaikan Kelas</span>
                <span className="feature-tag-chip">✓ Input Nilai & Rapor Digital</span>
                <span className="feature-tag-chip">✓ Mobile Android (.apk) Ready</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="https://e-sekolah.devorme.site" target="_blank" rel="noreferrer" className="btn btn-primary">
                  Buka Website e-sekolah.devorme.site ↗
                </a>
                <button className="btn btn-secondary" onClick={() => onSelectProduct('e-sekolah')}>
                  Lihat Rincian Fitur
                </button>
              </div>
            </div>

            {/* Card 2: DIS (Side Bento Card - 5 Columns) */}
            <div className="bento-card-side">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, #a855f7, #ec4899)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', boxShadow: '0 8px 20px rgba(168, 85, 247, 0.3)' }}>
                  🏛️
                </div>
                <span className="domain-pill">
                  dis.devorme.site
                </span>
              </div>

              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#9333ea', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                LAYANAN PUBLIK & DINAS
              </div>

              <h3 style={{ fontSize: '1.9rem', marginBottom: '10px' }}>DIS Smart System</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Sistem informasi digitalisasi birokrasi dan pelaporan publik dengan alur approval dinas yang terstruktur dan aman.
              </p>

              <div className="feature-badge-list">
                <span className="feature-tag-chip">✓ Manajemen Dokumen</span>
                <span className="feature-tag-chip">✓ Dashboard Pelaporan</span>
                <span className="feature-tag-chip">✓ Database MySQL Devorme</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="https://dis.devorme.site" target="_blank" rel="noreferrer" className="btn btn-primary">
                  Kunjungi Website dis ↗
                </a>
                <button className="btn btn-secondary" onClick={() => onSelectProduct('dis')}>
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. WHY CHOOSE DEVORME (4 Key Strengths)
            ================================================================== */}
        <section style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 50px' }}>
            <div className="badge-pill">
              <span>Keunggulan Arsitektur Kami</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Mengapa Memilih Ekosistem Devorme?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Dirancang untuk efisiensi biaya, skalabilitas tinggi, dan kemudahan perawatan sistem jangka panjang.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '32px 28px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eef2ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
                🎯
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>1 Domain, Banyak Produk</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Cukup satu domain utama <code>devorme.site</code>, Anda bebas membuat puluhan subdomain produk baru tanpa perlu membeli domain tambahan.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '32px 28px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
                🗄️
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Database Terpusat di Server</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                MySQL 8.0 berjalan di server VPS yang sama, memudahkan sinkronisasi data antar produk, backup otomatis, dan efisiensi resource server.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '32px 28px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
                📱
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Mobile Android Siap Rilis</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Didukung arsitektur PWA dan Capacitor, sehingga kode web produk Anda langsung bisa diubah menjadi aplikasi native Android (.apk).
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: '18px', padding: '32px 28px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
                🛡️
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Keamanan SSL Otomatis</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Konfigurasi Nginx teroptimasi dengan sertifikat SSL Let's Encrypt menjamin seluruh transaksi data terenkripsi aman secara otomatis.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. SUBDOMAIN SIMULATOR COMPONENT
            ================================================================== */}
        <section style={{ marginBottom: '100px' }}>
          <DomainSimulator onSelectProduct={onSelectProduct} />
        </section>

        {/* ==================================================================
            5. CONSULTATION / CALL TO ACTION
            ================================================================== */}
        <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)', borderRadius: '24px', padding: '60px 40px', color: '#ffffff', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
          <div className="badge-pill" style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)', marginBottom: '18px' }}>
            <span>🚀 Konsultasi Pengembangan Software</span>
          </div>
          <h2 style={{ fontSize: '2.6rem', color: '#ffffff', marginBottom: '16px' }}>Siap Mengembangkan Produk Software Anda?</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Tim arsitek software Devorme siap membantu Anda merancang sistem informasi institusi, aplikasi custom, hingga arsitektur multi-subdomain yang kokoh.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="mailto:admin@devorme.site" className="btn btn-secondary" style={{ padding: '14px 32px', fontSize: '1rem', fontWeight: 700 }}>
              Hubungi Tim Teknis
            </a>
            <button className="btn btn-ghost" onClick={onNavigateToAdmin} style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)', padding: '14px 28px' }}>
              Masuk ke Portal Admin
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
