import React, { useEffect, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import DomainSimulator from '../components/DomainSimulator';
import { productService } from '../api/productService';

export default function HomeView({ onSelectProduct, onNavigateToArchitecture, onNavigateToAdmin }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Image Carousel state per product card
  const [cardSlides, setCardSlides] = useState({
    'e-sekolah': 0,
    'dis': 0
  });

  // Lightbox Zoom Viewer state
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  });
  const [zoomScale, setZoomScale] = useState(1);

  const productImages = {
    'e-sekolah': [
      { src: '/esekolah_preview.jpg', caption: 'Dashboard Utama Akademik & Presensi Siswa' },
      { src: '/esekolah_preview_2.jpg', caption: 'Manajemen E-Rapor & Rekap Nilai Akademik' },
      { src: '/Banner3.png?v=3.0', caption: 'Arsitektur Multi-Domain Server E-Sekolah' }
    ],
    'dis': [
      { src: '/dis_preview.jpg', caption: 'Dashboard Birokrasi & Pelaporan Publik' },
      { src: '/Banner3.png?v=3.0', caption: 'Infrastruktur Server Terpusat DIS System' },
      { src: '/esekolah_preview_2.jpg', caption: 'Alur Workflows Approval Dokumen Dinas' }
    ]
  };

  const handlePrevSlide = (prodId) => {
    setCardSlides(prev => {
      const total = productImages[prodId]?.length || 1;
      const current = prev[prodId] || 0;
      return { ...prev, [prodId]: (current - 1 + total) % total };
    });
  };

  const handleNextSlide = (prodId) => {
    setCardSlides(prev => {
      const total = productImages[prodId]?.length || 1;
      const current = prev[prodId] || 0;
      return { ...prev, [prodId]: (current + 1) % total };
    });
  };

  const openLightbox = (prodId, index = 0, title = '') => {
    setLightbox({
      isOpen: true,
      images: productImages[prodId] || [],
      currentIndex: index,
      title: title
    });
    setZoomScale(1);
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, images: [], currentIndex: 0, title: '' });
    setZoomScale(1);
  };

  useEffect(() => {
    async function loadData() {
      const data = await productService.getAllProducts();
      setProducts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div>
      {/* ==================================================================
          1. FULL HERO SLIDER (Banner.png & Interactive Ekosistem Showcase)
          ================================================================== */}
      <HeroSlider 
        onSelectProduct={onSelectProduct} 
        onNavigateToArchitecture={onNavigateToArchitecture} 
      />

      {/* ==================================================================
          2. TRUST STRIP / PARTNERS & CLIENTS
          ================================================================== */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-label">
            Dipercaya oleh Perusahaan dan Terkemuka..
          </div>
          <div className="trust-badges">
            <span className="trust-badge-item">🏢 CV Makmur Permata</span>
            <span className="trust-badge-item">🍲 Seblak Katel NDR</span>
            <span className="trust-badge-item">🍚 Warung Nasi Haji Aah Putra</span>
            <span className="trust-badge-item">🎓 SMK ARTANITA TASIKMALAYA</span>
            <span className="trust-badge-item">🚚 CV MITRA JAYA ABADI DISTRIBUTOR</span>
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. SOLUSI PRODUK & GALERI PORTOFOLIO INTERAKTIF
          ================================================================== */}
      <section id="solusi-produk" className="products-section-leap" style={{ background: '#f8fafc', padding: '84px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
            <div className="hero-pill-blue">
              <span>🖼️ Galeri Portofolio & Sistem Teruji</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '14px', color: 'var(--navy-dark)' }}>
              Galeri Portofolio Solusi Software Devorme
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Kumpulan produk dan ekosistem digital mandiri yang telah kami kembangkan. Lihat pratinjau galeri sistem di bawah atau minta akses demo aplikasi secara langsung via WhatsApp.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              Memuat galeri portofolio produk...
            </div>
          ) : (
            <div className="solution-grid" style={{ gap: '32px' }}>

              {/* Product 1: E-Sekolah Cloud */}
              <div className="solution-card" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 102, 255, 0.08)', display: 'flex', flexDirection: 'column' }}>
                
                {/* Image Banner Showcase Slider */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', maxHeight: '220px', minHeight: '150px', overflow: 'hidden', background: '#07153b' }}>
                  <img 
                    src={productImages['e-sekolah'][cardSlides['e-sekolah'] || 0].src} 
                    alt="E-Sekolah Cloud Platform UI Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'zoom-in', transition: 'transform 0.4s ease' }}
                    onClick={() => openLightbox('e-sekolah', cardSlides['e-sekolah'] || 0, 'E-Sekolah Cloud Platform')}
                  />
                  
                  {/* Category Tag */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(7, 21, 59, 0.85)', backdropFilter: 'blur(8px)', color: '#ffffff', padding: '4px 12px', borderRadius: '99px', fontSize: '0.76rem', fontWeight: 700, border: '1px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }}>
                    🎓 Sekolah & Yayasan
                  </div>

                  {/* Zoom Badge Trigger */}
                  <button 
                    onClick={() => openLightbox('e-sekolah', cardSlides['e-sekolah'] || 0, 'E-Sekolah Cloud Platform')}
                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0, 102, 255, 0.85)', backdropFilter: 'blur(8px)', color: '#ffffff', padding: '4px 10px', borderRadius: '8px', fontSize: '0.74rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 5 }}
                  >
                    🔍 Zoom Foto ({ (cardSlides['e-sekolah'] || 0) + 1 }/3)
                  </button>

                  {/* Slider Controls */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handlePrevSlide('e-sekolah'); }}
                    style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.65)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}
                    aria-label="Foto Sebelumnya"
                  >
                    ‹
                  </button>

                  <button 
                    onClick={(e) => { e.stopPropagation(); handleNextSlide('e-sekolah'); }}
                    style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.65)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}
                    aria-label="Foto Selanjutnya"
                  >
                    ›
                  </button>

                  {/* Dots Indicators */}
                  <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 5 }}>
                    {productImages['e-sekolah'].map((_, idx) => (
                      <span 
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCardSlides(prev => ({ ...prev, 'e-sekolah': idx })); }}
                        style={{
                          width: (cardSlides['e-sekolah'] || 0) === idx ? '18px' : '6px',
                          height: '6px',
                          borderRadius: '99px',
                          background: (cardSlides['e-sekolah'] || 0) === idx ? '#38bdf8' : 'rgba(255,255,255,0.5)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 className="solution-title" style={{ fontSize: '1.45rem', marginBottom: '8px', color: 'var(--navy-dark)' }}>E-Sekolah Cloud Platform</h3>
                  <p className="solution-desc" style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                    Sistem informasi manajemen sekolah terpadu yang mengotomasi rekap presensi guru & siswa, jadwal pelajaran, penilaian rapor, serta kenaikan kelas dan alumni.
                  </p>

                  <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                    <a 
                      href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20melihat%20demo%20E-Sekolah%20Cloud" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn-blue" 
                      style={{ flex: 1, padding: '12px', fontSize: '0.88rem', justifyContent: 'center' }}
                    >
                      💬 Request Demo via WA
                    </a>
                    <button 
                      className="btn-white-outline"
                      style={{ padding: '12px 18px', fontSize: '0.88rem', fontWeight: 700 }}
                      onClick={() => onSelectProduct('e-sekolah')}
                    >
                      Detail Portofolio →
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 2: DIS Smart System */}
              <div className="solution-card" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 102, 255, 0.08)', display: 'flex', flexDirection: 'column' }}>
                
                {/* Image Banner Showcase Slider */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', maxHeight: '220px', minHeight: '150px', overflow: 'hidden', background: '#0f172a' }}>
                  <img 
                    src={productImages['dis'][cardSlides['dis'] || 0].src} 
                    alt="DIS Smart System UI Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'zoom-in', transition: 'transform 0.4s ease' }}
                    onClick={() => openLightbox('dis', cardSlides['dis'] || 0, 'DIS Smart System')}
                  />
                  
                  {/* Category Tag */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(7, 21, 59, 0.85)', backdropFilter: 'blur(8px)', color: '#c084fc', padding: '4px 12px', borderRadius: '99px', fontSize: '0.76rem', fontWeight: 700, border: '1px solid rgba(168,85,247,0.3)', pointerEvents: 'none' }}>
                    🏛️ Layanan Publik & Dinas
                  </div>

                  {/* Zoom Badge Trigger */}
                  <button 
                    onClick={() => openLightbox('dis', cardSlides['dis'] || 0, 'DIS Smart System')}
                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(168, 85, 247, 0.85)', backdropFilter: 'blur(8px)', color: '#ffffff', padding: '4px 10px', borderRadius: '8px', fontSize: '0.74rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 5 }}
                  >
                    🔍 Zoom Foto ({ (cardSlides['dis'] || 0) + 1 }/3)
                  </button>

                  {/* Slider Controls */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handlePrevSlide('dis'); }}
                    style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.65)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}
                    aria-label="Foto Sebelumnya"
                  >
                    ‹
                  </button>

                  <button 
                    onClick={(e) => { e.stopPropagation(); handleNextSlide('dis'); }}
                    style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.65)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}
                    aria-label="Foto Selanjutnya"
                  >
                    ›
                  </button>

                  {/* Dots Indicators */}
                  <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 5 }}>
                    {productImages['dis'].map((_, idx) => (
                      <span 
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCardSlides(prev => ({ ...prev, 'dis': idx })); }}
                        style={{
                          width: (cardSlides['dis'] || 0) === idx ? '18px' : '6px',
                          height: '6px',
                          borderRadius: '99px',
                          background: (cardSlides['dis'] || 0) === idx ? '#c084fc' : 'rgba(255,255,255,0.5)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 className="solution-title" style={{ fontSize: '1.45rem', marginBottom: '8px', color: 'var(--navy-dark)' }}>DIS Smart System</h3>
                  <p className="solution-desc" style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                    Platform Digital Information System yang menghubungkan birokrasi dan pelaporan publik dengan alur approval bertingkat dan analitik kinerja instansi.
                  </p>

                  <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                    <a 
                      href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20melihat%20demo%20DIS%20Smart%20System" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn-blue" 
                      style={{ flex: 1, padding: '12px', fontSize: '0.88rem', justifyContent: 'center' }}
                    >
                      💬 Request Demo via WA
                    </a>
                    <button 
                      className="btn-white-outline"
                      style={{ padding: '12px 18px', fontSize: '0.88rem', fontWeight: 700 }}
                      onClick={() => onSelectProduct('dis')}
                    >
                      Detail Portofolio →
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* High Trust Proof Footer Strip */}
          <div style={{ marginTop: '48px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.6rem' }}>🛡️</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--navy-dark)' }}>Garansi Maintenance 24/7</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dukungan teknis tim arsitek senior</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.6rem' }}>⚡</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--navy-dark)' }}>Pendampingan & Training</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bimbingan penggunaan hingga lancar</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.6rem' }}>🔒</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--navy-dark)' }}>Data Full Ownership</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Database 100% milik instansi Anda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox Zoom Viewer Modal */}
        {lightbox.isOpen && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              background: 'rgba(5, 12, 28, 0.95)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px'
            }}
            onClick={closeLightbox}
          >
            {/* Header Bar */}
            <div 
              style={{
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#ffffff'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div>
                <h4 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '4px' }}>{lightbox.title}</h4>
                <span style={{ fontSize: '0.86rem', color: '#93c5fd' }}>
                  {lightbox.images[lightbox.currentIndex]?.caption} ({lightbox.currentIndex + 1} dari {lightbox.images.length})
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  onClick={() => setZoomScale(prev => Math.min(prev + 0.3, 2.5))}
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
                >
                  🔍 Zoom In +
                </button>
                <button 
                  onClick={() => setZoomScale(prev => Math.max(prev - 0.3, 0.8))}
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
                >
                  🔍 Zoom Out -
                </button>
                <button 
                  onClick={() => setZoomScale(1)}
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
                >
                  🔄 Reset
                </button>
                <button 
                  onClick={closeLightbox}
                  style={{ background: '#ef4444', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 800, fontSize: '1.1rem' }}
                >
                  ✕ Tutup
                </button>
              </div>
            </div>

            {/* Main Zoomable Image Container */}
            <div 
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                margin: '20px 0'
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Prev Arrow */}
              {lightbox.images.length > 1 && (
                <button 
                  onClick={() => {
                    setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length }));
                    setZoomScale(1);
                  }}
                  style={{ position: 'absolute', left: '10px', background: 'rgba(0,0,0,0.65)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', width: '48px', height: '48px', borderRadius: '50%', fontSize: '1.6rem', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Foto Sebelumnya"
                >
                  ‹
                </button>
              )}

              <img 
                src={lightbox.images[lightbox.currentIndex]?.src} 
                alt={lightbox.images[lightbox.currentIndex]?.caption}
                style={{
                  maxWidth: '90%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                  transform: `scale(${zoomScale})`,
                  transition: 'transform 0.25s ease',
                  cursor: zoomScale > 1 ? 'grab' : 'zoom-in'
                }}
                onClick={() => setZoomScale(prev => prev === 1 ? 1.6 : 1)}
              />

              {/* Next Arrow */}
              {lightbox.images.length > 1 && (
                <button 
                  onClick={() => {
                    setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }));
                    setZoomScale(1);
                  }}
                  style={{ position: 'absolute', right: '10px', background: 'rgba(0,0,0,0.65)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', width: '48px', height: '48px', borderRadius: '50%', fontSize: '1.6rem', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Foto Selanjutnya"
                >
                  ›
                </button>
              )}
            </div>

            <div style={{ color: '#cbd5e1', fontSize: '0.84rem' }}>
              💡 Klik pada gambar untuk memperbesar (Zoom) • Klik area luar untuk menutup
            </div>
          </div>
        )}
      </section>

      {/* ==================================================================
          4. MENGAPA MEMILIH DEVORME (Bento Fitur Keunggulan)
          ================================================================== */}
      <section id="tentang-kami" style={{ padding: '80px 0', background: 'var(--bg-warm)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
            <div className="hero-pill-blue">
              <span>Keunggulan Sistem</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '14px' }}>
              Infrastruktur Andal untuk Ketenangan Bisnis Anda
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              Kombinasi fleksibilitas multi-subdomain dengan keamanan server terpusat.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }} className="bento-card-hover">
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🎯</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Arsitektur Modular Terpadu</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Setiap modul aplikasi berjalan independen sesuai perannya, namun seluruh ekosistem tersinkronisasi mulus di bawah satu database terpusat.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }} className="bento-card-hover">
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🗄️</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Database Terpusat di Server</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                MySQL 8.0 berjalan di server VPS yang sama, memudahkan sinkronisasi data antar produk, backup otomatis, dan efisiensi resource server.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }} className="bento-card-hover">
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>📱</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Mobile Android Siap Pakai</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Didukung arsitektur PWA dan instalasi Android (.apk), klien Anda dapat mengakses platform langsung dari ponsel secara mandiri.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow-card)', transition: 'var(--transition)' }} className="bento-card-hover">
              <div style={{ fontSize: '2rem', marginBottom: '14px' }}>🛡️</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Keamanan SSL Otomatis</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Konfigurasi Nginx teroptimasi dengan sertifikat SSL Let's Encrypt menjamin seluruh transaksi data terenkripsi aman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. SUBDOMAIN SIMULATOR INTERAKTIF
          ================================================================== */}
      <section style={{ padding: '0 0 80px', background: 'var(--bg-warm)' }}>
        <div className="container">
          <DomainSimulator onSelectProduct={onSelectProduct} />
        </div>
      </section>

      {/* ==================================================================
          6. KONTAK & KONSULTASI
          ================================================================== */}
      <section id="kontak" style={{ padding: '80px 0', background: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div className="hero-pill-blue">
            <span>Mulai Konsultasi</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '14px' }}>
            Siap Mengembangkan Ekosistem Software Anda?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
            Hubungi tim pengembang Devorme untuk mendiskusikan implementasi E-Sekolah, DIS, atau kebutuhan software custom perusahaan Anda.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a 
              href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20ingin%20konsultasi%20software" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-blue" 
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              💬 Hubungi via WhatsApp
            </a>
            <button className="btn-navy" onClick={onNavigateToAdmin} style={{ padding: '14px 28px', fontSize: '1rem' }}>
              🔐 Buka Portal Admin
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================================
          7. FLOATING WHATSAPP US BUTTON
          ================================================================== */}
      <a 
        href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20ingin%20konsultasi%20software" 
        target="_blank" 
        rel="noreferrer" 
        className="floating-whatsapp-btn"
        aria-label="Chat WhatsApp Devorme"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.518 0-10 4.482-10 10 0 1.764.461 3.42 1.267 4.869l-1.344 4.912 5.044-1.323c1.401.765 2.999 1.197 4.697 1.197 5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18.232c-1.545 0-2.989-.43-4.226-1.176l-.303-.182-2.99.784.798-2.916-.2-.319c-.818-1.299-1.26-2.812-1.26-4.423 0-4.542 3.693-8.235 8.235-8.235 4.543 0 8.235 3.693 8.235 8.235 0 4.542-3.692 8.235-8.235 8.235z"/>
        </svg>
        <span>WhatsApp Us</span>
      </a>
    </div>
  );
}
