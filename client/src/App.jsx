import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import AdminView from './views/AdminView';
import ProductDetailView from './views/ProductDetailView';
import ArchitectureView from './views/ArchitectureView';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('e-sekolah');

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView(`product-${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    if (window.location.hash === '#admin') {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAdmin = () => {
    window.location.hash = 'admin';
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} onNavigateToAdmin={handleNavigateToAdmin} />

      <div style={{ flex: 1 }}>
        {currentView === 'home' && (
          <HomeView 
            onSelectProduct={handleSelectProduct}
            onNavigateToArchitecture={() => {
              setCurrentView('architecture');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToAdmin={handleNavigateToAdmin}
          />
        )}

        {currentView === 'admin' && (
          <AdminView 
            onBackToHome={handleBackToHome}
          />
        )}

        {currentView.startsWith('product-') && (
          <ProductDetailView 
            productId={selectedProductId}
            onBackToCompany={handleBackToHome}
          />
        )}

        {currentView === 'architecture' && (
          <ArchitectureView 
            onBackToCompany={handleBackToHome}
          />
        )}
      </div>

      <Footer onNavigateToAdmin={handleNavigateToAdmin} />
    </div>
  );
}

