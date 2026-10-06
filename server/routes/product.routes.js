const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// ============================================================================
// CRUD PRODUCT ROUTES (/api/v1/products)
// ============================================================================

// 1. READ ALL: Ambil daftar seluruh produk (Public)
router.get('/', productController.getAllProducts);

// 2. READ ONE: Ambil detail satu produk berdasarkan ID atau Slug (Public)
router.get('/:id', productController.getProductById);

// 3. CREATE: Daftarkan produk baru (Protected Admin)
router.post('/', verifyToken, productController.createProduct);

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `img_${Date.now()}_${Math.round(Math.random() * 1e4)}${ext}`);
  }
});
const upload = multer({ storage });

// Upload File Gambar (Protected Admin)
router.post('/upload', verifyToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Tidak ada file gambar yang diunggah.' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  return res.status(200).json({
    success: true,
    message: 'File gambar berhasil diunggah.',
    url: fileUrl
  });
});

// 4. UPDATE: Perbarui data atau domain produk (Protected Admin)
router.put('/:id', verifyToken, productController.updateProduct);

// 5. DELETE: Hapus produk dari database (Protected Admin)
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;



