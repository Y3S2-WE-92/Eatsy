const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4003;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Delivery Service');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Delivery Service' });
});

// Example delivery route
app.get('/api/delivery/:orderId', (req, res) => {
  const { orderId } = req.params;
  res.json({ orderId, status: 'On the way', driver: 'John Doe' });
});

app.listen(PORT, () => {
  console.log(`Delivery Service running on port ${PORT}`);
});
