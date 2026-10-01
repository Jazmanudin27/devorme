import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '4px' }}>
            Devorme<span style={{ color: '#06b6d4' }}>.</span>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            Ekosistem Software Multi-Domain dengan Database Server Terpusat.
          </p>
        </div>

        <div className="server-pill">
          <span className="server-dot"></span>
          <span>Central Server API: Online (Port 5000)</span>
        </div>
      </div>
    </footer>
  );
}
