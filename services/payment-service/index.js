const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4004;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Payment Service');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Payment Service' });
});

// Example payment route
app.post('/api/pay', (req, res) => {
  const { amount } = req.body;
  res.json({ message: `Payment of $${amount} successful` });
});

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});
