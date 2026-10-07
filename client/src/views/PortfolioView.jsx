import React, { useState, useEffect } from 'react';
import { productService } from '../api/productService';

export default function PortfolioView({ onSelectProduct, onBackToHome }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cardSlides, setCardSlides] = useState({});
  const [lightboxData, setLightboxData] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  // Helper for image previews
  const getProductImages = (prod) => {
    if (prod.images && Array.isArray(prod.images) && prod.images.length > 0) {
      return prod.images.map(img => typeof img === 'string' ? { src: img } : img);
    }
    if (prod.image_url) {
      return [{ src: prod.image_url }];
    }
    return [
      { src: '/esekolah_preview.jpg' },
      { src: '/dis_preview.jpg' }
    ];
  };

  const handlePrevSlide = (prodId, maxCount) => {
    setCardSlides(prev => {
      const current = prev[prodId] || 0;
      const next = current === 0 ? maxCount - 1 : current - 1;
      return { ...prev, [prodId]: next };
    });
  };

  const handleNextSlide = (prodId, maxCount) => {
    setCardSlides(prev => {
      const current = prev[prodId] || 0;
      const next = (current + 1) % maxCount;
      return { ...prev, [prodId]: next };
    });
  };

  const openLightbox = (images, index, title) => {
    setLightboxData({ images, index, title });
  };

  const filteredProducts = products.filter(p => {
    const matchCategory = activeCategory === 'all' || 
      (p.category && p.category.toLowerCase().includes(activeCategory.toLowerCase()));
    const matchSearch = searchQuery.trim() === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div style={{ background: 'linear-gradient(180deg, #07153b 0%, #0b2254 50%, #040d24 100%)', minHeight: '100vh', padding: '40px 0 80px', color: '#ffffff' }}>
      <div className="container">
        
        {/* Navigation Breadcrumb */}
        <button 
          onClick={onBackToHome}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#e2e8f0',
            padding: '8px 18px',
            borderRadius: '99px',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '32px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.25s ease'
          }}
        >
          ← Kembali ke Beranda
        </button>

        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px' }}>
          <div className="hero-pill-blue" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <span>🖼️ Katalog Resmi Solusi Software Devorme</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', color: '#ffffff', letterSpacing: '-0.02em' }}>
            Galeri Lengkap Portofolio Software
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Jelajahi seluruh ekosistem produk software dan sistem digital terintegrasi yang siap diimplementasikan untuk bisnis, institusi, dan pemerintah.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '20px', marginBottom: '40px', backdropFilter: 'blur(10px)' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <input 
                type="text" 
                placeholder="🔍 Cari nama produk atau modul software..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(7, 21, 59, 0.6)',
                  color: '#ffffff',
                  fontSize: '0.94rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'Semua Produk' },
                { id: 'enterprise', label: 'Enterprise & ERP' },
                { id: 'fintech', label: 'Fintech & POS' },
                { id: 'sekolah', label: 'Sekolah & Yayasan' },
                { id: 'dinas', label: 'Birokrasi & Dinas' }
              ].map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '99px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    border: activeCategory === cat.id ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.12)',
                    background: activeCategory === cat.id ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    color: activeCategory === cat.id ? '#ffffff' : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#cbd5e1', fontSize: '1.1rem' }}>
            Memuat katalog produk dari database server...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#cbd5e1', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.15)' }}>
            <h3>Tidak ada produk yang cocok dengan pencarian "{searchQuery}"</h3>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              style={{ marginTop: '16px', padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#0066ff', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="solution-grid" style={{ gap: '32px' }}>
            {filteredProducts.map((product) => {
              const images = getProductImages(product);
              const slideIdx = cardSlides[product.id || product.slug] || 0;
              const activeImg = images[slideIdx] || images[0];

              return (
                <div 
                  key={product.id || product.slug} 
                  className="solution-card" 
                  style={{ 
                    background: '#ffffff', 
                    borderRadius: '20px', 
                    border: '1px solid #e2e8f0', 
                    overflow: 'hidden', 
                    boxShadow: '0 10px 25px -5px rgba(0, 102, 255, 0.08)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    cursor: 'pointer' 
                  }}
                  onClick={() => onSelectProduct(product.slug || product.id)}
                >
                  {/* Image Showcase Slider */}
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
                  </div>

                  {/* Card Content Body */}
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

        {/* Lightbox Modal */}
        {lightboxData && (
          <div 
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={() => setLightboxData(null)}
          >
            <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
              <img 
                src={lightboxData.images[lightboxData.index]?.src} 
                alt={lightboxData.title}
                style={{ width: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'contain', borderRadius: '12px' }}
              />
              <button 
                onClick={() => setLightboxData(null)}
                style={{ position: 'absolute', top: '-40px', right: '0', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <div style={{ color: '#fff', marginTop: '16px', fontWeight: 600 }}>
              {lightboxData.title} ({lightboxData.index + 1}/{lightboxData.images.length})
            </div>
          </div>
        )}

        {/* Custom Solution Footer Banner */}
        <div style={{ marginTop: '64px', background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.15) 0%, rgba(0, 196, 255, 0.1) 100%)', border: '1px solid rgba(0, 102, 255, 0.3)', borderRadius: '24px', padding: '48px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '12px' }}>Butuh Solusi Custom Sesuai Kebutuhan Spesifik?</h2>
          <p style={{ color: '#cbd5e1', maxWidth: '620px', margin: '0 auto 28px', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Tim arsitek software Devorme siap merancang ekosistem digital khusus dengan integrasi server terpusat dan branding domain independen.
          </p>
          <a 
            href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20ingin%20konsultasi%20pembuatan%20software%20custom"
            target="_blank" 
            rel="noreferrer"
            className="btn-wa-animated"
            style={{ padding: '14px 32px', fontSize: '1rem' }}
          >
            💬 Konsultasi Arsitektur Custom via WA
          </a>
        </div>

      </div>
    </div>
  );
}
