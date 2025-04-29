const express = require('express');
const router = express.Router();
const { register, login, getAllRestaurants, getRestaurantByID, updateRestaurantAvailability, getRestaurantAvailability, verifyRestaurant } = require('../../controllers/restaurant/restaurant.controller');
const {protect} = require('../../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllRestaurants);
router.patch('/availability', protect, updateRestaurantAvailability);
router.get('/availability', protect, getRestaurantAvailability);
router.get('/:id', getRestaurantByID);
router.put('/verify/:id/:adminId', verifyRestaurant);

module.exports = router;