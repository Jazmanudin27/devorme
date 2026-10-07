import React, { useState, useEffect } from 'react';
import { productService } from '../api/productService';

export default function AdminView({ onBackToHome }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    domain: '',
    category: 'Enterprise SaaS',
    tagline: '',
    db_schema: '',
    status: 'active'
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('admin_token'));
  const [loginForm, setLoginForm] = useState({ email: 'admin@devorme.com', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [settingsForm, setSettingsForm] = useState({
    default_banner_image: '',
    default_banner_caption: ''
  });
  const [savingSettings, setSavingSettings] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    const res = await productService.loginAdmin(loginForm.email, loginForm.password);
    if (res && res.success) {
      setIsLoggedIn(true);
      loadProducts();
    } else {
      setLoginError(res?.message || 'Login gagal');
    }
    setLoginLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsLoggedIn(false);
  };

  const [inquiries, setInquiries] = useState([]);

  const loadProducts = async () => {
    setLoading(true);
    const [data, settingsData, inquiriesData] = await Promise.all([
      productService.getAllProducts(),
      productService.getSettings(),
      productService.getInquiries()
    ]);
    setProducts(data);
    setInquiries(inquiriesData || []);
    if (settingsData) {
      setSettingsForm({
        default_banner_image: settingsData.default_banner_image || '',
        default_banner_caption: settingsData.default_banner_caption || ''
      });
    }
    setLoading(false);
  };

  const handleUpdateInquiryStatus = async (id, newStatus) => {
    const res = await productService.updateInquiryStatus(id, newStatus);
    if (res && res.success) {
      setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    } else {
      alert('Gagal update status: ' + (res?.message || 'Error'));
    }
  };


  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    const res = await productService.updateSettings(settingsForm);
    if (res && res.success) {
      alert('Pengaturan Gambar Default (Fallback Banner) berhasil disimpan ke Database!');
    } else {
      alert('Gagal menyimpan pengaturan: ' + (res?.message || 'Error'));
    }
    setSavingSettings(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadProducts();
    }
  }, [isLoggedIn]);



  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditId(null);
    setForm({
      name: '',
      slug: '',
      domain: '',
      category: 'Enterprise SaaS',
      tagline: '',
      db_schema: '',
      status: 'active',
      images: []
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setIsEditing(true);
    setEditId(p.id);
    const mappedImages = (p.images || []).map(img => 
      typeof img === 'string' 
        ? { url: img, caption: p.name } 
        : { url: img.image_url || img.url || img.src || '', caption: img.caption || p.name }
    );
    setForm({
      name: p.name,
      slug: p.slug,
      domain: p.domain,
      category: p.category,
      tagline: p.tagline,
      db_schema: p.db_schema || p.serverDatabase || '',
      status: p.status || 'active',
      images: mappedImages.length > 0 ? mappedImages : [{ url: '', caption: '' }]
    });
    setShowModal(true);
  };

  const handleFileUpload = async (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    const res = await productService.uploadImage(file);
    if (res && res.success && res.url) {
      const newImgs = [...(form.images || [])];
      if (!newImgs[idx]) newImgs[idx] = { url: '', caption: '' };
      newImgs[idx].url = res.url;
      setForm({ ...form, images: newImgs });
    } else {
      alert('Gagal mengunggah gambar: ' + (res?.message || 'Error'));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.domain) {
      alert('Nama, Slug, dan Domain wajib diisi!');
      return;
    }

    if (isEditing) {
      const res = await productService.updateProduct(editId, form);
      if (res && res.success) {
        alert('Produk berhasil diperbarui di database!');
        setShowModal(false);
        loadProducts();
      } else {
        alert('Gagal update: ' + (res?.message || 'Error'));
      }
    } else {
      const res = await productService.createProduct(form);
      if (res && res.success) {
        alert('Produk baru berhasil didaftarkan ke database!');
        setShowModal(false);
        loadProducts();
      } else {
        alert('Gagal tambah: ' + (res?.message || 'Error'));
      }
    }
  };

  const handleDelete = async (id, name) => {
    if (confirm(`Yakin ingin menghapus produk "${name}" dari database server?`)) {
      const res = await productService.deleteProduct(id);
      if (res && res.success) {
        alert('Produk berhasil dihapus!');
        loadProducts();
      } else {
        alert('Gagal menghapus: ' + (res?.message || 'Error'));
      }
    }
  };

  const [activeNav, setActiveNav] = useState('products'); // 'products', 'inquiries', 'settings'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [clock, setClock] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'Long', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setClock(`${dateStr} • ${timeStr}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = products.filter(p => {
    const matchSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (p.slug || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (p.domain || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 20%, #0f172a 0%, #07090e 100%)', color: '#f8fafc', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 10 }}>
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.85)', 
            backdropFilter: 'blur(20px)', 
            padding: '44px 40px', 
            borderRadius: '24px', 
            border: '1px solid rgba(56, 189, 248, 0.25)', 
            width: '100%', 
            maxWidth: '440px', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.1)' 
          }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(99, 102, 241, 0.2))', 
                border: '1px solid rgba(56, 189, 248, 0.3)', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '2rem', 
                margin: '0 auto 18px',
                boxShadow: '0 10px 25px rgba(56, 189, 248, 0.15)'
              }}>
                🔑
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                Portal Otentikasi Admin
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Akses terbatas untuk Pengelola Server & Database Ekosistem Devorme
              </p>
            </div>

            {loginError && (
              <div style={{ 
                background: 'rgba(239, 68, 68, 0.15)', 
                border: '1px solid rgba(239, 68, 68, 0.3)', 
                color: '#fca5a5', 
                padding: '12px 16px', 
                borderRadius: '12px', 
                fontSize: '0.88rem', 
                marginBottom: '20px', 
                textAlign: 'center',
                fontWeight: 500
              }}>
                ⚠️ {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                  Email Admin
                </label>
                <input 
                  type="email"
                  value={loginForm.email}
                  onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="admin@devorme.com"
                  style={{ 
                    width: '100%', 
                    padding: '14px 16px', 
                    borderRadius: '12px', 
                    background: 'rgba(30, 41, 59, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.12)', 
                    color: '#ffffff', 
                    outline: 'none', 
                    fontSize: '0.95rem'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                  Kata Sandi
                </label>
                <input 
                  type="password"
                  value={loginForm.password}
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••"
                  style={{ 
                    width: '100%', 
                    padding: '14px 16px', 
                    borderRadius: '12px', 
                    background: 'rgba(30, 41, 59, 0.6)', 
                    border: '1px solid rgba(255, 255, 255, 0.12)', 
                    color: '#ffffff', 
                    outline: 'none', 
                    fontSize: '0.95rem'
                  }}
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loginLoading} 
                style={{ 
                  width: '100%',
                  padding: '14px', 
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', 
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem', 
                  cursor: loginLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 20px rgba(2, 132, 199, 0.35)',
                  marginTop: '6px'
                }}
              >
                {loginLoading ? 'Authentikasi Server...' : 'Masuk Dashboard Admin'}
              </button>
              <button 
                type="button" 
                onClick={onBackToHome}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ← Kembali ke Website Utama
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* 1. LEFT SIDEBAR PANEL (Dark Blue Theme matching Reference UI) */}
      <aside style={{ width: '270px', background: '#0a1324', color: '#94a3b8', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Brand Header */}
        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ width: '36px', height: '36px', background: '#0284c7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900, fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)' }}>
            D
          </div>
          <div>
            <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.5px' }}>PORTAL</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>DEVORME SYSTEM</div>
          </div>
        </div>

        {/* Institution Badge Card */}
        <div style={{ padding: '16px 20px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/Logo.png" alt="Devorme Logo" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.2 }}>DEVORME TECH</div>
              <div style={{ display: 'inline-block', background: '#0284c7', color: '#ffffff', fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', marginTop: '4px', textTransform: 'uppercase' }}>
                ADMIN
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links List */}
        <nav style={{ flex: 1, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#475569', padding: '12px 12px 6px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            MENU UTAMA
          </div>

          <button 
            onClick={() => setActiveNav('products')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              width: '100%', 
              padding: '12px 14px', 
              borderRadius: '10px', 
              background: activeNav === 'products' ? '#1e293b' : 'transparent', 
              color: activeNav === 'products' ? '#38bdf8' : '#94a3b8', 
              border: 'none', 
              fontWeight: 600, 
              fontSize: '0.9rem', 
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🗄️</span>
            <span>Data Master Produk</span>
          </button>

          <button 
            onClick={() => setActiveNav('inquiries')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              width: '100%', 
              padding: '12px 14px', 
              borderRadius: '10px', 
              background: activeNav === 'inquiries' ? '#1e293b' : 'transparent', 
              color: activeNav === 'inquiries' ? '#38bdf8' : '#94a3b8', 
              border: 'none', 
              fontWeight: 600, 
              fontSize: '0.9rem', 
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>✉️</span>
            <span>Inquiry & Demo</span>
          </button>

          <button 
            onClick={() => setActiveNav('settings')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              width: '100%', 
              padding: '12px 14px', 
              borderRadius: '10px', 
              background: activeNav === 'settings' ? '#1e293b' : 'transparent', 
              color: activeNav === 'settings' ? '#38bdf8' : '#94a3b8', 
              border: 'none', 
              fontWeight: 600, 
              fontSize: '0.9rem', 
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>⚙️</span>
            <span>Pengaturan System</span>
          </button>

          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#475569', padding: '20px 12px 6px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            AKSES LAINNYA
          </div>

          <button 
            onClick={onBackToHome}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              width: '100%', 
              padding: '12px 14px', 
              borderRadius: '10px', 
              background: 'transparent', 
              color: '#94a3b8', 
              border: 'none', 
              fontWeight: 600, 
              fontSize: '0.9rem', 
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🌐</span>
            <span>Website Utama</span>
          </button>

          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              width: '100%', 
              padding: '12px 14px', 
              borderRadius: '10px', 
              background: 'transparent', 
              color: '#ef4444', 
              border: 'none', 
              fontWeight: 600, 
              fontSize: '0.9rem', 
              cursor: 'pointer',
              textAlign: 'left',
              marginTop: 'auto'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🚪</span>
            <span>Keluar (Logout)</span>
          </button>
        </nav>
      </aside>

      {/* 2. MAIN RIGHT CONTENT AREA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Bar */}
        <header style={{ height: '68px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ background: '#f8fafc', border: '1px solid #e2e8f0', width: '38px', height: '38px', borderRadius: '10px', cursor: 'pointer', fontSize: '1.2rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ☰
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Real-time Clock Pill */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 16px', borderRadius: '99px', fontSize: '0.85rem', color: '#475569', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🕒</span>
              <span>{clock}</span>
            </div>

            {/* Notification Bell Badge */}
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: '#64748b' }}>
                🔔
              </div>
              {inquiries.filter(i => i.status === 'new').length > 0 && (
                <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#ef4444', color: '#ffffff', fontSize: '0.7rem', fontWeight: 800, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #ffffff' }}>
                  {inquiries.filter(i => i.status === 'new').length}
                </span>
              )}
            </div>

            {/* Profile Dropdown Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 14px 4px 6px', borderRadius: '99px', cursor: 'pointer' }}>
              <img src="/Logo.png" alt="Admin Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>DEVORME SUPERADMIN</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>▼</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          {activeNav === 'products' && (
            <div>
              {/* Header Title Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ color: '#0284c7' }}>👤</span> Data Master Produk & Subdomain
                  </h1>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                    Total {filteredProducts.length} produk terdaftar dalam sistem ekosistem server
                  </p>
                </div>

                <button 
                  onClick={handleOpenAdd}
                  style={{ 
                    background: '#0284c7', 
                    color: '#ffffff', 
                    border: 'none', 
                    padding: '12px 20px', 
                    borderRadius: '10px', 
                    fontWeight: 700, 
                    fontSize: '0.9rem', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
                  }}
                >
                  <span>+</span> Tambah Produk Baru
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 220px auto', gap: '14px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
                  <input 
                    type="text" 
                    placeholder="Cari berdasarkan nama produk, slug, atau domain..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px 10px 40px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>

                <select 
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.9rem', color: '#334155' }}
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>

                <button 
                  onClick={loadProducts}
                  style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '10px 14px', borderRadius: '10px', cursor: 'pointer', color: '#475569', fontSize: '1rem' }}
                  title="Refresh Data"
                >
                  🔄
                </button>
              </div>

              {/* Data Table Matching Reference UI */}
              <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                {loading ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Memuat data produk...</div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                          <th style={{ padding: '14px 18px', width: '60px' }}>NO</th>
                          <th style={{ padding: '14px 18px' }}>NAMA PRODUK & TAGLINE</th>
                          <th style={{ padding: '14px 18px' }}>SLUG</th>
                          <th style={{ padding: '14px 18px' }}>DOMAIN / SUBDOMAIN</th>
                          <th style={{ padding: '14px 18px' }}>KATEGORI</th>
                          <th style={{ padding: '14px 18px' }}>DATABASE SCHEMA</th>
                          <th style={{ padding: '14px 18px' }}>STATUS</th>
                          <th style={{ padding: '14px 18px', textAlign: 'center' }}>AKSI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.length === 0 ? (
                          <tr>
                            <td colSpan="8" style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
                              Tidak ada data produk yang ditemukan.
                            </td>
                          </tr>
                        ) : (
                          filteredProducts.map((p, idx) => (
                            <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '14px 18px', color: '#64748b', fontWeight: 600 }}>{idx + 1}</td>
                              <td style={{ padding: '14px 18px' }}>
                                <div style={{ fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{p.tagline}</div>
                              </td>
                              <td style={{ padding: '14px 18px', fontFamily: 'monospace', color: '#64748b' }}>
                                {p.slug}
                              </td>
                              <td style={{ padding: '14px 18px' }}>
                                <a href={`https://${p.domain}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0284c7', fontWeight: 600 }}>
                                  🌐 {p.domain}
                                </a>
                              </td>
                              <td style={{ padding: '14px 18px' }}>
                                <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                                  {p.category}
                                </span>
                              </td>
                              <td style={{ padding: '14px 18px' }}>
                                <code style={{ background: '#eef2ff', color: '#4f46e5', padding: '2px 8px', borderRadius: '4px', fontSize: '0.82rem' }}>
                                  {p.db_schema || 'devorme'}
                                </code>
                              </td>
                              <td style={{ padding: '14px 18px' }}>
                                <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 10px', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700 }}>
                                  Aktif
                                </span>
                              </td>
                              <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                                <div style={{ display: 'inline-flex', gap: '6px' }}>
                                  <button 
                                    onClick={() => handleOpenEdit(p)}
                                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    title="Edit Produk"
                                  >
                                    ✏️
                                  </button>
                                  <button 
                                    onClick={() => handleDelete(p.id, p.name)}
                                    style={{ background: '#ef4444', color: '#ffffff', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    title="Hapus Produk"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeNav === 'inquiries' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#0284c7' }}>✉️</span> Data Inquiry & Permintaan Demo
                </h1>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Pesan masuk dari form kontak calon klien</p>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                      <th style={{ padding: '14px 18px' }}>WAKTU</th>
                      <th style={{ padding: '14px 18px' }}>NAMA & INSTANSI</th>
                      <th style={{ padding: '14px 18px' }}>KONTAK</th>
                      <th style={{ padding: '14px 18px' }}>MINAT PRODUK</th>
                      <th style={{ padding: '14px 18px' }}>PESAN</th>
                      <th style={{ padding: '14px 18px' }}>STATUS</th>
                      <th style={{ padding: '14px 18px', textAlign: 'center' }}>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.length === 0 ? (
                      <tr><td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>Belum ada inquiry masuk.</td></tr>
                    ) : (
                      inquiries.map(inq => (
                        <tr key={inq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '0.8rem' }}>
                            {new Date(inq.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <strong style={{ color: '#0f172a', display: 'block' }}>{inq.full_name}</strong>
                            <span style={{ fontSize: '0.8rem', color: '#4f46e5' }}>{inq.institution || 'Umum'}</span>
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <div>{inq.email}</div>
                            {inq.phone && <div style={{ fontSize: '0.8rem', color: '#16a34a' }}>📱 {inq.phone}</div>}
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '3px 8px', borderRadius: '6px', fontSize: '0.8rem' }}>
                              {inq.product_interest}
                            </span>
                          </td>
                          <td style={{ padding: '14px 18px', maxWidth: '220px', color: '#334155' }}>{inq.message}</td>
                          <td style={{ padding: '14px 18px' }}>
                            <span style={{ 
                              padding: '3px 10px', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700,
                              background: inq.status === 'new' ? '#fef3c7' : inq.status === 'contacted' ? '#dbeafe' : '#dcfce7',
                              color: inq.status === 'new' ? '#92400e' : inq.status === 'contacted' ? '#1e40af' : '#15803d'
                            }}>
                              {inq.status === 'new' ? 'Baru' : inq.status === 'contacted' ? 'Dihubungi' : 'Selesai'}
                            </span>
                          </td>
                          <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                            <select 
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                              style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.82rem' }}
                            >
                              <option value="new">Baru</option>
                              <option value="contacted">Dihubungi</option>
                              <option value="closed">Selesai</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeNav === 'settings' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#0284c7' }}>⚙️</span> Pengaturan System & Fallback Banner
                </h1>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Konfigurasi parameter global yang tersimpan di database MySQL</p>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '28px', maxWidth: '640px' }}>
                <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>URL / Path Banner Default *</label>
                    <input 
                      type="text" 
                      value={settingsForm.default_banner_image} 
                      onChange={e => setSettingsForm({ ...settingsForm, default_banner_image: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none' }}
                      required 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>Caption Banner Default *</label>
                    <input 
                      type="text" 
                      value={settingsForm.default_banner_caption} 
                      onChange={e => setSettingsForm({ ...settingsForm, default_banner_caption: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none' }}
                      required 
                    />
                  </div>

                  <button type="submit" disabled={savingSettings} style={{ background: '#0284c7', color: '#ffffff', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                    {savingSettings ? 'Menyimpan...' : '💾 Simpan Pengaturan Database'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal Form Create / Edit matching reference UI */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '540px', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{isEditing ? 'Edit Data Produk' : 'Tambah Produk Baru'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}>&times;</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Nama Produk *</label>
                <input 
                  type="text" 
                  placeholder="cth: E-Sekolah Cloud" 
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Slug ID *</label>
                  <input 
                    type="text" 
                    placeholder="cth: e-sekolah" 
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Subdomain *</label>
                  <input 
                    type="text" 
                    placeholder="cth: e-sekolah.devorme.site" 
                    value={form.domain}
                    onChange={e => setForm({ ...form, domain: e.target.value.toLowerCase() })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Kategori</label>
                <input 
                  type="text" 
                  placeholder="cth: Pendidikan & Akademik" 
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Skema Database MySQL *</label>
                <input 
                  type="text" 
                  placeholder="cth: e_sekolah_db" 
                  value={form.db_schema}
                  onChange={e => setForm({ ...form, db_schema: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Tagline Singkat</label>
                <input 
                  type="text" 
                  placeholder="cth: Sistem Manajemen Presensi dan Penilaian Siswa" 
                  value={form.tagline}
                  onChange={e => setForm({ ...form, tagline: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>

              {/* Multi Image Upload */}
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>🖼️ Foto Slider Portofolio</label>
                  <button 
                    type="button" 
                    onClick={() => setForm({ ...form, images: [...(form.images || []), { url: '', caption: '' }] })}
                    style={{ background: '#e0e7ff', color: '#3730a3', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    + Foto Slide
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                  {(form.images || [{ url: '', caption: '' }]).map((img, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: '#ffffff', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '6px', alignItems: 'center' }}>
                        <input 
                          type="text"
                          placeholder="URL / Path Foto (/esekolah_preview.jpg)"
                          value={img.url}
                          onChange={e => {
                            const newImgs = [...form.images];
                            newImgs[idx].url = e.target.value;
                            setForm({ ...form, images: newImgs });
                          }}
                          style={{ padding: '6px 10px', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                        />
                        <label style={{ background: '#0284c7', color: '#ffffff', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                          Upload
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }}
                            onChange={e => handleFileUpload(e, idx)}
                          />
                        </label>
                        <button 
                          type="button" 
                          onClick={() => setForm({ ...form, images: form.images.filter((_, i) => i !== idx) })}
                          style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', padding: '6px 10px', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      </div>
                      <input 
                        type="text"
                        placeholder="Caption Foto"
                        value={img.caption}
                        onChange={e => {
                          const newImgs = [...form.images];
                          newImgs[idx].caption = e.target.value;
                          setForm({ ...form, images: newImgs });
                        }}
                        style={{ padding: '6px 10px', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, background: '#0284c7', color: '#ffffff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                  {isEditing ? 'Simpan Perubahan' : 'Daftarkan ke Server'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: '#f1f5f9', color: '#475569', padding: '12px 18px', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
