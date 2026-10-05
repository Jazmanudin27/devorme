import React, { useState } from 'react';

export default function DomainSimulator({ onSelectProduct }) {
  const [selectedModule, setSelectedModule] = useState('portal');

  const moduleData = {
    'portal': {
      title: 'Devorme Technologies Inc. (Portal Utama & Portofolio)',
      displayPath: '🔒 devorme-ecosystem://master-portal',
      desc: 'Portal utama yang menampilkan identitas perusahaan dan rangkuman seluruh portofolio produk software.',
      db: 'devorme_master_db (Central Master)',
      color: '#0066ff',
      badge: 'Portal Utama'
    },
    'e-sekolah': {
      title: 'E-Sekolah Cloud Platform (Sistem Akademik & Presensi)',
      displayPath: '🔒 devorme-ecosystem://e-sekolah-suite (Private Demo)',
      desc: 'Aplikasi manajemen akademik: rekap presensi guru & siswa, manajemen kenaikan kelas, penilaian, dan jadwal pelajaran.',
      db: 'e_sekolah_db (Tersinkronisasi)',
      color: '#0284c7',
      badge: 'Modul Sekolah'
    },
    'dis': {
      title: 'DIS Smart System (Digital Information System)',
      displayPath: '🔒 devorme-ecosystem://dis-smart-system (Private Demo)',
      desc: 'Platform Digital Information System & Pelaporan Publik terpadu dengan approval bertingkat dan analitik instansi.',
      db: 'dis_db (Tersinkronisasi)',
      color: '#7c3aed',
      badge: 'Modul Instansi'
    }
  };

  const current = moduleData[selectedModule];

  return (
    <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '36px', boxShadow: 'var(--shadow-card)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div className="badge-pill" style={{ marginBottom: '8px' }}>
            <span>⚡ Simulator Interaktif Ekosistem Terpadu</span>
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>Bagaimana Sistem Terintegrasi di 1 Server?</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>Pilih modul di bawah untuk melihat perbedaan fungsi dan sinkronisasi datanya di server VPS:</p>
        </div>

        <select 
          value={selectedModule} 
          onChange={(e) => setSelectedModule(e.target.value)}
          style={{ background: '#f8fafc', color: '#0f172a', border: '1.5px solid var(--accent-indigo)', padding: '10px 18px', borderRadius: '10px', outline: 'none', fontWeight: 600, fontSize: '0.92rem', cursor: 'pointer' }}
        >
          <option value="portal">Modul 1: Portal Utama Devorme</option>
          <option value="e-sekolah">Modul 2: E-Sekolah Cloud Platform</option>
          <option value="dis">Modul 3: DIS Smart System</option>
        </select>
      </div>

      {/* Simulated Browser Bar (Apple/Chrome Style) */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ background: '#ffffff', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
          </div>

          <div style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '6px 16px', borderRadius: '8px', fontSize: '0.85rem', color: '#0f172a', fontFamily: 'monospace', flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <strong style={{ color: current.color }}>{current.displayPath}</strong>
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
            <span>Target Basis Data MySQL Server VPS:</span>
            <code style={{ background: '#eef2ff', color: '#0066ff', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              {current.db}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
