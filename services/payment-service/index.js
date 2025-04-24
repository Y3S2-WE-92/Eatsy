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
  res.send('Welcome to the Payment Service');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Payment Service' });
});

// Importing payment routes
const paymentRouter = require("./routes/payment.route.js");
const paymentOrderRouter =  require("./routes/payment-order.route.js");
const cardRouter = require("./routes/card.route.js");

app.use('/api/payment', paymentRouter);
app.use('/api/payment-order', paymentOrderRouter);
app.use('/api/card', cardRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB")
    app.listen(PORT, () => {
      console.log(`Payment Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error:", err)
  })