const express = require('express');
const router = express.Router();
const deliveryPersonController = require('../controllers/deliveryPersonController');

router.get('/nearby', deliveryPersonController.getNearbyDeliveryPersons);
router.get('/:id', deliveryPersonController.getDeliveryPerson);
router.put('/:id', deliveryPersonController.updateDeliveryPerson);

module.exports = router;