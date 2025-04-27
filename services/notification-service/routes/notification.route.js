const express = require('express');
const { sendNotification } = require('../controllers/notification.controller.js');
const router = express.Router();

router.post('/send', sendNotification);

module.exports = router;
