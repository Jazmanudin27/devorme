-- ============================================================================
-- DEVORME MASTER SEED DATA (MySQL)
-- Data Awal untuk Produk dan Admin Terpusat
-- ============================================================================

USE `devorme`;

-- 1. Insert Akun Superadmin Terpusat (Password default: 'Admin123!' - hash bcrypt)
INSERT INTO `users` (`uuid`, `full_name`, `email`, `password_hash`, `role`, `status`)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Arya Superadmin', 'admin@devorme.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQmG6W6df/6qVz4E5s6vy', 'superadmin', 'active')
ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);

-- 2. Insert Data Produk Ekosistem (Subdomain devorme.site)
INSERT INTO `products` (`id`, `slug`, `name`, `domain`, `category`, `tagline`, `description`, `db_schema`, `api_endpoint`, `status`, `icon_bg`)
VALUES 
  (
    1,
    'e-sekolah', 
    'E-Sekolah Cloud Platform', 
    'e-sekolah.devorme.site', 
    '🎓 Sekolah & Yayasan', 
    'Sistem Informasi Manajemen Sekolah, Presensi Guru & Siswa, serta Penilaian Rapor', 
    'Platform e-sekolah terpadu untuk mengotomasi rekap presensi guru & siswa, jadwal pelajaran, e-rapor, serta kenaikan kelas dan alumni.', 
    'e_sekolah_db', 
    'https://api.devorme.site/v1/e-sekolah',
    'active', 
    'linear-gradient(135deg, #3b82f6, #06b6d4)'
  ),
  (
    2,
    'dis', 
    'DIS Smart System', 
    'dis.devorme.site', 
    '🏛️ Birokrasi & Dinas', 
    'Digital Information System & Alur Workflows Approval Dokumen Dinas', 
    'Sistem birokrasi digital instansi untuk pengelolaan surat masuk/keluar, approval bertingkat, dan pelaporan publik transparan.', 
    'dis_db', 
    'https://api.devorme.site/v1/dis',
    'active', 
    'linear-gradient(135deg, #a855f7, #ec4899)'
  ),
  (
    3,
    'pos-apotek', 
    'Apotek & Klinik Smart POS', 
    'pos.devorme.site', 
    '💊 Kesehatan & Apotek', 
    'Manajemen Stok Obat, Rekam Medis Pasien, & Kasir POS Farmasi Terpadu', 
    'Platform kasir dan rekam medis digital khusus apotek dan klinik kesehatan dengan integrasi stok otomatis dan peringatan obat kedaluwarsa.', 
    'pos_db', 
    'https://api.devorme.site/v1/pos',
    'active', 
    'linear-gradient(135deg, #10b981, #059669)'
  ),
  (
    4,
    'erp-distributor', 
    'Enterprise ERP & Logistics', 
    'erp.devorme.site', 
    '🚚 Perusahaan & Distribusi', 
    'Manajemen Inventori Gudang, Tracking Pengiriman, & Akuntansi Keuangan Realtime', 
    'Sistem ERP ekosistem manufaktur & distribusi barang dengan fitur multi-warehouse, pencatatan transaksi otomatis, dan laporan neraca keuangan.', 
    'erp_db', 
    'https://api.devorme.site/v1/erp',
    'active', 
    'linear-gradient(135deg, #f59e0b, #d97706)'
  )
ON DUPLICATE KEY UPDATE `slug` = VALUES(`slug`), `domain` = VALUES(`domain`);

-- 3. Insert Fitur-Fitur Produk
INSERT INTO `product_features` (`product_id`, `title`, `description`, `is_highlighted`, `sort_order`)
VALUES 
  (1, 'Multi-warehouse Tracking', 'Sinkronisasi stok barang antar gudang secara realtime.', TRUE, 1),
  (1, 'Multi-Departemen Approval', 'Alur pengajuan invoice dan purchase order bertingkat.', TRUE, 2),
  (1, 'Central Database Sync', 'Tersambung langsung ke database server devorme.', TRUE, 3),
  
  (2, 'QRIS Dinamis Otomatis', 'Generate QRIS cepat langsung dari kasir POS.', TRUE, 1),
  (2, 'Settlement H+0', 'Pencairan dana langsung ke rekening bank pada hari yang sama.', TRUE, 2),
  (2, 'Enkripsi Data Bank-Grade', 'Keamanan transaksi PCI-DSS level 1.', TRUE, 3),

  (3, 'AI Sales Prediction', 'Memprediksi tren penjualan hingga 30 hari ke depan.', TRUE, 1),
  (3, 'Fraud Anomaly Detection', 'Pemberitahuan instan jika terdeteksi aktivitas transaksi ganjil.', TRUE, 2);

-- 4. Insert Paket Harga
INSERT INTO `product_pricing_plans` (`product_id`, `plan_name`, `price_idr`, `billing_period`, `user_limit`, `is_popular`)
VALUES 
  (1, 'Starter ERP', 1500000.00, 'monthly', '15 Pengguna', FALSE),
  (1, 'Enterprise ERP', 4900000.00, 'monthly', 'Unlimited', TRUE),
  (2, 'Merchant Basic', 0.00, 'monthly', 'Unlimited', TRUE),
  (3, 'Pro Analytics', 2900000.00, 'monthly', '5 Akun Analyst', TRUE);
