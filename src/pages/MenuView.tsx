import React, { useState, useEffect, useRef } from 'react';
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
  Container,
  Rating,
  Avatar,
  Badge,
  Radio,
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
import { useMenu, MenuItem as MenuItemType } from '../contexts/MenuContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import DirectionsIcon from '@mui/icons-material/Directions';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import { createOrder, createBill, Bill } from '../services/api';

interface NutritionalInfo {
  proteins: number;
  fats: number;
  sugar: number;
}

// Using the MenuItem interface from context instead of defining our own

const sampleMenuItems: MenuItemType[] = [
  // Main Course
  {
    id: 1,
    name: "Paneer Tikka Masala",
    description: "Cottage cheese cubes marinated in spices, grilled and simmered in rich tomato gravy",
    price: 280,
    calories: 450,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    servingSize: "300g",
    dietaryTags: ["Vegetarian", "High-Protein"],
    addOns: [
      { name: "Extra Paneer", price: 80 },
      { name: "Butter Naan", price: 40 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 18, fats: 22, sugar: 8 }
  },
  {
    id: 2,
    name: "Chole (Chickpea Curry)",
    description: "Spiced chickpeas cooked in aromatic gravy with traditional spices",
    price: 220,
    calories: 380,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    servingSize: "300g",
    dietaryTags: ["Vegetarian", "Vegan", "High-Protein"],
    addOns: [
      { name: "Extra Chole", price: 60 },
      { name: "Bhatura", price: 40 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 15, fats: 12, sugar: 5 }
  },
  {
    id: 3,
    name: "Rogan Josh",
    description: "Tender lamb pieces cooked in aromatic Kashmiri gravy with whole spices",
    price: 320,
    calories: 550,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "350g",
    dietaryTags: ["Non-Vegetarian", "High-Protein"],
    addOns: [
      { name: "Extra Meat", price: 100 },
      { name: "Naan", price: 40 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 28, fats: 32, sugar: 4 }
  },
  {
    id: 4,
    name: "Palak Paneer",
    description: "Cottage cheese cubes in creamy spinach gravy with mild spices",
    price: 260,
    calories: 420,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    servingSize: "300g",
    dietaryTags: ["Vegetarian", "High-Protein"],
    addOns: [
      { name: "Extra Paneer", price: 80 },
      { name: "Butter Naan", price: 40 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 16, fats: 24, sugar: 6 }
  },
  {
    id: 5,
    name: "Veg Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices",
    price: 240,
    calories: 480,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "400g",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Raita", price: 40 },
      { name: "Extra Vegetables", price: 60 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 12, fats: 18, sugar: 4 }
  },
  {
    id: 6,
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken and aromatic spices",
    price: 280,
    calories: 550,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "400g",
    dietaryTags: ["Non-Vegetarian", "High-Protein"],
    addOns: [
      { name: "Raita", price: 40 },
      { name: "Extra Chicken", price: 80 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 24, fats: 22, sugar: 4 }
  },
  {
    id: 7,
    name: "Dal Makhani",
    description: "Black lentils cooked overnight with butter and cream",
    price: 220,
    calories: 380,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    servingSize: "300g",
    dietaryTags: ["Vegetarian", "High-Protein"],
    addOns: [
      { name: "Extra Butter", price: 30 },
      { name: "Naan", price: 40 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 14, fats: 16, sugar: 3 }
  },
  {
    id: 8,
    name: "Chicken Tikka Masala",
    description: "Tender chicken tikka pieces in rich tomato gravy with cream",
    price: 300,
    calories: 520,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    servingSize: "350g",
    dietaryTags: ["Non-Vegetarian", "High-Protein"],
    addOns: [
      { name: "Extra Chicken", price: 80 },
      { name: "Butter Naan", price: 40 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 26, fats: 28, sugar: 6 }
  },
  // Breads & Rice
  {
    id: 9,
    name: "Butter Naan",
    description: "Soft, fluffy bread baked in tandoor with butter",
    price: 40,
    calories: 280,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 piece",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Butter", price: 20 },
      { name: "Garlic Spread", price: 20 },
    ],
    category: "Breads & Rice"
  },
  {
    id: 10,
    name: "Lachha Paratha",
    description: "Flaky, layered whole wheat bread",
    price: 50,
    calories: 320,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 piece",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Butter", price: 20 },
      { name: "Curd", price: 30 },
    ],
    category: "Breads & Rice"
  },
  {
    id: 15,
    name: "Roti",
    description: "Soft whole wheat flatbread",
    price: 30,
    calories: 120,
    preparationTime: "5-10 min",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Butter", price: 15 },
      { name: "Curd", price: 25 },
    ],
    category: "Breads & Rice"
  },
  {
    id: 16,
    name: "Paratha",
    description: "Layered flatbread with ghee",
    price: 45,
    calories: 250,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 piece",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Butter", price: 15 },
      { name: "Pickle", price: 10 },
    ],
    category: "Breads & Rice"
  },
  {
    id: 17,
    name: "Poori",
    description: "Deep-fried puffed bread",
    price: 40,
    calories: 280,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Poori", price: 20 },
      { name: "Potato Curry", price: 30 },
    ],
    category: "Breads & Rice"
  },
  {
    id: 18,
    name: "Jeera Rice",
    description: "Fragrant basmati rice with cumin seeds",
    price: 120,
    calories: 220,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 plate",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Rice", price: 60 },
      { name: "Raita", price: 40 },
    ],
    category: "Breads & Rice"
  },
  {
    id: 19,
    name: "Ghee Rice",
    description: "Aromatic basmati rice cooked in ghee",
    price: 140,
    calories: 280,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 plate",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Rice", price: 70 },
      { name: "Raita", price: 40 },
    ],
    category: "Breads & Rice"
  },
  {
    id: 20,
    name: "Pani Puri",
    description: "Crispy hollow puris filled with spiced water and chutneys",
    price: 80,
    calories: 180,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    servingSize: "6 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Puris", price: 40 },
      { name: "Extra Chutney", price: 20 },
    ],
    category: "Snacks & Street Food"
  },
  {
    id: 21,
    name: "Bhel Puri",
    description: "Crispy puffed rice with vegetables and tangy chutneys",
    price: 90,
    calories: 220,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 plate",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Sev", price: 15 },
      { name: "Extra Chutney", price: 20 },
    ],
    category: "Snacks & Street Food"
  },
  {
    id: 22,
    name: "Vada Pav",
    description: "Spiced potato fritter in a soft bun with chutneys",
    price: 60,
    calories: 320,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 piece",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Chutney", price: 10 },
      { name: "Extra Vada", price: 30 },
    ],
    category: "Snacks & Street Food"
  },
  {
    id: 23,
    name: "Aloo Tikki",
    description: "Crispy potato patties with spices",
    price: 70,
    calories: 250,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Tikki", price: 35 },
      { name: "Chutney", price: 15 },
    ],
    category: "Snacks & Street Food"
  },
  {
    id: 24,
    name: "Dhokla",
    description: "Steamed savory cake made from fermented batter",
    price: 80,
    calories: 180,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    servingSize: "4 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Dhokla", price: 40 },
      { name: "Chutney", price: 15 },
    ],
    category: "Snacks & Street Food"
  },
  {
    id: 25,
    name: "Pakora",
    description: "Crispy fritters made with vegetables and spices",
    price: 90,
    calories: 280,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    servingSize: "6 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Pakora", price: 45 },
      { name: "Chutney", price: 15 },
    ],
    category: "Snacks & Street Food"
  },
  {
    id: 26,
    name: "Kheer",
    description: "Creamy rice pudding with nuts and cardamom",
    price: 90,
    calories: 320,
    preparationTime: "5-10 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 bowl",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Dry Fruits", price: 30 },
      { name: "Extra Cream", price: 20 },
    ],
    category: "Desserts"
  },
  {
    id: 27,
    name: "Jalebi",
    description: "Crispy, sweet pretzel-shaped dessert soaked in sugar syrup",
    price: 70,
    calories: 280,
    preparationTime: "5-10 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "4 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Jalebi", price: 35 },
      { name: "Rabri", price: 40 },
    ],
    category: "Desserts"
  },
  {
    id: 28,
    name: "Ladoo",
    description: "Sweet round balls made with gram flour and sugar",
    price: 60,
    calories: 220,
    preparationTime: "5-10 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Ladoo", price: 30 },
      { name: "Dry Fruits", price: 25 },
    ],
    category: "Desserts"
  },
  {
    id: 29,
    name: "Barfi",
    description: "Sweet milk fudge with nuts",
    price: 80,
    calories: 250,
    preparationTime: "5-10 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "4 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Barfi", price: 40 },
      { name: "Dry Fruits", price: 25 },
    ],
    category: "Desserts"
  },
  {
    id: 30,
    name: "Halwa",
    description: "Sweet semolina pudding with nuts and cardamom",
    price: 90,
    calories: 300,
    preparationTime: "5-10 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 bowl",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Dry Fruits", price: 30 },
      { name: "Extra Ghee", price: 20 },
    ],
    category: "Desserts"
  },
  {
    id: 31,
    name: "Mutton Curry",
    description: "Tender mutton pieces slow-cooked in a spicy onion-tomato gravy",
    price: 340,
    calories: 600,
    preparationTime: "35-40 min",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    servingSize: "350g",
    dietaryTags: ["Non-Vegetarian", "High-Protein"],
    addOns: [
      { name: "Extra Mutton", price: 120 },
      { name: "Roti", price: 30 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 30, fats: 35, sugar: 5 }
  },
  {
    id: 32,
    name: "Paneer Butter Masala",
    description: "Cottage cheese cubes in a rich, creamy tomato-butter sauce",
    price: 290,
    calories: 480,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=800&q=80",
    servingSize: "300g",
    dietaryTags: ["Vegetarian", "High-Protein"],
    addOns: [
      { name: "Extra Paneer", price: 80 },
      { name: "Butter Naan", price: 40 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 18, fats: 28, sugar: 10 }
  },
  {
    id: 33,
    name: "Fish Curry",
    description: "Fish fillets simmered in tangy coconut and tomato gravy",
    price: 320,
    calories: 420,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&w=800&q=80",
    servingSize: "300g",
    dietaryTags: ["Non-Vegetarian", "Seafood"],
    addOns: [
      { name: "Extra Fish", price: 100 },
      { name: "Steamed Rice", price: 60 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 22, fats: 18, sugar: 4 }
  },
  {
    id: 34,
    name: "Egg Curry",
    description: "Boiled eggs in a spicy onion-tomato masala",
    price: 180,
    calories: 350,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 eggs",
    dietaryTags: ["Egg", "High-Protein"],
    addOns: [
      { name: "Extra Egg", price: 30 },
      { name: "Roti", price: 30 },
    ],
    category: "Main Course",
    nutritionalInfo: { proteins: 14, fats: 16, sugar: 3 }
  },
  {
    id: 35,
    name: "Tandoori Roti",
    description: "Whole wheat flatbread cooked in a tandoor",
    price: 35,
    calories: 130,
    preparationTime: "5-10 min",
    image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 piece",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Butter", price: 15 },
      { name: "Curd", price: 25 },
    ],
    category: "Breads & Rice"
  },
  {
    id: 36,
    name: "Stuffed Paratha",
    description: "Paratha stuffed with spiced potatoes or paneer",
    price: 60,
    calories: 260,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 piece",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Curd", price: 25 },
      { name: "Pickle", price: 10 },
    ],
    category: "Breads & Rice"
  },
  {
    id: 37,
    name: "Peas Pulao",
    description: "Basmati rice cooked with green peas and mild spices",
    price: 140,
    calories: 240,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 plate",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Raita", price: 40 },
      { name: "Extra Peas", price: 20 },
    ],
    category: "Breads & Rice"
  },
  {
    id: 38,
    name: "Dahi Puri",
    description: "Mini puris filled with yogurt, chutneys, and spices",
    price: 90,
    calories: 200,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&w=800&q=80",
    servingSize: "6 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Dahi", price: 20 },
      { name: "Extra Chutney", price: 15 },
    ],
    category: "Snacks & Street Food"
  },
  {
    id: 39,
    name: "Sev Puri",
    description: "Crisp puris topped with potatoes, chutneys, and sev",
    price: 90,
    calories: 210,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&w=800&q=80",
    servingSize: "6 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Sev", price: 15 },
      { name: "Extra Chutney", price: 15 },
    ],
    category: "Snacks & Street Food"
  },
  {
    id: 40,
    name: "Mirchi Bajji",
    description: "Large green chilies stuffed and deep-fried in chickpea batter",
    price: 70,
    calories: 180,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Bajji", price: 35 },
      { name: "Chutney", price: 15 },
    ],
    category: "Snacks & Street Food"
  },
  {
    id: 41,
    name: "Malpua",
    description: "Sweet pancakes soaked in sugar syrup",
    price: 100,
    calories: 320,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Rabri", price: 40 },
      { name: "Dry Fruits", price: 30 },
    ],
    category: "Desserts"
  },
  {
    id: 42,
    name: "Sandesh",
    description: "Bengali sweet made from fresh paneer and sugar",
    price: 90,
    calories: 180,
    preparationTime: "5-10 min",
    image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Sandesh", price: 40 },
      { name: "Dry Fruits", price: 25 },
    ],
    category: "Desserts"
  },
  {
    id: 43,
    name: "Mysore Pak",
    description: "Rich, dense sweet made from ghee, sugar, and gram flour",
    price: 110,
    calories: 350,
    preparationTime: "5-10 min",
    image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Mysore Pak", price: 50 },
      { name: "Dry Fruits", price: 30 },
    ],
    category: "Desserts"
  }
];

