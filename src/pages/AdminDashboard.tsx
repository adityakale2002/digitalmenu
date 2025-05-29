import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ImageIcon from '@mui/icons-material/Image';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useMenu, MenuItem as MenuItemType } from '../contexts/MenuContext';

const categories = [
  "Featured",
  "Starters",
  "Soups",
  "Salads",
  "Main Course",
  "Seafood",
  "Grills",
  "Arabic Specialties",
  "Beverages",
  "Desserts"
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [newAddOn, setNewAddOn] = useState({ name: '', price: '' });
  const [newTag, setNewTag] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItemType | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const [formData, setFormData] = useState<Partial<MenuItemType>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    calories: 0,
    preparationTime: '',
    servingSize: '',
    dietaryTags: [],
    addOns: [],
  });

  const handleEditItem = (item: MenuItemType) => {
    setSelectedItem(item);
    setFormData(item);
    setIsAddDialogOpen(true);
  };

  const handleDeleteItem = (item: MenuItemType) => {
    setItemToDelete(item);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteMenuItem(itemToDelete.id);
      setSuccessMessage('Item deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 2000);
    }
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  const handleSubmit = () => {
    if (selectedItem) {
      // Update existing item
      updateMenuItem({ ...formData, id: selectedItem.id } as MenuItemType);
    } else {
      // Add new item
      addMenuItem(formData as MenuItemType);
    }

    setSuccessMessage(selectedItem ? 'Item updated successfully!' : 'Item added successfully!');
    setTimeout(() => {
      setSuccessMessage('');
      setIsAddDialogOpen(false);
      setSelectedItem(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        calories: 0,
        preparationTime: '',
        servingSize: '',
        dietaryTags: [],
        addOns: [],
      });
    }, 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Menu Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
          >
            {viewMode === 'grid' ? 'Table View' : 'Grid View'}
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Menu Items ({menuItems.length})</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedItem(null);
              setIsAddDialogOpen(true);
            }}
            sx={{
              background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
                opacity: 0.9,
              },
            }}
          >
            Add New Item
          </Button>
        </Box>

        {viewMode === 'table' ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price (AED)</TableCell>
                  <TableCell>Preparation Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                        onError={(e: any) => {
                          e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {item.description}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.preparationTime}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditItem(item)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteItem(item)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container spacing={3}>
            {menuItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={item.image}
                    alt={item.name}
                    onError={(e: any) => {
                      e.target.src = 'https://via.placeholder.com/300x160?text=No+Image';
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      AED {item.price}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {item.dietaryTags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditItem(item)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteItem(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price (AED)"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">AED</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Calories"
                type="number"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Preparation Time"
                value={formData.preparationTime}
                onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                placeholder="e.g., 15-20 min"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Serving Size"
                value={formData.servingSize}
                onChange={(e) => setFormData({ ...formData, servingSize: e.target.value })}
                placeholder="e.g., 350g"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
                helperText="Enter a valid image URL"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ImageIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {formData.image && (
                <Box sx={{ mt: 2, position: 'relative' }}>
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                    onError={(e: any) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                    }}
                  />
                </Box>
              )}
            </Grid>

            {/* Dietary Tags Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Dietary Tags
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  size="small"
                  label="Add Tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (newTag && !formData.dietaryTags?.includes(newTag)) {
                      setFormData(prev => ({
                        ...prev,
                        dietaryTags: [...(prev.dietaryTags || []), newTag],
                      }));
                      setNewTag('');
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.dietaryTags?.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => setFormData(prev => ({
                      ...prev,
                      dietaryTags: prev.dietaryTags?.filter(t => t !== tag),
                    }))}
                    sx={{
                      background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
                      color: 'white',
                    }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Add-ons Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Add-ons
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  size="small"
                  label="Add-on Name"
                  value={newAddOn.name}
                  onChange={(e) => setNewAddOn({ ...newAddOn, name: e.target.value })}
                />
                <TextField
                  size="small"
                  label="Price"
                  type="number"
                  value={newAddOn.price}
                  onChange={(e) => setNewAddOn({ ...newAddOn, price: e.target.value })}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">AED</InputAdornment>,
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (newAddOn.name && newAddOn.price) {
                      setFormData(prev => ({
                        ...prev,
                        addOns: [...(prev.addOns || []), { name: newAddOn.name, price: Number(newAddOn.price) }],
                      }));
                      setNewAddOn({ name: '', price: '' });
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
              <List>
                {formData.addOns?.map((addOn, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={addOn.name}
                      secondary={`AED ${addOn.price}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          addOns: prev.addOns?.filter((_, i) => i !== index),
                        }))}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF4B2B 30%, #FF7F5C 90%)',
                opacity: 0.9,
              },
            }}
          >
            {selectedItem ? 'Save Changes' : 'Add Item'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{itemToDelete?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 