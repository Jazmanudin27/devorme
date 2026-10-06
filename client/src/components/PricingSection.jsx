import React from 'react';

export default function PricingSection({ onSelectProduct }) {
  const plans = [
    {
      name: "Starter / Sekolah",
      price: "Rp 1.500.000",
      period: "/ bulan",
      subtitle: "Cocok untuk Sekolah, Klinik & Apotek Lokal",
      features: [
        "1 Subdomain Mandiri (cth: sekolah.devorme.site)",
        "Database Server Terpusat Shared",
        "Hingga 500 Pengguna Aktif",
        "Modul Presensi & Penilaian Rapor",
        "Sertifikat SSL & Dukungan Teknis Email"
      ],
      isPopular: false,
      buttonText: "Pilih Paket Starter"
    },
    {
      name: "Professional / Dinas",
      price: "Rp 3.500.000",
      period: "/ bulan",
      subtitle: "Ideal untuk Instansi Pemerintah & Dinas Daerah",
      features: [
        "Subdomain Custom / Domain Mandiri (.go.id / .id)",
        "Database Resource Dedicated",
        "Pengguna & Kuota Dokumen Tanpa Batas",
        "Workflow Approval Dokumen Bertingkat",
        "Integrasi Pelaporan Publik & Mobile PWA",
        "Support Prioritas 24/7 WhatsApp"
      ],
      isPopular: true,
      buttonText: "Pilih Paket Professional"
    },
    {
      name: "Enterprise ERP",
      price: "Custom Quote",
      period: "",
      subtitle: "Untuk Perusahaan Manufaktur & Distribusi Multi-Gudang",
      features: [
        "Skema Database Isolasi Khusus VPS Dedicated",
        "Manajemen Multi-Warehouse & Multi-Cabang",
        "Integrasi Payment Gateway (QRIS, VA, CC)",
        "Custom Feature Engineering & API Integration",
        "SLA Uptime Guarantee 99.99%",
        "Dedicated Solutions Engineer & On-Site Training"
      ],
      isPopular: false,
      buttonText: "Konsultasi Enterprise"
    }
  ];

  return (
    <section id="harga" style={{ padding: '84px 0', background: 'var(--bg-warm)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
          <div className="hero-pill-blue">
            <span>💎 Paket Harga & Lisensi Lisensi</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '14px', color: '#0f172a' }}>
            Investasi Transparan untuk Sistem Andal
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Pilih skema lisensi yang sesuai dengan skala operasional institusi Anda.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: '#ffffff', 
                borderRadius: '20px', 
                padding: '36px 28px', 
                border: plan.isPopular ? '2px solid #3b82f6' : '1px solid var(--border-color)', 
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: plan.isPopular ? '0 12px 30px rgba(59, 130, 246, 0.15)' : 'var(--shadow-card)'
              }}
            >
              {plan.isPopular && (
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', color: '#ffffff', fontSize: '0.78rem', fontWeight: 700, padding: '4px 16px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🔥 Paling Banyak Dipilih
                </div>
              )}

              <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '6px' }}>{plan.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '20px', minHeight: '40px' }}>{plan.subtitle}</p>

              <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
                <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a' }}>{plan.price}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}> {plan.period}</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: '#334155' }}>
                    <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span> {f}
                  </li>
                ))}
              </ul>

              <a 
                href="#kontak" 
                className={plan.isPopular ? "btn-blue" : "btn-navy"}
                style={{ textAlign: 'center', width: '100%', padding: '12px 20px', fontSize: '0.95rem' }}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
