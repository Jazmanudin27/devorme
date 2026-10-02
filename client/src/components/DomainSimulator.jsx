import React, { useState } from 'react';

export default function DomainSimulator({ onSelectProduct }) {
  const [selectedDomain, setSelectedDomain] = useState('devorme.site');

  const domainData = {
    'devorme.site': {
      title: 'Devorme Technologies Inc. (Website Utama)',
      desc: 'Portal utama perusahaan yang menampilkan portofolio produk dan mengarahkan pengguna ke masing-masing subdomain produk.',
      db: 'devorme'
    },
    'e-sekolah.devorme.site': {
      title: 'E-Sekolah Cloud (Subdomain Produk 1)',
      desc: 'Website khusus operasional sekolah: presensi guru & siswa, kenaikan kelas, penilaian, dan jadwal pelajaran.',
      db: 'e_sekolah_db'
    },
    'dis.devorme.site': {
      title: 'DIS Smart System (Subdomain Produk 2)',
      desc: 'Platform Digital Information System & Layanan Publik terpadu dengan pelaporan realtime.',
      db: 'dis_db'
    }
  };

  const current = domainData[selectedDomain];

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', marginTop: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ fontSize: '1.2rem' }}>⚡ Simulator Transisi Domain & Database Server</h3>
        <select 
          value={selectedDomain} 
          onChange={(e) => setSelectedDomain(e.target.value)}
          style={{ background: 'var(--bg-tertiary)', color: '#fff', border: '1px solid var(--border-subtle)', padding: '8px 14px', borderRadius: '8px', outline: 'none' }}
        >
          <option value="devorme.site">Website Utama (devorme.site)</option>
          <option value="e-sekolah.devorme.site">Produk 1: E-Sekolah (e-sekolah.devorme.site)</option>
          <option value="dis.devorme.site">Produk 2: DIS System (dis.devorme.site)</option>
        </select>
      </div>

      <div style={{ background: '#090c12', border: '1px solid var(--border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ background: '#111622', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
          <div style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', color: '#38bdf8', fontFamily: 'monospace', flex: 1, marginLeft: '10px' }}>
            🔒 https://{selectedDomain}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontFamily: 'monospace' }}>DB: {current.db}</span>
        </div>

        <div style={{ padding: '28px', textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{current.title}</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '600px', margin: '0 auto 16px' }}>{current.desc}</p>
          {selectedDomain !== 'devorme.com' && (
            <button 
              className="btn btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              onClick={() => onSelectProduct(selectedDomain.split('.')[0])}
            >
              Buka Halaman Produk Ini
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