const heroSlides = [
  {
    image: "/hotel.jpg"
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
  console.log('MenuView: Starting to load...');
  let menuItems: MenuItemType[] = [];
  
  try {
    const context = useMenu();
    menuItems = context.menuItems;
    console.log('MenuView: Got menuItems from context:', menuItems.length, 'items');
  } catch (error) {
    console.error('MenuView: Error getting menu from context:', error);
    menuItems = sampleMenuItems;
    console.log('MenuView: Using sample menu items:', menuItems.length, 'items');
  }
  
  console.log('MenuView: Final menuItems:', menuItems.length, 'items');
  // const menuItems = sampleMenuItems;
  const theme = useTheme();
  
  // Add a simple test to see if the component is rendering
  console.log('MenuView: Component is rendering with', menuItems.length, 'items');
  
  // Temporarily disable image loading to test if that's causing the issue
  const safeMenuItems = menuItems.map(item => ({
    ...item,
    image: "https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=Food+Image"
  }));
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [customInstructions, setCustomInstructions] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAR, setShowAR] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'Half' | 'Full'>('Half');

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any | null>(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<string>('Preparing');
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [billDialogOpen, setBillDialogOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState<number | null>(() => {
    const stored = localStorage.getItem('selectedTable');
    return stored ? parseInt(stored, 10) : null;
  });
  const [dineType, setDineType] = useState<'Dine In' | 'Take Away'>('Dine In');
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const location = useLocation();

  // Debug table number state
  console.log('Current tableNumber state:', tableNumber);

  // Read table number from URL parameters
  useEffect(() => {
    // Read from URL first
    const urlParams = new URLSearchParams(window.location.search);
    const tableFromUrl = urlParams.get('table');
    console.log('URL table parameter:', tableFromUrl);
    
    if (tableFromUrl) {
      const tableNum = parseInt(tableFromUrl, 10);
      console.log('Parsed table number:', tableNum);
      if (tableNum >= 1 && tableNum <= 10) {
        console.log('Setting table number to:', tableNum);
        setTableNumber(tableNum);
        localStorage.setItem('selectedTable', tableNum.toString());
        return; // Exit early if we found a valid table in URL
      }
    }
    
    // Fallback to localStorage if no valid URL parameter
    const stored = localStorage.getItem('selectedTable');
    if (stored) {
      const storedNum = parseInt(stored, 10);
      if (storedNum >= 1 && storedNum <= 10) {
        console.log('Using stored table number:', storedNum);
        setTableNumber(storedNum);
      }
    }
  }, [location.search]);

  // Get unique categories from menu items
  const availableCategories = Array.from(new Set(safeMenuItems.map(item => item.category)));
  console.log('Available categories:', availableCategories);

  const categories = [
    "All",
    "Featured",
    ...availableCategories
  ];

  // Get featured items (3 from each category)
  const getFeaturedItems = () => {
    const featured: MenuItemType[] = [];
    const categoriesForFeatured = categories.filter(cat => cat !== "Featured");
    
    categoriesForFeatured.forEach(category => {
      const categoryItems = safeMenuItems
        .filter(item => item.category === category)
        .slice(0, 3);
      featured.push(...categoryItems);
    });
    
    return featured;
  };

  // Get items for the selected category
  const getCategoryItems = () => {
    if (selectedCategory === "All") return safeMenuItems;
    if (selectedCategory === "Featured") return getFeaturedItems();
    return safeMenuItems.filter(item => item.category === selectedCategory);
  };

  const handleItemClick = (item: MenuItemType) => {
    setSelectedItem(item);
    setCustomInstructions("");
    setSelectedAddOns([]);
    setQuantity(1);
    setSelectedSize('Half');
    setIsBookmarked(false);
    setDineType('Dine In'); // Reset to default when opening dialog
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    
            // Calculate price based on size for Handi items and Tandoori
        let price = selectedItem.price;
        if (selectedItem.category === "Handi Specials") {
          if (selectedSize === 'Full') {
            // Full price calculation based on item
            if (selectedItem.name === "Butter Chicken Handi") price = 600;
            else if (selectedItem.name === "Chicken Handi") price = 650;
            else if (selectedItem.name === "Aalani Handi (Chicken)") price = 650;
            else if (selectedItem.name === "Butter Mutton Handi") price = 949;
            else if (selectedItem.name === "Mutton Handi") price = 900;
            else if (selectedItem.name === "Aalani Handi (Mutton)") price = 900;
            else price = selectedItem.price; // fallback
          }
        } else if (selectedItem.name === "Tandoori") {
          if (selectedSize === 'Full') {
            price = 600; // Full price for Tandoori
          }
        }
    
    const cartItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      size: selectedItem.category === "Handi Specials" || selectedItem.name === "Tandoori" ? selectedSize : undefined,
      quantity,
      price,
      addOns: selectedAddOns,
      customInstructions,
      image: selectedItem.image,
      dineType, // Add dine type to cart item
    };
    setCart(prev => {
      // If same item+addOns+instructions+dineType+size exists, increase quantity
      const idx = prev.findIndex(item => 
        item.id === cartItem.id && 
        JSON.stringify(item.addOns) === JSON.stringify(cartItem.addOns) && 
        item.customInstructions === cartItem.customInstructions && 
        item.dineType === cartItem.dineType &&
        item.size === cartItem.size // Include size in comparison for Handi Specials and Tandoori
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += cartItem.quantity;
        return updated;
      }
      return [...prev, cartItem];
    });
    setSelectedItem(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedItem?.name,
        text: selectedItem?.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Cart item quantity and delete handlers
  const handleCartQtyChange = (idx: number, delta: number) => {
    setCart(prev => {
      const updated = [...prev];
      if (updated[idx].quantity + delta <= 0) {
        updated.splice(idx, 1);
      } else {
        updated[idx].quantity += delta;
      }
      return updated;
    });
  };
  const handleCartDelete = (idx: number) => {
    setCart(prev => {
      const updated = [...prev];
      updated.splice(idx, 1);
      return updated;
    });
  };

  // Place Order handler
  const handlePlaceOrder = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!tableNumber) {
      alert('Please select a table number first!');
      return;
    }

    try {
        // Create order
        const orderData = {
            tableNumber,
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
                price: item.price
            })),
            totalAmount: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      };

        const order = await createOrder(orderData);

      // Add to order history with full item details
        setOrderHistory(prev => [...prev, order]);

      // Reset cart and show order confirmation
      setCart([]);
      setCartOpen(false);
      setOrderDialogOpen(true);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const categoryItems = getCategoryItems();

  const handleRequestBill = async () => {
    try {
      console.log('Request Bill clicked for table:', tableNumber);
      
      if (!tableNumber) {
        alert('Please select a table number first!');
        return;
      }

      console.log('Fetching orders for table:', tableNumber);

      // Get all orders for this table
                const response = await fetch(`http://192.168.1.124:4000/api/orders?tableNumber=${tableNumber}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch orders:', response.status, errorText);
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }
      
      const orders = await response.json();
      console.log('Orders fetched:', orders);

      if (orders.length === 0) {
        alert('No orders found for this table. Please place an order first.');
        return;
      }

      console.log('Updating orders to mark as bill requested...');

      // Update all orders to mark them as bill requested
      const updatePromises = orders.map(async (order) => {
        console.log('Updating order:', order._id);
                     const updateResponse = await fetch(`http://192.168.1.124:4000/api/orders/${order._id}/status`, {
          method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            status: order.status,
            billRequested: true 
          })
        });
        
        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          console.error('Failed to update order:', order._id, updateResponse.status, errorText);
          throw new Error(`Failed to update order: ${updateResponse.status}`);
        }
        
        return updateResponse.json();
      });
      
      await Promise.all(updatePromises);
      console.log('All orders updated successfully');
      
      // Close bill dialog and open feedback form
      setBillDialogOpen(false);
      setShowFeedbackDialog(true);
      
      // Clear order history after requesting bill
      setOrderHistory([]);
      
      alert('Bill requested successfully! Please wait for staff to process.');
    } catch (error) {
      console.error('Error requesting bill:', error);
      alert(`Failed to request bill: ${error.message}`);
    }
  };

  const resetMenuState = () => {
    setCart([]);
    setSelectedItem(null);
    setCartOpen(false);
    setOrderDialogOpen(false);
    setSelectedCategory('All');
    setCustomInstructions('');
    setSelectedAddOns([]);
    setQuantity(1);
    setSelectedSize('Half');
    setIsBookmarked(false);
    setDineType('Dine In');
    setOrderHistory([]);
    setShowFeedbackDialog(false);
    setFeedbackData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  };

  const handleFeedbackChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleFeedbackSubmit = async () => {
    try {
      // Send feedback data to backend if any field is filled
      if (feedbackData.name || feedbackData.phone || feedbackData.email || feedbackData.message) {
        await fetch('http://192.168.1.124:4000/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...feedbackData,
            tableNumber,
            timestamp: new Date().toISOString()
          })
        });
        alert('Thank you for your feedback!');
      }

      // Reset menu state
      resetMenuState();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
  };

  const filteredMenuItems = searchQuery.trim()
    ? safeMenuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.dietaryTags && item.dietaryTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : getCategoryItems();



  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: '#f8f8f8', minHeight: '100vh' }}>
      {/* Search Bar (should be at the very top) */}
      {searchActive && (
        <Box sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1202,
          bgcolor: 'white',
          px: 2,
          py: 1.5,
          boxShadow: 2,
            display: 'flex',
            alignItems: 'center',
          gap: 1,
        }}>
          <SearchIcon color="primary" />
          <TextField
            autoFocus
            fullWidth
            placeholder="Search dishes, cuisines, or tags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            sx={{ ml: 1 }}
          />
          <IconButton onClick={() => { setSearchQuery(''); setSearchActive(false); }}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        height: '220px',
        overflow: 'hidden'
      }}>
        {/* Cart Button overlayed on Hero */}
        <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 1201, display: 'flex', gap: 1 }}>
          <IconButton
            color="primary"
            sx={{ bgcolor: 'white', borderRadius: '50%', boxShadow: 2, mr: 1 }}
            onClick={() => setSearchActive(true)}
          >
            <SearchIcon sx={{ fontSize: 28 }} />
          </IconButton>
          <Badge badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)} color="error" showZero>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: '50%', minWidth: 0, width: 48, height: 48, boxShadow: 2, p: 0 }}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCartIcon sx={{ fontSize: 28 }} />
            </Button>
          </Badge>
        </Box>
      <Carousel
        autoPlay={false}
        indicators={true}
        navButtonsAlwaysInvisible={true}
        navButtonsAlwaysVisible={false}
        animation="fade"
            sx={{ 
          height: '100%',
          '& .MuiCarousel-indicators': {
            bottom: '10px',
            zIndex: 1203,
          },
          '& .MuiCarousel-indicator': {
            backgroundColor: 'white',
            opacity: 0.5,
            width: 12,
            height: 12,
            borderRadius: '50%',
            margin: '0 4px',
            '&.Mui-selected': {
              opacity: 1,
                backgroundColor: '#FF4B2B',
              }
          },
            }}
          >
        {heroSlides.map((slide, index) => (
          <Box 
            key={index}
            sx={{ 
                height: '220px',
                background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
              }}
              onError={handleImageError}
            >
              {/* Top Bar */}
              <Box sx={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
            display: 'flex',
                justifyContent: 'space-between',
            alignItems: 'center',
                p: 2,
                background: 'linear-gradient(rgba(0,0,0,0.5), transparent)'
              }}>
                <IconButton 
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(4px)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    }
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Box sx={{ display: 'flex', gap: 1 }}>
          </Box>
        </Box>

              {/* Restaurant Info */}
              <Box sx={{ 
                    position: 'absolute',
                bottom: 0,
                    left: 0,
                    right: 0,
                p: 2,
                pt: 4,
                pb: 4,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 'bold', 
                      mb: 0.5,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                      हॉटेल शिवमल
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      mb: 1.5, 
                      opacity: 0.9,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}>
                     गावरान चव
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5,
                      flexWrap: 'wrap'
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1
                      }}>
                        <Rating value={4.5} precision={0.5} readOnly sx={{ color: 'white', fontSize: '1rem' }} />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>4.5 (2.5k+)</Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                        alignItems: 'center',
                        gap: 1.5
                      }}>
                        <Typography variant="body2" sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}>
                          <AccessTimeIcon sx={{ fontSize: '1rem' }} />
                          30-35 min
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}>
                          <CurrencyExchangeIcon sx={{ fontSize: '1rem' }} />
                          Rs 400 for two
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Carousel>
      </Box>

      {/* Quick Info Bar */}
                    <Box sx={{ 
        bgcolor: 'white', 
        py: 1.5, 
        px: 2,
                      display: 'flex', 
                      justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5,
          flex: 1,
          overflow: 'hidden'
        }}>
          <LocationOnIcon color="primary" sx={{ fontSize: '1.2rem', flexShrink: 0 }} />
          <Typography variant="body2" sx={{ 
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            Kalamboli, Navi Mumbai
          </Typography>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5,
          flexShrink: 0,
          ml: 2
        }}>
          <PhoneIcon color="primary" sx={{ fontSize: '1.2rem' }} />
          <Typography variant="body2">+91 9152245184</Typography>
        </Box>
      </Box>

      {/* Quick Action Row */}
      <Box sx={{
        bgcolor: 'white',
        px: 1,
        pt: 2,
        pb: 0.5,
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
      }}>
        <Button
          variant="outlined"
                        sx={{
            height: '32px',
            borderRadius: 2,
            fontSize: '0.8rem',
                          fontWeight: 600,
            px: 2,
            minWidth: 0,
            textTransform: 'none',
            borderColor: '#2C7D89',
                          color: '#2C7D89',
            '&:hover': { borderColor: '#236570', bgcolor: 'rgba(44, 125, 137, 0.05)' }
          }}
          onClick={() => setOrderDialogOpen(true)}
          disabled={orderHistory.length === 0 && !currentOrder}
                      >
          Your Order
        </Button>
        <Button
          variant="outlined"
                        sx={{
            height: '32px',
            borderRadius: 2,
            fontSize: '0.8rem',
            fontWeight: 600,
            px: 2,
            minWidth: 0,
            textTransform: 'none',
            borderColor: '#2C7D89',
            color: '#2C7D89',
            '&:hover': { borderColor: '#236570', bgcolor: 'rgba(44, 125, 137, 0.05)' }
                        }}
                      >
          Help
        </Button>
        <Button
          variant="outlined"
                      sx={{
            height: '32px',
            borderRadius: 2,
            fontSize: '0.8rem',
            fontWeight: 600,
            px: 2,
            minWidth: 0,
            textTransform: 'none',
            borderColor: '#2C7D89',
            color: '#2C7D89',
            '&:hover': { borderColor: '#236570', bgcolor: 'rgba(44, 125, 137, 0.05)' }
          }}
          onClick={handleRequestBill}
          disabled={orderHistory.length === 0}
        >
          Request Bill
        </Button>
      </Box>

      {/* Category Tabs */}
      <Box sx={{ 
        bgcolor: 'white', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        borderBottom: '1px solid #e0e0e0',
        px: 1
      }}>
                    <Box sx={{ 
                      display: 'flex', 
          overflowX: 'auto', 
          py: 1.5, 
          gap: 0.5,
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
                    }}>
          {categories.map((category) => (
                        <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
                          sx={{
                bgcolor: selectedCategory === category ? '#2C7D89' : 'transparent',
                color: selectedCategory === category ? 'white' : 'text.primary',
                '&:hover': {
                  bgcolor: selectedCategory === category ? '#2C7D89' : 'rgba(44, 125, 137, 0.1)',
                },
                whiteSpace: 'nowrap',
                height: '32px',
                fontSize: '0.8rem',
                '& .MuiChip-label': {
                  px: 1
                }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>



      {/* Menu Items */}
      {searchQuery.trim() ? (
        <Box sx={{ px: 1, py: 1 }}>
          {filteredMenuItems.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', color: '#888', mt: 4 }}>
              No items found.
            </Typography>
          ) : (
            filteredMenuItems.map((item) => {
              // Determine dietary icon (Veg/Non-veg/Egg)
              let dietaryIcon: React.ReactNode = null;
              if (item.dietaryTags.some(tag => tag.toLowerCase().includes('vegetarian') || tag.toLowerCase().includes('vegan'))) {
                dietaryIcon = <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 0.5 }}>
                  <Box sx={{ width: 16, height: 16, border: '1.5px solid #43A047', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
                    <Box sx={{ width: 8, height: 8, bgcolor: '#43A047', borderRadius: '2px' }} />
                  </Box>
                </Box>;
              } else if (item.dietaryTags.some(tag => tag.toLowerCase().includes('egg'))) {
                dietaryIcon = <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 0.5 }}>
                  <Box sx={{ width: 16, height: 16, border: '1.5px solid #FBC02D', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
                    <Box sx={{ width: 8, height: 8, bgcolor: '#FBC02D', borderRadius: '2px' }} />
                  </Box>
                </Box>;
              } else {
                dietaryIcon = <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 0.5 }}>
                  <Box sx={{ width: 16, height: 16, border: '1.5px solid #D84315', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
                    <Box sx={{ width: 8, height: 8, bgcolor: '#D84315', borderRadius: '2px' }} />
                  </Box>
                </Box>;
              }
              return (
                <Card 
                  key={item.id}
                          sx={{
                    mb: 1,
                    boxShadow: 'none',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 72,
                    px: 1,
                    py: 0.5,
                    border: '1px solid #f0f0f0',
                    '&:hover': { boxShadow: 2 },
                    cursor: 'pointer'
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  {/* Image */}
                  <Box sx={{ width: 48, height: 48, mr: 1, borderRadius: 2, overflow: 'hidden', flexShrink: 0, bgcolor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
                    />
                    </Box>
                  {/* Name, icon, price */}
                  <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                      {dietaryIcon}
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </Typography>
                  </Box>
                    <Typography variant="body2" sx={{ color: '#222', fontWeight: 500, fontSize: '0.95rem', mt: 0.2 }}>
                      ₹{item.price}
                    </Typography>
                  </Box>
                  {/* Add button */}
                  <Button
                    variant="outlined"
                      sx={{
                      color: '#E23744',
                      borderColor: '#E23744',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      borderRadius: 2,
                      px: 2,
                      py: 0.5,
                      minWidth: 0,
                      ml: 1,
                      '&:hover': { borderColor: '#E23744', bgcolor: '#fff5f6' }
                    }}
                  >
                    ADD&nbsp;+
                  </Button>
                </Card>
              );
            })
          )}
                  </Box>
      ) : (
        <>
          {selectedCategory === "All"
            ? categories.filter(cat => cat !== "All" && cat !== "Featured").map(category => {
                const items = menuItems.filter(item => item.category === category);
                if (items.length === 0) return null;
                return (
                  <Box key={category} sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2C7D89', mb: 1, mt: 2, pl: 2 }}>{category}</Typography>
                    {items.map((item) => {
                      // Determine dietary icon (Veg/Non-veg/Egg)
                      let dietaryIcon: React.ReactNode = null;
                      if (item.dietaryTags.some(tag => tag.toLowerCase().includes('vegetarian') || tag.toLowerCase().includes('vegan'))) {
                        dietaryIcon = <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 0.5 }}>
                          <Box sx={{ width: 16, height: 16, border: '1.5px solid #43A047', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
                            <Box sx={{ width: 8, height: 8, bgcolor: '#43A047', borderRadius: '2px' }} />
                </Box>
                        </Box>;
                      } else if (item.dietaryTags.some(tag => tag.toLowerCase().includes('egg'))) {
                        dietaryIcon = <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 0.5 }}>
                          <Box sx={{ width: 16, height: 16, border: '1.5px solid #FBC02D', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
                            <Box sx={{ width: 8, height: 8, bgcolor: '#FBC02D', borderRadius: '2px' }} />
              </Box>
                        </Box>;
                      } else {
                        dietaryIcon = <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 0.5 }}>
                          <Box sx={{ width: 16, height: 16, border: '1.5px solid #D84315', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
                            <Box sx={{ width: 8, height: 8, bgcolor: '#D84315', borderRadius: '2px' }} />
                          </Box>
                        </Box>;
                      }

                      return (
                        <Card 
                key={item.id}
                sx={{
                          mb: 1,
                          boxShadow: 'none',
                          borderRadius: 2,
                  display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: 72,
                          px: 1,
                          py: 0.5,
                          border: '1px solid #f0f0f0',
                          '&:hover': { boxShadow: 2 },
                          cursor: 'pointer'
                }}
                onClick={() => handleItemClick(item)}
              >
                        {/* Image */}
                        <Box sx={{ width: 48, height: 48, mr: 1, borderRadius: 2, overflow: 'hidden', flexShrink: 0, bgcolor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
                  />
                </Box>
                        {/* Name, icon, price */}
                        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                            {dietaryIcon}
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: '#222', fontWeight: 500, fontSize: '0.95rem', mt: 0.2 }}>
                            ₹{item.price}
                          </Typography>
                        </Box>
                        {/* Add button */}
                        <Button
                          variant="outlined"
                        sx={{
                            color: '#E23744',
                            borderColor: '#E23744',
                          fontWeight: 700,
                            fontSize: '0.95rem',
                            borderRadius: 2,
                            px: 2,
                            py: 0.5,
                            minWidth: 0,
                            ml: 1,
                            '&:hover': { borderColor: '#E23744', bgcolor: '#fff5f6' }
                        }}
                      >
                          ADD&nbsp;+
                        </Button>
                      </Card>
                    );
                  })}
                    </Box>
              );
            }).filter(Boolean)
          : filteredMenuItems.map((item) => {
              // Determine dietary icon (Veg/Non-veg/Egg)
              let dietaryIcon: React.ReactNode = null;
              if (item.dietaryTags.some(tag => tag.toLowerCase().includes('vegetarian') || tag.toLowerCase().includes('vegan'))) {
                dietaryIcon = <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 0.5 }}>
                  <Box sx={{ width: 16, height: 16, border: '1.5px solid #43A047', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
                    <Box sx={{ width: 8, height: 8, bgcolor: '#43A047', borderRadius: '2px' }} />
                  </Box>
                </Box>;
              } else if (item.dietaryTags.some(tag => tag.toLowerCase().includes('egg'))) {
                dietaryIcon = <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 0.5 }}>
                  <Box sx={{ width: 16, height: 16, border: '1.5px solid #FBC02D', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
                    <Box sx={{ width: 8, height: 8, bgcolor: '#FBC02D', borderRadius: '2px' }} />
                  </Box>
                </Box>;
              } else {
                dietaryIcon = <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 0.5 }}>
                  <Box sx={{ width: 16, height: 16, border: '1.5px solid #D84315', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
                    <Box sx={{ width: 8, height: 8, bgcolor: '#D84315', borderRadius: '2px' }} />
                  </Box>
                </Box>;
              }

              return (
                <Card 
                  key={item.id}
                      sx={{
                    mb: 1,
                    boxShadow: 'none',
                    borderRadius: 2,
                      display: 'flex', 
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 72,
                    px: 1,
                    py: 0.5,
                    border: '1px solid #f0f0f0',
                    '&:hover': { boxShadow: 2 },
                    cursor: 'pointer'
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  {/* Image */}
                  <Box sx={{ width: 48, height: 48, mr: 1, borderRadius: 2, overflow: 'hidden', flexShrink: 0, bgcolor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
                        />
                    </Box>
                  {/* Name, icon, price */}
                  <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                      {dietaryIcon}
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </Typography>
                  </Box>
                    <Typography variant="body2" sx={{ color: '#222', fontWeight: 500, fontSize: '0.95rem', mt: 0.2 }}>
                      ₹{item.price}
                    </Typography>
                  </Box>
                  {/* Add button */}
                  <Button
                    variant="outlined"
                      sx={{
                      color: '#E23744',
                      borderColor: '#E23744',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      borderRadius: 2,
                      px: 2,
                      py: 0.5,
                      minWidth: 0,
                      ml: 1,
                      '&:hover': { borderColor: '#E23744', bgcolor: '#fff5f6' }
                      }}
                    >
                    ADD&nbsp;+
                  </Button>
                </Card>
              );
            })}
        </>
      )}

      {/* Item Details Dialog */}
      <Dialog
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        fullScreen
        PaperProps={{
          sx: {
            borderRadius: { xs: '24px 24px 0 0', md: 3 },
            bgcolor: 'transparent',
            boxShadow: 'none',
            p: 0,
            m: 0,
            overflow: 'visible',
            height: '100dvh',
            maxHeight: '100dvh',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            zIndex: 1300
          },
        }}
      >
        {selectedItem && (
          <Box sx={{
            width: '100%',
            height: '100dvh',
            maxHeight: '100dvh',
                display: 'flex',
            flexDirection: 'column',
                alignItems: 'center',
            justifyContent: 'flex-start',
            bgcolor: 'rgba(0,0,0,0.5)',
            position: 'relative',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
          }}>
            {/* Centered Close Button */}
              <IconButton
                onClick={() => setSelectedItem(null)}
              sx={{
                position: 'absolute',
                top: 32,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: '#222',
                color: 'white',
                zIndex: 10,
                width: 48,
                height: 48,
                boxShadow: 2,
                '&:hover': { bgcolor: '#333' },
              }}
              >
              <CloseIcon sx={{ fontSize: 32 }} />
              </IconButton>
            {/* Main Card */}
            <Box sx={{
              width: '100%',
              maxWidth: 420,
              mx: 'auto',
              mt: { xs: 8, md: 10 },
              mb: 0,
              bgcolor: 'white',
              borderRadius: '24px 24px 0 0',
              boxShadow: 3,
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              height: '100dvh',
              maxHeight: '100dvh',
              minHeight: 0,
            }}>
              {/* Food Image */}
              <Box sx={{ width: '100%', aspectRatio: '1.7', bgcolor: '#f5f5f5', position: 'relative', flexShrink: 0 }}>
                      <CardMedia
                        component="img"
                        image={selectedItem.image}
                        alt={selectedItem.name}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px 24px 0 0' }}
                />
                            </Box>
              {/* Dine In / Take Away Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                <Button
                  variant={dineType === 'Dine In' ? 'contained' : 'outlined'}
                  color={dineType === 'Dine In' ? 'primary' : 'inherit'}
                  onClick={() => setDineType('Dine In')}
                  sx={{ fontWeight: 700, borderRadius: 2, minWidth: 120 }}
                >
                  Dine In
                </Button>
                <Button
                  variant={dineType === 'Take Away' ? 'contained' : 'outlined'}
                  color={dineType === 'Take Away' ? 'primary' : 'inherit'}
                  onClick={() => setDineType('Take Away')}
                  sx={{ fontWeight: 700, borderRadius: 2, minWidth: 120 }}
                >
                  Take Away
                </Button>
                            </Box>
              {/* Scrollable Content: All dialog sections except image and bottom bar */}
              <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
                <Box sx={{ px: 2, pt: 2, pb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {/* Dietary Icon */}
                    {(() => {
                      let iconColor = '#D84315';
                      if (selectedItem.dietaryTags.some(tag => tag.toLowerCase().includes('vegetarian') || tag.toLowerCase().includes('vegan'))) iconColor = '#43A047';
                      if (selectedItem.dietaryTags.some(tag => tag.toLowerCase().includes('egg'))) iconColor = '#FBC02D';
                      return (
                        <Box sx={{ width: 20, height: 20, border: `2px solid ${iconColor}`, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff', mr: 1 }}>
                          <Box sx={{ width: 10, height: 10, bgcolor: iconColor, borderRadius: '2.5px' }} />
                            </Box>
                      );
                    })()}
                    <Typography variant="h6" sx={{ fontWeight: 700, flex: 1, fontSize: '1.15rem', lineHeight: 1.2, mr: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedItem.name}</Typography>
                    <IconButton size="small" sx={{ color: isBookmarked ? '#E23744' : '#888', mr: 0.5 }} onClick={() => setIsBookmarked(b => !b)}>
                      <BookmarkBorderIcon />
                    </IconButton>
                            </Box>
                  {/* Highly reordered badge */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Box sx={{ width: 60, height: 8, bgcolor: '#43A047', borderRadius: 2, mr: 1 }} />
                    <Typography variant="caption" sx={{ color: '#43A047', fontWeight: 600 }}>Highly reordered</Typography>
                      </Box>
                  {/* Description in parentheses */}
                  <Typography variant="body2" sx={{ color: '#222', fontSize: '0.95rem', mb: 1 }}>
                    ({selectedItem.description})
                      </Typography>
                  {/* Nutrition Info: show immediately below description */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    {selectedItem.calories !== undefined && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#fff8e1', px: 1, py: 0.5, borderRadius: 2 }}>
                        <LocalFireDepartmentIcon sx={{ color: '#FF9800', fontSize: '1.1rem' }} />
                        <Typography variant="caption" sx={{ color: '#FF9800', fontWeight: 600 }}>{selectedItem.calories} cal</Typography>
                      </Box>
                    )}
                    {selectedItem.nutritionalInfo?.proteins !== undefined && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#e3f2fd', px: 1, py: 0.5, borderRadius: 2 }}>
                        <FitnessCenterIcon sx={{ color: '#1976D2', fontSize: '1.1rem' }} />
                        <Typography variant="caption" sx={{ color: '#1976D2', fontWeight: 600 }}>{selectedItem.nutritionalInfo.proteins}g protein</Typography>
                      </Box>
                    )}
                    {selectedItem.nutritionalInfo?.fats !== undefined && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#fff3e0', px: 1, py: 0.5, borderRadius: 2 }}>
                        <SpaIcon sx={{ color: '#FF7043', fontSize: '1.1rem' }} />
                        <Typography variant="caption" sx={{ color: '#FF7043', fontWeight: 600 }}>{selectedItem.nutritionalInfo.fats}g fat</Typography>
                      </Box>
                    )}
                    {selectedItem.nutritionalInfo?.sugar !== undefined && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#f3e5f5', px: 1, py: 0.5, borderRadius: 2 }}>
                        <IcecreamIcon sx={{ color: '#AB47BC', fontSize: '1.1rem' }} />
                        <Typography variant="caption" sx={{ color: '#AB47BC', fontWeight: 600 }}>{selectedItem.nutritionalInfo.sugar}g sugar</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Size Selection for Handi Specials and Tandoori */}
                {(selectedItem.category === "Handi Specials" || selectedItem.name === "Tandoori") && (
                <Box sx={{ px: 2, pt: 1, pb: 2, bgcolor: '#fafbfc', borderRadius: 3, mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Size</Typography>
                  <Typography variant="caption" sx={{ color: '#888', mb: 1, display: 'block' }}>Required • Select any 1 option</Typography>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Radio checked={selectedSize === 'Half'} onChange={() => setSelectedSize('Half')} sx={{ color: '#E23744', p: 0.5, mr: 1 }} />
                      <Typography variant="body2" sx={{ flex: 1 }}>Half</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{selectedItem.price}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Radio checked={selectedSize === 'Full'} onChange={() => setSelectedSize('Full')} sx={{ color: '#E23744', p: 0.5, mr: 1 }} />
                      <Typography variant="body2" sx={{ flex: 1 }}>Full</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{selectedItem.name === "Butter Chicken Handi" ? 600 : selectedItem.name === "Chicken Handi" ? 650 : selectedItem.name === "Aalani Handi (Chicken)" ? 650 : selectedItem.name === "Butter Mutton Handi" ? 949 : selectedItem.name === "Mutton Handi" ? 900 : selectedItem.name === "Aalani Handi (Mutton)" ? 900 : selectedItem.name === "Tandoori" ? 600 : selectedItem.price}</Typography>
                    </Box>
                  </Box>
                </Box>
                )}

                {/* Cooking Request */}
                <Box sx={{ px: 2, pt: 1, pb: 2, bgcolor: '#fafbfc', borderRadius: 3, mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Add a cooking request (optional)</Typography>
                  <TextField
                    fullWidth
                    placeholder="e.g. Don't make it too spicy"
                    value={customInstructions}
                    onChange={e => setCustomInstructions(e.target.value)}
                    inputProps={{ maxLength: 100 }}
                    sx={{ mb: 1, mt: 0.5, bgcolor: 'white', borderRadius: 2 }}
                    size="small"
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                    <Typography variant="caption" sx={{ color: '#888' }}>{customInstructions.length}/100</Typography>
                  </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {['Less Spicy', 'Non spicy', 'Mild spicy', 'Extra Masala'].map((chip) => (
                          <Chip
                        key={chip}
                        label={chip}
                        size="small"
                        onClick={() => setCustomInstructions(chip)}
                        sx={{ bgcolor: '#f5f5f5', color: '#222', borderRadius: 2, fontWeight: 500 }}
                          />
                        ))}
                      </Box>
                  {/* Add-ons */}
                  {selectedItem.addOns && selectedItem.addOns.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Add-ons</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {selectedItem.addOns.map((addOn) => (
                          <Box key={addOn.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fff', borderRadius: 2, px: 1.5, py: 1, border: '1px solid #eee' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <input
                                type="checkbox"
                                checked={selectedAddOns.includes(addOn.name)}
                                onChange={() => {
                                  setSelectedAddOns(selectedAddOns.includes(addOn.name)
                                    ? selectedAddOns.filter(n => n !== addOn.name)
                                    : [...selectedAddOns, addOn.name]);
                                }}
                                style={{ accentColor: '#E23744', width: 18, height: 18 }}
                              />
                              <Typography variant="body2">{addOn.name}</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#E23744' }}>+₹{addOn.price}</Typography>
                          </Box>
                        ))}
                  </Box>
                </Box>
              )}
                  {/* Quantity & Add to Cart section (inside scrollable content) */}
                  <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    px: 2,
                    py: 2,
                    mt: 2,
                    bgcolor: '#fafbfc',
                    borderRadius: 3,
                    boxShadow: 1
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1.5px solid #E23744', borderRadius: 2, px: 1, py: 0.5 }}>
                      <IconButton size="small" sx={{ color: '#E23744', p: 0.5 }} onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity === 1}>-</IconButton>
                      <Typography variant="subtitle2" sx={{ mx: 1, fontWeight: 700 }}>{quantity}</Typography>
                      <IconButton size="small" sx={{ color: '#E23744', p: 0.5 }} onClick={() => setQuantity(q => q + 1)}>+</IconButton>
                    </Box>
                    <Button
                      variant="contained"
                        sx={{ 
                        bgcolor: '#E23744',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1rem',
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        boxShadow: 'none',
                        textTransform: 'none',
                        minWidth: 120,
                        '&:hover': { bgcolor: '#c62828' }
                      }}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                  {/* Spacer to ensure last content is visible above bottom bar */}
                  <Box sx={{ height: 90 }} />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>

      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <span>Your Cart</span>
          <IconButton onClick={() => setCartOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2 }}>
          {cart.length === 0 ? (
            <Typography variant="body2">Your cart is empty.</Typography>
          ) : (
            cart.map((item, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CardMedia component="img" image={item.image} alt={item.name} sx={{ width: 40, height: 40, borderRadius: 1, mr: 1 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2">{item.name} ({item.size})</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <IconButton size="small" sx={{ color: '#E23744', p: 0.5 }} onClick={() => handleCartQtyChange(idx, -1)}>
                      -
                    </IconButton>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.quantity}</Typography>
                    <IconButton size="small" sx={{ color: '#E23744', p: 0.5 }} onClick={() => handleCartQtyChange(idx, 1)}>
                      +
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 48, textAlign: 'right' }}>₹{item.price * item.quantity}</Typography>
                <IconButton size="small" sx={{ color: '#888', ml: 1 }} onClick={() => handleCartDelete(idx)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          )}
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', p: 2, gap: 1 }}>
          {cart.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                        </Typography>
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={cart.length === 0}
            sx={{ fontWeight: 700, fontSize: '1.1rem', py: 1.2, borderRadius: 2 }}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <span>Your Orders</span>
          <IconButton onClick={() => setOrderDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2 }}>
          {orderHistory.length === 0 ? (
            <Typography variant="body2">No active orders.</Typography>
          ) : (
            <>
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#2C7D89', fontWeight: 700 }}>Your Orders</Typography>
              {orderHistory.map((order: any, idx: number) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  {order.items.map((item: any, itemIdx: number) => (
                    <Box key={itemIdx} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: 1, overflow: 'hidden', mr: 1, bgcolor: '#fff' }}>
                        <img 
                          src={item.image} 
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/40x40?text=No+Image';
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2">{item.name} ({item.size})</Typography>
                        <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                        <Typography variant="caption" sx={{ color: '#2C7D89', fontWeight: 600 }}>Preparing</Typography>
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#E23744' }}>
                        ₹{item.price * item.quantity}
                        </Typography>
                    </Box>
                  ))}
                </Box>
              ))}
              <Box sx={{ 
                          display: 'flex',
                justifyContent: 'space-between', 
                          alignItems: 'center',
                mt: 2, 
                pt: 2, 
                borderTop: '1px solid #eee' 
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total Amount</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#E23744' }}>
                  ₹{orderHistory.reduce((total: number, order: any) => 
                    total + order.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0), 0)}
                        </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={billDialogOpen} onClose={() => setBillDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <span>Request Bill</span>
          <IconButton onClick={() => setBillDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2 }}>
          {orderHistory.length === 0 ? (
            <Typography variant="body2">No items ordered yet.</Typography>
          ) : (
            <>
              {orderHistory.map((item: any, idx: number) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CardMedia component="img" image={item.image} alt={item.name} sx={{ width: 40, height: 40, borderRadius: 1, mr: 1 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">{item.name} ({item.size})</Typography>
                    <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 48, textAlign: 'right' }}>₹{item.price * item.quantity}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total Amount</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  ₹{orderHistory.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                </Typography>
              </Box>
            </>
              )}
            </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', p: 2, gap: 1 }}>
              <Button
                variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={orderHistory.length === 0}
            sx={{ fontWeight: 700, fontSize: '1.1rem', py: 1.2, borderRadius: 2 }}
            onClick={() => {
              alert('Bill requested! A waiter will bring your bill shortly.');
              setBillDialogOpen(false);
                }}
              >
            Request Bill
              </Button>
            </DialogActions>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog 
        open={showFeedbackDialog} 
        onClose={() => setShowFeedbackDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          Thank You!
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h6" gutterBottom>
              Your bill will be brought to your table shortly.
                    </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We hope you enjoyed your dining experience!
                    </Typography>
            
            <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, textAlign: 'left' }}>
              Optional Feedback (if you'd like to share)
            </Typography>
            
            <TextField
              fullWidth
              label="Name"
              value={feedbackData.name}
              onChange={handleFeedbackChange('name')}
              margin="normal"
              size="small"
            />
            
            <TextField
              fullWidth
              label="Phone Number"
              value={feedbackData.phone}
              onChange={handleFeedbackChange('phone')}
              margin="normal"
              size="small"
              type="tel"
            />
            
            <TextField
              fullWidth
              label="Email Address"
              value={feedbackData.email}
              onChange={handleFeedbackChange('email')}
              margin="normal"
              size="small"
              type="email"
            />
            
            <TextField
              fullWidth
              label="Your Feedback"
              value={feedbackData.message}
              onChange={handleFeedbackChange('message')}
              margin="normal"
              multiline
              rows={3}
              size="small"
            />

              <Button
                variant="contained"
              color="primary"
              fullWidth
              onClick={handleFeedbackSubmit}
              sx={{ mt: 3 }}
            >
              Done
              </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MenuView; 