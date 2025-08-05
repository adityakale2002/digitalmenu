import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Box,
  useTheme,
} from '@mui/material';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const TableView: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  // Check for table parameter in URL and auto-navigate
  React.useEffect(() => {
    // Handle both hash routing and regular routing
    const hash = window.location.hash;
    const search = window.location.search;
    
    let tableFromUrl = null;
    
    // Check hash routing first (e.g., /#/?table=1)
    if (hash.includes('?table=')) {
      const urlParams = new URLSearchParams(hash.split('?')[1]);
      tableFromUrl = urlParams.get('table');
    }
    // Check regular routing (e.g., ?table=1)
    else if (search.includes('table=')) {
      const urlParams = new URLSearchParams(search);
      tableFromUrl = urlParams.get('table');
    }
    
    if (tableFromUrl) {
      const tableNum = parseInt(tableFromUrl, 10);
      if (tableNum >= 1 && tableNum <= 10) {
        console.log('Auto-navigating to menu with table:', tableNum);
        localStorage.setItem('selectedTable', tableNum.toString());
        navigate('/menu');
      }
    }
  }, [navigate]);

  const handleTableSelect = (tableNumber: number) => {
    // In a real app, we would store the table number in context/state
    localStorage.setItem('selectedTable', tableNumber.toString());
    navigate('/menu');
  };

  const handleAdminClick = () => {
    navigate('/admin/login');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AdminPanelSettingsIcon />}
          onClick={handleAdminClick}
          sx={{
            borderRadius: '20px',
            px: 3,
          }}
        >
          Admin Login
        </Button>
      </Box>

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
          Welcome to Digital Menu
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: 500, maxWidth: 600, mx: 'auto' }}
        >
          Select your table number to begin your dining experience
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {tables.map((tableNumber) => (
          <Grid item xs={12} sm={6} md={4} key={tableNumber}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
                },
              }}
              onClick={() => handleTableSelect(tableNumber)}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 4,
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    boxShadow: '0 8px 20px rgba(255,75,43,0.2)',
                  }}
                >
                  <TableRestaurantIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  Table {tableNumber}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => handleTableSelect(tableNumber)}
                  sx={{
                    mt: 'auto',
                    width: '100%',
                  }}
                >
                  Select Table
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TableView; 