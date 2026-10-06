import React from 'react';

export default function ServicesSection() {
  const services = [
    {
      icon: "💻",
      title: "Pengembangan Web & Portal Custom",
      description: "Pembuatan aplikasi web terpusat berbasis React & Node.js yang cepat, responsif, dan terintegrasi dengan REST API/GraphQL."
    },
    {
      icon: "📱",
      title: "Aplikasi Mobile Android & PWA",
      description: "Solusi aplikasi seluler native/PWA siap pakai untuk presensi, kasir POS, dan pelaporan lapangan langsung dari smartphone."
    },
    {
      icon: "☁️",
      title: "Arsitektur Server & Multi-Domain",
      description: "Setup server VPS, konfigurasi Nginx Reverse Proxy, Wildcard SSL, dan pemetaan subdomain otomatis (cth: instansi.devorme.site)."
    },
    {
      icon: "🗄️",
      title: "Database Clustered & Single Sign-On (SSO)",
      description: "Perancangan skema MySQL/PostgreSQL terpusat dengan sistem otentikasi SSO terpadu untuk efisiensi resource data."
    },
    {
      icon: "🛡️",
      title: "Sertifikasi Keamanan & Maintenance",
      description: "Layanan pemeliharaan sistem 24/7, enkripsi data, sertifikat SSL otomatis, dan backup terstruktur berkala."
    },
    {
      icon: "📊",
      title: "Integrasi AI & Analytics Realtime",
      description: "Modul prediksi penjualan, analitik kinerja instansi, dan deteksi anomali transaksi otomatis berteknologi AI."
    }
  ];

  return (
    <section id="layanan" style={{ padding: '84px 0', background: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
          <div className="hero-pill-blue">
            <span>⚙️ Layanan & Solusi Software</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '14px', color: '#0f172a' }}>
            Solusi Rekayasa Software End-to-End
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Kami membantu instansi, sekolah, dan perusahaan membangun infrastruktur digital mandiri dan terukur.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {services.map((s, idx) => (
            <div key={idx} style={{ background: 'var(--bg-warm)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '32px', transition: 'all 0.3s ease' }} className="bento-card-hover">
              <div style={{ fontSize: '2.2rem', marginBottom: '16px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '10px' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6 }}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
