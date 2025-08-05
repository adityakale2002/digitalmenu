// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Order APIs
export const createOrder = async (orderData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        throw new Error('Failed to create order');
    }

    return response.json();
};

export const getOrders = async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }

    return response.json();
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/${status}`, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error(`Failed to update order status to ${status}`);
    }

    return response.json();
};

// Bill APIs
export const createBill = async (billData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/bills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
    });

    if (!response.ok) {
        throw new Error('Failed to create bill');
    }

    return response.json();
};

export const getBills = async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/bills`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch bills');
    }

    return response.json();
};

export const updateBillPayment = async (billId: string, paymentStatus: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/bills/${billId}/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus }),
    });

    if (!response.ok) {
        throw new Error('Failed to update bill payment status');
    }

    return response.json();
}; 