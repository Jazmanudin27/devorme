-- ============================================================================
-- DEVORME MASTER DATABASE SCHEMA (MySQL 8.0+)
-- Arsitektur Server Terpusat untuk Ekosistem Multi-Domain
-- ============================================================================
USE `devorme`;

-- ----------------------------------------------------------------------------
-- 1. TABEL PENGGUNA TERPUSAT (Single Sign-On / SSO)
-- Pengguna yang terdaftar di sini dapat login ke semua domain produk
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(36) NOT NULL UNIQUE,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('superadmin', 'admin_product', 'client', 'member') NOT NULL DEFAULT 'client',
  `avatar_url` VARCHAR(255) NULL,
  `status` ENUM('active', 'suspended', 'pending') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. TABEL KATALOG PRODUK SOFTWARE (Multi-Domain Directory)
-- Menyimpan nama produk, domain mandiri, dan nama skema database di server
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(50) NOT NULL UNIQUE COMMENT 'Identifier unik (cth: flowdesk, paynexus)',
  `name` VARCHAR(100) NOT NULL COMMENT 'Nama produk (cth: FlowDesk ERP)',
  `domain` VARCHAR(150) NOT NULL UNIQUE COMMENT 'Nama domain resmi produk (cth: flowdesk.id)',
  `category` VARCHAR(50) NOT NULL COMMENT 'Kategori produk (Enterprise, Fintech, AI, dll)',
  `tagline` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `db_schema` VARCHAR(64) NOT NULL COMMENT 'Skema database produk di server (cth: schema_flowdesk_prod)',
  `api_endpoint` VARCHAR(255) NULL COMMENT 'Endpoint API khusus produk',
  `status` ENUM('active', 'maintenance', 'development') NOT NULL DEFAULT 'active',
  `icon_bg` VARCHAR(100) DEFAULT 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_products_domain` (`domain`),
  INDEX `idx_products_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. TABEL FITUR-FITUR PRODUK (Product Features)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_features` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `is_highlighted` BOOLEAN DEFAULT TRUE,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_features_product` FOREIGN KEY (`product_id`) 
    REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. TABEL PAKET HARGA & LISENSI (Pricing Plans)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_pricing_plans` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT UNSIGNED NOT NULL,
  `plan_name` VARCHAR(100) NOT NULL COMMENT 'Starter, Pro, Enterprise',
  `price_idr` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `billing_period` ENUM('monthly', 'yearly', 'one_time') NOT NULL DEFAULT 'monthly',
  `user_limit` VARCHAR(50) DEFAULT 'Unlimited',
  `is_popular` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_plans_product` FOREIGN KEY (`product_id`) 
    REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. TABEL HAK AKSES LISENSI USER KE PRODUK (User Product Access)
-- Menghubungkan user SSO ke produk yang dibeli / dilanggani
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_product_access` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `role_in_product` VARCHAR(50) DEFAULT 'admin',
  `status` ENUM('active', 'expired', 'cancelled') NOT NULL DEFAULT 'active',
  `expires_at` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_user_product` (`user_id`, `product_id`),
  CONSTRAINT `fk_access_user` FOREIGN KEY (`user_id`) 
    REFERENCES `users`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_access_product` FOREIGN KEY (`product_id`) 
    REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. TABEL AUDIT LOG (Pencatatan Aktivitas Lintas Server)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NULL,
  `origin_domain` VARCHAR(150) NOT NULL COMMENT 'Domain pemanggil (cth: flowdesk.id)',
  `action` VARCHAR(100) NOT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `user_agent` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_audit_domain` (`origin_domain`),
  INDEX `idx_audit_action` (`action`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
