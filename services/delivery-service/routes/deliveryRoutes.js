const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const authMiddleware = require('../middleware/auth');

router.post(
    '/assign', 
    // authMiddleware('admin'), 
    deliveryController.assignDriver
);
router.get(
    '/:id/status', 
    // authMiddleware('customer', 'driver'), 
    deliveryController.getDeliveryStatus
);
router.put(
    '/:id/status', 
    // authMiddleware('driver'), 
    deliveryController.updateDeliveryStatus
);
router.get(
    '/driver/:driverId/tasks', 
    // authMiddleware('driver'), 
    deliveryController.getDriverTasks
);

module.exports = router;