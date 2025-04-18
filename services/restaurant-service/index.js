const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Service');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Restaurant Service' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Restaurant Service running on port ${PORT}`);
});
