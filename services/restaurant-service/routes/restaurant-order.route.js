const express = require('express');
const router = express.Router();
const {getMyTopOrders, getMyRecentOrders} = require('../controllers/restaurant-order.controller');
const {protect} = require('../middleware/auth.middleware');

router.get('/top', protect, getMyTopOrders);
router.get('/recent', protect, getMyRecentOrders);

module.exports = router;
