// Mock API for order placement - works without backend
export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    size?: string;
}

export interface Order {
    orderId: string;
    tableNumber: number;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
    paymentStatus: 'pending' | 'paid';
}

export interface Bill {
    orderId: string;
    tableNumber: number;
    items: OrderItem[];
    subtotal: number;
    tax: number; // Kept for compatibility but will be 0
    totalAmount: number;
    paymentMethod: 'cash' | 'card' | 'upi';
    paymentStatus: 'pending' | 'paid';
}

// Store orders in localStorage for persistence
const getStoredOrders = (): Order[] => {
    const stored = localStorage.getItem('restaurant_orders');
    return stored ? JSON.parse(stored) : [];
};

const saveOrders = (orders: Order[]) => {
    localStorage.setItem('restaurant_orders', JSON.stringify(orders));
};

// Order APIs
export const createOrder = async (orderData: Omit<Order, 'status' | 'paymentStatus' | 'orderId'>): Promise<Order> => {
    const orders = getStoredOrders();
    const newOrder: Order = {
        ...orderData,
        orderId: Date.now().toString(),
        status: 'pending',
        paymentStatus: 'pending'
    };
    orders.push(newOrder);
    saveOrders(orders);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return newOrder;
};

export const getOrders = async (): Promise<Order[]> => {
    const orders = getStoredOrders();
    await new Promise(resolve => setTimeout(resolve, 300));
    return orders;
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<Order> => {
    const orders = getStoredOrders();
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        saveOrders(orders);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    return orders[orderIndex] || null;
};

// Bill APIs
export const createBill = async (billData: Omit<Bill, 'paymentStatus'>): Promise<Bill> => {
    const bills = JSON.parse(localStorage.getItem('restaurant_bills') || '[]');
    const newBill: Bill = {
        ...billData,
        paymentStatus: 'pending'
    };
    bills.push(newBill);
    localStorage.setItem('restaurant_bills', JSON.stringify(bills));
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return newBill;
};

export const getBills = async (): Promise<Bill[]> => {
    const bills = JSON.parse(localStorage.getItem('restaurant_bills') || '[]');
    await new Promise(resolve => setTimeout(resolve, 300));
    return bills;
};

export const updateBillPayment = async (billId: string, paymentStatus: Bill['paymentStatus']): Promise<Bill> => {
    const bills = JSON.parse(localStorage.getItem('restaurant_bills') || '[]');
    const billIndex = bills.findIndex(bill => bill.orderId === billId);
    
    if (billIndex !== -1) {
        bills[billIndex].paymentStatus = paymentStatus;
        localStorage.setItem('restaurant_bills', JSON.stringify(bills));
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    return bills[billIndex] || null;
}; 