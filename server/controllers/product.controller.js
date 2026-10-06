/**
 * Product Controller - Full CRUD Operations
 * Mengelola siklus hidup produk multi-domain di database MySQL server
 */
const db = require('../config/db');

// In-Memory store untuk fallback development jika database MySQL belum diimport
let mockProducts = [
  {
    id: 1,
    slug: "e-sekolah",
    name: "E-Sekolah Cloud Platform",
    domain: "e-sekolah.devorme.site",
    category: "🎓 Sekolah & Yayasan",
    tagline: "Sistem Informasi Manajemen Sekolah, Presensi Guru & Siswa, serta Penilaian Rapor",
    description: "Platform e-sekolah terpadu untuk mengotomasi rekap presensi guru & siswa, jadwal pelajaran, e-rapor, serta kenaikan kelas dan alumni.",
    db_schema: "e_sekolah_db",
    api_endpoint: "https://api.devorme.site/v1/e-sekolah",
    status: "active",
    icon_bg: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    images: [
      { src: '/esekolah_preview.jpg', caption: 'Dashboard Utama Akademik & Presensi Siswa' },
      { src: '/esekolah_preview_2.jpg', caption: 'Manajemen E-Rapor & Rekap Nilai Akademik' },
      { src: '/dis_preview.jpg', caption: 'Arsitektur Multi-Domain Server E-Sekolah' }
    ]
  },
  {
    id: 2,
    slug: "dis",
    name: "DIS Smart System",
    domain: "dis.devorme.site",
    category: "🏛️ Birokrasi & Dinas",
    tagline: "Digital Information System & Alur Workflows Approval Dokumen Dinas",
    description: "Sistem birokrasi digital instansi untuk pengelolaan surat masuk/keluar, approval bertingkat, dan pelaporan publik transparan.",
    db_schema: "dis_db",
    api_endpoint: "https://api.devorme.site/v1/dis",
    status: "active",
    icon_bg: "linear-gradient(135deg, #a855f7, #ec4899)",
    images: [
      { src: '/dis_preview.jpg', caption: 'Dashboard Birokrasi & Pelaporan Publik' },
      { src: '/esekolah_preview.jpg', caption: 'Infrastruktur Server Terpusat DIS System' },
      { src: '/esekolah_preview_2.jpg', caption: 'Alur Workflows Approval Dokumen Dinas' }
    ]
  },
  {
    id: 3,
    slug: "pos-apotek",
    name: "Apotek & Klinik Smart POS",
    domain: "pos.devorme.site",
    category: "💊 Kesehatan & Apotek",
    tagline: "Manajemen Stok Obat, Rekam Medis Pasien, & Kasir POS Farmasi Terpadu",
    description: "Platform kasir dan rekam medis digital khusus apotek dan klinik kesehatan dengan integrasi stok otomatis dan peringatan obat kedaluwarsa.",
    db_schema: "pos_db",
    api_endpoint: "https://api.devorme.site/v1/pos",
    status: "active",
    icon_bg: "linear-gradient(135deg, #10b981, #059669)",
    images: [
      { src: '/esekolah_preview_2.jpg', caption: 'Kasir POS Farmasi & QRIS Dinamis' },
      { src: '/esekolah_preview.jpg', caption: 'Rekam Medis Pasien & Resep Dokter Digital' },
      { src: '/dis_preview.jpg', caption: 'Manajemen Stok Obat & Expired Warning' }
    ]
  },
  {
    id: 4,
    slug: "erp-distributor",
    name: "Enterprise ERP & Logistics",
    domain: "erp.devorme.site",
    category: "🚚 Perusahaan & Distribusi",
    tagline: "Manajemen Inventori Gudang, Tracking Pengiriman, & Akuntansi Keuangan Realtime",
    description: "Sistem ERP ekosistem manufaktur & distribusi barang dengan fitur multi-warehouse, pencatatan transaksi otomatis, dan laporan neraca keuangan.",
    db_schema: "erp_db",
    api_endpoint: "https://api.devorme.site/v1/erp",
    status: "active",
    icon_bg: "linear-gradient(135deg, #f59e0b, #d97706)",
    images: [
      { src: '/dis_preview.jpg', caption: 'Tracking Pengiriman & Multi-Gudang' },
      { src: '/esekolah_preview_2.jpg', caption: 'Laporan Keuangan & Akuntansi Realtime' },
      { src: '/esekolah_preview.jpg', caption: 'Integrasi Multi-Subdomain ERP Enterprise' }
    ]
  }

];

