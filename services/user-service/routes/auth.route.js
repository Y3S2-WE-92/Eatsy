const express = require('express');
const router = express.Router();
const { deliveryPersonLogin, adminLogin } = require('../controllers/auth.controller');

router.post('/delivery', deliveryPersonLogin);
router.post('/admin', adminLogin);

module.exports = router;