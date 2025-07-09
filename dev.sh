#!/bin/bash

# 🎓 Coaching Spark Platform - Development Script
# This script starts both frontend and backend servers

echo "🚀 Starting Coaching Spark Platform Development Environment..."

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping all servers..."
    pkill -f "node.*server"
    pkill -f "vite"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend server in background
echo "🔧 Starting backend server (port 5000)..."
cd backend && npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server in background
echo "🎨 Starting frontend server (port 5173)..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 3

# Check if servers are running
echo "📊 Checking server status..."

# Check backend
if curl -s http://localhost:5000/ > /dev/null; then
    echo "✅ Backend server is running on http://localhost:5000"
else
    echo "❌ Backend server failed to start"
fi

# Check frontend
if curl -s http://localhost:5173/ > /dev/null; then
    echo "✅ Frontend server is running on http://localhost:5173"
else
    echo "❌ Frontend server failed to start"
fi

echo ""
echo "🎓 Coaching Spark Platform is ready!"
echo "📖 Backend API: http://localhost:5000"
echo "🎨 Frontend App: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all servers"

# Keep script running
wait 