import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import DomainSimulator from '../components/DomainSimulator';
import { productService } from '../api/productService';

export default function HomeView({ onSelectProduct, onNavigateToArchitecture }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: '',
    slug: '',
    domain: '',
    category: 'Enterprise SaaS',
    tagline: '',
    db_schema: ''
  });

  const loadData = async () => {
    setLoading(true);
    const data = await productService.getAllProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.domain || !form.db_schema) {
      alert('Mohon lengkapi semua field yang wajib diisi.');
      return;
    }

    const res = await productService.createProduct(form);
    if (res && res.success) {
      alert(`Sukses: Produk ${form.name} berhasil didaftarkan ke server!`);
      setShowAddModal(false);
      setForm({ name: '', slug: '', domain: '', category: 'Enterprise SaaS', tagline: '', db_schema: '' });
      loadData();
    } else {
      alert(`Gagal: ${res?.message || 'Terjadi kesalahan'}`);
    }
  };

  return (
    <main className="container" style={{ padding: '60px 24px' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div className="badge-pill">
          <span className="badge-dot"></span>
          <span>Ekosistem Software Multi-Domain & Central Database (MySQL 8.0)</span>
        </div>

        <h1 style={{ fontSize: '3.4rem', maxWidth: '850px', margin: '0 auto 20px', letterSpacing: '-1px' }}>
          Membangun Ekosistem <span className="gradient-text">Software Cerdas</span> Berbasis Server Terpusat
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Devorme merancang produk software mandiri dengan nama domain khusus masing-masing, namun seluruh data dan autentikasi terhubung ke database MySQL server terpusat.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#products-section" className="btn btn-primary">
            Jelajahi Produk Kami ↓
          </a>
          <button className="btn btn-glass" onClick={() => setShowAddModal(true)}>
            + Tambah Produk Baru (CRUD Test)
          </button>
          <button className="btn btn-glass" onClick={onNavigateToArchitecture}>
            Lihat Arsitektur Server
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Portofolio Produk Software</h2>
            <p style={{ color: 'var(--text-muted)' }}>Klik salah satu produk untuk mengunjungi website resmi dan domain khususnya.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)} style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            + Daftarkan Produk Baru
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Memuat data produk dari server...</div>
        ) : (
          <div className="products-grid">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
            ))}
          </div>
        )}
      </section>

      {/* Simulator Component */}
      <section>
        <DomainSimulator onSelectProduct={onSelectProduct} />
      </section>

      {/* Modal Form Tambah Produk (CRUD Create) */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '16px', width: '100%', maxWidth: '520px', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem' }}>Tambah Produk & Domain Baru</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>

            <form onSubmit={handleCreateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>Nama Produk *</label>
                <input 
                  type="text" 
                  placeholder="cth: CloudDesk CRM" 
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>Slug ID *</label>
                  <input 
                    type="text" 
                    placeholder="cth: clouddesk" 
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>Nama Domain *</label>
                  <input 
                    type="text" 
                    placeholder="cth: clouddesk.id" 
                    value={form.domain}
                    onChange={e => setForm({ ...form, domain: e.target.value.toLowerCase() })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>Skema Database MySQL di Server *</label>
                <input 
                  type="text" 
                  placeholder="cth: schema_clouddesk_db" 
                  value={form.db_schema}
                  onChange={e => setForm({ ...form, db_schema: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>Tagline Singkat</label>
                <input 
                  type="text" 
                  placeholder="cth: Software CRM dan Follow-up Prospek Otomatis" 
                  value={form.tagline}
                  onChange={e => setForm({ ...form, tagline: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Simpan Produk ke Database Server
                </button>
                <button type="button" className="btn btn-glass" onClick={() => setShowAddModal(false)}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
