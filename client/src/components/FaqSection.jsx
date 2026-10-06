import React, { useState } from 'react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "Berapa lama proses deploy dan setup aplikasi di Devorme?",
      a: "Untuk produk siap pakai seperti E-Sekolah, DIS, atau POS Apotek, proses deploy subdomain mandiri dan migrasi data awal hanya membutuhkan waktu 1-2 hari kerja. Untuk sistem custom enterprise, pengerjaan berkisar 2-4 minggu."
    },
    {
      q: "Apakah institusi kami bisa menggunakan domain khusus kami sendiri (cth: sekolah.sch.id / dinas.go.id)?",
      a: "Sangat bisa! Selain subdomain default (cth: namasekolah.devorme.site), kami menyediakan bantuan pemetaan CNAME/A-Record DNS ke domain resmi milik instansi Anda."
    },
    {
      q: "Bagaimana dengan kepemilikan data dan privasi basis data server?",
      a: "Data sepenuhnya milik instansi Anda. Setiap produk berjalan pada skema database terisolasi dengan enkripsi SSL 256-bit dan backup otomatis harian di server VPS."
    },
    {
      q: "Apakah aplikasi bisa diakses dari smartphone atau di-install sebagai file APK Android?",
      a: "Ya. Seluruh tampilan aplikasi teroptimasi penuh untuk perangkat seluler (Progressive Web App / PWA) dan kami menyediakan file APK Android untuk kemudahan instalasi di ponsel staf/siswa/klien."
    },
    {
      q: "Bagaimana bentuk dukungan teknis setelah aplikasi berjalan?",
      a: "Tim teknis Devorme siap membantu 24/7 melalui WhatsApp, email, maupun sesi remote assist jika terdapat masalah operasional atau kebutuhan pembaruan sistem."
    }
  ];

  return (
    <section id="faq" style={{ padding: '84px 0', background: 'var(--bg-warm)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', margin: '0 auto 48px' }}>
          <div className="hero-pill-blue">
            <span>❓ Pertanyaan Sering Diajukan</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '14px', color: '#0f172a' }}>
            FAQ & Informasi Layanan
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Semua yang perlu Anda ketahui tentang implementasi software Devorme.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '14px', 
                  border: '1px solid var(--border-color)', 
                  overflow: 'hidden',
                  transition: 'all 0.2s ease' 
                }}
              >
                <button 
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  style={{ 
                    width: '100%', 
                    padding: '20px 24px', 
                    display: 'flex', 
                    justify: 'space-between', 
                    alignItems: 'center', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '1.08rem',
                    fontWeight: 700,
                    color: '#0f172a'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.4rem', color: '#3b82f6', transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ↓
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 24px 20px 24px', color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.7, borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
