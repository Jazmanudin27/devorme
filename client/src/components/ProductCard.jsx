import React from 'react';

export default function ProductCard({ product, onSelectProduct }) {
  return (
    <article className="product-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 600 }}>
          {product.category}
        </span>
        <span className="domain-pill">
          🌐 {product.domain}
        </span>
      </div>

      <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#ffffff' }}>
        {product.name}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', flex: 1 }}>
        {product.tagline}
      </p>

      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.8rem', color: '#cbd5e1' }}>
        <span style={{ color: 'var(--text-dim)' }}>Database Server: </span>
        <code style={{ color: '#38bdf8' }}>{product.dbSchema}</code>
      </div>

      <button 
        className="btn btn-primary"
        style={{ width: '100%', padding: '11px', fontSize: '0.9rem' }}
        onClick={() => onSelectProduct(product.id)}
      >
        <span>Buka Website https://{product.domain}</span>
        <span>→</span>
      </button>
    </article>
  );
}
