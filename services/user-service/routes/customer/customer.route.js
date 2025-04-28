const express = require('express');
const router = express.Router();
const { register, login, getCustomerByID } = require('../../controllers/customer/customer.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/:id', getCustomerByID);

module.exports = router;