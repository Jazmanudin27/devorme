import React, { useEffect, useState } from 'react';
import { productService } from '../api/productService';

export default function ProductDetailView({ productId, onBackToCompany }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      const data = await productService.getProductById(productId);
      setProduct(data);
      setLoading(false);
    }
    fetchDetail();
  }, [productId]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Menghubungkan ke server database untuk produk {productId}...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Produk tidak ditemukan</h2>
        <button className="btn btn-primary" onClick={onBackToCompany} style={{ marginTop: '20px' }}>
          Kembali ke Website Utama Devorme
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Top Banner */}
      <div style={{ background: '#eff6ff', borderBottom: '1px solid #bfdbfe', padding: '10px 20px', textAlign: 'center', fontSize: '0.88rem', color: '#0369a1', fontWeight: 600 }}>
        📁 Portofolio Produk Devorme: <strong>https://{product.domain}</strong> — Akses Uji Coba & Demo Melalui WhatsApp
      </div>

      <div className="container" style={{ padding: '50px 24px' }}>
        <button 
          onClick={onBackToCompany}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 600 }}
        >
          ← Kembali ke Website Induk devorme.site
        </button>

        {/* Product Brand Header */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '40px', boxShadow: 'var(--shadow-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', marginBottom: '50px' }}>
          <div>
            <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '99px', background: '#eef2ff', color: 'var(--accent-indigo)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '12px' }}>
              PORTOFOLIO RESMI DEVORME
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#0f172a' }}>{product.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '650px', lineHeight: 1.6 }}>{product.tagline}</p>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px 28px', borderRadius: '16px' }}>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>STATUS SERVER DATABASE</div>
            <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }}></span>
              Online: MySQL Server
            </div>
            <div style={{ color: 'var(--accent-indigo)', fontWeight: 600, fontSize: '0.9rem', marginTop: '6px' }}>
              DB: {product.db_schema || product.serverDatabase || 'devorme'}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <h3 style={{ fontSize: '1.6rem', marginBottom: '24px' }}>Fitur Unggulan {product.name}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {(product.features || [
            "Sinkronisasi database realtime di server",
            "Autentikasi terpusat Single Sign-On (SSO)",
            "Dukungan aplikasi mobile Android ready",
            "Keamanan enkripsi data setingkat enterprise"
          ]).map((feat, idx) => (
            <div key={idx} style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '14px' }}>⚡</div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '8px', color: '#0f172a' }}>{feat}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Seluruh data transaksi dan entri operasional tersimpan langsung di basis data MySQL server.
              </p>
            </div>
          ))}
        </div>

        {/* Request Demo via WhatsApp */}
        <div style={{ background: 'linear-gradient(135deg, #eef5ff 0%, #dbeafe 100%)', border: '1px solid #bfdbfe', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', color: 'var(--navy-dark)' }}>Ingin Mencoba Demo {product.name}?</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto 24px', fontSize: '1.02rem', lineHeight: 1.6 }}>
            Akses demo dan kredensial uji coba untuk domain <strong>{product.domain}</strong> diberikan secara terarah. Silakan hubungi kami via WhatsApp untuk mendapatkan akses demo langsung.
          </p>
          <a 
            href={`https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20ingin%20meminta%20akses%20demo%20untuk%20${encodeURIComponent(product.name)}%20(${product.domain})`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-blue"
            style={{ padding: '14px 32px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            💬 Request Akses Demo via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
