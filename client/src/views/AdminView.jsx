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

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 20%, #0f172a 0%, #07090e 100%)', color: '#f8fafc', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        {/* Glow Background Orbs */}
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        {/* Dedicated Admin Login Card */}
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
                    fontSize: '0.95rem',
                    transition: 'all 0.2s'
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
                    fontSize: '0.95rem',
                    transition: 'all 0.2s'
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
                  marginTop: '6px',
                  transition: 'all 0.2s'
                }}
              >
                {loginLoading ? 'Authentikasi Server...' : 'Masuk Dashboard Admin'}
              </button>
            </form>

            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Kredensial Default Superadmin: <code style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>admin@devorme.com</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <div className="container">
        {/* Header Bar */}
        <div className="admin-header-card">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eef2ff', color: '#4f46e5', padding: '4px 12px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>
              🔒 PANEL PENGELOLA SERVER
            </div>
            <h1 style={{ fontSize: '1.85rem' }}>Dashboard Manajemen Ekosistem Devorme</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Kelola katalog produk, pemetaan subdomain (e-sekolah.devorme.site), dan konfigurasi basis data MySQL terpusat.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={onBackToHome}>
              ← Beranda
            </button>
            <button className="btn btn-primary" onClick={handleOpenAdd}>
              + Tambah Produk
            </button>
            <button className="btn" style={{ background: '#fee2e2', color: '#b91c1c' }} onClick={handleLogout}>
              Keluar
            </button>
          </div>

        </div>

        {/* Stats Row */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Produk Aktif</span>
            <div className="admin-stat-number">{products.length}</div>
            <span style={{ fontSize: '0.8rem', color: '#16a34a' }}>● Terhubung ke MySQL devorme</span>
          </div>

          <div className="admin-stat-card">
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Domain Utama</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '8px', color: '#0f172a' }}>devorme.site</div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Root DNS Server VPS</span>
          </div>

          <div className="admin-stat-card">
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Database Server</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '8px', color: '#0f172a' }}>MySQL 8.0+</div>
            <span style={{ fontSize: '0.8rem', color: '#16a34a' }}>Host: localhost:3306</span>
          </div>
        </div>

        {/* Global Site Settings Card (Default Fallback Banner) */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid var(--border-subtle)', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>🖼️ Pengaturan Gambar Banner Default & Caption (Database)</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Gambar dan caption ini disimpan di tabel <code>site_settings</code> database MySQL dan digunakan sebagai fallback jika produk belum memiliki foto khusus.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>URL / Path Banner Default *</label>
              <input 
                type="text"
                placeholder="/Banner4.png?v=4.0"
                value={settingsForm.default_banner_image}
                onChange={e => setSettingsForm({ ...settingsForm, default_banner_image: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Caption Banner Default *</label>
              <input 
                type="text"
                placeholder="Dokumentasi & Platform Infrastruktur Devorme"
                value={settingsForm.default_banner_caption}
                onChange={e => setSettingsForm({ ...settingsForm, default_banner_caption: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={savingSettings} style={{ height: '42px', whiteSpace: 'nowrap' }}>
              {savingSettings ? 'Menyimpan...' : '💾 Simpan ke Database'}
            </button>
          </form>
        </div>

        {/* Product Table Card */}

        <div className="admin-table-card">
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.2rem' }}>Daftar Produk & Subdomain Terdaftar</h3>
            <button className="btn btn-secondary btn-sm" onClick={loadProducts}>
              🔄 Refresh Data
            </button>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Memuat data dari database MySQL...</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Produk</th>
                    <th>Subdomain Resmi</th>
                    <th>Kategori</th>
                    <th>Skema Database MySQL</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-dim)' }}>#{p.id}</td>
                      <td>
                        <strong style={{ color: '#0f172a', display: 'block' }}>{p.name}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.tagline}</span>
                      </td>
                      <td>
                        <a href={`https://${p.domain}`} target="_blank" rel="noreferrer" className="domain-pill">
                          🌐 {p.domain}
                        </a>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', background: '#f1f5f9', padding: '3px 10px', borderRadius: '6px', color: '#475569' }}>
                          {p.category}
                        </span>
                      </td>
                      <td>
                        <code style={{ fontSize: '0.85rem', color: '#4f46e5', background: '#eef2ff', padding: '2px 8px', borderRadius: '4px' }}>
                          {p.db_schema || p.serverDatabase || 'devorme'}
                        </code>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.78rem', background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '99px', fontWeight: 600 }}>
                          Aktif
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleOpenEdit(p)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-sm"
                            style={{ background: '#fee2e2', color: '#b91c1c' }}
                            onClick={() => handleDelete(p.id, p.name)}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Inquiries & Demo Requests Table Card */}
        <div className="admin-table-card" style={{ marginTop: '28px' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>📩 Permintaan Demo & Konsultasi Klien (Lead Capture)</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Pesan dari form kontak website yang tersimpan di basis data <code>inquiries</code>.</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={loadProducts}>
              🔄 Refresh Leads
            </button>
          </div>

          {inquiries.length === 0 ? (
            <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Belum ada pesan konsultasi baru yang masuk.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Waktu</th>
                    <th>Nama & Instansi</th>
                    <th>Kontak</th>
                    <th>Produk Minat</th>
                    <th>Pesan / Kebutuhan</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <tr key={inq.id}>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                        {new Date(inq.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td>
                        <strong style={{ color: '#0f172a', display: 'block' }}>{inq.full_name}</strong>
                        <span style={{ fontSize: '0.82rem', color: '#4f46e5' }}>{inq.institution || 'Instansi Umum'}</span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.83rem' }}>{inq.email}</div>
                        {inq.phone && <div style={{ fontSize: '0.8rem', color: '#16a34a' }}>📱 {inq.phone}</div>}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.82rem', background: '#e0e7ff', color: '#3730a3', padding: '3px 8px', borderRadius: '6px' }}>
                          {inq.product_interest}
                        </span>
                      </td>
                      <td style={{ maxWidth: '240px', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                        {inq.message}
                      </td>
                      <td>
                        <span style={{ 
                          fontSize: '0.78rem', 
                          padding: '3px 10px', 
                          borderRadius: '99px', 
                          fontWeight: 700,
                          background: inq.status === 'new' ? '#fef3c7' : inq.status === 'contacted' ? '#dbeafe' : '#dcfce7',
                          color: inq.status === 'new' ? '#92400e' : inq.status === 'contacted' ? '#1e40af' : '#15803d'
                        }}>
                          {inq.status === 'new' ? 'Baru' : inq.status === 'contacted' ? 'Dihubungi' : 'Selesai'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <select 
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid #cbd5e1', outline: 'none' }}
                        >
                          <option value="new">Baru</option>
                          <option value="contacted">Dihubungi</option>
                          <option value="closed">Selesai</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>


      {/* Modal Form Create / Edit */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '520px', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.35rem' }}>{isEditing ? 'Edit Data Produk' : 'Tambah Produk Baru'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Nama Produk *</label>
                <input 
                  type="text" 
                  placeholder="cth: E-Sekolah Cloud" 
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Slug ID *</label>
                  <input 
                    type="text" 
                    placeholder="cth: e-sekolah" 
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Subdomain *</label>
                  <input 
                    type="text" 
                    placeholder="cth: e-sekolah.devorme.site" 
                    value={form.domain}
                    onChange={e => setForm({ ...form, domain: e.target.value.toLowerCase() })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Kategori</label>
                <input 
                  type="text" 
                  placeholder="cth: Pendidikan & Akademik" 
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Skema Database MySQL *</label>
                <input 
                  type="text" 
                  placeholder="cth: e_sekolah_db" 
                  value={form.db_schema}
                  onChange={e => setForm({ ...form, db_schema: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Tagline Singkat</label>
                <input 
                  type="text" 
                  placeholder="cth: Sistem Manajemen Presensi dan Penilaian Siswa" 
                  value={form.tagline}
                  onChange={e => setForm({ ...form, tagline: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                />
              </div>

              {/* Multi Image & Caption Manager */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>🖼️ Galeri Foto Slider & Caption Database</label>
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setForm({ ...form, images: [...(form.images || []), { url: '', caption: '' }] })}
                    style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                  >
                    + Tambah Foto Slide
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
                  {(form.images || [{ url: '', caption: '' }]).map((img, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '6px', alignItems: 'center' }}>
                        <input 
                          type="text"
                          placeholder="URL Foto (misal: /esekolah_preview.jpg)"
                          value={img.url}
                          onChange={e => {
                            const newImgs = [...form.images];
                            newImgs[idx].url = e.target.value;
                            setForm({ ...form, images: newImgs });
                          }}
                          style={{ padding: '6px 10px', fontSize: '0.82rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                        />
                        <label style={{ background: '#e0e7ff', color: '#3730a3', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                          📁 Upload File
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }}
                            onChange={e => handleFileUpload(e, idx)}
                          />
                        </label>
                        <button 
                          type="button" 
                          onClick={() => {
                            const newImgs = form.images.filter((_, i) => i !== idx);
                            setForm({ ...form, images: newImgs });
                          }}
                          style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', padding: '6px 10px', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      </div>
                      <input 
                        type="text"
                        placeholder="Caption / Keterangan foto slide ini"
                        value={img.caption}
                        onChange={e => {
                          const newImgs = [...form.images];
                          newImgs[idx].caption = e.target.value;
                          setForm({ ...form, images: newImgs });
                        }}
                        style={{ padding: '6px 10px', fontSize: '0.82rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                      />
                    </div>
                  ))}
                </div>

              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {isEditing ? 'Simpan Perubahan' : 'Daftarkan ke Server'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
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
