import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-leap">
      <div className="container">
        <div className="footer-top-grid">
          <div>
            <div className="footer-brand-title" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img 
                src="/Logo.png" 
                alt="Devorme Logo" 
                style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 16px rgba(0, 102, 255, 0.25)' }} 
              />
              <div>
                DEVOR<span style={{ color: 'var(--cyan-accent)' }}>ME</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '340px', margin: '14px 0 20px', color: '#94a3b8' }}>
              Solusi digitalisasi dan ekosistem software multi-subdomain terintegrasi satu server dan database MySQL terpusat.
            </p>
            <div className="server-pill">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
              <span>Server Host: 31.97.109.165 (Online)</span>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Portofolio Produk</h4>
            <ul className="footer-links-list">
              <li><a href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20ingin%20meminta%20akses%20demo%20E-Sekolah%20Cloud" target="_blank" rel="noreferrer">E-Sekolah Cloud (Demo via WA)</a></li>
              <li><a href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20ingin%20meminta%20akses%20demo%20DIS%20Smart%20System" target="_blank" rel="noreferrer">DIS Smart System (Demo via WA)</a></li>
              <li><a href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20konsultasi%20software%20custom" target="_blank" rel="noreferrer">Custom Software ERP (via WA)</a></li>
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
            <p style={{ fontSize: '0.9rem', color: 'var(--cyan-accent)', fontWeight: 700 }}>
              📞 0812-2233-2376
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', fontSize: '0.82rem' }}>
          <div>&copy; 2026 Devorme Technologies Inc. All rights reserved.</div>
          <div style={{ color: '#64748b' }}>Devorme Software Ecosystem • Central Enterprise Database</div>
        </div>
      </div>
    </footer>
  );
}
