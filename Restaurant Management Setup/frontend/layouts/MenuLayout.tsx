import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button, 
  Badge,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TableBarIcon from '@mui/icons-material/TableBar';
import SearchIcon from '@mui/icons-material/Search';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HelpIcon from '@mui/icons-material/Help';

const MenuLayout: React.FC = () => {
  const location = useLocation();
  const cartItemCount = 2; // This would come from your cart state management
  const [searchOpen, setSearchOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RestaurantMenuIcon 
                sx={{ 
                  fontSize: 40, 
                  color: 'primary.main',
                  mr: 2,
                }} 
              />
              <Typography 
                variant="h6" 
                component={Link} 
                to="/"
                sx={{ 
                  color: 'text.primary',
                  textDecoration: 'none',
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                }}
              >
                Digital Menu
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                component={Link}
                to="/"
                startIcon={<TableBarIcon sx={{ color: 'black' }} />}
                color={location.pathname === '/' ? 'primary' : 'inherit'}
                sx={{ 
                  fontWeight: 600,
                  color: location.pathname === '/' ? 'primary.main' : 'black'
                }}
              >
                Tables
              </Button>
              <Button
                component={Link}
                to="/menu"
                startIcon={<RestaurantMenuIcon sx={{ color: location.pathname === '/menu' ? 'primary.main' : 'black' }} />}
                color={location.pathname === '/menu' ? 'primary' : 'inherit'}
                sx={{ 
                  fontWeight: 600,
                  color: location.pathname === '/menu' ? 'primary.main' : 'black'
                }}
              >
                Menu
              </Button>
              <Button
                component={Link}
                to="/cart"
                startIcon={
                  <Badge badgeContent={cartItemCount} color="primary">
                    <ShoppingCartIcon sx={{ color: location.pathname === '/cart' ? 'primary.main' : 'black' }} />
                  </Badge>
                }
                color={location.pathname === '/cart' ? 'primary' : 'inherit'}
                sx={{ 
                  fontWeight: 600,
                  color: location.pathname === '/cart' ? 'primary.main' : 'black'
                }}
              >
                Cart
              </Button>

              {/* Navigation Icons */}
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                ml: 2,
                borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                pl: 2
              }}>
                <Tooltip title="Search">
                  <IconButton 
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setSearchOpen(true)}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Feedback">
                  <IconButton 
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setFeedbackOpen(true)}
                  >
                    <FeedbackIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Help">
                  <IconButton 
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setHelpOpen(true)}
                  >
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Add padding to account for fixed AppBar */}
      <Box sx={{ pt: { xs: 0, md: 10 } }}>
        <Outlet />
      </Box>

      {/* Search Dialog */}
      <Dialog 
        open={searchOpen} 
        onClose={() => setSearchOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Search Menu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search for dishes..."
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSearchOpen(false)}>Cancel</Button>
          <Button onClick={() => setSearchOpen(false)} variant="contained">Search</Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog 
        open={feedbackOpen} 
        onClose={() => setFeedbackOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Send Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your feedback"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)}>Cancel</Button>
          <Button onClick={() => setFeedbackOpen(false)} variant="contained">Send</Button>
        </DialogActions>
      </Dialog>

      {/* Help Dialog */}
      <Dialog 
        open={helpOpen} 
        onClose={() => setHelpOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Help & Support</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>How to use the menu</Typography>
          <Typography paragraph>
            • Browse categories using the navigation buttons
          </Typography>
          <Typography paragraph>
            • Click on items to view details and customize
          </Typography>
          <Typography paragraph>
            • Use the search icon to find specific dishes
          </Typography>
          <Typography paragraph>
            • Send feedback if you encounter any issues
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHelpOpen(false)} variant="contained">Got it</Button>
        </DialogActions>
      </Dialog>

      <Box 
        component="footer" 
        sx={{ 
          py: 3,
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,75,43,0.05) 100%)',
          borderTop: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ 
              fontWeight: 500,
              letterSpacing: '0.5px',
            }}
          >
            © {new Date().getFullYear()} Digital Menu. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MenuLayout; 