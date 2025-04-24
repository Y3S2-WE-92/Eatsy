const express = require('express');
const router = express.Router();
const { deliveryRegister } = require('../controllers/register.controller');

router.post('/delivery', deliveryRegister);

module.exports = router;