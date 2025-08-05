const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const db = require('./simple-db');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Initialize simple database
console.log('✅ Using simple JSON database');

app.use(cors({
  origin: ['https://hotelshivmal.icu', 'http://localhost:3000', 'http://localhost:5173', 'https://hotel-backend-ijli.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Import routes
const orderRoutes = require('./routes/orderRoutes');
const billRoutes = require('./routes/billRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Use routes
app.use('/api/orders', orderRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/feedback', feedbackRoutes);

// Sample menu items
const menuItems = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich, creamy tomato-based curry',
    price: 250,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=2000&q=80'
  },
  {
    id: '2',
    name: 'Biryani',
    description: 'Fragrant basmati rice cooked with spices and meat',
    price: 280,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=2000&q=80'
  },
  {
    id: '3',
    name: 'Naan',
    description: 'Soft, fluffy flatbread baked in tandoor',
    price: 40,
    category: 'Breads',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=2000&q=80'
  }
];

// Get menu items
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Broadcast function to send updates to all connected clients
const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Make broadcast available to routes
app.set('broadcast', broadcast);

// Simple order creation endpoint
app.post('/api/orders', async (req, res) => {
  try {
    const order = db.createOrder(req.body);
    broadcast({ type: 'NEW_ORDER', data: order });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = db.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Simple bill creation endpoint
app.post('/api/bills', async (req, res) => {
  try {
    const bill = db.createBill(req.body);
    broadcast({ type: 'NEW_BILL', data: bill });
    res.status(201).json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all bills
app.get('/api/bills', async (req, res) => {
  try {
    const bills = db.getBills();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Simple feedback creation endpoint
app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = db.createFeedback(req.body);
    broadcast({ type: 'NEW_FEEDBACK', data: feedback });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const feedback = db.getFeedback();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
}); 