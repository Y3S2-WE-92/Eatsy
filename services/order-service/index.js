const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Order Service');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Order Service' });
});

app.use('/api/order', orderRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});