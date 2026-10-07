import React, { useEffect, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import DomainSimulator from '../components/DomainSimulator';
import ServicesSection from '../components/ServicesSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FaqSection from '../components/FaqSection';
import InquiryForm from '../components/InquiryForm';
import { productService } from '../api/productService';


export default function HomeView({ onSelectProduct, onNavigateToArchitecture, onNavigateToAdmin }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Image Carousel state per product card (dinamis berdasar ID produk database)
  const [cardSlides, setCardSlides] = useState({});

  // Lightbox Zoom Viewer state
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  });
  const [zoomScale, setZoomScale] = useState(1);

  const [defaultBanner, setDefaultBanner] = useState({
    src: '',
    caption: ''
  });

  const getProductImages = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images.map(img => typeof img === 'string' ? { src: img, caption: product.name } : { src: img.image_url || img.url || img.src, caption: img.caption || product.name });
    }
    return defaultBanner.src 
      ? [{ src: defaultBanner.src, caption: defaultBanner.caption || product.name }] 
      : [];
  };

  const handlePrevSlide = (prodId, total) => {
    setCardSlides(prev => {
      const current = prev[prodId] || 0;
      return { ...prev, [prodId]: (current - 1 + total) % total };
    });
  };

  const handleNextSlide = (prodId, total) => {
    setCardSlides(prev => {
      const current = prev[prodId] || 0;
      return { ...prev, [prodId]: (current + 1) % total };
    });
  };

  const openLightbox = (imagesList, index = 0, title = '') => {
    setLightbox({
      isOpen: true,
      images: imagesList,
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
      setLoading(true);
      const [data, settings] = await Promise.all([
        productService.getAllProducts(),
        productService.getSettings()
      ]);
      setProducts(data);
      if (settings && settings.default_banner_image) {
        setDefaultBanner({
          src: settings.default_banner_image,
          caption: settings.default_banner_caption || ''
        });
      }
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
        heroBanner={defaultBanner.src}
        onSelectProduct={onSelectProduct} 
        onNavigateToArchitecture={onNavigateToArchitecture} 
      />


      {/* ==================================================================
          2. SOLUSI PRODUK & GALERI PORTOFOLIO INTERAKTIF (Dinamis Database)
          ================================================================== */}
      <section id="solusi-produk" className="products-section-leap" style={{ background: 'rgb(56, 164, 247)', padding: '84px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
            <div className="hero-pill-blue" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
              <span>🖼️ Galeri Portofolio & Sistem Teruji</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '14px', color: '#ffffff' }}>
              Galeri Portofolio Solusi Software Devorme
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Kumpulan produk dan ekosistem digital mandiri yang telah kami kembangkan. Lihat pratinjau galeri sistem di bawah atau minta akses demo aplikasi secara langsung via WhatsApp.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#ffffff', fontWeight: 600 }}>
              Memuat galeri portofolio dari database...
            </div>
          ) : (
            <div className="solution-grid" style={{ gap: '32px' }}>
              {products.map((product) => {
                const images = getProductImages(product);
                const slideIdx = cardSlides[product.id || product.slug] || 0;
                const activeImg = images[slideIdx] || images[0];

                return (
                  <div 
                    key={product.id || product.slug} 
                    className="solution-card" 
                    style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 102, 255, 0.08)', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                    onClick={() => onSelectProduct(product.slug || product.id)}
                  >
                    
                    {/* Image Banner Showcase Slider */}
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', maxHeight: '220px', minHeight: '150px', overflow: 'hidden', background: '#07153b' }}>
                      <img 
                        src={activeImg.src} 
                        alt={`${product.name} Preview`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'zoom-in', transition: 'transform 0.4s ease' }}
                        onClick={(e) => { e.stopPropagation(); openLightbox(images, slideIdx, product.name); }}
                      />
                      
                      {/* Category Tag */}
                      <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(7, 21, 59, 0.85)', backdropFilter: 'blur(8px)', color: '#ffffff', padding: '4px 12px', borderRadius: '99px', fontSize: '0.76rem', fontWeight: 700, border: '1px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }}>
                        {product.category || 'Software Solution'}
                      </div>

                      {/* Zoom Badge Trigger */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); openLightbox(images, slideIdx, product.name); }}
                        style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0, 102, 255, 0.85)', backdropFilter: 'blur(8px)', color: '#ffffff', padding: '4px 10px', borderRadius: '8px', fontSize: '0.74rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 5 }}
                      >
                        🔍 Zoom Foto ({ slideIdx + 1 }/{ images.length })
                      </button>

                      {/* Slider Controls */}
                      {images.length > 1 && (
                        <>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handlePrevSlide(product.id || product.slug, images.length); }}
                            style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.65)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}
                            aria-label="Foto Sebelumnya"
                          >
                            ‹
                          </button>

                          <button 
                            onClick={(e) => { e.stopPropagation(); handleNextSlide(product.id || product.slug, images.length); }}
                            style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.65)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}
                            aria-label="Foto Selanjutnya"
                          >
                            ›
                          </button>
                        </>
                      )}

                      {/* Dots Indicators */}
                      {images.length > 1 && (
                        <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 5 }}>
                          {images.map((_, idx) => (
                            <span 
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setCardSlides(prev => ({ ...prev, [product.id || product.slug]: idx })); }}
                              style={{
                                width: slideIdx === idx ? '18px' : '6px',
                                height: '6px',
                                borderRadius: '99px',
                                background: slideIdx === idx ? '#38bdf8' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 className="solution-title" style={{ fontSize: '1.45rem', marginBottom: '8px', color: 'var(--navy-dark)' }}>{product.name}</h3>
                      <p className="solution-desc" style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                        {product.tagline || product.description}
                      </p>

                      <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                        <a 
                          href={`https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20tertarik%20melihat%20demo%20${encodeURIComponent(product.name)}`}
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn-wa-animated" 
                          style={{ width: '100%', padding: '12px' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>💬 Request Demo via WA</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
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
          2.5 TRUST STRIP / PARTNERS & CLIENTS (Di Bawah Galeri Portofolio)
          ================================================================== */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-label">
            ⚡ Dipercaya oleh Perusahaan & Institusi Terkemuka
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
          3.5 MANFAAT & TUJUAN DEVORME (Section Baru Gaya IoT Card Grid)
          ================================================================== */}
      <section id="manfaat-tujuan" style={{ padding: '84px 0', background: 'linear-gradient(180deg, #071726 0%, #0c2338 100%)', borderTop: '1px solid rgba(16, 185, 129, 0.2)', borderBottom: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 52px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '99px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#34d399', fontSize: '0.86rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '16px' }}>
              <span>💡 Manfaat & Tujuan</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#ffffff', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Manfaat & Tujuan Ekosistem Devorme
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.08rem', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto' }}>
              Dirancang dengan arsitektur modular yang adaptif untuk mempercepat efisiensi operasional dan fleksibilitas digital institusi Anda.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            
            {/* Card 1 */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(16, 185, 129, 0.22)', borderRadius: '20px', padding: '34px 28px', transition: 'all 0.35s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} className="bento-card-hover">
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#ffffff', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
                ⚡
              </div>
              <h3 style={{ fontSize: '1.28rem', color: '#ffffff', marginTop: '20px', marginBottom: '10px', fontWeight: 800 }}>
                Efisiensi Operasional 100%
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                Mengotomasi rekap presensi guru & siswa, jadwal pelajaran, hingga pelaporan publik secara otomatis tanpa risiko kesalahan manual.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(16, 185, 129, 0.22)', borderRadius: '20px', padding: '34px 28px', transition: 'all 0.35s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} className="bento-card-hover">
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#ffffff', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
                🌐
              </div>
              <h3 style={{ fontSize: '1.28rem', color: '#ffffff', marginTop: '20px', marginBottom: '10px', fontWeight: 800 }}>
                Identitas Multi-Domain Mandiri
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                Setiap instansi memiliki nama domain & branding mandiri yang kredibel, meningkatkan trust dan profesionalisme institusi di mata publik.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(16, 185, 129, 0.22)', borderRadius: '20px', padding: '34px 28px', transition: 'all 0.35s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} className="bento-card-hover">
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#ffffff', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
                🚀
              </div>
              <h3 style={{ fontSize: '1.28rem', color: '#ffffff', marginTop: '20px', marginBottom: '10px', fontWeight: 800 }}>
                Infrastruktur Cepat & 99.98% Uptime
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                Server VPS cloud berkinerja tinggi yang menjamin akses secepat kilat tanpa kendala down-time saat digunakan oleh ribuan pengguna bersamaan.
              </p>
            </div>

            {/* Card 4 */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(16, 185, 129, 0.22)', borderRadius: '20px', padding: '34px 28px', transition: 'all 0.35s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} className="bento-card-hover">
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#ffffff', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
                🔒
              </div>
              <h3 style={{ fontSize: '1.28rem', color: '#ffffff', marginTop: '20px', marginBottom: '10px', fontWeight: 800 }}>
                Keamanan Data & Encrypted Backup
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                Proteksi enkripsi data tingkat tinggi SSL 256-bit dengan sistem pencadangan database otomatis berkala untuk mencegah kebocoran data.
              </p>
            </div>

            {/* Card 5 */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(16, 185, 129, 0.22)', borderRadius: '20px', padding: '34px 28px', transition: 'all 0.35s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} className="bento-card-hover">
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#ffffff', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
                📱
              </div>
              <h3 style={{ fontSize: '1.28rem', color: '#ffffff', marginTop: '20px', marginBottom: '10px', fontWeight: 800 }}>
                Akses Multi-Platform & Mobile Ready
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                Aplikasi dapat diakses secara fleksibel dari browser laptop, tablet, hingga Android APK native langsung dari smartphone pengguna.
              </p>
            </div>

            {/* Card 6 */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(16, 185, 129, 0.22)', borderRadius: '20px', padding: '34px 28px', transition: 'all 0.35s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} className="bento-card-hover">
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#ffffff', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
                🎯
              </div>
              <h3 style={{ fontSize: '1.28rem', color: '#ffffff', marginTop: '20px', marginBottom: '10px', fontWeight: 800 }}>
                Skalabilitas Tanpa Batas
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>
                Sistem modular yang mudah dikembangkan dan disesuaikan dengan pertumbuhan jumlah pengguna, cabang baru, atau kebutuhan fitur instansi Anda.
              </p>
            </div>

          </div>
        </div>
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

      {/* LAYANAN SOFTWARE HOUSE */}
      <ServicesSection />

      {/* PAKET HARGA & LISENSI */}
      <PricingSection onSelectProduct={onSelectProduct} />

      {/* TESTIMONI KLIEN */}
      <TestimonialsSection />

      {/* FAQ PERTANYAAN */}
      <FaqSection />

      {/* FORM MINTA DEMO & KONSULTASI */}
      <InquiryForm />


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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.518 0-10 4.482-10 10 0 1.764.461 3.42 1.267 4.869l-1.344 4.912 5.044-1.323c1.401.765 2.999 1.197 4.697 1.197 5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18.232c-1.545 0-2.989-.43-4.226-1.176l-.303-.182-2.99.784.798-2.916-.2-.319c-.818-1.299-1.26-2.812-1.26-4.423 0-4.542 3.693-8.235 8.235-8.235 4.543 0 8.235 3.693 8.235 8.235 0 4.542-3.692 8.235-8.235 8.235z"/>
        </svg>
      </a>
    </div>
  );
}
