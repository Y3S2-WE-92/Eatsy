const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth');

router.post(
    '/place', 
    // authMiddleware('customer'), 
    orderController.placeOrder
);
router.put(
    '/:id', 
    authMiddleware('customer'), 
    orderController.modifyOrder
);
router.get(
    '/:id/status', 
    authMiddleware('customer'), 
    orderController.getOrderStatus
);
router.get(
    '/customer/:id', 
    authMiddleware('customer'), 
    orderController.getCustomerOrders
);

module.exports = router;