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
      {/* Top Banner indicating Dedicated Domain Simulation */}
      <div style={{ background: 'rgba(56, 189, 248, 0.12)', borderBottom: '1px solid rgba(56, 189, 248, 0.25)', padding: '10px 20px', textAlign: 'center', fontSize: '0.85rem', color: '#7dd3fc' }}>
        🌐 Anda sedang melihat tampilan domain khusus: <strong>https://{product.domain}</strong> — Terhubung ke Database Server Terpusat Devorme
      </div>

      <div className="container" style={{ padding: '50px 24px' }}>
        <button 
          onClick={onBackToCompany}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}
        >
          ← Kembali ke Website Induk Devorme.com
        </button>

        {/* Product Brand Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '50px' }}>
          <div>
            <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: '99px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', fontSize: '0.8rem', fontWeight: 600, marginBottom: '10px' }}>
              PRODUK RESMI DEVORME
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>{product.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '650px' }}>{product.tagline}</p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '16px 24px', borderRadius: '14px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
            <div style={{ color: 'var(--text-dim)', marginBottom: '4px' }}>STATUS KONEKSI SERVER:</div>
            <div style={{ color: '#34d399', fontWeight: 600 }}>● Online: 103.144.xxx.xxx</div>
            <div style={{ color: '#38bdf8', marginTop: '6px' }}>DB: {product.dbSchema || product.serverDatabase}</div>
          </div>
        </div>

        {/* Features Grid */}
        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Fitur Unggulan {product.name}</h3>
        <div style={{ display: 'grid', gridTemplate-columns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {(product.features || [
            "Manajemen data operasional realtime",
            "Autentikasi terpusat Single Sign-On (SSO)",
            "Dukungan aplikasi mobile Android/iOS",
            "Keamanan enkripsi data database enterprise"
          ]).map((feat, idx) => (
            <div key={idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>⚡</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{feat}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Data disinkronkan secara langsung ke database pusat di server.
              </p>
            </div>
          ))}
        </div>

        {/* Action Call */}
        <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Mulai Menggunakan {product.name} Hari Ini</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 24px' }}>
            Daftarkan perusahaan Anda dan akses dashboard operasional langsung di domain <strong>https://{product.domain}</strong>.
          </p>
          <button className="btn btn-primary" onClick={() => alert(`Akses pendaftaran untuk domain https://${product.domain} aktif!`)}>
            Mulai Uji Coba Gratis
          </button>
        </div>
      </div>
    </div>
  );
}
