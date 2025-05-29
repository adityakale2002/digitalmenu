import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Divider,
  Fade,
  Grid,
  Chip,
  ButtonGroup,
  Alert,
  TextField,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TableBarIcon from '@mui/icons-material/TableBar';
import RestaurantIcon from '@mui/icons-material/Restaurant';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  customInstructions?: string;
  addOns: Array<{ name: string; price: number }>;
  category: string;
}

const CartView: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Grilled Lamb Chops",
      price: 145,
      quantity: 1,
      customInstructions: "Medium well, extra sauce on the side",
      addOns: [
        { name: "Extra Rice", price: 15 },
        { name: "Grilled Vegetables", price: 20 }
      ],
      category: "Main Course"
    },
    {
      id: 2,
      name: "Arabic Mezze Platter",
      price: 95,
      quantity: 2,
      addOns: [
        { name: "Extra Pita", price: 10 },
        { name: "Extra Hummus", price: 15 }
      ],
      category: "Starters"
    },
  ]);

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [specialRequests, setSpecialRequests] = useState("");
  const tableNumber = localStorage.getItem('selectedTable') || "Not Selected";

  const calculateSubtotal = (item: CartItem) => {
    const addOnsTotal = item.addOns.reduce((sum, addOn) => sum + addOn.price, 0);
    return (item.price + addOnsTotal) * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleQuantityChange = (itemId: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleRequestPayment = () => {
    setPaymentProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setIsPaymentDialogOpen(true);
    }, 1500);
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Your Order
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
          <TableBarIcon sx={{ color: 'text.secondary' }} />
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            Table {tableNumber}
          </Typography>
        </Box>
      </Box>

      {cartItems.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            bgcolor: 'rgba(255, 75, 43, 0.05)',
          }}
        >
          <RestaurantIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography color="text.secondary" paragraph>
            Add some delicious items from our menu to get started
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/menu"
            sx={{
              mt: 2,
              background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
              color: 'white',
            }}
          >
            Browse Menu
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              {Object.entries(groupedItems).map(([category, items], categoryIndex) => (
                <Box key={category}>
                  <Typography
                    variant="h6"
                    sx={{
                      px: 3,
                      py: 2,
                      bgcolor: 'rgba(255, 75, 43, 0.05)',
                      color: '#2C7D89',
                      fontWeight: 600,
                    }}
                  >
                    {category}
                  </Typography>
                  <List>
                    {items.map((item, index) => (
                      <Fade in timeout={300 + index * 100} key={item.id}>
                        <Box>
                          <ListItem
                            sx={{
                              py: 3,
                              px: 3,
                              transition: 'background-color 0.2s',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                              },
                            }}
                          >
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                              }}
                            >
                              <LocalDiningIcon sx={{ color: 'white' }} />
                            </Box>
                            <ListItemText
                              primary={
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {item.name}
                                </Typography>
                              }
                              secondary={
                                <Box sx={{ mt: 1 }}>
                                  {item.customInstructions && (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{ mb: 1 }}
                                    >
                                      Instructions: {item.customInstructions}
                                    </Typography>
                                  )}
                                  {item.addOns.length > 0 && (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                      {item.addOns.map((addOn) => (
                                        <Chip
                                          key={addOn.name}
                                          label={`${addOn.name} (+AED ${addOn.price})`}
                                          size="small"
                                          sx={{
                                            background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
                                            color: 'white',
                                          }}
                                        />
                                      ))}
                                    </Box>
                                  )}
                                </Box>
                              }
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <ButtonGroup size="small" sx={{ mr: 2 }}>
                                <IconButton
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                  size="small"
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Button sx={{ px: 2, minWidth: '40px' }}>
                                  {item.quantity}
                                </Button>
                                <IconButton
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                  size="small"
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </ButtonGroup>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  color: '#2C7D89',
                                  minWidth: '100px',
                                  textAlign: 'right',
                                }}
                              >
                                AED {calculateSubtotal(item)}
                              </Typography>
                              <IconButton
                                edge="end"
                                onClick={() => handleRemoveItem(item.id)}
                                sx={{
                                  color: 'text.secondary',
                                  '&:hover': {
                                    color: 'error.main',
                                  },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </ListItem>
                          {index < items.length - 1 && <Divider />}
                        </Box>
                      </Fade>
                    ))}
                  </List>
                  {categoryIndex < Object.keys(groupedItems).length - 1 && <Divider />}
                </Box>
              ))}
            </Paper>

            <Paper sx={{ mt: 3, p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Special Requests
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Any special requests for your order?"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                variant="outlined"
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                borderRadius: 2,
                p: 3,
                position: 'sticky',
                top: 24,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Order Summary
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">Subtotal</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">AED {calculateTotal().toFixed(2)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">VAT (5%)</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      AED {(calculateTotal() * 0.05).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">Service Charge (10%)</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      AED {(calculateTotal() * 0.10).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Total
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      align="right"
                      sx={{
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      AED {(calculateTotal() * 1.15).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={paymentProcessing ? <CircularProgress size={20} color="inherit" /> : <PaymentIcon />}
                onClick={handleRequestPayment}
                disabled={paymentProcessing}
                sx={{
                  background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
                  color: 'white',
                  py: 1.5,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
                    opacity: 0.9,
                  },
                }}
              >
                {paymentProcessing ? 'Processing...' : 'Request Bill'}
              </Button>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                A service staff will bring your bill to Table {tableNumber}
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Dialog
        open={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Payment Request Sent</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <ReceiptIcon sx={{ fontSize: 60, color: '#2C7D89', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Your bill is being prepared
            </Typography>
            <Typography color="text.secondary">
              A service staff will bring your bill to Table {tableNumber} shortly.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPaymentDialogOpen(false)} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartView; 