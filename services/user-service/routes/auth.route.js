const express = require('express');
const router = express.Router();
const { deliveryPersonLogin } = require('../controllers/auth.controller');

router.post('/delivery', deliveryPersonLogin);

module.exports = router;