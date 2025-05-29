import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  useTheme,
  Tabs,
  Tab,
  Fade,
  AppBar,
  Toolbar,
  Tooltip,
  Paper,
  LinearProgress,
  Divider,
} from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ScaleIcon from '@mui/icons-material/Scale';
import TimerIcon from '@mui/icons-material/Timer';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import GrainIcon from '@mui/icons-material/Grain';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SpaIcon from '@mui/icons-material/Spa';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import IcecreamIcon from '@mui/icons-material/Icecream';
import Carousel from 'react-material-ui-carousel';
import { useMenu } from '../contexts/MenuContext';

interface NutritionalInfo {
  proteins: number;
  fats: number;
  sugar: number;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  calories: number;
  preparationTime: string;
  image: string;
  servingSize: string;
  dietaryTags: string[];
  addOns: Array<{ name: string; price: number }>;
  category: string;
  nutritionalInfo?: NutritionalInfo;
}

const sampleMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Grilled Lamb Chops",
    description: "Tender lamb chops marinated in Arabic spices, served with saffron rice and grilled vegetables",
    price: 145,
    calories: 850,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?auto=format&fit=crop&w=800&q=80",
    servingSize: "350g",
    dietaryTags: ["Halal", "High-Protein", "Gluten-Free"],
    addOns: [
      { name: "Extra Rice", price: 15 },
      { name: "Grilled Vegetables", price: 20 },
    ],
    category: "Main Course"
  },
  {
    id: 2,
    name: "Mixed Grill Platter",
    description: "Selection of grilled meats including shish tawook, kofta, and lamb kebab with aromatic rice",
    price: 185,
    calories: 1200,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    servingSize: "500g",
    dietaryTags: ["Halal", "High-Protein"],
    addOns: [
      { name: "Extra Meat", price: 45 },
      { name: "Hummus", price: 15 },
    ],
    category: "Main Course"
  },
  {
    id: 3,
    name: "Arabic Mezze Platter",
    description: "Assortment of hummus, moutabal, tabbouleh, fattoush, and warm pita bread",
    price: 95,
    calories: 680,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?auto=format&fit=crop&w=800&q=80",
    servingSize: "Serves 2-3",
    dietaryTags: ["Vegetarian", "Lebanese"],
    addOns: [
      { name: "Extra Pita", price: 10 },
      { name: "Extra Hummus", price: 15 },
    ],
    category: "Starters"
  },
  {
    id: 4,
    name: "Seafood Machbous",
    description: "Traditional Emirati rice dish with fresh seafood, aromatic spices, and dried lemon",
    price: 165,
    calories: 920,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1590759668628-05b0fc34bb70?auto=format&fit=crop&w=800&q=80",
    servingSize: "400g",
    dietaryTags: ["Emirati Cuisine", "Seafood"],
    addOns: [
      { name: "Extra Shrimp", price: 35 },
      { name: "Extra Rice", price: 20 },
    ],
    category: "Main Course"
  },
  {
    id: 5,
    name: "Kunafa",
    description: "Traditional Middle Eastern dessert with sweet cheese, crispy phyllo, and orange blossom syrup",
    price: 55,
    calories: 450,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1609950683061-0d9c6fc97a76?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Vegetarian", "Arabic Dessert"],
    addOns: [
      { name: "Extra Syrup", price: 5 },
      { name: "Ice Cream", price: 15 },
    ],
    category: "Desserts"
  },
  {
    id: 6,
    name: "Shawarma Platter",
    description: "Choice of chicken or beef shawarma with garlic sauce, pickles, and fresh-cut fries",
    price: 85,
    calories: 780,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80",
    servingSize: "350g",
    dietaryTags: ["Halal", "Middle Eastern"],
    addOns: [
      { name: "Extra Meat", price: 25 },
      { name: "Extra Sauce", price: 8 },
    ],
    category: "Main Course"
  },
  {
    id: 7,
    name: "Lentil Soup",
    description: "Creamy Arabic lentil soup served with lemon and crispy croutons",
    price: 35,
    calories: 320,
    preparationTime: "15 min",
    image: "https://images.unsplash.com/photo-1547308283-0c5c1c141b56?auto=format&fit=crop&w=800&q=80",
    servingSize: "300ml",
    dietaryTags: ["Vegetarian", "Healthy"],
    addOns: [
      { name: "Extra Croutons", price: 5 },
      { name: "Bread Basket", price: 12 },
    ],
    category: "Starters"
  },
  {
    id: 8,
    name: "Grilled Sea Bass",
    description: "Fresh sea bass with herbs, served with saffron rice and grilled vegetables",
    price: 155,
    calories: 650,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80",
    servingSize: "400g",
    dietaryTags: ["Seafood", "Healthy"],
    addOns: [
      { name: "Extra Sauce", price: 12 },
      { name: "Side Salad", price: 18 },
    ],
    category: "Main Course"
  },
  {
    id: 9,
    name: "Arabic Coffee Set",
    description: "Traditional Arabic coffee served with premium dates and sweets",
    price: 45,
    calories: 180,
    preparationTime: "10 min",
    image: "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?auto=format&fit=crop&w=800&q=80",
    servingSize: "Serves 2",
    dietaryTags: ["Traditional", "Arabic"],
    addOns: [
      { name: "Extra Dates", price: 15 },
      { name: "Arabic Sweets", price: 25 },
    ],
    category: "Beverages"
  },
  {
    id: 10,
    name: "Umm Ali",
    description: "Egyptian bread pudding with nuts, raisins, and cream",
    price: 48,
    calories: 420,
    preparationTime: "20 min",
    image: "https://images.unsplash.com/photo-1579372786545-d24232f7e0d9?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Arabic Dessert", "Contains Nuts"],
    addOns: [
      { name: "Extra Nuts", price: 12 },
      { name: "Whipped Cream", price: 8 },
    ],
    category: "Desserts"
  },
  {
    id: 11,
    name: "Fattoush Salad",
    description: "Fresh vegetables with sumac, pomegranate, and crispy pita chips",
    price: 45,
    calories: 280,
    preparationTime: "10 min",
    image: "https://images.unsplash.com/photo-1615367938123-f8455c0a5589?auto=format&fit=crop&w=800&q=80",
    servingSize: "300g",
    dietaryTags: ["Vegan", "Healthy"],
    addOns: [
      { name: "Extra Pita Chips", price: 8 },
      { name: "Extra Pomegranate", price: 10 },
    ],
    category: "Starters"
  },
  {
    id: 12,
    name: "Camel Burger",
    description: "Premium camel meat patty with Arabic spices and special sauce",
    price: 95,
    calories: 850,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=800&q=80",
    servingSize: "350g",
    dietaryTags: ["Halal", "Emirati Special"],
    addOns: [
      { name: "Extra Cheese", price: 12 },
      { name: "Truffle Fries", price: 25 },
    ],
    category: "Main Course"
  },
  {
    id: 13,
    name: "Saffron Ice Cream",
    description: "Persian-style ice cream with saffron, pistachios, and rose water",
    price: 42,
    calories: 380,
    preparationTime: "5 min",
    image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=800&q=80",
    servingSize: "150g",
    dietaryTags: ["Vegetarian", "Contains Nuts"],
    addOns: [
      { name: "Extra Pistachios", price: 15 },
      { name: "Wafer Cone", price: 8 },
    ],
    category: "Desserts"
  },
  {
    id: 14,
    name: "Shish Barak",
    description: "Meat dumplings in yogurt sauce with pine nuts",
    price: 75,
    calories: 580,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80",
    servingSize: "300g",
    dietaryTags: ["Lebanese", "Traditional"],
    addOns: [
      { name: "Extra Sauce", price: 15 },
      { name: "Extra Pine Nuts", price: 18 },
    ],
    category: "Main Course"
  },
  {
    id: 15,
    name: "Lemon Chicken Soup",
    description: "Traditional Middle Eastern soup with tender chicken, lemon, and orzo pasta",
    price: 38,
    calories: 280,
    preparationTime: "15 min",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    servingSize: "300ml",
    dietaryTags: ["Healthy", "High-Protein"],
    addOns: [
      { name: "Extra Chicken", price: 12 },
      { name: "Bread Basket", price: 10 },
    ],
    category: "Soups"
  },
  {
    id: 16,
    name: "Seafood Soup",
    description: "Rich seafood soup with shrimp, fish, and aromatic herbs",
    price: 45,
    calories: 310,
    preparationTime: "20 min",
    image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&w=800&q=80",
    servingSize: "300ml",
    dietaryTags: ["Seafood", "Gluten-Free"],
    addOns: [
      { name: "Extra Seafood", price: 18 },
      { name: "Garlic Bread", price: 12 },
    ],
    category: "Soups"
  },
  {
    id: 17,
    name: "Tabbouleh Salad",
    description: "Fresh parsley, mint, bulgur wheat, tomatoes with lemon-olive oil dressing",
    price: 42,
    calories: 220,
    preparationTime: "15 min",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    servingSize: "250g",
    dietaryTags: ["Vegan", "Lebanese"],
    addOns: [
      { name: "Extra Portion", price: 20 },
      { name: "Pita Bread", price: 8 },
    ],
    category: "Salads"
  },
  {
    id: 18,
    name: "Quinoa Pomegranate Salad",
    description: "Healthy quinoa salad with pomegranate seeds, mixed greens, and citrus dressing",
    price: 48,
    calories: 280,
    preparationTime: "15 min",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=800&q=80",
    servingSize: "280g",
    dietaryTags: ["Vegan", "Gluten-Free", "Healthy"],
    addOns: [
      { name: "Grilled Chicken", price: 15 },
      { name: "Avocado", price: 12 },
    ],
    category: "Salads"
  },
  {
    id: 19,
    name: "Grilled Sea Bass",
    description: "Fresh sea bass fillet with herbs and lemon butter sauce",
    price: 165,
    calories: 420,
    preparationTime: "25 min",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    servingSize: "300g",
    dietaryTags: ["Seafood", "Healthy", "Gluten-Free"],
    addOns: [
      { name: "Extra Sauce", price: 15 },
      { name: "Grilled Vegetables", price: 20 },
    ],
    category: "Seafood"
  },
  {
    id: 20,
    name: "Jumbo Shrimp Platter",
    description: "Grilled jumbo shrimp with garlic butter and special seasoning",
    price: 185,
    calories: 480,
    preparationTime: "25 min",
    image: "https://images.unsplash.com/photo-1565680018434-b583b38e14b5?auto=format&fit=crop&w=800&q=80",
    servingSize: "350g",
    dietaryTags: ["Seafood", "High-Protein"],
    addOns: [
      { name: "Extra Shrimp", price: 45 },
      { name: "Special Sauce", price: 15 },
    ],
    category: "Seafood"
  },
  {
    id: 21,
    name: "Mixed Grill Platter",
    description: "Assortment of grilled meats including lamb chops, chicken, and kebab",
    price: 195,
    calories: 920,
    preparationTime: "30 min",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    servingSize: "500g",
    dietaryTags: ["Halal", "High-Protein"],
    addOns: [
      { name: "Extra Meat", price: 50 },
      { name: "Grilled Vegetables", price: 25 },
    ],
    category: "Grills"
  },
  {
    id: 22,
    name: "Grilled Lamb Rack",
    description: "Premium lamb rack with Arabic spices and mint sauce",
    price: 210,
    calories: 780,
    preparationTime: "35 min",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    servingSize: "400g",
    dietaryTags: ["Halal", "Premium"],
    addOns: [
      { name: "Extra Sauce", price: 15 },
      { name: "Saffron Rice", price: 25 },
    ],
    category: "Grills"
  },
  {
    id: 23,
    name: "Mansaf",
    description: "Traditional Arabic lamb dish with rice and fermented dried yogurt sauce",
    price: 165,
    calories: 850,
    preparationTime: "40 min",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
    servingSize: "400g",
    dietaryTags: ["Arabic", "Traditional"],
    addOns: [
      { name: "Extra Meat", price: 45 },
      { name: "Extra Sauce", price: 20 },
    ],
    category: "Arabic Specialties"
  },
  {
    id: 24,
    name: "Mandi",
    description: "Smoky rice dish with tender meat, traditional Yemeni style",
    price: 145,
    calories: 780,
    preparationTime: "35 min",
    image: "https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?auto=format&fit=crop&w=800&q=80",
    servingSize: "400g",
    dietaryTags: ["Arabic", "Smoky"],
    addOns: [
      { name: "Extra Meat", price: 40 },
      { name: "Extra Rice", price: 20 },
    ],
    category: "Arabic Specialties"
  },
  {
    id: 25,
    name: "Fresh Mint Lemonade",
    description: "Refreshing homemade lemonade with fresh mint leaves",
    price: 28,
    calories: 120,
    preparationTime: "10 min",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
    servingSize: "400ml",
    dietaryTags: ["Refreshing", "Signature"],
    addOns: [
      { name: "Extra Mint", price: 5 },
      { name: "Honey", price: 5 },
    ],
    category: "Beverages"
  },
  {
    id: 26,
    name: "Arabic Coffee Set",
    description: "Traditional Arabic coffee served with premium dates",
    price: 35,
    calories: 85,
    preparationTime: "10 min",
    image: "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?auto=format&fit=crop&w=800&q=80",
    servingSize: "Serves 2",
    dietaryTags: ["Traditional", "Arabic"],
    addOns: [
      { name: "Extra Coffee", price: 15 },
      { name: "Premium Dates", price: 18 },
    ],
    category: "Beverages"
  }
];

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80"
  },
  {
    image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=2000&q=80"
  },
  {
    image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&w=2000&q=80"
  },
  {
    image: "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?auto=format&fit=crop&w=2000&q=80"
  }
];

