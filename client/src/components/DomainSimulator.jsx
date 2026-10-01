import React, { useState } from 'react';

export default function DomainSimulator({ onSelectProduct }) {
  const [selectedDomain, setSelectedDomain] = useState('devorme.com');

  const domainData = {
    'devorme.com': {
      title: 'Devorme Technologies Inc. (Website Induk)',
      desc: 'Menampilkan identitas perusahaan induk, portofolio produk, dan mengarahkan klien ke domain khusus.',
      db: 'devorme_master'
    },
    'flowdesk.id': {
      title: 'FlowDesk ERP Portal (Domain Khusus)',
      desc: 'Website mandiri untuk manajemen supply chain, invoice korporasi, dan inventory gudang.',
      db: 'schema_flowdesk_prod'
    },
    'paynexus.com': {
      title: 'PayNexus Gateway (Domain Khusus)',
      desc: 'Platform pembayaran digital, faktur otomatis, dan QRIS dinamis berenkripsi tinggi.',
      db: 'schema_paynexus_secure'
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
          <option value="devorme.com">Website Utama (devorme.com)</option>
          <option value="flowdesk.id">Produk 1: FlowDesk (flowdesk.id)</option>
          <option value="paynexus.com">Produk 2: PayNexus (paynexus.com)</option>
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
