const express = require('express');
const router = express.Router();
const { customerRegister, deliveryRegister, adminRegister, restaurantRegister } = require('../controllers/register.controller');

router.post('/customer', customerRegister);
router.post('/delivery', deliveryRegister);
router.post('/admin', adminRegister);
router.post('/restaurant', restaurantRegister);

module.exports = router;