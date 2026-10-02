import React from 'react';

export default function ArchitectureView({ onBackToCompany }) {
  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <button 
        onClick={onBackToCompany}
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 600 }}
      >
        ← Kembali ke Beranda devorme.site
      </button>

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div className="badge-pill">
          <span>Infrastruktur & Arsitektur Sistem</span>
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Arsitektur Subdomain & Database Terpusat</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.7 }}>
          Panduan teknis alur komunikasi antara Website Utama (<code>devorme.site</code>), Subdomain Produk (<code>e-sekolah.devorme.site</code>), Nginx Reverse Proxy, dan Database Server MySQL.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '60px' }}>
        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '36px', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eef2ff', color: 'var(--accent-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '18px' }}>
            🌐
          </div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: '#0f172a' }}>1. Nginx Subdomain Routing</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Setiap subdomain (<code>devorme.site</code>, <code>e-sekolah.devorme.site</code>, <code>dis.devorme.site</code>) diarahkan ke IP VPS Anda melalui DNS Record A. Nginx kemudian memetakan domain ke folder frontend (dist) dan port API yang sesuai.
          </p>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '36px', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '18px' }}>
            ⚡
          </div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: '#0f172a' }}>2. Central API Server (Node.js)</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Berjalan pada port <strong>5001</strong> di server. Melayani endpoint CRUD, sinkronisasi data antar modul, serta keamanan Single Sign-On (SSO) berbasis JWT token.
          </p>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '36px', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '18px' }}>
            🗄️
          </div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: '#0f172a' }}>3. Database MySQL Terpusat</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Database <code>devorme</code> di port 3306 menyimpan data master pengguna, katalog produk, dan mencatat audit log aktivitas akses seluruh produk dalam satu tempat.
          </p>
        </div>
      </div>
    </div>
  );
}
