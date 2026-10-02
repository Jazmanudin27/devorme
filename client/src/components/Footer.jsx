import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-leap">
      <div className="container">
        <div className="footer-top-grid">
          <div>
            <div className="footer-brand-title">
              DEVOR<span style={{ color: 'var(--orange-primary)' }}>ME</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '340px', marginBottom: '20px' }}>
              Solusi digitalisasi dan ekosistem software multi-subdomain terintegrasi satu server dan database MySQL terpusat.
            </p>
            <div className="server-pill">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
              <span>Server Host: 31.97.109.165 (Online)</span>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Solusi Produk</h4>
            <ul className="footer-links-list">
              <li><a href="https://e-sekolah.devorme.site" target="_blank" rel="noreferrer">E-Sekolah Cloud</a></li>
              <li><a href="https://dis.devorme.site" target="_blank" rel="noreferrer">DIS Smart System</a></li>
              <li><a href="#solusi-produk">Custom Software ERP</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Perusahaan</h4>
            <ul className="footer-links-list">
              <li><a href="#tentang-kami">Tentang Devorme</a></li>
              <li><a href="#kontak">Hubungi Kami</a></li>
              <li><a href="mailto:info@devorme.site">info@devorme.site</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Kontak & Alamat</h4>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '10px' }}>
              Surabaya & Jakarta, Indonesia
            </p>
            <p style={{ fontSize: '0.88rem', color: '#fbbf24', fontWeight: 700 }}>
              📞 0812-2233-2376
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', fontSize: '0.82rem' }}>
          <div>&copy; 2026 Devorme Technologies Inc. All rights reserved.</div>
          <div style={{ color: '#64748b' }}>Domain Utama: devorme.site • Subdomain Ecosystem</div>
        </div>
      </div>
    </footer>
  );
}
