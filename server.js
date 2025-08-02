const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

// 🎓 Learning: Express is the web framework
// - Creates HTTP server
// - Handles routing
// - Processes middleware
// - Manages request/response cycle

const app = express();
const PORT = process.env.PORT || 3001;

// 🎓 Learning: Middleware setup
// - cors: Allows frontend to communicate with backend
// - express.json(): Parses JSON request bodies
// - express.urlencoded(): Parses URL-encoded request bodies

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:8080'], // Multiple frontend URLs for development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// 🎓 Learning: API routes
// - /api prefix for all API endpoints
// - Organized by feature (users, mentors, sessions, etc.)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Coaching Platform API is running!',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

// 🎓 Learning: Error handling middleware
// - Catches any errors that weren't handled by controllers
// - Always place this last in the middleware chain

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 🎓 Learning: 404 handler for undefined routes
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