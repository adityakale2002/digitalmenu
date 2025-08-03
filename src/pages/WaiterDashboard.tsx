import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, Button, Stack, Chip } from '@mui/material';

interface OrderItem {
  id: number;
  name: string;
  size?: string;
  quantity: number;
  price: number;
  addOns?: string[];
  customInstructions?: string;
}

interface Order {
  id: string;
  status: string;
  placedAt: string;
  acceptedAt?: string;
  items: OrderItem[];
}

interface BillRequest {
  table: number;
  orders: Order[];
}

const statusColor = (status: string) => {
  if (status === 'pending') return 'warning';
  if (status === 'accepted') return 'success';
  return 'default';
};

const WaiterDashboard: React.FC = () => {
  const [billRequests, setBillRequests] = useState<BillRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBillRequests = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:4000/api/bills/requests');
    const data = await res.json();
    setBillRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBillRequests();
    const interval = setInterval(fetchBillRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBillServed = async (table: number) => {
    // Get bills for this table and mark them as paid
    const billsRes = await fetch(`http://localhost:4000/api/bills`);
    const bills = await billsRes.json();
    const tableBills = bills.filter(bill => bill.tableNumber === table && bill.paymentStatus === 'pending');
    
    // Mark all pending bills for this table as paid
    await Promise.all(tableBills.map(bill => 
      fetch(`http://localhost:4000/api/bills/${bill._id}/payment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: 'paid' })
      })
    ));
    fetchBillRequests();
  };

  const getOrderTotal = (order: Order) =>
    order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getTableTotal = (orders: Order[]) =>
    orders.reduce((sum, order) => sum + getOrderTotal(order), 0);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#2C7D89', fontWeight: 700 }}>Waiter Bill Dashboard</Typography>
      {loading && <Typography>Loading...</Typography>}
      {billRequests.length === 0 && !loading && <Typography>No bill requests yet.</Typography>}
      <Stack spacing={3}>
        {billRequests.map(bill => (
          <Card key={bill.table} sx={{ boxShadow: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#FF4B2B' }}>Table {bill.table}</Typography>
                <Button variant="contained" color="success" size="large" onClick={() => handleBillServed(bill.table)}>
                  Bill Served
                </Button>
              </Box>
              {bill.orders.length === 0 ? (
                <Typography>No orders for this table.</Typography>
              ) : (
                <>
                  {bill.orders.map((order, idx) => (
                    <Box key={order.id} sx={{ mb: 2, p: 2, bgcolor: '#fafbfc', borderRadius: 2, boxShadow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Chip label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} color={statusColor(order.status)} size="small" />
                        <Typography variant="body2" sx={{ color: '#888' }}>
                          Placed: {new Date(order.placedAt).toLocaleString()}
                        </Typography>
                        {order.acceptedAt && (
                          <Typography variant="body2" sx={{ color: '#388e3c' }}>
                            Accepted: {new Date(order.acceptedAt).toLocaleString()}
                          </Typography>
                        )}
                        <Typography variant="body2" sx={{ color: '#2C7D89', fontWeight: 700, ml: 'auto' }}>
                          Order Total: ₹{getOrderTotal(order)}
                        </Typography>
                      </Box>
                      <List dense>
                        {order.items.map((item, i) => (
                          <React.Fragment key={i}>
                            <ListItem alignItems="flex-start" disableGutters>
                              <ListItemText
                                primary={<>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.name} {item.size && <span style={{ fontWeight: 400, fontSize: '0.95em' }}>({item.size})</span>}</Typography>
                                  <Typography variant="body2" sx={{ color: '#2C7D89', fontWeight: 500 }}>x{item.quantity}</Typography>
                                </>}
                                secondary={<>
                                  {item.addOns && item.addOns.length > 0 && (
                                    <span style={{ color: '#888' }}>Add-ons: {item.addOns.join(', ')}<br /></span>
                                  )}
                                  {item.customInstructions && (
                                    <span style={{ color: '#E23744' }}>Note: {item.customInstructions}</span>
                                  )}
                                </>}
                              />
                              <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 60, textAlign: 'right' }}>₹{item.price * item.quantity}</Typography>
                            </ListItem>
                            {i < order.items.length - 1 && <Divider variant="inset" component="li" />}
                          </React.Fragment>
                        ))}
                      </List>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C7D89' }}>
                      Table Total: ₹{getTableTotal(bill.orders)}
                    </Typography>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default WaiterDashboard; 