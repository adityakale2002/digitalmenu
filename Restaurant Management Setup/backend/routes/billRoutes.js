const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const Order = require('../models/Order');

// Get broadcast function from app
const getBroadcast = (req) => req.app.get('broadcast');

// Get bill requests
router.get('/requests', async (req, res) => {
    try {
        // Get all orders that are ready or served and have billRequested flag
        const orders = await Order.find({
            status: { $in: ['ready', 'served'] },
            paymentStatus: 'pending',
            billRequested: true
        }).sort({ orderTime: -1 });

        // Group orders by table
        const tableOrders = orders.reduce((acc, order) => {
            if (!acc[order.tableNumber]) {
                acc[order.tableNumber] = [];
            }
            acc[order.tableNumber].push(order);
            return acc;
        }, {});

        // Format response
        const billRequests = Object.entries(tableOrders).map(([tableNumber, orders]) => ({
            tableNumber: parseInt(tableNumber),
            orders: orders
        }));

        res.json(billRequests);
    } catch (error) {
        console.error('Error fetching bill requests:', error);
        res.status(500).json({ message: 'Error fetching bill requests' });
    }
});

// Create a new bill
router.post('/', async (req, res) => {
    try {
        const { tableNumber } = req.body;

        // Get all orders for the table that are ready or served
        const orders = await Order.find({
            tableNumber,
            status: { $in: ['ready', 'served'] },
            paymentStatus: 'pending'
        });

        if (orders.length === 0) {
            return res.status(400).json({ message: 'No active orders found for this table' });
        }

        // Calculate totals
        const items = orders.flatMap(order => order.items);
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.18; // 18% tax
        const totalAmount = subtotal + tax;

        // Create the bill
        const bill = new Bill({
            tableNumber,
            items,
            subtotal,
            tax,
            totalAmount,
            paymentStatus: 'pending',
            billTime: new Date()
        });

        await bill.save();

        // Update all orders to completed status
        await Promise.all(orders.map(order => 
            Order.findByIdAndUpdate(order._id, {
                status: 'completed',
                paymentStatus: 'paid',
                completedAt: new Date()
            })
        ));

        getBroadcast(req)({ type: 'BILL_CREATED', data: bill });
        res.status(201).json(bill);
    } catch (error) {
        console.error('Error creating bill:', error);
        res.status(500).json({ message: 'Error creating bill' });
    }
});

// Get all bills (for bill history)
router.get('/', async (req, res) => {
    try {
        const bills = await Bill.find().sort({ billTime: -1 });
        res.json(bills);
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ message: 'Error fetching bills' });
    }
});

// Get bill by ID
router.get('/:id', async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json(bill);
    } catch (error) {
        console.error('Error fetching bill:', error);
        res.status(500).json({ message: 'Error fetching bill' });
    }
});

// Update payment status
router.patch('/:id/payment', async (req, res) => {
    try {
        const bill = await Bill.findByIdAndUpdate(
            req.params.id,
            { paymentStatus: 'paid' },
            { new: true }
        );
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        getBroadcast(req)({ type: 'BILL_UPDATED', data: bill });
        res.json(bill);
    } catch (error) {
        console.error('Error updating bill:', error);
        res.status(500).json({ message: 'Error updating bill' });
    }
});

// Get bills by date range
router.get('/date-range', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const bills = await Bill.find({
            billTime: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ billTime: -1 });
        res.json(bills);
    } catch (error) {
        console.error('Error fetching bills by date range:', error);
        res.status(500).json({ message: 'Error fetching bills by date range' });
    }
});

module.exports = router; 