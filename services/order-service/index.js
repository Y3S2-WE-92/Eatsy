const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Order Service');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Order Service' });
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
