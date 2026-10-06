import React, { useState } from 'react';
import { productService } from '../api/productService';

export default function InquiryForm() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    institution: '',
    product_interest: 'E-Sekolah Cloud Platform',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.message) {
      alert('Nama, Email, dan Pesan wajib diisi!');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    const res = await productService.sendInquiry(form);
    if (res && res.success) {
      setSubmitted(true);
      setForm({
        full_name: '',
        email: '',
        phone: '',
        institution: '',
        product_interest: 'E-Sekolah Cloud Platform',
        message: ''
      });
    } else {
      setErrorMsg(res?.message || 'Gagal mengirim formulir. Silakan coba lagi.');
    }
    setSubmitting(false);
  };

  return (
    <section id="kontak" style={{ padding: '84px 0', background: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div style={{ textAlign: 'center', margin: '0 auto 48px' }}>
          <div className="hero-pill-blue">
            <span>📩 Form Minta Demo & Konsultasi</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '14px', color: '#0f172a' }}>
            Siap Mengembangkan Ekosistem Software Anda?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Isi formulir di bawah ini untuk menjadwalkan sesi konsultasi teknis atau demo langsung platform Devorme.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'start' }}>
          {/* Direct Contact Card */}
          <div style={{ background: 'var(--bg-warm)', padding: '36px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '12px' }}>Hubungi Tim Software House</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Punya pertanyaan mendesak? Tim engineer kami siap merespons pesan WhatsApp atau panggilan Anda secara langsung.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>📍</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#0f172a' }}>Kantor Operasional</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Surabaya & Jakarta, Indonesia</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>💬</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#0f172a' }}>WhatsApp Offical</strong>
                  <a href="https://wa.me/6281222332376" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#3b82f6', textDecoration: 'none' }}>
                    +62 812-2233-2376
                  </a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>📧</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#0f172a' }}>Email Support</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>support@devorme.site</span>
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/6281222332376?text=Halo%20Devorme,%20saya%20ingin%20konsultasi%20software" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-blue" 
              style={{ display: 'block', textAlign: 'center', width: '100%', padding: '14px', fontSize: '0.95rem' }}
            >
              💬 Chat WhatsApp Langsung
            </a>
          </div>

          {/* Inquiry Form */}
          <div style={{ background: '#ffffff', padding: '36px', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
                <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '8px' }}>Permintaan Terkirim!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  Terima kasih! Pesan Anda telah tersimpan di database server kami. Tim Devorme akan segera menghubungi Anda.
                </p>
                <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {errorMsg && (
                  <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Nama Lengkap *</label>
                  <input 
                    type="text" 
                    placeholder="Budi Santoso"
                    value={form.full_name}
                    onChange={e => setForm({ ...form, full_name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Email Resmi *</label>
                    <input 
                      type="email" 
                      placeholder="budi@instansi.id"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>No. WhatsApp</label>
                    <input 
                      type="text" 
                      placeholder="08123456789"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Nama Instansi / Perusahaan</label>
                  <input 
                    type="text" 
                    placeholder="SMK Negeri 4 Surabaya / PT Medika"
                    value={form.institution}
                    onChange={e => setForm({ ...form, institution: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Produk / Solusi yang Diminati</label>
                  <select
                    value={form.product_interest}
                    onChange={e => setForm({ ...form, product_interest: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none', background: '#ffffff' }}
                  >
                    <option value="E-Sekolah Cloud Platform">🎓 E-Sekolah Cloud Platform</option>
                    <option value="DIS Smart System">🏛️ DIS Smart System (Birokrasi Dinas)</option>
                    <option value="Apotek & Klinik Smart POS">💊 Apotek & Klinik Smart POS</option>
                    <option value="Enterprise ERP & Logistics">🚚 Enterprise ERP & Logistics</option>
                    <option value="Custom Software Development">💻 Development Custom Software</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Pesan / Detail Kebutuhan *</label>
                  <textarea 
                    rows="4"
                    placeholder="Jelaskan kebutuhan software atau fitur yang ingin didiskusikan..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', outline: 'none', resize: 'vertical' }}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-navy" disabled={submitting} style={{ padding: '12px', fontSize: '0.95rem', marginTop: '6px' }}>
                  {submitting ? 'Mengirim data...' : '📩 Kirim Permintaan Demo'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
