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
    'E-Sekolah Cloud', 
    'e-sekolah.devorme.site', 
    'Pendidikan & Akademik', 
    'Sistem Informasi Manajemen Sekolah, Presensi Guru & Siswa, serta Penilaian Terpadu', 
    'E-Sekolah berjalan di domain https://e-sekolah.devorme.site untuk digitalisasi sekolah, rekap presensi guru/siswa, jadwal pelajaran, dan kenaikan kelas.', 
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
    'Enterprise & Public Service', 
    'Digital Information System & Layanan Publik Terpadu', 
    'Platform DIS beroperasi di domain https://dis.devorme.site dengan enkripsi data dan pelaporan terintegrasi.', 
    'dis_db', 
    'https://api.devorme.site/v1/dis',
    'active', 
    'linear-gradient(135deg, #a855f7, #ec4899)'
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
