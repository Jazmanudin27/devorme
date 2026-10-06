import React from 'react';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Dr. Supriyadi, M.Pd",
      role: "Kepala Sekolah Instansi Pendidikan",
      org: "SMK Negeri 4 Surabaya",
      avatar: "👨‍🏫",
      text: "Implementasi E-Sekolah dari Devorme mempermudah rekap presensi 1.200 siswa dan pencetakan e-rapor secara otomatis. Servernya terbukti stabil tanpa kendala saat pembagian rapor."
    },
    {
      name: "Ir. Bambang Hariyanto",
      role: "Kabid Teknologi Informasi",
      org: "Dinas Komunikasi & Informatika",
      avatar: "👨‍💼",
      text: "DIS Smart System mempercepat alur surat & approval dinas kami dari yang tadinya 3 hari menjadi hitungan jam. Akses domain mandiri juga membuat instansi kami terlihat lebih profesional."
    },
    {
      name: "apt. Anita Rahmawati, S.Farm",
      role: "Pemilik Jejaring Farmasi",
      org: "Apotek Medika Sejahtera",
      avatar: "👩‍⚕️",
      text: "Fitur warning obat expired dan kasir POS QRIS dinamis Devorme sangat membantu audit stok kami. Transaksi kasir lancar walau saat antrean padat."
    }
  ];

  return (
    <section id="testimoni" style={{ padding: '84px 0', background: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
          <div className="hero-pill-blue">
            <span>🌟 Kepercayaan Klien</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '14px', color: '#0f172a' }}>
            Apa Kata Pengguna Ekosistem Devorme?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Testimoni jujur dari instansi dan perusahaan yang telah mengadopsi platform kami.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {reviews.map((r, idx) => (
            <div key={idx} style={{ background: 'var(--bg-warm)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ color: '#334155', fontSize: '0.96rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '24px' }}>
                "{r.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div style={{ fontSize: '2rem', background: '#ffffff', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-subtle)' }}>
                  {r.avatar}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '2px' }}>{r.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{r.role} • <strong>{r.org}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
