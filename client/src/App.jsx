import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import ProductDetailView from './views/ProductDetailView';
import ArchitectureView from './views/ArchitectureView';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('flowdesk');

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView(`product-${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCompany = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <div style={{ flex: 1 }}>
        {currentView === 'home' && (
          <HomeView 
            onSelectProduct={handleSelectProduct}
            onNavigateToArchitecture={() => setCurrentView('architecture')}
          />
        )}

        {currentView.startsWith('product-') && (
          <ProductDetailView 
            productId={selectedProductId}
            onBackToCompany={handleBackToCompany}
          />
        )}

        {currentView === 'architecture' && (
          <ArchitectureView 
            onBackToCompany={handleBackToCompany}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
