const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiry.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Public: Submit inquiry form
router.post('/', inquiryController.createInquiry);

// Protected Admin: Get all inquiries & update status
router.get('/', verifyToken, inquiryController.getInquiries);
router.put('/:id/status', verifyToken, inquiryController.updateInquiryStatus);

module.exports = router;
