/**
 * Company Controller
 * Menyajikan data profil perusahaan utama (Devorme) dan katalog produk ekosistem.
 */
const db = require('../config/db');

// Ambil info perusahaan & metrik server
const getCompanyInfo = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        name: "Devorme Technologies Inc.",
        tagline: "Ekosistem Software Cerdas Berbasis Server Terpusat",
        established: 2024,
        headquarters: "Surabaya & Jakarta, Indonesia",
        serverUptime: "99.98%",
        databaseStatus: "Online (PostgreSQL Clustered)",
        serverHost: db.status.host
      }
    });
  } catch (error) {
    next(error);
  }
};

// Ambil seluruh daftar produk beserta domain resminya
const getProducts = async (req, res, next) => {
  try {
    const products = [
      {
        id: "flowdesk",
        name: "FlowDesk ERP",
        domain: "flowdesk.id",
        category: "Enterprise & Supply Chain",
        tagline: "Sistem ERP & Manajemen Operasional Gudang Otomatis",
        dbSchema: "schema_flowdesk_prod",
        status: "active"
      },
      {
        id: "paynexus",
        name: "PayNexus Gateway",
        domain: "paynexus.com",
        category: "Fintech & Billing",
        tagline: "Payment Gateway Omnichannel, QRIS Dinamis & Virtual Account",
        dbSchema: "schema_paynexus_secure",
        status: "active"
      },
      {
        id: "pulseai",
        name: "PulseAI Analytics",
        domain: "pulseai.io",
        category: "AI & Smart Analytics",
        tagline: "Engine Prediksi Bisnis & Deteksi Anomali Penjualan Realtime",
        dbSchema: "schema_central_analytics",
        status: "active"
      }
    ];

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// In-Memory store untuk site_settings
let mockSettings = {
  default_banner_image: '/Banner.png',
  default_banner_caption: 'Dokumentasi & Platform Infrastruktur Devorme'
};


// Ambil site settings dari DB
const getSettings = async (req, res, next) => {
  try {
    if (db.isMySqlAvailable()) {
      const rows = await db.execute('SELECT setting_key, setting_value FROM site_settings');
      if (rows && rows.length > 0) {
        const settingsObj = {};
        rows.forEach(r => {
          settingsObj[r.setting_key] = r.setting_value;
        });
        return res.status(200).json({
          success: true,
          source: 'mysql_database',
          data: settingsObj
        });
      }
    }
    return res.status(200).json({
      success: true,
      source: 'in_memory_fallback',
      data: mockSettings
    });
  } catch (error) {
    next(error);
  }
};

// Update site settings ke DB
const updateSettings = async (req, res, next) => {
  try {
    const { default_banner_image, default_banner_caption } = req.body;

    if (db.isMySqlAvailable()) {
      if (default_banner_image !== undefined) {
        await db.execute('INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)', ['default_banner_image', default_banner_image]);
      }
      if (default_banner_caption !== undefined) {
        await db.execute('INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)', ['default_banner_caption', default_banner_caption]);
      }
    }

    if (default_banner_image !== undefined) mockSettings.default_banner_image = default_banner_image;
    if (default_banner_caption !== undefined) mockSettings.default_banner_caption = default_banner_caption;

    return res.status(200).json({
      success: true,
      message: 'Pengaturan website berhasil diperbarui.',
      data: mockSettings
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompanyInfo,
  getProducts,
  getSettings,
  updateSettings
};

