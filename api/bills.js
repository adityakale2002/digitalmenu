const mongoose = require('mongoose');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://adityakale2002:adityakale2002@cluster0.4qdt1n9.mongodb.net/restaurant?retryWrites=true&w=majority');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Bill Schema
const billSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  tableNumber: { type: Number, required: true },
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash', 'card', 'upi'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Bill = mongoose.models.Bill || mongoose.model('Bill', billSchema);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  await connectDB();

  if (req.method === 'GET') {
    try {
      const bills = await Bill.find().sort({ createdAt: -1 });
      res.status(200).json(bills);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch bills' });
    }
  } else if (req.method === 'POST') {
    try {
      const bill = new Bill(req.body);
      await bill.save();
      res.status(201).json(bill);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create bill' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 