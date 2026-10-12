import React, { useState } from 'react';

export default function ServicesView({ onBackToHome }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Semua Pelayanan', icon: '🌟' },
    { id: 'web', label: 'Web & Portal', icon: '💻' },
    { id: 'mobile', label: 'Mobile Apps', icon: '📱' },
    { id: 'cloud', label: 'Cloud & Server', icon: '☁️' },
    { id: 'database', label: 'Database & API', icon: '🗄️' },
    { id: 'maintenance', label: 'Keamanan & Support', icon: '🛡️' }
  ];

  const servicesData = [
    {
      id: 'custom-web',
      category: 'web',
      badge: 'Solusi Unggulan',
      icon: '💻',
      title: 'Pengembangan Web Portal & Aplikasi Custom',
      tagline: 'Sistem web enterprise responsif, performa ultra-cepat dengan arsitektur scalable.',
      description: 'Kami membangun website portal dan aplikasi web interaktif skala enterprise dengan stack React, Vite, dan Node.js. Dilengkapi panel admin manajemen konten, otorisasi peran (RBAC), serta antarmuka modern yang nyaman di semua perangkat.',
      deliverables: [
        'Desain antarmuka kustom (UI/UX modern & responsive)',
        'Dashboard admin intuitif dengan visualisasi metrik data',
        'Integrasi REST API / GraphQL dengan kecepatan response tinggi',
        'Keamanan proteksi CSRF, XSS, dan rate limiter aktif'
      ],
      techStack: ['React', 'Node.js', 'Vite', 'Express', 'Tailwind/CSS3'],
      turnaround: '2 - 4 Minggu',
      waMessage: 'Halo Ruang Tech, saya ingin konsultasi mengenai Pelayanan Pengembangan Web Portal Custom.'
    },
    {
      id: 'mobile-app',
      category: 'mobile',
      badge: 'Multi-Platform',
      icon: '📱',
      title: 'Aplikasi Mobile Android Native & PWA Ready',
      tagline: 'Aplikasi mobile ringan, dapat diinstal langsung via APK atau browser PWA.',
      description: 'Solusi mobile application yang dirancang untuk kebutuhan operasional lapangan, kasir POS, presensi siswa/karyawan via GPS & QR Code, hingga sistem absensi yang bekerja secara offline-first.',
      deliverables: [
        'Instalasi paket APK Android mandiri & Progressive Web App (PWA)',
        'Dukungan fitur hardware: Kamera (QR scanner), GPS Geolocation',
        'Push Notification realtime untuk pengumuman atau invoice',
        'Penyimpanan data lokal offline dengan sinkronisasi otomatis'
      ],
      techStack: ['Android APK', 'PWA', 'React Mobile', 'Service Worker'],
      turnaround: '3 - 5 Minggu',
      waMessage: 'Halo Ruang Tech, saya tertarik dengan Pelayanan Pembuatan Aplikasi Mobile Android & PWA.'
    },
    {
      id: 'server-vps',
      category: 'cloud',
      badge: 'Infrastruktur',
      icon: '☁️',
      title: 'Setup Server VPS, Reverse Proxy & Multi-Domain',
      tagline: 'Konfigurasi server mandiri dengan performa 99.98% uptime tanpa ketergantungan pihak ketiga.',
      description: 'Layanan lengkap deployment server VPS Ubuntu/Debian, optimasi web server Nginx Reverse Proxy, routing subdomain dinamis (cth: instansi.ruangtech.site), instalasi sertifikat SSL Wildcard otomatis, serta firewall ufw hardened.',
      deliverables: [
        'Setup Nginx Reverse Proxy & Load Balancer terisolasi',
        'Sertifikat SSL Let\'s Encrypt otomatis perpanjang (Auto-Renew)',
        'Pemetaan multi-subdomain instansi tak terbatas',
        'Konfigurasi Firewall, fail2ban, dan proteksi DDoS dasar'
      ],
      techStack: ['Ubuntu VPS', 'Nginx', 'SSL/TLS', 'PM2', 'Docker'],
      turnaround: '1 - 3 Hari Kerja',
      waMessage: 'Halo Ruang Tech, saya ingin memesan Pelayanan Setup Server VPS & Arsitektur Multi-Domain.'
    },
    {
      id: 'database-sso',
      category: 'database',
      badge: 'Sentralisasi Data',
      icon: '🗄️',
      title: 'Database Terpusat & Single Sign-On (SSO)',
      tagline: 'Satu server database terpadu untuk menghubungkan puluhan produk mandiri.',
      description: 'Arsitektur database relasional MySQL 8.0 / PostgreSQL yang dioptimasi untuk konkurensi tinggi. Terintegrasi dengan sistem otentikasi Single Sign-On (SSO) berbasis JWT token sehingga pengguna hanya butuh 1 akun untuk seluruh ekosistem.',
      deliverables: [
        'Skema database terpusat yang dirancang normalisasi efisien',
        'Autentikasi terpusat SSO (OAuth2 / JWT Token encrypted)',
        'Sistem pencadangan otomatis (Automated Daily Database Backup)',
        'Audit trail log seluruh aktivitas transaksi pengguna'
      ],
      techStack: ['MySQL 8.0', 'PostgreSQL', 'Redis Cache', 'JWT', 'OAuth2'],
      turnaround: '1 - 2 Minggu',
      waMessage: 'Halo Ruang Tech, saya butuh Pelayanan Perancangan Database Terpusat & Single Sign-On.'
    },
    {
      id: 'custom-erp',
      category: 'web',
      badge: 'Solusi Bisnis',
      icon: '💼',
      title: 'Sistem Informasi Manajemen & ERP Custom',
      tagline: 'Digitalisasi alur inventaris, kasir, invoice, dan keuangan perusahaan.',
      description: 'Pengembangan ERP khusus sesuai alur kerja spesifik instansi atau bisnis Anda. Mulai dari manajemen stok barang, multi-cabang, barcode scanning, laporan laba rugi real-time, hingga sistem persetujuan (approval) bertingkat.',
      deliverables: [
        'Modul inventory, kasir POS dinamis & faktur invoice otomatis',
        'Approval bertingkat (Staff -> Supervisor -> Direktur)',
        'Export laporan PDF, Excel, dan format pembukuan akuntansi',
        'Hak akses pengguna berbasis role yang ketat'
      ],
      techStack: ['React', 'Node.js', 'MySQL', 'PDF Generator', 'Excel Export'],
      turnaround: '4 - 8 Minggu',
      waMessage: 'Halo Ruang Tech, saya ingin berdiskusi mengenai Pembuatan Sistem Informasi ERP Custom.'
    },
    {
      id: 'maintenance-sla',
      category: 'maintenance',
      badge: 'Garansi & Support',
      icon: '🛡️',
      title: 'Pemeliharaan Server 24/7 & Monitoring Keamanan',
      tagline: 'Jaminan sistem selalu online, bebas gangguan, dan performa selalu prima.',
      description: 'Layanan purna jual dan maintenance berkesinambungan. Tim engineer kami memantau metrik resource CPU/RAM server secara realtime, audit patch keamanan berkala, penanganan bug instan, serta pemulihan cepat (Disaster Recovery).',
      deliverables: [
        'Monitoring kesehatan server VPS & database 24 jam',
        'Penanganan tiket kendala prioritas via grup WhatsApp khusus',
        'Pembaruan berkala keamanan library & dependensi sistem',
        'Garansi perbaikan bug dan audit performa bulanan'
      ],
      techStack: ['Health Monitoring', 'Log Tracker', 'Backup Scheduler', 'Security Patch'],
      turnaround: 'Kontrak Bulanan / Tahunan',
      waMessage: 'Halo Ruang Tech, saya ingin informasi mengenai Layanan Maintenance & Dukungan Server 24/7.'
    }
  ];

  const filteredServices = activeCategory === 'all'
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory);

  const workflowSteps = [
    {
      step: '01',
      title: 'Konsultasi & Analisis Kebutuhan',
      desc: 'Diskusi mendalam via Zoom/WhatsApp untuk memahami proses bisnis, cakupan fitur, dan target waktu peluncuran tanpa biaya konsultasi.'
    },
    {
      step: '02',
      title: 'Rancangan Arsitektur & UI/UX',
      desc: 'Penyusunan blueprint arsitektur server, skema database, dan prototipe tampilan antarmuka interaktif sebelum penulisan kode dimulai.'
    },
    {
      step: '03',
      title: 'Development & Code Review',
      desc: 'Pengembangan modul sistem dengan standar clean-code, pengujian performa, dan validasi fungsional menyeluruh.'
    },
    {
      step: '04',
      title: 'Deployment Server & Live Demo',
      desc: 'Pemasangan ke server VPS dedicated, konfigurasi Nginx, domain SSL, dan demo pengujian langsung bersama tim Anda.'
    },
    {
      step: '05',
      title: 'Handover, Training & Garansi',
      desc: 'Serah terima akun, pelatihan bagi operator/admin, penyediaan panduan penggunaan, serta garansi maintenance berkala.'
    }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '90px' }}>
      
      {/* Top Breadcrumb Header Bar */}
      <div style={{ background: 'linear-gradient(135deg, #07153b 0%, #0d2861 100%)', color: '#ffffff', padding: '40px 0 60px', borderBottom: '1px solid rgba(56, 189, 248, 0.2)' }}>
        <div className="container">
          <button 
            onClick={onBackToHome}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              padding: '8px 18px',
              borderRadius: '99px',
              cursor: 'pointer',
              marginBottom: '28px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.88rem',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
          >
            ← Kembali ke Beranda
          </button>

          <div style={{ maxWidth: '820px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 16px', 
              borderRadius: '99px', 
              background: 'rgba(56, 189, 248, 0.18)', 
              border: '1px solid rgba(56, 189, 248, 0.4)', 
              color: '#38bdf8', 
              fontSize: '0.86rem', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '1px', 
              marginBottom: '16px' 
            }}>
              <span>🛠️ MENU PELAYANAN RESMI</span>
            </div>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Solusi Pelayanan Rekayasa Software & Infrastruktur Cloud
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.7, margin: 0 }}>
              Ruang Tech menghadirkan layanan digitalisasi komprehensif mulai dari rancang bangun aplikasi web & mobile, konfigurasi server VPS dedicated, integrasi database terpusat, hingga pemeliharaan sistem skala institusi.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '40px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '14px', padding: '16px 20px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>100%</div>
              <div style={{ fontSize: '0.86rem', color: '#94a3b8' }}>Source Code Milik Klien</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '14px', padding: '16px 20px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4ade80' }}>99.98%</div>
              <div style={{ fontSize: '0.86rem', color: '#94a3b8' }}>Uptime SLA Server VPS</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '14px', padding: '16px 20px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#facc15' }}>24/7</div>
              <div style={{ fontSize: '0.86rem', color: '#94a3b8' }}>Monitoring & Dukungan Teknis</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '14px', padding: '16px 20px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa' }}>Garansi</div>
              <div style={{ fontSize: '0.86rem', color: '#94a3b8' }}>Perbaikan Bug & Optimasi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: '-24px' }}>

        {/* Filter Categories Pill Bar */}
        <div style={{ 
          background: '#ffffff', 
          border: '1px solid #e2e8f0', 
          borderRadius: '16px', 
          padding: '12px 16px', 
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '36px'
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', marginRight: '6px' }}>Kategori Pelayanan:</span>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '10px',
                border: activeCategory === cat.id ? '1px solid #0066ff' : '1px solid #e2e8f0',
                background: activeCategory === cat.id ? '#0066ff' : '#f8fafc',
                color: activeCategory === cat.id ? '#ffffff' : '#334155',
                fontSize: '0.88rem',
                fontWeight: activeCategory === cat.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Services Card Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px', marginBottom: '70px' }}>
          {filteredServices.map(srv => (
            <div 
              key={srv.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '32px 28px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
              className="bento-card-hover"
            >
              <div>
                {/* Header Card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    boxShadow: '0 4px 12px rgba(0, 102, 255, 0.15)'
                  }}>
                    {srv.icon}
                  </div>
                  <span style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#0284c7',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '99px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {srv.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', lineHeight: 1.3 }}>
                  {srv.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#0284c7', fontWeight: 600, marginBottom: '14px' }}>
                  {srv.tagline}
                </p>
                <p style={{ fontSize: '0.94rem', color: '#64748b', lineHeight: 1.65, marginBottom: '22px' }}>
                  {srv.description}
                </p>

                {/* Deliverables Checklist */}
                <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Deliverables & Fitur:
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {srv.deliverables.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: '#475569', lineHeight: 1.45 }}>
                        <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  {srv.techStack.map((tech, idx) => (
                    <span 
                      key={idx}
                      style={{
                        background: '#f1f5f9',
                        color: '#475569',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        padding: '3px 9px',
                        borderRadius: '6px'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Estimasi Pengerjaan</span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>⏱️ {srv.turnaround}</span>
                </div>

                <a 
                  href={`https://wa.me/6281222332376?text=${encodeURIComponent(srv.waMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-wa-animated"
                  style={{ padding: '10px 18px', fontSize: '0.86rem', borderRadius: '10px' }}
                >
                  <span>💬 Konsultasi Pelayanan</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Section: 5 Tahapan Pelayanan Standar Enterprise */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '48px 36px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)', marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <span style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: '0.82rem', fontWeight: 800, padding: '4px 14px', borderRadius: '99px', textTransform: 'uppercase' }}>
              Standard Operating Procedure
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginTop: '12px', marginBottom: '12px' }}>
              Alur & Tahapan Pelayanan Ruang Tech
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
              Setiap proyek dikerjakan dengan metodologi terukur demi memastikan kualitas kode, ketepatan jadwal, dan kepuasan institusi Anda.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {workflowSteps.map(step => (
              <div 
                key={step.step}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px 20px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#38bdf8', marginBottom: '10px', lineHeight: 1 }}>
                  {step.step}
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Big Bottom Banner CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #07153b 0%, #0066ff 100%)',
          borderRadius: '24px',
          padding: '50px 36px',
          color: '#ffffff',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 102, 255, 0.25)'
        }}>
          <h2 style={{ fontSize: '2.3rem', fontWeight: 800, marginBottom: '14px' }}>
            Punya Kebutuhan Software Khusus di Luar Paket?
          </h2>
          <p style={{ color: '#e0f2fe', maxWidth: '640px', margin: '0 auto 28px', fontSize: '1.1rem', lineHeight: 1.65 }}>
            Konsultasikan ide atau spesifikasi sistem Anda bersama tim engineer Ruang Tech. Kami siap menyusun arsitektur sistem dan estimasi investasi terbaik.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="https://wa.me/6281222332376?text=Halo%20Ruang%20Tech,%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20pelayanan%20software%20custom"
              target="_blank"
              rel="noreferrer"
              className="btn-wa-animated"
              style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: '12px' }}
            >
              <span>💬 Konsultasi Gratis via WhatsApp</span>
            </a>
            <button
              onClick={onBackToHome}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Lihat Portofolio Produk →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
