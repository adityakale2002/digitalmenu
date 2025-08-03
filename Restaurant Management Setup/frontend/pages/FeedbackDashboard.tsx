import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, CircularProgress, Alert
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

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

const FeedbackDashboard: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFeedback = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://192.168.0.191:4000/api/feedback');
      if (!res.ok) throw new Error('Failed to fetch feedback');
      const data = await res.json();
      setFeedback(data.reverse());
    } catch (err: any) {
      setError(err.message || 'Error fetching feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Feedback Dashboard
        </Typography>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchFeedback}>
          Refresh
        </Button>
      </Box>
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
              {feedback.map(fb => (
                <TableRow key={fb.id}>
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
    </Container>
  );
};

export default FeedbackDashboard; 