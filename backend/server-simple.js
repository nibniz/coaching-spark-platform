const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Coaching Platform API is running!',
    timestamp: new Date().toISOString()
  });
});

// Simple user routes (without complex middleware for now)
app.post('/api/users/register', (req, res) => {
  res.json({
    success: true,
    message: 'Register endpoint - coming soon!',
    data: req.body
  });
});

app.post('/api/users/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login endpoint - coming soon!',
    data: req.body
  });
});

app.get('/api/users/profile', (req, res) => {
  res.json({
    success: true,
    message: 'Profile endpoint - coming soon!'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
}); 