const express = require('express');
const router = express.Router();
const orderController = require('../controllers/delivery.order.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post(
    '/place', 
    // authMiddleware('customer'), 
    orderController.placeOrder
);
router.put(
    '/:id', 
    // authMiddleware('customer'), 
    orderController.modifyOrder
);
router.get(
    '/:id/status', 
    // authMiddleware('customer'), 
    orderController.getOrderStatus
);
router.get(
    '/customer/:id', 
    // authMiddleware('customer'), 
    orderController.getCustomerOrders
);
router.put('/:id/status', 
    // authMiddleware('admin', 'delivery'), 
    orderController.updateOrderStatus
);

router.get(
    '/:id', 
    // authMiddleware('customer', 'restaurant'), 
    orderController.getOrderById
);


module.exports = router;