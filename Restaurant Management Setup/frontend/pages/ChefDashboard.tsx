import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Chip, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface OrderItem {
  id: number;
  name: string;
  image?: string;
  size?: string;
  quantity: number;
  price: number;
  addOns?: string[];
  customInstructions?: string;
}

interface Order {
  id: string;
  table: number;
  items: OrderItem[];
  status: string;
  placedAt: string;
  acceptedAt?: string;
}

function formatDateTime(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleString();
}

const statusColor = (status: string) => {
  if (status === 'pending') return 'warning';
  if (status === 'accepted') return 'success';
  return 'default';
};

const ChefDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:4000/orders');
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  const handleAccept = async (orderId: string) => {
    await fetch(`http://localhost:4000/orders/${orderId}/accept`, { method: 'POST' });
    fetchOrders();
  };

  const handleDelete = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    await fetch(`http://localhost:4000/orders/${orderId}`, { method: 'DELETE' });
    fetchOrders();
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#2C7D89', fontWeight: 700 }}>Chef Dashboard</Typography>
      {loading && <Typography>Loading...</Typography>}
      {orders.length === 0 && !loading && <Typography>No orders yet.</Typography>}
      <Stack spacing={3}>
        {orders.map(order => (
          <Card key={order.id} sx={{ boxShadow: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Table {order.table}</Typography>
                <Chip label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} color={statusColor(order.status)} size="small" />
              </Box>
              <Typography variant="body2" sx={{ color: '#888' }}>Placed at: {formatDateTime(order.placedAt)}</Typography>
              {order.acceptedAt && (
                <Typography variant="body2" sx={{ color: '#388e3c' }}>Accepted at: {formatDateTime(order.acceptedAt)}</Typography>
              )}
              <List dense sx={{ mt: 2 }}>
                {order.items.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <ListItem alignItems="flex-start" disableGutters>
                      <ListItemAvatar>
                        <Avatar variant="rounded" src={item.image} alt={item.name} sx={{ width: 48, height: 48, mr: 1 }}>
                          {item.name[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.name} {item.size && <span style={{ fontWeight: 400, fontSize: '0.95em' }}>({item.size})</span>}</Typography>
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
                    {idx < order.items.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                {order.status === 'pending' ? (
                  <Button variant="contained" color="success" size="large" onClick={() => handleAccept(order.id)}>
                    Accept Order
                  </Button>
                ) : (
                  <Chip label="Accepted" color="success" size="medium" />
                )}
                <Button variant="outlined" color="error" size="large" startIcon={<DeleteIcon />} onClick={() => handleDelete(order.id)}>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default ChefDashboard; 