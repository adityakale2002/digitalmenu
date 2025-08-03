const API_BASE_URL = 'http://localhost:4000/api';

export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
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
    tax: number;
    totalAmount: number;
    paymentMethod: 'cash' | 'card' | 'upi';
    paymentStatus: 'pending' | 'paid';
}

// Order APIs
export const createOrder = async (orderData: Omit<Order, 'status' | 'paymentStatus'>) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    return response.json();
};

export const getOrders = async () => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return response.json();
};

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });
    return response.json();
};

// Bill APIs
export const createBill = async (billData: Omit<Bill, 'paymentStatus'>) => {
    const response = await fetch(`${API_BASE_URL}/bills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
    });
    return response.json();
};

export const getBills = async () => {
    const response = await fetch(`${API_BASE_URL}/bills`);
    return response.json();
};

export const updateBillPayment = async (billId: string, paymentStatus: Bill['paymentStatus']) => {
    const response = await fetch(`${API_BASE_URL}/bills/${billId}/payment`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus }),
    });
    return response.json();
}; 