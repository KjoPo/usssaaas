const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const paymentRoutes = require('./routes/PaymentRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/payments', paymentRoutes);

// Health Check Route
app.get('/api/connection-status', async (req, res) => {
  res.json({ status: 'healthy' });
});

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, '/client/build')));


// Handle client-side routing - must be last
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));

});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`➡️ http://localhost:${PORT}`);
});

