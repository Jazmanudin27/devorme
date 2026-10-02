import React from 'react';

export default function ProductCard({ product, onSelectProduct }) {
  const isEsekolah = product.slug === 'e-sekolah';

  return (
    <article className="product-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.5px' }}>
          {product.category}
        </span>
        <span className="domain-pill">
          🌐 {product.domain}
        </span>
      </div>

      <div className="product-icon-wrapper" style={{ background: product.icon_bg || 'linear-gradient(135deg, #4f46e5, #0284c7)' }}>
        {isEsekolah ? (
          <span style={{ fontSize: '1.6rem' }}>🎓</span>
        ) : (
          <span style={{ fontSize: '1.6rem' }}>🏛️</span>
        )}
      </div>

      <h3 style={{ fontSize: '1.45rem', marginBottom: '8px', color: '#0f172a' }}>
        {product.name}
      </h3>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, flex: 1 }}>
        {product.tagline}
      </p>

      {/* Feature Bullets */}
      <ul className="product-features-list">
        <li>
          <span className="check-icon">✓</span>
          <span>Database MySQL: <strong>{product.db_schema || 'devorme'}</strong></span>
        </li>
        <li>
          <span className="check-icon">✓</span>
          <span>Dukungan Aplikasi Mobile Android Ready</span>
        </li>
        <li>
          <span className="check-icon">✓</span>
          <span>Subdomain Khusus <strong>{product.domain}</strong></span>
        </li>
      </ul>

      <div style={{ display: 'flex', gap: '10px' }}>
        <a 
          href={`https://${product.domain}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ flex: 1, padding: '11px', fontSize: '0.88rem' }}
        >
          <span>Kunjungi Website Produk</span>
          <span>↗</span>
        </a>
        <button 
          className="btn btn-secondary"
          style={{ padding: '11px 16px', fontSize: '0.88rem' }}
          onClick={() => onSelectProduct(product.id || product.slug)}
        >
          Detail
        </button>
      </div>
    </article>
  );
}
