import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Chip,
  Stack,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Restaurant as RestaurantIcon,
  Receipt as ReceiptIcon,
  Feedback as FeedbackIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  Badge as BadgeIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, subDays, subMonths } from 'date-fns';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  size?: string;
  addOns?: string[];
  customInstructions?: string;
}

interface Order {
  _id: string;
  tableNumber: number;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
  orderTime: string;
  servedTime?: string;
  paymentStatus: 'pending' | 'paid';
  acceptedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

interface Bill {
  _id: string;
  tableNumber: number;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  paymentMethod?: 'cash' | 'card' | 'upi';
  paymentStatus: 'pending' | 'paid';
  billTime: string;
  createdAt: string;
  updatedAt: string;
}

interface Feedback {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  tableNumber?: string | number;
  timestamp?: string;
  submittedAt: string;
}

interface BillRequest {
  tableNumber: number;
  orders: Order[];
}

interface FilterState {
  searchTerm: string;
  selectedTable: number | null;
  selectedDate: string | null;
  selectedTime: string | null;
  sortOrder: 'newest' | 'oldest';
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const drawerWidth = 240;

const ManagementDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('chef');
  const [orders, setOrders] = useState<Order[]>([]);
  const [billRequests, setBillRequests] = useState<BillRequest[]>([]);
  const [activeBills, setActiveBills] = useState<Bill[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [billHistory, setBillHistory] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout>();
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedTable: null,
    selectedDate: null,
    selectedTime: null,
    sortOrder: 'newest'
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: new Date()
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [downloadType, setDownloadType] = useState<'orders' | 'bills' | 'feedback' | null>(null);

  // Fetch orders, bill requests, bill history, and feedback
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const [ordersRes, billRequestsRes, feedbackRes, billHistoryRes] = await Promise.all([
        fetch('http://192.168.1.124:4000/api/orders'),
        fetch('http://192.168.1.124:4000/api/bills/requests'),
        fetch('http://192.168.1.124:4000/api/feedback'),
        fetch('http://192.168.1.124:4000/api/bills')
      ]);

      const [ordersData, billRequestsData, feedbackData, billHistoryData] = await Promise.all([
        ordersRes.json(),
        billRequestsRes.json(),
        feedbackRes.json(),
        billHistoryRes.json()
      ]);

      setOrders(ordersData);
      setBillRequests(billRequestsData);
      setFeedback(feedbackData.reverse());
      setBillHistory(billHistoryData.reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const connectWebSocket = () => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket('ws://192.168.1.124:4000');

    ws.current.onopen = () => {
      console.log('WebSocket Connected');
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        
        switch (data.type) {
          case 'NEW_ORDER':
          case 'ORDER_UPDATED':
          case 'BILL_CREATED':
          case 'BILL_UPDATED':
            fetchData();
            break;
          default:
            console.log('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected, attempting to reconnect...');
      // Attempt to reconnect after 3 seconds
      reconnectTimeout.current = setTimeout(connectWebSocket, 3000);
    };
  };

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Set up WebSocket connection
    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, []);

  const handleAcceptOrder = async (orderId: string) => {
    try {
      await fetch(`http://192.168.1.124:4000/api/orders/${orderId}/accept`, {
        method: 'POST',
      });
      fetchData();
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleBillRequest = async (tableNumber: number) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('http://192.168.1.124:4000/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableNumber })
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create bill');
      }
      
      await fetchData(); // Refresh all data
      setSnackbar({
        open: true,
        message: 'Bill created successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error creating bill:', error);
      setError(error.message || 'Failed to create bill');
      setSnackbar({
        open: true,
        message: error.message || 'Failed to create bill',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBillServed = async (billId: string) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`http://192.168.1.124:4000/api/bills/${billId}/payment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to mark bill as served');
      }
      
      await fetchData(); // Refresh all data
      setSnackbar({
        open: true,
        message: 'Bill marked as served',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error marking bill as served:', error);
      setError(error.message || 'Failed to mark bill as served');
      setSnackbar({
        open: true,
        message: error.message || 'Failed to mark bill as served',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await fetch(`http://192.168.1.124:4000/api/orders/${orderId}/delete`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    try {
      await fetch(`http://192.168.1.124:4000/api/orders/${orderId}/complete`, {
        method: 'POST',
      });
      fetchData();
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await fetch(`http://192.168.1.124:4000/api/orders/${orderId}/cancel`, {
        method: 'POST',
      });
      fetchData();
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const getOrderTotal = (order: Order) =>
    order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getTableTotal = (orders: Order[]) =>
    orders.reduce((sum, order) => sum + getOrderTotal(order), 0);

  const getOrderNumber = (order: Order, allOrders: Order[]) => {
    const date = new Date(order.orderTime);
    const dateStr = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '');

    // Get all orders from the same day
    const sameDayOrders = allOrders.filter(o => {
      const orderDate = new Date(o.orderTime);
      return orderDate.toDateString() === date.toDateString();
    });

    // Sort by time to get the correct sequence
    sameDayOrders.sort((a, b) => new Date(a.orderTime).getTime() - new Date(b.orderTime).getTime());

    // Find the position of this order in the sequence
    const sequenceNumber = sameDayOrders.findIndex(o => o._id === order._id) + 1;

    return `${dateStr}-${sequenceNumber}`;
  };

  // Calculate counts for badges
  const getPendingOrdersCount = () => {
    return orders.filter(order => 
      order.status === 'pending' || order.status === 'preparing'
    ).length;
  };

  const getBillRequestsCount = () => {
    return billRequests.reduce((count, request) => count + request.orders.length, 0);
  };

  const getPendingBillsCount = () => {
    return billHistory.filter(bill => bill.paymentStatus === 'pending').length;
  };

  const getNewFeedbackCount = () => {
    // Consider feedback from the last 24 hours as "new"
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    return feedback.filter(fb => new Date(fb.submittedAt) > oneDayAgo).length;
  };

  // Get unique tables from data
  const getUniqueTables = (data: any[]) => {
    return Array.from(new Set(data.map(item => item.tableNumber))).sort((a, b) => a - b);
  };

  // Get unique dates from data
  const getUniqueDates = (data: any[]) => {
    return Array.from(new Set(data.map(item => {
      const date = new Date(item.orderTime || item.billTime || item.submittedAt);
      return date.toLocaleDateString();
    }))).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  };

  // Get unique times from data
  const getUniqueTimes = (data: any[]) => {
    return Array.from(new Set(data.map(item => {
      const date = new Date(item.orderTime || item.billTime || item.submittedAt);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }))).sort();
  };

  // Sort functions
  const sortByDate = (a: any, b: any) => {
    // Get the appropriate timestamp based on the item type and status
    const getTimestamp = (item: any) => {
      if (item.orderTime) {
        // For orders, use different timestamps based on status
        if (item.status === 'completed' && item.completedAt) {
          return new Date(item.completedAt).getTime();
        } else if (item.status === 'served' && item.servedTime) {
          return new Date(item.servedTime).getTime();
        } else if (item.status === 'preparing' && item.acceptedAt) {
          return new Date(item.acceptedAt).getTime();
        }
        return new Date(item.orderTime).getTime();
      } else if (item.billTime) {
        return new Date(item.billTime).getTime();
      } else if (item.submittedAt) {
        return new Date(item.submittedAt).getTime();
      }
      return 0;
    };

    const timeA = getTimestamp(a);
    const timeB = getTimestamp(b);

    return filters.sortOrder === 'newest' 
      ? timeB - timeA
      : timeA - timeB;
  };

  // Filter functions
  const filterOrders = (orders: Order[]) => {
    let filtered = orders.filter(order => {
      const orderDate = new Date(order.orderTime);
      const matchesTable = !filters.selectedTable || order.tableNumber === filters.selectedTable;
      const matchesDate = !filters.selectedDate || orderDate.toLocaleDateString() === filters.selectedDate;
      const matchesTime = !filters.selectedTime || orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) === filters.selectedTime;
      const matchesSearch = !filters.searchTerm || 
        order.items.some(item => item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      return matchesTable && matchesDate && matchesTime && matchesSearch;
    });

    // Sort orders with proper timestamp handling
    return filtered.sort((a, b) => {
      const timeA = new Date(a.orderTime).getTime();
      const timeB = new Date(b.orderTime).getTime();
      return filters.sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });
  };

  const filterBills = (bills: Bill[]) => {
    let filtered = bills.filter(bill => {
      const billDate = new Date(bill.billTime);
      const matchesTable = !filters.selectedTable || bill.tableNumber === filters.selectedTable;
      const matchesDate = !filters.selectedDate || billDate.toLocaleDateString() === filters.selectedDate;
      const matchesTime = !filters.selectedTime || billDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) === filters.selectedTime;
      const matchesSearch = !filters.searchTerm || 
        bill.items.some(item => item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      return matchesTable && matchesDate && matchesTime && matchesSearch;
    });

    return filtered.sort(sortByDate);
  };

  const filterFeedback = (feedback: Feedback[]) => {
    let filtered = feedback.filter(fb => {
      const feedbackDate = new Date(fb.submittedAt);
      const matchesTable = !filters.selectedTable || fb.tableNumber === filters.selectedTable;
      const matchesDate = !filters.selectedDate || feedbackDate.toLocaleDateString() === filters.selectedDate;
      const matchesTime = !filters.selectedTime || feedbackDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) === filters.selectedTime;
      const matchesSearch = !filters.searchTerm || 
        (fb.message || '').toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesTable && matchesDate && matchesTime && matchesSearch;
    });

    return filtered.sort(sortByDate);
  };

  const renderFilterBar = (data: any[]) => (
    <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <TextField
        size="small"
        placeholder="Search items..."
        value={filters.searchTerm}
        onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
        sx={{ width: 200 }}
      />
      <TextField
        select
        size="small"
        value={filters.selectedTable || ''}
        onChange={(e) => setFilters(prev => ({ ...prev, selectedTable: e.target.value ? Number(e.target.value) : null }))}
        label="Select Table"
        sx={{ width: 150 }}
      >
        <MenuItem value="">
          <em>All Tables</em>
        </MenuItem>
        {getUniqueTables(data).map(table => (
          <MenuItem key={table} value={table}>
            Table {table}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        value={filters.selectedDate || ''}
        onChange={(e) => setFilters(prev => ({ ...prev, selectedDate: e.target.value || null }))}
        label="Select Date"
        sx={{ width: 150 }}
      >
        <MenuItem value="">
          <em>All Dates</em>
        </MenuItem>
        {getUniqueDates(data).map(date => (
          <MenuItem key={date} value={date}>
            {date}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        value={filters.selectedTime || ''}
        onChange={(e) => setFilters(prev => ({ ...prev, selectedTime: e.target.value || null }))}
        label="Select Time"
        sx={{ width: 150 }}
      >
        <MenuItem value="">
          <em>All Times</em>
        </MenuItem>
        {getUniqueTimes(data).map(time => (
          <MenuItem key={time} value={time}>
            {time}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        value={filters.sortOrder}
        onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value as 'newest' | 'oldest' }))}
        label="Sort Order"
        sx={{ width: 150 }}
      >
        <MenuItem value="newest">Newest First</MenuItem>
        <MenuItem value="oldest">Oldest First</MenuItem>
      </TextField>
      <Button
        variant="outlined"
        startIcon={<FilterIcon />}
        onClick={() => setFilters({
          searchTerm: '',
          selectedTable: null,
          selectedDate: null,
          selectedTime: null,
          sortOrder: 'newest'
        })}
      >
        Clear Filters
      </Button>
    </Box>
  );

  const handleQuickDateSelect = (range: '24h' | '3d' | '7d' | '1m') => {
    const endDate = new Date();
    let startDate: Date;

    switch (range) {
      case '24h':
        startDate = subDays(endDate, 1);
        break;
      case '3d':
        startDate = subDays(endDate, 3);
        break;
      case '7d':
        startDate = subDays(endDate, 7);
        break;
      case '1m':
        startDate = subMonths(endDate, 1);
        break;
      default:
        startDate = subDays(endDate, 1);
    }

    setDateRange({ startDate, endDate });
  };

  const handleDownload = (type: 'orders' | 'bills' | 'feedback') => {
    setDownloadType(type);
    setIsDatePickerOpen(true);
  };

  const handleDownloadConfirm = () => {
    if (!dateRange.startDate || !dateRange.endDate) return;

    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;

    switch (downloadType) {
      case 'orders':
        downloadOrdersExcel(startDate, endDate);
        break;
      case 'bills':
        downloadBillsExcel(billHistory, startDate, endDate);
        break;
      case 'feedback':
        downloadFeedbackExcel(startDate, endDate);
        break;
    }

    setIsDatePickerOpen(false);
  };

  const downloadOrdersExcel = (startDate: Date, endDate: Date) => {
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.orderTime);
      return orderDate >= startDate && orderDate <= endDate;
    });

    const data = filteredOrders.map(order => ({
      'Table Number': order.tableNumber,
      'Order Number': getOrderNumber(order, orders),
      'Status': order.status,
      'Order Time': new Date(order.orderTime).toLocaleString(),
      'Accepted At': order.acceptedAt ? new Date(order.acceptedAt).toLocaleString() : '-',
      'Items': order.items.map(item => 
        `${item.quantity}x ${item.name}${item.size ? ` (${item.size})` : ''}${item.addOns ? ` with ${item.addOns.join(', ')}` : ''}`
      ).join(', '),
      'Total Amount': `₹${getOrderTotal(order)}`
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, `orders_${startDate.toISOString().split('T')[0]}_to_${endDate.toISOString().split('T')[0]}.xlsx`);
  };

  const downloadBillsExcel = (bills: Bill[], startDate: Date, endDate: Date) => {
    const filteredBills = bills.filter(bill => {
      const billDate = new Date(bill.billTime);
      return billDate >= startDate && billDate <= endDate;
    });

    const data = filteredBills.map(bill => ({
      'Table Number': bill.tableNumber,
      'Bill Time': new Date(bill.billTime).toLocaleString(),
      'Payment Status': bill.paymentStatus,
      'Items': bill.items.map(item => 
        `${item.quantity}x ${item.name}${item.size ? ` (${item.size})` : ''}${item.addOns ? ` with ${item.addOns.join(', ')}` : ''}`
      ).join(', '),
      'Subtotal': `₹${bill.subtotal}`,
      'Total Amount': `₹${bill.totalAmount}`
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bills');
    XLSX.writeFile(wb, `bills_${startDate.toISOString().split('T')[0]}_to_${endDate.toISOString().split('T')[0]}.xlsx`);
  };

  const downloadFeedbackExcel = (startDate: Date, endDate: Date) => {
    const filteredFeedback = feedback.filter(fb => {
      const feedbackDate = new Date(fb.submittedAt);
      return feedbackDate >= startDate && feedbackDate <= endDate;
    });

    const data = filteredFeedback.map(fb => ({
      'Name': fb.name || '-',
      'Phone': fb.phone || '-',
      'Email': fb.email || '-',
      'Message': fb.message || '-',
      'Table Number': fb.tableNumber || '-',
      'Submitted At': new Date(fb.submittedAt).toLocaleString()
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Feedback');
    XLSX.writeFile(wb, `feedback_${startDate.toISOString().split('T')[0]}_to_${endDate.toISOString().split('T')[0]}.xlsx`);
  };

  const renderDatePickerDialog = () => (
    <Dialog open={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)}>
      <DialogTitle>Select Date Range</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={() => handleQuickDateSelect('24h')}>Last 24 Hours</Button>
            <Button variant="outlined" onClick={() => handleQuickDateSelect('3d')}>Last 3 Days</Button>
            <Button variant="outlined" onClick={() => handleQuickDateSelect('7d')}>Last 7 Days</Button>
            <Button variant="outlined" onClick={() => handleQuickDateSelect('1m')}>Last Month</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              label="Start Date"
              type="date"
              value={dateRange.startDate ? dateRange.startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setDateRange(prev => ({ 
                ...prev, 
                startDate: e.target.value ? new Date(e.target.value) : null 
              }))}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: dateRange.endDate ? dateRange.endDate.toISOString().split('T')[0] : undefined
              }}
              fullWidth
            />
            <TextField
              label="End Date"
              type="date"
              value={dateRange.endDate ? dateRange.endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setDateRange(prev => ({ 
                ...prev, 
                endDate: e.target.value ? new Date(e.target.value) : null 
              }))}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: dateRange.startDate ? dateRange.startDate.toISOString().split('T')[0] : undefined
              }}
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsDatePickerOpen(false)}>Cancel</Button>
        <Button 
          onClick={handleDownloadConfirm}
          variant="contained"
          disabled={!dateRange.startDate || !dateRange.endDate}
        >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderChefDashboard = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#2C7D89' }}>Kitchen Orders</Typography>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => handleDownload('orders')}
        >
          Download Excel
        </Button>
      </Box>
      {renderFilterBar(orders)}
      {orders.length === 0 ? (
        <Typography>No orders</Typography>
      ) : (
        <Grid container spacing={3}>
          {filterOrders(orders).map(order => (
            <Grid item xs={12} md={6} key={order._id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="h6">Table {order.tableNumber}</Typography>
                      <Typography variant="subtitle2" sx={{ color: '#2C7D89', fontWeight: 600 }}>
                        Order #{getOrderNumber(order, orders)}
                      </Typography>
                    </Box>
                    <Chip 
                      label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} 
                      color={
                        order.status === 'pending' ? 'warning' :
                        order.status === 'preparing' ? 'info' :
                        order.status === 'ready' ? 'success' :
                        order.status === 'served' ? 'primary' :
                        'default'
                      } 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Ordered: {new Date(order.orderTime).toLocaleString()}
                  </Typography>
                  {order.acceptedAt && (
                    <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
                      Accepted: {new Date(order.acceptedAt).toLocaleString()}
                    </Typography>
                  )}
                  <List>
                    {order.items.map((item, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText
                          primary={`${item.quantity}x ${item.name}`}
                          secondary={item.customInstructions}
                        />
                        <Typography variant="body2" color="text.secondary">
                          ₹{item.price * item.quantity}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    {order.status === 'pending' && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleAcceptOrder(order._id)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {order.status === 'preparing' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleCompleteOrder(order._id)}
                      >
                        Complete
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  const renderBillDashboard = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#2C7D89' }}>Bill Requests</Typography>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => handleDownload('bills')}
        >
          Download Excel
        </Button>
      </Box>
      {renderFilterBar(billRequests)}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : billRequests.length === 0 ? (
        <Alert severity="info">No bill requests</Alert>
      ) : (
        <Stack spacing={3}>
          {filterBills(billRequests as any).map((request: any) => (
            <Card key={`table${request.tableNumber}`} sx={{ boxShadow: 4 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#FF4B2B' }}>Table {request.tableNumber}</Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    color="success" 
                    size="large" 
                    onClick={() => handleBillRequest(request.tableNumber)}
                    startIcon={<CheckCircleIcon />}
                  >
                    Create Bill
                  </Button>
                </Box>
                {request.orders.length === 0 ? (
                  <Typography>No orders for this table.</Typography>
                ) : (
                  <>
                    {request.orders
                      .sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime())
                      .map((order) => (
                      <Box key={order._id} sx={{ mb: 2, p: 2, bgcolor: '#fafbfc', borderRadius: 2, boxShadow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Box>
                            <Typography variant="subtitle2" sx={{ color: '#2C7D89', fontWeight: 600 }}>
                              Order #{getOrderNumber(order, orders)}
                            </Typography>
                            <Chip 
                              label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} 
                              color={order.status === 'ready' ? 'success' : order.status === 'served' ? 'primary' : 'default'} 
                              size="small" 
                            />
                          </Box>
                          <Typography variant="body2" sx={{ color: '#888' }}>
                            Placed: {new Date(order.orderTime).toLocaleString()}
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
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                      {item.name} {item.size && <span style={{ fontWeight: 400, fontSize: '0.95em' }}>({item.size})</span>}
                                    </Typography>
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
                                <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 60, textAlign: 'right' }}>
                                  ₹{item.price * item.quantity}
                                </Typography>
                              </ListItem>
                              {i < order.items.length - 1 && <Divider variant="inset" component="li" />}
                            </React.Fragment>
                          ))}
                        </List>
                      </Box>
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C7D89' }}>
                        Table Total: ₹{getTableTotal(request.orders)}
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="success" 
                        size="large" 
                        onClick={() => handleBillRequest(request.tableNumber)}
                        startIcon={<CheckCircleIcon />}
                      >
                        Create Bill
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );

  const renderBillHistory = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#2C7D89' }}>Bill History</Typography>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => handleDownload('bills')}
        >
          Download Excel
        </Button>
      </Box>
      {renderFilterBar(billHistory)}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : billHistory.length === 0 ? (
        <Alert severity="info">No bill history</Alert>
      ) : (
        <Stack spacing={3}>
          {filterBills(billHistory).map((bill) => (
            <Card key={bill._id} sx={{ boxShadow: 4 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#FF4B2B' }}>Table {bill.tableNumber}</Typography>
                    <Typography variant="subtitle2" sx={{ color: '#2C7D89', fontWeight: 600 }}>
                      Bill Time: {new Date(bill.billTime).toLocaleString()}
                    </Typography>
                  </Box>
                  <Chip 
                    label={bill.paymentStatus.charAt(0).toUpperCase() + bill.paymentStatus.slice(1)} 
                    color={bill.paymentStatus === 'pending' ? 'warning' : bill.paymentStatus === 'paid' ? 'success' : 'default'} 
                    size="medium" 
                  />
                </Box>
                <List dense>
                  {bill.items.map((item, i) => (
                    <React.Fragment key={i}>
                      <ListItem alignItems="flex-start" disableGutters>
                        <ListItemText
                          primary={<>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {item.name} {item.size && <span style={{ fontWeight: 400, fontSize: '0.95em' }}>({item.size})</span>}
                            </Typography>
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
                        <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 60, textAlign: 'right' }}>
                          ₹{item.price * item.quantity}
                        </Typography>
                      </ListItem>
                      {i < bill.items.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#888' }}>
                      Subtotal: ₹{bill.subtotal}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C7D89', mt: 1 }}>
                      Total: ₹{bill.totalAmount}
                    </Typography>
                  </Box>
                  {bill.paymentStatus === 'pending' && (
                    <Button 
                      variant="contained" 
                      color="success" 
                      size="large" 
                      onClick={() => handleBillServed(bill._id)}
                      startIcon={<CheckCircleIcon />}
                    >
                      Mark as Served
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );

  const renderFeedbackDashboard = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#2C7D89' }}>Customer Feedback</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchData}
          >
          Refresh
        </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleDownload('feedback')}
          >
            Download Excel
          </Button>
      </Box>
      </Box>
      {renderFilterBar(feedback)}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : feedback.length === 0 ? (
        <Alert severity="info">No feedback submissions yet.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Table</TableCell>
                <TableCell>Submitted At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterFeedback(feedback).map(fb => (
                <TableRow key={fb.id || (fb as any)._id || `feedback-${fb.submittedAt}`}>
                  <TableCell>{fb.name || '-'}</TableCell>
                  <TableCell>{fb.phone || '-'}</TableCell>
                  <TableCell>{fb.email || '-'}</TableCell>
                  <TableCell>{fb.message || '-'}</TableCell>
                  <TableCell>{fb.tableNumber || '-'}</TableCell>
                  <TableCell>{new Date(fb.submittedAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Management Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem 
              button 
              onClick={() => setSelectedSection('chef')}
              selected={selectedSection === 'chef'}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(44, 125, 137, 0.08)',
                  '&:hover': {
                    bgcolor: 'rgba(44, 125, 137, 0.12)',
                  },
                },
              }}
            >
              <ListItemIcon>
                <RestaurantIcon color={selectedSection === 'chef' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Kitchen" />
              {getPendingOrdersCount() > 0 && (
                <Chip
                  label={getPendingOrdersCount()}
                  color="error"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItem>
            <ListItem 
              button 
              onClick={() => setSelectedSection('bill')}
              selected={selectedSection === 'bill'}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(44, 125, 137, 0.08)',
                  '&:hover': {
                    bgcolor: 'rgba(44, 125, 137, 0.12)',
                  },
                },
              }}
            >
              <ListItemIcon>
                <ReceiptIcon color={selectedSection === 'bill' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Bill" />
              {getBillRequestsCount() > 0 && (
                <Chip
                  label={getBillRequestsCount()}
                  color="error"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItem>
            <ListItem 
              button 
              onClick={() => setSelectedSection('billHistory')}
              selected={selectedSection === 'billHistory'}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(44, 125, 137, 0.08)',
                  '&:hover': {
                    bgcolor: 'rgba(44, 125, 137, 0.12)',
                  },
                },
              }}
            >
              <ListItemIcon>
                <ReceiptIcon color={selectedSection === 'billHistory' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Bill History" />
              {getPendingBillsCount() > 0 && (
                <Chip
                  label={getPendingBillsCount()}
                  color="warning"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItem>
            <ListItem 
              button 
              onClick={() => setSelectedSection('feedback')}
              selected={selectedSection === 'feedback'}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(44, 125, 137, 0.08)',
                  '&:hover': {
                    bgcolor: 'rgba(44, 125, 137, 0.12)',
                  },
                },
              }}
            >
              <ListItemIcon>
                <FeedbackIcon color={selectedSection === 'feedback' ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary="Feedback" />
              {getNewFeedbackCount() > 0 && (
                <Chip
                  label={getNewFeedbackCount()}
                  color="info"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {selectedSection === 'chef' && renderChefDashboard()}
        {selectedSection === 'bill' && renderBillDashboard()}
        {selectedSection === 'billHistory' && renderBillHistory()}
        {selectedSection === 'feedback' && renderFeedbackDashboard()}
      </Box>
      {renderDatePickerDialog()}
    </Box>
  );
};

export default ManagementDashboard; 