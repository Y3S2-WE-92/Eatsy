const express = require('express');
const router = express.Router();
const { getCustomerLocations, addCustomerLocation, deleteCustomerLocation, getLocationByID } = require('../../controllers/customer/customerLocation.controller');

router.post('/', addCustomerLocation);
router.delete('/:id', deleteCustomerLocation);
router.get('/:id', getLocationByID);
router.get('/customer/:id', getCustomerLocations);

module.exports = router;