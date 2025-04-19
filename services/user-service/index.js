const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the User Service');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'User Service' });
});

// Start server
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
