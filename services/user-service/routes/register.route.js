const express = require('express');
const router = express.Router();
const { deliveryRegister, adminRegister } = require('../controllers/register.controller');

router.post('/delivery', deliveryRegister);
router.post('/admin', adminRegister);

module.exports = router;