// ============================================================================
// 1. READ: Ambil Semua Produk (GET /api/v1/products)
// ============================================================================
const getAllProducts = async (req, res, next) => {
  try {
    const { category, status } = req.query;

    if (db.isMySqlAvailable()) {
      let sql = 'SELECT * FROM products WHERE 1=1';
      const params = [];

      if (category) {
        sql += ' AND category = ?';
        params.push(category);
      }
      if (status) {
        sql += ' AND status = ?';
        params.push(status);
      }
      sql += ' ORDER BY id ASC';

      const rows = await db.execute(sql, params);

      for (let p of rows) {
        try {
          const imgs = await db.execute('SELECT image_url as src, caption FROM product_images WHERE product_id = ? ORDER BY sort_order ASC', [p.id]);
          p.images = imgs;
        } catch (e) {
          p.images = [];
        }
      }

      return res.status(200).json({
        success: true,
        source: 'mysql_database',
        count: rows.length,
        data: rows
      });
    }

    // Fallback in-memory
    let result = [...mockProducts];
    if (category) result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (status) result = result.filter(p => p.status === status);

    return res.status(200).json({
      success: true,
      source: 'in_memory_fallback',
      count: result.length,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================================
// 2. READ: Ambil Detail Produk berdasarkan ID atau Slug (GET /api/v1/products/:id)
// ============================================================================
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (db.isMySqlAvailable()) {
      const isNumeric = !isNaN(id);
      const sql = isNumeric 
        ? 'SELECT * FROM products WHERE id = ?' 
        : 'SELECT * FROM products WHERE slug = ? OR domain = ?';
      const params = isNumeric ? [id] : [id, id];

      const rows = await db.execute(sql, params);
      if (!rows || rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Produk '${id}' tidak ditemukan di database server.`
        });
      }

      const product = rows[0];

      // Ambil fitur produk
      const features = await db.execute('SELECT title, description FROM product_features WHERE product_id = ? ORDER BY sort_order ASC', [product.id]);
      product.features = features.map(f => f.title);

      // Ambil paket harga
      const plans = await db.execute('SELECT plan_name, price_idr, billing_period, user_limit FROM product_pricing_plans WHERE product_id = ?', [product.id]);
      product.pricingPlans = plans;

      return res.status(200).json({
        success: true,
        source: 'mysql_database',
        data: product
      });
    }

    // Fallback in-memory
    const product = mockProducts.find(p => p.id == id || p.slug.toLowerCase() === id.toLowerCase() || p.domain.toLowerCase() === id.toLowerCase());

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Produk '${id}' tidak ditemukan.`
      });
    }

    return res.status(200).json({
      success: true,
      source: 'in_memory_fallback',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================================
// 3. CREATE: Tambah Produk Baru (POST /api/v1/products)
// ============================================================================
// ============================================================================
// 3. CREATE: Tambah Produk Baru (POST /api/v1/products)
// ============================================================================
const createProduct = async (req, res, next) => {
  try {
    const { name, slug, domain, category, tagline, description, db_schema, api_endpoint, status, icon_bg, images } = req.body;

    // Validasi field wajib
    if (!name || !slug || !domain || !db_schema) {
      return res.status(400).json({
        success: false,
        message: 'Field name, slug, domain, dan db_schema wajib diisi.'
      });
    }

    if (db.isMySqlAvailable()) {
      const checkDup = await db.execute('SELECT id FROM products WHERE slug = ? OR domain = ?', [slug, domain]);
      if (checkDup && checkDup.length > 0) {
        return res.status(409).json({
          success: false,
          message: `Slug '${slug}' atau domain '${domain}' sudah terdaftar di database server.`
        });
      }

      const insertSql = `
        INSERT INTO products (slug, name, domain, category, tagline, description, db_schema, api_endpoint, status, icon_bg)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        slug,
        name,
        domain,
        category || 'Software Solution',
        tagline || '',
        description || '',
        db_schema,
        api_endpoint || `https://api.devorme.com/v1/${slug}`,
        status || 'active',
        icon_bg || 'linear-gradient(135deg, #6366f1, #06b6d4)'
      ];

      const result = await db.execute(insertSql, params);
      const newId = result.insertId;

      // Simpan foto galeri slider ke database
      if (Array.isArray(images) && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const imgUrl = images[i].url || images[i].src || images[i].image_url;
          const caption = images[i].caption || '';
          if (imgUrl) {
            await db.execute(
              'INSERT INTO product_images (product_id, image_url, caption, sort_order) VALUES (?, ?, ?, ?)',
              [newId, imgUrl, caption, i + 1]
            );
          }
        }
      }

      return res.status(201).json({
        success: true,
        message: `Produk '${name}' berhasil didaftarkan ke database MySQL server.`,
        data: {
          id: newId,
          slug,
          name,
          domain,
          db_schema
        }
      });
    }

    // Fallback in-memory
    const newProduct = {
      id: mockProducts.length + 1,
      slug,
      name,
      domain,
      category: category || 'Software Solution',
      tagline: tagline || '',
      description: description || '',
      db_schema,
      api_endpoint: api_endpoint || `https://api.devorme.com/v1/${slug}`,
      status: status || 'active',
      icon_bg: icon_bg || 'linear-gradient(135deg, #6366f1, #06b6d4)',
      images: Array.isArray(images) ? images.map(img => ({ src: img.url || img.src || img.image_url, caption: img.caption || name })) : [],
      features: [],
      pricingPlans: []
    };

    mockProducts.push(newProduct);

    return res.status(201).json({
      success: true,
      source: 'in_memory_fallback',
      message: `Produk '${name}' berhasil ditambahkan (In-Memory).`,
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};

// ============================================================================
// 4. UPDATE: Ubah Data Produk (PUT /api/v1/products/:id)
// ============================================================================
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, domain, category, tagline, description, db_schema, status, images } = req.body;

    if (db.isMySqlAvailable()) {
      const rows = await db.execute('SELECT * FROM products WHERE id = ? OR slug = ?', [id, id]);
      if (!rows || rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Produk '${id}' tidak ditemukan untuk diperbarui.`
        });
      }

      const current = rows[0];
      const updateSql = `
        UPDATE products 
        SET name = ?, domain = ?, category = ?, tagline = ?, description = ?, db_schema = ?, status = ?
        WHERE id = ?
      `;
      await db.execute(updateSql, [
        name || current.name,
        domain || current.domain,
        category || current.category,
        tagline || current.tagline,
        description !== undefined ? description : current.description,
        db_schema || current.db_schema,
        status || current.status,
        current.id
      ]);

      // Update foto slider di database jika dikirim
      if (Array.isArray(images)) {
        await db.execute('DELETE FROM product_images WHERE product_id = ?', [current.id]);
        for (let i = 0; i < images.length; i++) {
          const imgUrl = images[i].url || images[i].src || images[i].image_url;
          const caption = images[i].caption || '';
          if (imgUrl) {
            await db.execute(
              'INSERT INTO product_images (product_id, image_url, caption, sort_order) VALUES (?, ?, ?, ?)',
              [current.id, imgUrl, caption, i + 1]
            );
          }
        }
      }

      return res.status(200).json({
        success: true,
        message: `Produk '${current.name}' berhasil diperbarui di database.`,
        data: { id: current.id, name: name || current.name }
      });
    }

    // Fallback in-memory
    const index = mockProducts.findIndex(p => p.id == id || p.slug === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Produk '${id}' tidak ditemukan.`
      });
    }

    const updated = { ...mockProducts[index], ...req.body };
    if (Array.isArray(images)) {
      updated.images = images.map(img => ({ src: img.url || img.src || img.image_url, caption: img.caption || updated.name }));
    }
    mockProducts[index] = updated;

    return res.status(200).json({
      success: true,
      source: 'in_memory_fallback',
      message: `Produk berhasil diperbarui.`,
      data: mockProducts[index]
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================================
// 5. DELETE: Hapus Produk (DELETE /api/v1/products/:id)
// ============================================================================
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (db.isMySqlAvailable()) {
      const rows = await db.execute('SELECT id, name FROM products WHERE id = ? OR slug = ?', [id, id]);
      if (!rows || rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Produk '${id}' tidak ditemukan.`
        });
      }

      const prod = rows[0];
      await db.execute('DELETE FROM products WHERE id = ?', [prod.id]);

      return res.status(200).json({
        success: true,
        message: `Produk '${prod.name}' (ID: ${prod.id}) berhasil dihapus dari database server.`
      });
    }

    // Fallback in-memory
    const index = mockProducts.findIndex(p => p.id == id || p.slug === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Produk '${id}' tidak ditemukan.`
      });
    }

    const deleted = mockProducts.splice(index, 1)[0];

    return res.status(200).json({
      success: true,
      source: 'in_memory_fallback',
      message: `Produk '${deleted.name}' berhasil dihapus.`
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
