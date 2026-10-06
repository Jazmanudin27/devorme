const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');

// Public route untuk website utama
router.get('/info', companyController.getCompanyInfo);
router.get('/products', companyController.getProducts);
router.get('/settings', companyController.getSettings);
router.put('/settings', companyController.updateSettings);

module.exports = router;

