const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// ============================================================================
// CRUD PRODUCT ROUTES (/api/v1/products)
// ============================================================================

// 1. READ ALL: Ambil daftar seluruh produk
router.get('/', productController.getAllProducts);

// 2. READ ONE: Ambil detail satu produk berdasarkan ID atau Slug
router.get('/:id', productController.getProductById);

// 3. CREATE: Daftarkan produk baru ke ekosistem
router.post('/', productController.createProduct);

// 4. UPDATE: Perbarui data atau domain produk
router.put('/:id', productController.updateProduct);

// 5. DELETE: Hapus produk dari database
router.delete('/:id', productController.deleteProduct);

module.exports = router;
