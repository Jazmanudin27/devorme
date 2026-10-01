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

module.exports = {
  getCompanyInfo,
  getProducts
};
