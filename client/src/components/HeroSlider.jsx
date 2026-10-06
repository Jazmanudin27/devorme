import React from 'react';

export default function HeroSlider({ onSelectProduct }) {
  return (
    <section className="hero-section-sayuswa" style={{ background: 'linear-gradient(135deg, #07153b 0%, #0a1e4a 60%, #07153b 100%)', padding: '64px 0 72px', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Column: Text Content & Metric Cards */}
          <div>
            {/* Green Pill Tag */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '6px 16px', borderRadius: '99px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
              ⚙ EKOSISTEM SOFTWARE ENTERPRISE
            </div>

            {/* Main Title */}
            <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.9rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              Membangun Ekosistem Software Cerdas Berbasis Server Terpusat
            </h1>

            {/* Subtitle Paragraph */}
            <p style={{ fontSize: '1.04rem', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '28px', maxWidth: '640px' }}>
              Devorme merancang portofolio produk software spesifik yang masing-masing berdiri di bawah nama domain independen, terhubung ke infrastruktur server dan basis data berkinerja tinggi secara real-time dengan proteksi keamanan standar industri.
            </p>

            {/* 4-Item Feature Metric Box (Glassmorphic Container) */}
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '16px', padding: '20px 24px', backdropFilter: 'blur(12px)', marginBottom: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc' }}>
                  <span style={{ color: '#10b981', fontSize: '1.1rem' }}>✔</span>
                  <span>99.98% System Uptime</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc' }}>
                  <span style={{ color: '#38bdf8', fontSize: '1.1rem' }}>⚡</span>
                  <span>VPS & MySQL Terpusat</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc' }}>
                  <span style={{ color: '#38bdf8', fontSize: '1.1rem' }}>📱</span>
                  <span>Android APK & PWA Ready</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc' }}>
                  <span style={{ color: '#10b981', fontSize: '1.1rem' }}>🔔</span>
                  <span>24/7 Monitoring & SSL</span>
                </div>
              </div>
            </div>

            {/* Left Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a 
                href="#solusi-produk" 
                className="btn-blue" 
                style={{ padding: '14px 28px', fontSize: '0.96rem', fontWeight: 800, borderRadius: '12px' }}
              >
                <span>Jelajahi Portofolio</span>
              </a>
              <a 
                href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20konsultasi%20proyek%20software"
                target="_blank"
                rel="noreferrer"
                className="btn-white-outline" 
                style={{ padding: '14px 28px', fontSize: '0.96rem', fontWeight: 800, borderRadius: '12px', background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)' }}
              >
                <span>Cara Kerja Sistem</span>
              </a>
            </div>
          </div>

          {/* Right Column: Featured Visual Frame (Curved Monitor Showcase) */}
          <div style={{ position: 'relative' }}>
            <div style={{ 
              borderRadius: '20px', 
              overflow: 'hidden', 
              border: '2px solid rgba(56, 189, 248, 0.4)', 
              boxShadow: '0 24px 60px -10px rgba(0, 102, 255, 0.4), 0 0 40px rgba(56, 189, 248, 0.2)', 
              background: '#07153b' 
            }}>
              <img 
                src="/esekolah_preview.jpg" 
                alt="Devorme System Dashboard Preview" 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Floating Bottom Quick Action Badges (Sayuswa Style) */}
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <a 
          href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20ingin%20meminta%20Company%20Profile%20PDF"
          target="_blank"
          rel="noreferrer"
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '99px',
            fontSize: '0.86rem',
            fontWeight: 800,
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}
        >
          <span>📄 Company Profile PDF</span>
        </a>
      </div>

      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999
        }}
      >
        <a 
          href="https://wa.me/6281222332376?text=Halo%20Engineer%20Devorme,%20saya%20ingin%20tanya%20mengenai%20arsitektur%20software"
          target="_blank"
          rel="noreferrer"
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '99px',
            fontSize: '0.92rem',
            fontWeight: 800,
            boxShadow: '0 10px 28px rgba(16, 185, 129, 0.5)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            position: 'relative',
            textDecoration: 'none'
          }}
        >
          <span style={{
            position: 'absolute',
            top: '-6px',
            right: '-4px',
            background: '#ef4444',
            color: '#ffffff',
            fontSize: '0.7rem',
            fontWeight: 900,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            border: '2px solid #ffffff'
          }}>1</span>
          <span>💬 Tanya Engineer</span>
        </a>
      </div>
    </section>
  );
}
