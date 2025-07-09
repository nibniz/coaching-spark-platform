const express = require('express');
const app = express();
const PORT = 3001;

// Basic middleware
app.use(express.json());

// Simple test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test server is working!' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test route: http://localhost:${PORT}/test`);
}); 