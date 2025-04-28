const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('API Gateway is running!');
});

// Proxy rules
app.use('/user', createProxyMiddleware({ target: 'http://user-service:3000', changeOrigin: true, pathRewrite: { '^/user': '/api' } }));
app.use('/restaurant', createProxyMiddleware({ target: 'http://restaurant-service:3000', changeOrigin: true, pathRewrite: { '^/restaurant': '/api' } }));
app.use('/order', createProxyMiddleware({ target: 'http://order-service:3000', changeOrigin: true, pathRewrite: { '^/order': '/api' } }));
app.use('/delivery', createProxyMiddleware({ target: 'http://delivery-service:3000', changeOrigin: true, pathRewrite: { '^/delivery': '/api' } }));
app.use('/payment', createProxyMiddleware({ target: 'http://payment-service:3000', changeOrigin: true, pathRewrite: { '^/payment': '/api' } }));
app.use('/notification', createProxyMiddleware({ target: 'http://notification-service:3000', changeOrigin: true, pathRewrite: { '^/notification': '/api' } }));

// Health check
app.get('/health', (req, res) => {
  res.send('API Gateway is running!');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
