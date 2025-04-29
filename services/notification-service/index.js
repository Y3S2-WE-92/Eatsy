const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env' });
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Notification Service');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Notification Service' });
});

const notificationRouter = require('./routes/notification.route.js');
app.use('/api/notifications', notificationRouter);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB")
    app.listen(PORT, () => {
      console.log(`Notification Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error:", err)
  })