const MenuView: React.FC = () => {
  const { menuItems } = useMenu();
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [customInstructions, setCustomInstructions] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [showAR, setShowAR] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

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

  // Get featured items (3 from each category)
  const getFeaturedItems = () => {
    const featured: MenuItem[] = [];
    const categoriesForFeatured = categories.filter(cat => cat !== "Featured");
    
    categoriesForFeatured.forEach(category => {
      const categoryItems = menuItems
        .filter(item => item.category === category)
        .slice(0, 3); // Take up to 3 items from each category
      featured.push(...categoryItems);
    });
    
    return featured;
  };

  // Split items into left and right columns
  const getColumnItems = () => {
    const categoryItems = selectedCategory === "Featured"
      ? getFeaturedItems()
      : menuItems.filter(item => item.category === selectedCategory);
    
    const midpoint = Math.ceil(categoryItems.length / 2);
    return {
      leftItems: categoryItems.slice(0, midpoint),
      rightItems: categoryItems.slice(midpoint)
    };
  };

  const { leftItems, rightItems } = getColumnItems();

  // Simplify nutritional info
  const itemsWithNutrition = menuItems.map(item => ({
    ...item,
    nutritionalInfo: {
      proteins: Math.floor(Math.random() * 30) + 10,
      fats: Math.floor(Math.random() * 20) + 5,
      sugar: Math.floor(Math.random() * 15) + 2,
    }
  }));

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setCustomInstructions("");
    setSelectedAddOns([]);
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...selectedItem,
      customInstructions,
      addOns: selectedAddOns,
    };
    console.log('Added to cart:', cartItem);
    setSelectedItem(null);
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Updated Hero Section with Carousel */}
      <Carousel
        animation="slide"
        duration={800}
        interval={6000}
        indicators={true}
        navButtonsAlwaysVisible={true}
        sx={{
          width: '100%',
          height: '400px',
          position: 'relative',
          mb: 4,
        }}
        navButtonsProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: '#2C7D89',
            borderRadius: 0,
            padding: '20px 8px',
            margin: 0,
          }
        }}
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            bottom: '20px',
            zIndex: 2,
          }
        }}
        indicatorIconButtonProps={{
          style: {
            color: 'rgba(255, 255, 255, 0.6)',
            margin: '0 4px',
          }
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: '#fff',
          }
        }}
      >
        {heroSlides.map((slide, index) => (
          <CardMedia
            key={index}
            component="img"
            image={slide.image}
            alt="Menu item"
            sx={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
            }}
          />
        ))}
      </Carousel>

      <Box sx={{ width: '100vw', maxWidth: '100%', overflowX: 'hidden' }}>
        {/* Category Navigation */}
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: { xs: 3, sm: 6 },
            px: { xs: 1, sm: 3 },
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              mb: { xs: 2, sm: 3 }, 
              fontWeight: 600,
              color: '#2C7D89',
              textAlign: 'center',
              fontSize: { xs: '1.5rem', sm: '2rem' },
              '&::after': {
                content: '""',
                display: 'block',
                width: '60px',
                height: '3px',
                backgroundColor: '#FF4B2B',
                margin: '12px auto 0',
                borderRadius: '2px',
              }
            }}
          >
            Our Menu Categories
          </Typography>
          <Box 
            sx={{ 
              display: 'flex',
              gap: 1,
              justifyContent: 'flex-start',
              maxWidth: '100%',
              width: '100%',
              overflowX: 'auto',
              pb: 2,
              px: { xs: 1, sm: 0 },
              '::-webkit-scrollbar': {
                height: '6px',
              },
              '::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '10px',
              },
              '::-webkit-scrollbar-thumb': {
                background: '#FF4B2B',
                borderRadius: '10px',
                '&:hover': {
                  background: '#cc3c22',
                },
              },
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, minWidth: 'min-content' }}>
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  sx={{
                    minWidth: { xs: '120px', sm: '160px' },
                    height: { xs: '40px', sm: '48px' },
                    borderRadius: '24px',
                    backgroundColor: selectedCategory === category ? '#FF4B2B' : 'white',
                    color: selectedCategory === category ? 'white !important' : '#666',
                    border: '1px solid',
                    borderColor: selectedCategory === category ? '#FF4B2B' : '#eee',
                    boxShadow: selectedCategory === category 
                      ? '0 4px 12px rgba(255, 75, 43, 0.2)' 
                      : '0 2px 8px rgba(0,0,0,0.05)',
                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                    fontWeight: 600,
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: selectedCategory === category 
                        ? '#FF4B2B' 
                        : 'rgba(255, 75, 43, 0.05)',
                      borderColor: '#FF4B2B',
                      transform: 'translateY(-2px)',
                      boxShadow: selectedCategory === category 
                        ? '0 6px 16px rgba(255, 75, 43, 0.25)' 
                        : '0 4px 12px rgba(0,0,0,0.1)',
                      color: selectedCategory === category ? 'white !important' : '#FF4B2B',
                    },
                  }}
                >
                  {category}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Menu Items Grid */}
        <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ width: '100%', px: { xs: 1, sm: 3 }, mb: 6 }}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            {leftItems.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  gap: { xs: 2, sm: 3 },
                  mb: { xs: 1, sm: 2 },
                  p: { xs: 2, sm: 3 },
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  width: '100%',
                  height: { xs: 'auto', sm: '180px' },
                  position: 'relative',
                  overflow: 'hidden',
                  flexDirection: { xs: 'column', sm: 'row' },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(45deg, #FF4B2B, #FF7F5C)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover': {
                    transform: { xs: 'translateY(-2px)', sm: 'translateY(-4px)' },
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    '&::before': {
                      opacity: 1,
                    },
                  },
                }}
                onClick={() => handleItemClick(item)}
              >
                <Box
                  sx={{
                    width: { xs: '100%', sm: 140 },
                    height: { xs: 200, sm: 140 },
                    flexShrink: 0,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-between',
                  mt: { xs: 2, sm: 0 }
                }}>
                  <Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1,
                      width: '100%',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 0 }
                    }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: '#2C7D89',
                          fontSize: { xs: '1rem', sm: '1.1rem' },
                          lineHeight: 1.2,
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#FF4B2B',
                          background: 'linear-gradient(45deg, #FF4B2B, #FF7F5C)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: { xs: '0.95rem', sm: '1.1rem' },
                        }}
                      >
                        AED {item.price}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 3, sm: 2 },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        width: '100%',
                        lineHeight: '1.4',
                        height: { xs: 'auto', sm: '2.8em' },
                        opacity: 0.8,
                        fontSize: { xs: '0.85rem', sm: '0.875rem' },
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 1, 
                      width: '100%',
                      flexWrap: 'wrap',
                      mt: { xs: 1, sm: 0 }
                    }}>
                      {item.dietaryTags.slice(0, 2).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            height: { xs: '20px', sm: '24px' },
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            backgroundColor: 'rgba(44, 125, 137, 0.08)',
                            color: '#2C7D89',
                            fontWeight: 500,
                          }}
                        />
                      ))}
                      {item.dietaryTags.length > 2 && (
                        <Chip
                          label={`+${item.dietaryTags.length - 2}`}
                          size="small"
                          sx={{
                            height: { xs: '20px', sm: '24px' },
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            color: '#666',
                            fontWeight: 500,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ 
                    position: { xs: 'relative', sm: 'absolute' },
                    bottom: { xs: 'auto', sm: 16 },
                    right: { xs: 'auto', sm: 16 },
                    zIndex: 1,
                    mt: { xs: 2, sm: 0 },
                    display: 'flex',
                    justifyContent: { xs: 'flex-end', sm: 'flex-end' }
                  }}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        const cartItem = {
                          ...item,
                          customInstructions: '',
                          addOns: [],
                        };
                        console.log('Quick add to cart:', cartItem);
                      }}
                      sx={{
                        background: 'linear-gradient(45deg, #FF4B2B, #FF7F5C)',
                        color: 'white',
                        width: { xs: '32px', sm: '36px' },
                        height: { xs: '32px', sm: '36px' },
                        boxShadow: '0 4px 12px rgba(255, 75, 43, 0.2)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FF4B2B, #FF7F5C)',
                          boxShadow: '0 6px 16px rgba(255, 75, 43, 0.3)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <AddShoppingCartIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>

          {/* Right Column - Apply the same changes as Left Column */}
          <Grid item xs={12} md={6}>
            {rightItems.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  gap: { xs: 2, sm: 3 },
                  mb: { xs: 1, sm: 2 },
                  p: { xs: 2, sm: 3 },
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  width: '100%',
                  height: { xs: 'auto', sm: '180px' },
                  position: 'relative',
                  overflow: 'hidden',
                  flexDirection: { xs: 'column', sm: 'row' },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(45deg, #FF4B2B, #FF7F5C)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover': {
                    transform: { xs: 'translateY(-2px)', sm: 'translateY(-4px)' },
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    '&::before': {
                      opacity: 1,
                    },
                  },
                }}
                onClick={() => handleItemClick(item)}
              >
                <Box
                  sx={{
                    width: { xs: '100%', sm: 140 },
                    height: { xs: 200, sm: 140 },
                    flexShrink: 0,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-between',
                  mt: { xs: 2, sm: 0 }
                }}>
                  <Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1,
                      width: '100%',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 0 }
                    }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: '#2C7D89',
                          fontSize: { xs: '1rem', sm: '1.1rem' },
                          lineHeight: 1.2,
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: '#FF4B2B',
                          background: 'linear-gradient(45deg, #FF4B2B, #FF7F5C)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: { xs: '0.95rem', sm: '1.1rem' },
                        }}
                      >
                        AED {item.price}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 3, sm: 2 },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        width: '100%',
                        lineHeight: '1.4',
                        height: { xs: 'auto', sm: '2.8em' },
                        opacity: 0.8,
                        fontSize: { xs: '0.85rem', sm: '0.875rem' },
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      gap: 1, 
                      width: '100%',
                      flexWrap: 'wrap',
                      mt: { xs: 1, sm: 0 }
                    }}>
                      {item.dietaryTags.slice(0, 2).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            height: { xs: '20px', sm: '24px' },
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            backgroundColor: 'rgba(44, 125, 137, 0.08)',
                            color: '#2C7D89',
                            fontWeight: 500,
                          }}
                        />
                      ))}
                      {item.dietaryTags.length > 2 && (
                        <Chip
                          label={`+${item.dietaryTags.length - 2}`}
                          size="small"
                          sx={{
                            height: { xs: '20px', sm: '24px' },
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            color: '#666',
                            fontWeight: 500,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ 
                    position: { xs: 'relative', sm: 'absolute' },
                    bottom: { xs: 'auto', sm: 16 },
                    right: { xs: 'auto', sm: 16 },
                    zIndex: 1,
                    mt: { xs: 2, sm: 0 },
                    display: 'flex',
                    justifyContent: { xs: 'flex-end', sm: 'flex-end' }
                  }}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        const cartItem = {
                          ...item,
                          customInstructions: '',
                          addOns: [],
                        };
                        console.log('Quick add to cart:', cartItem);
                      }}
                      sx={{
                        background: 'linear-gradient(45deg, #FF4B2B, #FF7F5C)',
                        color: 'white',
                        width: { xs: '32px', sm: '36px' },
                        height: { xs: '32px', sm: '36px' },
                        boxShadow: '0 4px 12px rgba(255, 75, 43, 0.2)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FF4B2B, #FF7F5C)',
                          boxShadow: '0 6px 16px rgba(255, 75, 43, 0.3)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <AddShoppingCartIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>

      {/* Enhanced Item Dialog */}
      <Dialog
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Fade}
        transitionDuration={300}
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden',
          }
        }}
      >
        {selectedItem && (
          <>
            <DialogTitle 
              sx={{ 
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: '#2C7D89',
                color: 'white'
              }}
            >
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                {selectedItem.name}
              </Typography>
              <IconButton
                onClick={() => setSelectedItem(null)}
                sx={{ color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={selectedTab} 
                  onChange={(e, newValue) => setSelectedTab(newValue)}
                  variant="fullWidth"
                >
                  <Tab label="Details" />
                  <Tab label="Nutrition" />
                  <Tab label="AR View" />
                </Tabs>
              </Box>

              {/* Details Tab */}
              {selectedTab === 0 && (
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <CardMedia
                        component="img"
                        image={selectedItem.image}
                        alt={selectedItem.name}
                        sx={{
                          width: '100%',
                          height: 300,
                          objectFit: 'cover',
                          borderRadius: 2,
                          mb: 2
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom color="#2C7D89">
                        Description
                      </Typography>
                      <Typography paragraph>
                        {selectedItem.description}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom color="#2C7D89">
                          Quick Info
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocalFireDepartmentIcon color="primary" />
                              <Typography>{selectedItem.calories} cal</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <ScaleIcon color="primary" />
                              <Typography>{selectedItem.servingSize}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <TimerIcon color="primary" />
                              <Typography>{selectedItem.preparationTime}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <RestaurantMenuIcon color="primary" />
                              <Typography>{selectedItem.category}</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>

                      <Typography variant="h6" gutterBottom color="#2C7D89">
                        Dietary Tags
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {selectedItem.dietaryTags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            sx={{
                              bgcolor: 'rgba(44, 125, 137, 0.1)',
                              color: '#2C7D89',
                            }}
                          />
                        ))}
                      </Box>

                      <Typography variant="h4" gutterBottom color="#2C7D89" sx={{ mt: 2 }}>
                        AED {selectedItem.price}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom color="#2C7D89">
                      Customize Your Order
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Add-ons</InputLabel>
                      <Select
                        multiple
                        value={selectedAddOns}
                        onChange={(e) => setSelectedAddOns(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                        renderValue={(selected) => selected.join(', ')}
                      >
                        {selectedItem.addOns.map((addOn) => (
                          <MenuItem key={addOn.name} value={addOn.name}>
                            {addOn.name} (+AED {addOn.price})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Special Instructions"
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  </Box>
                </Box>
              )}

              {/* Nutrition Tab */}
              {selectedTab === 1 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom color="#2C7D89" sx={{ mb: 4 }}>
                    Nutritional Information
                  </Typography>

                  <Grid container spacing={3} justifyContent="center">
                    {/* Calories */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 3, 
                          textAlign: 'center',
                          bgcolor: 'rgba(44, 125, 137, 0.1)',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <LocalFireDepartmentIcon sx={{ fontSize: 40, color: '#2C7D89', mb: 1 }} />
                        <Typography variant="h4" sx={{ color: '#2C7D89', fontWeight: 'bold', mb: 1 }}>
                          {selectedItem.calories}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Calories
                        </Typography>
                      </Paper>
                    </Grid>

                    {/* Proteins */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 3, 
                          textAlign: 'center',
                          bgcolor: 'rgba(44, 125, 137, 0.1)',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FitnessCenterIcon sx={{ fontSize: 40, color: '#2C7D89', mb: 1 }} />
                        <Typography variant="h4" sx={{ color: '#2C7D89', fontWeight: 'bold', mb: 1 }}>
                          {selectedItem.nutritionalInfo?.proteins}g
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Proteins
                        </Typography>
                      </Paper>
                    </Grid>

                    {/* Fats */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 3, 
                          textAlign: 'center',
                          bgcolor: 'rgba(44, 125, 137, 0.1)',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <WaterDropIcon sx={{ fontSize: 40, color: '#2C7D89', mb: 1 }} />
                        <Typography variant="h4" sx={{ color: '#2C7D89', fontWeight: 'bold', mb: 1 }}>
                          {selectedItem.nutritionalInfo?.fats}g
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Fats
                        </Typography>
                      </Paper>
                    </Grid>

                    {/* Sugar */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 3, 
                          textAlign: 'center',
                          bgcolor: 'rgba(44, 125, 137, 0.1)',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <IcecreamIcon sx={{ fontSize: 40, color: '#2C7D89', mb: 1 }} />
                        <Typography variant="h4" sx={{ color: '#2C7D89', fontWeight: 'bold', mb: 1 }}>
                          {selectedItem.nutritionalInfo?.sugar}g
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Sugar
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(44, 125, 137, 0.05)', borderRadius: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                      Values are per serving • {selectedItem.servingSize}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* AR View Tab */}
              {selectedTab === 2 && (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Box
                    sx={{
                      height: 400,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(44, 125, 137, 0.1)',
                      borderRadius: 2,
                    }}
                  >
                    <ThreeDRotationIcon sx={{ fontSize: 60, color: '#2C7D89', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      AR View Coming Soon
                    </Typography>
                    <Typography color="text.secondary">
                      Experience {selectedItem.name} in augmented reality
                    </Typography>
                  </Box>
                </Box>
              )}
            </DialogContent>

            <DialogActions sx={{ p: 2, bgcolor: 'rgba(44, 125, 137, 0.1)' }}>
              <Button onClick={() => setSelectedItem(null)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAddToCart}
                startIcon={<AddShoppingCartIcon sx={{ color: 'black' }} />}
                sx={{
                  bgcolor: '#2C7D89',
                  '&:hover': {
                    bgcolor: '#236570',
                  },
                }}
              >
                Add to Cart • AED {selectedItem.price}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MenuView; 