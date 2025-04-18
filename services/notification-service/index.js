const express = require('express');
const cors = require('cors');

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

// Example notification route
app.post('/api/notify', (req, res) => {
  const { message } = req.body;
  console.log('Notification sent:', message);
  res.json({ status: 'Notification Sent', message });
});

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
