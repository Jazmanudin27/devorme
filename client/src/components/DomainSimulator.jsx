import React, { useState } from 'react';

export default function DomainSimulator({ onSelectProduct }) {
  const [selectedDomain, setSelectedDomain] = useState('devorme.site');

  const domainData = {
    'devorme.site': {
      title: 'Devorme Technologies Inc. (Website Utama Perusahaan)',
      desc: 'Portal utama yang menampilkan identitas perusahaan, portofolio produk, dan mengarahkan klien ke masing-masing subdomain aplikasi.',
      db: 'devorme (Central Master)',
      color: '#4f46e5',
      badge: 'Website Utama'
    },
    'e-sekolah.devorme.site': {
      title: 'E-Sekolah Cloud (Subdomain Khusus Produk Sekolah)',
      desc: 'Aplikasi manajemen akademik: rekap presensi guru & siswa, manajemen kenaikan kelas, penilaian, dan jadwal pelajaran.',
      db: 'e_sekolah_db',
      color: '#0284c7',
      badge: 'Subdomain Aplikasi'
    },
    'dis.devorme.site': {
      title: 'DIS Smart System (Subdomain Khusus Produk DIS)',
      desc: 'Platform Digital Information System & Pelaporan Publik terpadu dengan pelaporan realtime dan audit trail.',
      db: 'dis_db',
      color: '#7c3aed',
      badge: 'Subdomain Aplikasi'
    }
  };

  const current = domainData[selectedDomain];

  return (
    <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '36px', boxShadow: 'var(--shadow-card)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div className="badge-pill" style={{ marginBottom: '8px' }}>
            <span>⚡ Simulator Interaktif Alur Domain</span>
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>Bagaimana Subdomain Devorme Bekerja?</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Pilih domain di bawah untuk melihat perbedaan fungsi dan koneksi databasenya di server VPS:</p>
        </div>

        <select 
          value={selectedDomain} 
          onChange={(e) => setSelectedDomain(e.target.value)}
          style={{ background: '#f8fafc', color: '#0f172a', border: '1.5px solid var(--accent-indigo)', padding: '10px 18px', borderRadius: '10px', outline: 'none', fontWeight: 600, fontSize: '0.92rem', cursor: 'pointer' }}
        >
          <option value="devorme.site">Website Utama: devorme.site</option>
          <option value="e-sekolah.devorme.site">Subdomain 1: e-sekolah.devorme.site</option>
          <option value="dis.devorme.site">Subdomain 2: dis.devorme.site</option>
        </select>
      </div>

      {/* Simulated Browser Bar (Bright Apple/Chrome Style) */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ background: '#ffffff', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
          </div>

          <div style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '6px 16px', borderRadius: '8px', fontSize: '0.85rem', color: '#0f172a', fontFamily: 'monospace', flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#16a34a' }}>🔒</span>
            <strong style={{ color: current.color }}>https://{selectedDomain}</strong>
          </div>

          <span style={{ fontSize: '0.78rem', background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '99px', fontWeight: 600 }}>
            {current.badge}
          </span>
        </div>

        {/* Viewport Content */}
        <div style={{ padding: '36px', textAlign: 'center', background: '#ffffff' }}>
          <h4 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#0f172a' }}>{current.title}</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '620px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            {current.desc}
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 18px', borderRadius: '10px', fontSize: '0.85rem', color: '#475569' }}>
            <span>Target Database MySQL Server:</span>
            <code style={{ background: '#eef2ff', color: '#4f46e5', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              {current.db}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
