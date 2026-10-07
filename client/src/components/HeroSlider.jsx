import React from 'react';

export default function HeroSlider({ heroBanner }) {
  return (
    <section className="banner-showcase-section" id="bannerShowcase" style={{ padding: '16px 0 28px' }}>
      <div className="container">
        <div className="banner-clean-wrapper">
          <img 
            src={heroBanner || '/Banner4.png?v=5.0'} 
            alt="Devorme Banner - Wujudkan Ide Anda dengan Mudah"
            className="banner-full-clean-img"
          />
        </div>
      </div>
    </section>
  );
}
