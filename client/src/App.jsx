import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import AdminView from './views/AdminView';
import ProductDetailView from './views/ProductDetailView';
import ArchitectureView from './views/ArchitectureView';
import PortfolioView from './views/PortfolioView';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('e-sekolah');

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      if (path === '/admin' || window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (path === '/portofolio' || window.location.hash === '#portofolio') {
        setCurrentView('portfolio');
      }
    };
    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView(`product-${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPortfolio = () => {
    window.history.pushState({}, '', '/portofolio');
    setCurrentView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'admin') {
    return (
      <AdminView 
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onNavigateToAdmin={handleNavigateToAdmin}
        onNavigateToPortfolio={handleNavigateToPortfolio}
        onBackToHome={handleBackToHome}
      />

      <div style={{ flex: 1 }}>
        {currentView === 'home' && (
          <HomeView 
            onSelectProduct={handleSelectProduct}
            onNavigateToArchitecture={() => {
              setCurrentView('architecture');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToAdmin={handleNavigateToAdmin}
            onNavigateToPortfolio={handleNavigateToPortfolio}
          />
        )}

        {currentView === 'portfolio' && (
          <PortfolioView 
            onSelectProduct={handleSelectProduct}
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

