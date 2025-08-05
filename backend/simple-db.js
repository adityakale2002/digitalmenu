const fs = require('fs');
const path = require('path');

// Simple JSON database
const DB_FILE = path.join(__dirname, 'data.json');

// Initialize database
const initDB = () => {
    if (!fs.existsSync(DB_FILE)) {
        const initialData = {
            orders: [],
            bills: [],
            feedback: []
        };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    }
};

// Read data
const readDB = () => {
    initDB();
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
};

// Write data
const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Database operations
const db = {
    // Orders
    getOrders: () => {
        const data = readDB();
        return data.orders;
    },
    
    createOrder: (order) => {
        const data = readDB();
        order._id = Date.now().toString();
        order.createdAt = new Date().toISOString();
        data.orders.push(order);
        writeDB(data);
        return order;
    },
    
    updateOrder: (id, updates) => {
        const data = readDB();
        const orderIndex = data.orders.findIndex(o => o._id === id);
        if (orderIndex !== -1) {
            data.orders[orderIndex] = { ...data.orders[orderIndex], ...updates };
            writeDB(data);
            return data.orders[orderIndex];
        }
        return null;
    },
    
    // Bills
    getBills: () => {
        const data = readDB();
        return data.bills;
    },
    
    createBill: (bill) => {
        const data = readDB();
        bill._id = Date.now().toString();
        bill.createdAt = new Date().toISOString();
        data.bills.push(bill);
        writeDB(data);
        return bill;
    },
    
    updateBill: (id, updates) => {
        const data = readDB();
        const billIndex = data.bills.findIndex(b => b._id === id);
        if (billIndex !== -1) {
            data.bills[billIndex] = { ...data.bills[billIndex], ...updates };
            writeDB(data);
            return data.bills[billIndex];
        }
        return null;
    },
    
    // Feedback
    getFeedback: () => {
        const data = readDB();
        return data.feedback;
    },
    
    createFeedback: (feedback) => {
        const data = readDB();
        feedback._id = Date.now().toString();
        feedback.createdAt = new Date().toISOString();
        data.feedback.push(feedback);
        writeDB(data);
        return feedback;
    }
};

module.exports = db; 