const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Public route untuk website utama
router.get('/info', companyController.getCompanyInfo);
router.get('/products', companyController.getProducts);
router.get('/settings', companyController.getSettings);

// Protected Admin route
router.put('/settings', verifyToken, companyController.updateSettings);

module.exports = router;


