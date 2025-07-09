const express = require('express');
const app = express();

app.use(express.json());

// Simple test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});

// Test controller method
const testController = {
  healthCheck: (req, res) => {
    res.json({ message: 'Health check working!' });
  }
};

// Test route with controller
app.get('/health', testController.healthCheck);

app.listen(5000, () => {
  console.log('🚀 Simple test server running on port 5000');
}); 