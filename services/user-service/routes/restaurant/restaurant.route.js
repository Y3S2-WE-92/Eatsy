const express = require('express');
const router = express.Router();
const { register, login, getAllRestaurants, getRestaurantByID } = require('../../controllers/restaurant/restaurant.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantByID);

module.exports = router;