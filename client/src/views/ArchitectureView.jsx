import React from 'react';

export default function ArchitectureView({ onBackToCompany }) {
  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <button 
        onClick={onBackToCompany}
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}
      >
        ← Kembali ke Beranda
      </button>

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '14px' }}>Arsitektur Sistem & Alur Database</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Panduan teknis bagi tim pengembang mengenai bagaimana multi-domain berkomunikasi dengan server backend dan basis data terpusat.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '50px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '30px' }}>
          <div style={{ fontSize: '1.8rem', color: '#6366f1', marginBottom: '12px' }}>1. DNS & Reverse Proxy (Nginx)</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
            Setiap nama domain (<code>devorme.com</code>, <code>flowdesk.id</code>, <code>paynexus.com</code>) memiliki DNS A Record yang mengarah ke IP Server VPS yang sama. Nginx kemudian bertugas memetakan domain ke service frontend/backend yang sesuai.
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '30px' }}>
          <div style={{ fontSize: '1.8rem', color: '#06b6d4', marginBottom: '12px' }}>2. Central API Gateway (Express.js)</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
            Terletak pada folder <code>server/</code>. Bertindak sebagai gerbang terpusat untuk autentikasi user (Single Sign-On JWT) dan melayani seluruh endpoint CRUD untuk website maupun aplikasi mobile.
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '30px' }}>
          <div style={{ fontSize: '1.8rem', color: '#10b981', marginBottom: '12px' }}>3. Multi-Schema Database Server</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
            Database PostgreSQL/MySQL menyimpan data dengan skema terisolasi (misal: <code>schema_flowdesk_prod</code>, <code>schema_paynexus_secure</code>) sehingga data tiap produk tetap aman dan mudah di-backup.
          </p>
        </div>
      </div>
    </div>
  );
}
