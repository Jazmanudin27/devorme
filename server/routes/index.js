const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const companyRoutes = require('./company.routes');
const productRoutes = require('./product.routes');
const inquiryRoutes = require('./inquiry.routes');

// Mount sub-routers
router.use('/auth', authRoutes);
router.use('/company', companyRoutes);
router.use('/products', productRoutes);
router.use('/inquiries', inquiryRoutes);


// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    server: 'Devorme Master API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
