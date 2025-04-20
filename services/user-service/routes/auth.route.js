const express = require('express');
const router = express.Router();
const { customerLogin, deliveryPersonLogin, restaurantLogin, adminLogin } = require('../controllers/auth.controller');

router.post('/customer', customerLogin);
router.post('/delivery', deliveryPersonLogin);
router.post('/restaurant', restaurantLogin);
router.post('/admin', adminLogin);

module.exports = router;