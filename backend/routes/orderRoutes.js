const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get broadcast function from app
const getBroadcast = (req) => req.app.get('broadcast');

// Create a new order
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        getBroadcast(req)({ type: 'NEW_ORDER', data: savedOrder });
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all orders
router.get('/', async (req, res) => {
    try {
        const { tableNumber } = req.query;
        let query = {};
        
        if (tableNumber) {
            query.tableNumber = parseInt(tableNumber);
        }
        
        const orders = await Order.find(query).sort({ orderTime: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Accept order
router.post('/:id/accept', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { 
                status: 'preparing',
                acceptedAt: new Date()
            },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        getBroadcast(req)({ type: 'ORDER_UPDATED', data: order });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Complete order
router.post('/:id/complete', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { 
                status: 'ready',
                completedAt: new Date()
            },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        getBroadcast(req)({ type: 'ORDER_UPDATED', data: order });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Cancel order
router.post('/:id/cancel', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { 
                status: 'cancelled',
                cancelledAt: new Date()
            },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        getBroadcast(req)({ type: 'ORDER_UPDATED', data: order });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete order
router.delete('/:id/delete', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.deleteOne();
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, billRequested } = req.body;

        const updateData = { status };
        if (billRequested !== undefined) {
            updateData.billRequested = billRequested;
        }

        const order = await Order.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        getBroadcast(req)({ type: 'ORDER_UPDATED', data: order });
        res.json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Error updating order status' });
    }
});

// Update payment status
router.patch('/:id/payment', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.paymentStatus = req.body.paymentStatus;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete all orders (cleanup endpoint)
router.delete('/cleanup/all', async (req, res) => {
    try {
        const result = await Order.deleteMany({});
        res.json({ 
            message: `Deleted ${result.deletedCount} orders successfully`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 