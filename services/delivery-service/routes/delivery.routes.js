const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/delivery.controller');
const authMiddleware = require('../middleware/auth');

router.post('/assign', 
    // authMiddleware('admin'), 
    deliveryController.assignDeliveryPerson
);
router.get('/:id/status', 
    // authMiddleware('customer', 'deliveryPerson'), 
    deliveryController.getDeliveryStatus
);
router.put('/:id/status', 
    // authMiddleware('deliveryPerson'), 
    deliveryController.updateDeliveryStatus);
router.get('/deliveryPerson/:deliveryPersonId/tasks', 
    // authMiddleware('deliveryPerson'), 
    deliveryController.getDeliveryPersonTasks
);
router.put('/deliveryPerson/:id/location', 
    // authMiddleware('deliveryPerson'), 
    deliveryController.updateDeliveryPersonLocation
);
router.get('/deliveryPerson/:deliveryPersonId', 
    // authMiddleware('deliveryPerson'), 
    deliveryController.getDeliveryPersonById
);


module.exports = router;