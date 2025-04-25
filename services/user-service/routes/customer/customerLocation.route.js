const express = require('express');
const router = express.Router();
const { getCustomerLocations, addCustomerLocation, deleteCustomerLocation, getLocationByID, getAllCustomerLocations } = require('../../controllers/customer/customerLocation.controller');

router.post('/', addCustomerLocation);
router.get('/', getAllCustomerLocations);
router.delete('/:id', deleteCustomerLocation);
router.get('/:id', getLocationByID);
router.get('/customer/:id', getCustomerLocations);

module.exports = router;