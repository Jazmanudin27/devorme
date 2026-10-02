import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
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
    <main>
      {/* 1. HERO SECTION (Bright, Modern, Professional) */}
      <section style={{ padding: '80px 0 60px', position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          
          <div className="badge-pill">
            <span className="badge-dot"></span>
            <span>Software House & Enterprise Cloud Ecosystem</span>
          </div>

          <h1 style={{ fontSize: '3.6rem', maxWidth: '920px', margin: '0 auto 24px', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Membangun Ekosistem <span className="gradient-text">Software Cerdas</span> untuk Akselerasi Bisnis Anda
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '720px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Devorme merancang dan mengembangkan portofolio produk software spesifik yang masing-masing berdiri di bawah subdomain mandiri, terintegrasi pada infrastruktur server dan basis data MySQL terpusat.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '50px' }}>
            <a href="#products-section" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
              Jelajahi Produk Kami ↓
            </a>
            <a href="#services-section" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              Layanan Software House
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '32px', background: '#ffffff', border: '1px solid var(--border-subtle)', padding: '16px 36px', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-card)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div>
              <strong style={{ fontSize: '1.25rem', color: 'var(--accent-indigo)' }}>99.98%</strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Server Uptime</div>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }}></div>
            <div>
              <strong style={{ fontSize: '1.25rem', color: '#0f172a' }}>devorme.site</strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Domain Utama</div>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }}></div>
            <div>
              <strong style={{ fontSize: '1.25rem', color: '#16a34a' }}>MySQL Server</strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Database Terpusat</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PRODUCT SHOWCASE (Subdomain Products) */}
      <section id="products-section" style={{ padding: '80px 0', background: '#ffffff', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
            <div className="badge-pill">
              <span>Portofolio Produk Kami</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Solusi Software Berbasis Subdomain Mandiri</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Setiap aplikasi memiliki identitas dan domain tersendiri untuk kemudahan pengguna, namun tetap tersinkronisasi dalam satu server.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              Memuat data produk dari database server...
            </div>
          ) : (
            <div className="products-grid">
              {products.map(p => (
                <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. SOFTWARE HOUSE SERVICES SECTION */}
      <section id="services-section" style={{ padding: '90px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 50px' }}>
            <div className="badge-pill">
              <span>Layanan Unggulan</span>
            </div>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>Keahlian Rekayasa Software Kami</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Dari sistem manajemen institusi hingga aplikasi berskala enterprise, kami menghadirkan solusi teknologi yang handal.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px 26px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eef2ff', color: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '18px' }}>
                💻
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Custom Web Application</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Pengembangan aplikasi web berbasis React, Node.js, dan database relasional dengan performa tinggi dan desain responsif.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px 26px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '18px' }}>
                📱
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Mobile App Ready (Android)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Integrasi Capacitor dan PWA untuk memungkinkan sistem Anda langsung dikemas menjadi aplikasi Android (.apk) siap pakai.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px 26px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '18px' }}>
                🖧
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Multi-Domain Architecture</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Routing subdomain Nginx cerdas untuk mendistribusikan lalu lintas produk mandiri di atas satu server database terpadu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SIMULATOR */}
      <section style={{ padding: '0 0 90px' }}>
        <div className="container">
          <DomainSimulator onSelectProduct={onSelectProduct} />
        </div>
      </section>

      {/* 5. CONSULTATION / CONTACT */}
      <section id="contact-section" style={{ padding: '80px 0', background: '#ffffff', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '14px' }}>Mulai Konsultasikan Kebutuhan Software Anda</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '32px' }}>
            Diskusikan sistem custom, aplikasi sekolah, atau digitalisasi layanan publik bersama tim pengembang Devorme.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="mailto:contact@devorme.site" className="btn btn-primary" style={{ padding: '14px 30px' }}>
              ✉ Hubungi Kami via Email
            </a>
            <button className="btn btn-secondary" onClick={onNavigateToAdmin} style={{ padding: '14px 24px' }}>
              Masuk ke Portal Admin Devorme
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
