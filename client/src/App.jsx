import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import AdminView from './views/AdminView';
import ProductDetailView from './views/ProductDetailView';
import ArchitectureView from './views/ArchitectureView';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('e-sekolah');

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView(`product-${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <div style={{ flex: 1 }}>
        {currentView === 'home' && (
          <HomeView 
            onSelectProduct={handleSelectProduct}
            onNavigateToArchitecture={() => {
              setCurrentView('architecture');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToAdmin={() => {
              setCurrentView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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

      <Footer />
    </div>
  );
}
