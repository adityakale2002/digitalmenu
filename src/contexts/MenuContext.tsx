import React, { createContext, useContext, useState } from 'react';

interface NutritionalInfo {
  proteins: number;
  fats: number;
  sugar: number;
}

export interface MenuItem {
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

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: number) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Initial menu items
const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Hotel Shivmal Special Chicken Thali",
    description: "Includes: Malvani Chicken, Aagri Chicken, Tambda (Red) & Pandhra (White) Rassa, Solkadhi, Egg Curry, Mince (Kheema), Coriander, Rice Plate",
    price: 320,
    calories: 1200,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Maharashtrian", "Spicy"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Thali Specials"
  },
  {
    id: 2,
    name: "Hotel Shivmal Special Mutton Thali",
    description: "Includes: Malvani Mutton, Aagri Mutton, Tambda & Pandhra Rassa, Solkadhi, Egg Curry, Wadyachi Bhaji (gram flour pakora veggie), Coriander, Rice Plate",
    price: 420,
    calories: 1400,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Maharashtrian", "Spicy"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Thali Specials"
  },
  {
    id: 3,
    name: "Simple Chicken Thali",
    description: "Includes: Chicken Gravy, Tambda & Pandhra Rassa, Solkadhi, Egg Curry, Rice Plate",
    price: 250,
    calories: 950,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Maharashtrian"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Thali Specials"
  },
  {
    id: 4,
    name: "Simple Mutton Thali",
    description: "Includes: Mutton Gravy, Tambda & Pandhra Rassa, Solkadhi, Egg Curry, Rice Plate",
    price: 350,
    calories: 1100,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Maharashtrian"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Thali Specials"
  },
  {
    id: 5,
    name: "Special Chicken Thali",
    description: "Includes: Tufani Kala-Pandhra Chicken, Aagri Rassa, Tambda & Pandhra Rassa, Solkadhi, Mince, Coriander, Rice Plate",
    price: 350,
    calories: 1250,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Maharashtrian", "Spicy"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Thali Specials"
  },
  {
    id: 6,
    name: "Special Mutton Thali",
    description: "Includes: Tufani Kala-Pandhra Mutton, Aagri Rassa, Tambda & Pandhra Rassa, Solkadhi, Wadyachi Bhaji, Coriander, Rice Plate",
    price: 450,
    calories: 1450,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Maharashtrian", "Spicy"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Thali Specials"
  },
  {
    id: 7,
    name: "Malvani Chicken Thali",
    description: "Includes: Malvani Chicken, Tambda & Pandhra Rassa, Solkadhi, Egg Curry, Mince, Rice Plate",
    price: 330,
    calories: 1150,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Malvani", "Spicy"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Thali Specials"
  },
  {
    id: 8,
    name: "Malvani Mutton Thali",
    description: "Includes: Malvani Mutton, Tambda & Pandhra Rassa, Solkadhi, Egg Curry, Wadyachi Bhaji, Rice Plate",
    price: 430,
    calories: 1350,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Malvani", "Spicy"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Thali Specials"
  },
  {
    id: 9,
    name: "Kolhapuri Chicken Thali",
    description: "Includes: Kolhapuri Chicken, Tambda & Pandhra Rassa, Solkadhi, Egg Curry, Mince, Rice Plate",
    price: 350,
    calories: 1200,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Kolhapuri", "Very Spicy"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Regional Specials"
  },
  {
    id: 10,
    name: "Kolhapuri Mutton Thali",
    description: "Includes: Kolhapuri Mutton, Tambda & Pandhra Rassa, Solkadhi, Egg Curry, Wadyachi Bhaji, Rice Plate",
    price: 450,
    calories: 1400,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Kolhapuri", "Very Spicy"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Regional Specials"
  },
  {
    id: 11,
    name: "Kharda Chicken Thali",
    description: "Includes: Kharda Chicken (green chili & garlic), Tambda & Pandhra Rassa, Solkadhi, Egg Curry, Mince, Rice Plate",
    price: 320,
    calories: 1100,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Kharda", "Spicy"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Regional Specials"
  },
  {
    id: 12,
    name: "Kharda Mutton Thali",
    description: "Includes: Kharda Mutton, Tambda & Pandhra Rassa, Solkadhi, Egg Curry, Wadyachi Bhaji, Rice Plate",
    price: 390,
    calories: 1300,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Kharda", "Spicy"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Regional Specials"
  },
  {
    id: 13,
    name: "Egg Thali",
    description: "Includes: Egg Masala, Tambda & Pandhra Rassa, Solkadhi, Egg Curry, Rice Plate",
    price: 150,
    calories: 800,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Egg", "Budget-Friendly"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Egg & Crab Specials"
  },
  {
    id: 14,
    name: "Crab Thali",
    description: "Includes: Tambda & Pandhra Rassa, Solkadhi, Crab Curry, Crab Fry, Rice Plate",
    price: 300,
    calories: 1000,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Seafood", "Crab"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Egg & Crab Specials"
  },
  {
    id: 15,
    name: "Surmai Fish Thali",
    description: "Surmai fish, red & white curry, solkadhi, dry coconut masala, rice plate",
    price: 450,
    calories: 1100,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Seafood", "Fish"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Fish Thali"
  },
  {
    id: 16,
    name: "Bangda Fish Thali",
    description: "Bangda fish, red & white curry, solkadhi, dry coconut masala, rice plate",
    price: 300,
    calories: 950,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Seafood", "Fish"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Fish Thali"
  },
  {
    id: 17,
    name: "Paplet Fish Thali",
    description: "Paplet fish, red & white curry, solkadhi, dry coconut masala, rice plate",
    price: 500,
    calories: 1200,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Non-Vegetarian", "Seafood", "Fish"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Fish Thali"
  },
  {
    id: 18,
    name: "Chicken Masala",
    description: "Spicy chicken masala cooked with aromatic spices and herbs",
    price: 250,
    calories: 450,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "250g",
    dietaryTags: ["Non-Vegetarian", "Chicken"],
    addOns: [],
    category: "Chicken Plates"
  },
  {
    id: 19,
    name: "Chicken Fry",
    description: "Crispy fried chicken with special spices and marinade",
    price: 260,
    calories: 480,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "250g",
    dietaryTags: ["Non-Vegetarian", "Chicken"],
    addOns: [],
    category: "Chicken Plates"
  },
  {
    id: 20,
    name: "Mutton Masala",
    description: "Tender mutton cooked in rich masala gravy with aromatic spices",
    price: 350,
    calories: 550,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "250g",
    dietaryTags: ["Non-Vegetarian", "Mutton"],
    addOns: [],
    category: "Mutton Plates"
  },
  {
    id: 21,
    name: "Mutton Fry",
    description: "Spicy fried mutton with special blend of spices",
    price: 360,
    calories: 580,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "250g",
    dietaryTags: ["Non-Vegetarian", "Mutton"],
    addOns: [],
    category: "Mutton Plates"
  },
  {
    id: 22,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken and special biryani spices",
    price: 160,
    calories: 650,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Plate",
    dietaryTags: ["Non-Vegetarian", "Biryani"],
    addOns: [],
    category: "Biryani"
  },
  {
    id: 23,
    name: "Chicken Dum Biryani",
    description: "Slow-cooked chicken biryani with dum technique for enhanced flavors",
    price: 160,
    calories: 700,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Plate",
    dietaryTags: ["Non-Vegetarian", "Biryani", "Dum"],
    addOns: [],
    category: "Biryani"
  },
  {
    id: 24,
    name: "Mutton Biryani",
    description: "Fragrant basmati rice cooked with tender mutton and aromatic spices",
    price: 260,
    calories: 750,
    preparationTime: "30-35 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Plate",
    dietaryTags: ["Non-Vegetarian", "Biryani"],
    addOns: [],
    category: "Biryani"
  },
  {
    id: 25,
    name: "Mutton Dum Biryani",
    description: "Slow-cooked mutton biryani with dum technique for rich flavors",
    price: 300,
    calories: 800,
    preparationTime: "35-40 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Plate",
    dietaryTags: ["Non-Vegetarian", "Biryani", "Dum"],
    addOns: [],
    category: "Biryani"
  },
  {
    id: 26,
    name: "Hotel Shivmal Special Veg Thali",
    description: "Masoor bhaji, Paneer masala, Shev bhaji, Dal, Rice plate",
    price: 260,
    calories: 850,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Thali",
    dietaryTags: ["Vegetarian", "Maharashtrian"],
    addOns: [
      { name: "Jowar Bhakri", price: 30 },
      { name: "Bajra Bhakri", price: 30 },
      { name: "Chapati", price: 20 },
    ],
    category: "Veg Thali"
  },
  {
    id: 27,
    name: "Paneer Masala",
    description: "Cottage cheese cubes cooked in rich tomato-based gravy with aromatic spices",
    price: 250,
    calories: 400,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Vegetarian", "Paneer"],
    addOns: [],
    category: "Special Veg Dishes"
  },
  {
    id: 28,
    name: "Paneer Tikka",
    description: "Marinated paneer cubes grilled to perfection with spices",
    price: 280,
    calories: 450,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Vegetarian", "Paneer", "Grilled"],
    addOns: [],
    category: "Special Veg Dishes"
  },
  {
    id: 29,
    name: "Cashew Masala",
    description: "Cashews cooked in rich masala gravy with aromatic spices",
    price: 280,
    calories: 500,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Vegetarian", "Cashew"],
    addOns: [],
    category: "Special Veg Dishes"
  },
  {
    id: 30,
    name: "Cashew Curry",
    description: "Cashews in mild curry with traditional spices",
    price: 260,
    calories: 450,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Vegetarian", "Cashew"],
    addOns: [],
    category: "Special Veg Dishes"
  },
  {
    id: 31,
    name: "Masoor Bhaji",
    description: "Red lentils cooked with spices and herbs",
    price: 160,
    calories: 300,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Vegetarian", "Dal"],
    addOns: [],
    category: "Special Veg Dishes"
  },
  {
    id: 32,
    name: "Shev Bhaji",
    description: "Gram flour noodles cooked in spicy gravy",
    price: 140,
    calories: 350,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Vegetarian", "Maharashtrian"],
    addOns: [],
    category: "Special Veg Dishes"
  },
  {
    id: 33,
    name: "Zunka",
    description: "Traditional Maharashtrian dish made with gram flour and spices",
    price: 100,
    calories: 250,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "150g",
    dietaryTags: ["Vegetarian", "Maharashtrian"],
    addOns: [],
    category: "Special Veg Dishes"
  },
  {
    id: 34,
    name: "Dal Tadka",
    description: "Yellow lentils tempered with spices and herbs",
    price: 120,
    calories: 280,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Vegetarian", "Dal"],
    addOns: [],
    category: "Special Veg Dishes"
  },
  {
    id: 35,
    name: "Veg Biryani",
    description: "Aromatic basmati rice cooked with fresh vegetables and biryani spices",
    price: 120,
    calories: 500,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Plate",
    dietaryTags: ["Vegetarian", "Biryani"],
    addOns: [
      { name: "Full Plate", price: 60 },
      { name: "Raita", price: 20 },
    ],
    category: "Biryani"
  },
  {
    id: 36,
    name: "Veg Pulao",
    description: "Fragrant rice cooked with vegetables and mild spices",
    price: 160,
    calories: 450,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Full Plate",
    dietaryTags: ["Vegetarian", "Rice"],
    addOns: [],
    category: "Special Veg Dishes"
  },
  {
    id: 37,
    name: "Paneer Chilli",
    description: "Crispy paneer cubes tossed with green chilies and spices",
    price: 250,
    calories: 400,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Vegetarian", "Paneer", "Starter"],
    addOns: [],
    category: "Veg Starters"
  },
  {
    id: 38,
    name: "Paneer Crispy",
    description: "Crispy fried paneer with special coating and spices",
    price: 260,
    calories: 450,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Vegetarian", "Paneer", "Starter"],
    addOns: [],
    category: "Veg Starters"
  },
  {
    id: 39,
    name: "Veg Manchurian",
    description: "Vegetable dumplings in spicy Chinese-style gravy",
    price: 210,
    calories: 350,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Vegetarian", "Indo-Chinese", "Starter"],
    addOns: [],
    category: "Veg Starters"
  },
  {
    id: 40,
    name: "Masala Papad",
    description: "Spiced papad with masala toppings",
    price: 50,
    calories: 80,
    preparationTime: "5 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian", "Starter"],
    addOns: [],
    category: "Veg Starters"
  },
  {
    id: 41,
    name: "Roasted Papad",
    description: "Traditional roasted papad",
    price: 30,
    calories: 60,
    preparationTime: "5 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian", "Starter"],
    addOns: [],
    category: "Veg Starters"
  },
  {
    id: 42,
    name: "Jowar Bhakri",
    description: "Traditional sorghum flatbread",
    price: 30,
    calories: 120,
    preparationTime: "10 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    addOns: [],
    category: "Breads, Rice & Sides"
  },
  {
    id: 43,
    name: "Bajra Bhakri",
    description: "Traditional pearl millet flatbread",
    price: 30,
    calories: 120,
    preparationTime: "10 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    addOns: [],
    category: "Breads, Rice & Sides"
  },
  {
    id: 44,
    name: "Butter Roti",
    description: "Soft wheat flatbread with butter",
    price: 30,
    calories: 150,
    preparationTime: "10 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Roti", price: 15 },
    ],
    category: "Breads, Rice & Sides"
  },
  {
    id: 45,
    name: "Tandoori Roti",
    description: "Whole wheat flatbread cooked in tandoor",
    price: 20,
    calories: 120,
    preparationTime: "10 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Roti", price: 10 },
    ],
    category: "Breads, Rice & Sides"
  },
  {
    id: 46,
    name: "Chapati",
    description: "Traditional whole wheat flatbread",
    price: 20,
    calories: 100,
    preparationTime: "10 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Chapati", price: 10 },
    ],
    category: "Breads, Rice & Sides"
  },
  {
    id: 47,
    name: "Butter Naan",
    description: "Leavened flatbread with butter",
    price: 50,
    calories: 200,
    preparationTime: "10 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "2 pieces",
    dietaryTags: ["Vegetarian"],
    addOns: [
      { name: "Extra Naan", price: 25 },
    ],
    category: "Breads, Rice & Sides"
  },
  {
    id: 48,
    name: "Jeera Rice",
    description: "Basmati rice flavored with cumin seeds",
    price: 60,
    calories: 250,
    preparationTime: "15 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Plate",
    dietaryTags: ["Vegetarian", "Rice"],
    addOns: [
      { name: "Full Plate", price: 60 },
    ],
    category: "Breads, Rice & Sides"
  },
  {
    id: 49,
    name: "Solkadhi",
    description: "Traditional Maharashtrian drink made with coconut milk and kokum",
    price: 50,
    calories: 120,
    preparationTime: "5 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200ml",
    dietaryTags: ["Vegetarian", "Maharashtrian", "Drink"],
    addOns: [
      { name: "Extra Solkadhi", price: 25 },
    ],
    category: "Breads, Rice & Sides"
  },
  {
    id: 50,
    name: "Plain Rice",
    description: "Steamed basmati rice",
    price: 60,
    calories: 200,
    preparationTime: "15 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Plate",
    dietaryTags: ["Vegetarian", "Rice"],
    addOns: [
      { name: "Full Plate", price: 60 },
    ],
    category: "Breads, Rice & Sides"
  },
  {
    id: 51,
    name: "Water Bottle",
    description: "500ml packaged drinking water",
    price: 20,
    calories: 0,
    preparationTime: "0 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "500ml",
    dietaryTags: ["Beverage"],
    addOns: [],
    category: "Breads, Rice & Sides"
  },
  {
    id: 52,
    name: "Butter Chicken Handi",
    description: "Creamy tomato-based butter chicken cooked in a clay pot",
    price: 370,
    calories: 650,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Portion",
    dietaryTags: ["Non-Vegetarian", "Handi", "Butter"],
    addOns: [],
    category: "Handi Specials"
  },
  {
    id: 53,
    name: "Chicken Handi",
    description: "Spicy traditional chicken curry cooked in a clay pot",
    price: 350,
    calories: 600,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Portion",
    dietaryTags: ["Non-Vegetarian", "Handi", "Spicy"],
    addOns: [],
    category: "Handi Specials"
  },
  {
    id: 54,
    name: "Aalani Handi (Chicken)",
    description: "Thin, soupy chicken curry typically made with spices and herbs",
    price: 350,
    calories: 550,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Portion",
    dietaryTags: ["Non-Vegetarian", "Handi", "Soupy"],
    addOns: [],
    category: "Handi Specials"
  },
  {
    id: 55,
    name: "Butter Mutton Handi",
    description: "Rich and buttery mutton curry in clay pot",
    price: 550,
    calories: 800,
    preparationTime: "35-40 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Portion",
    dietaryTags: ["Non-Vegetarian", "Handi", "Butter"],
    addOns: [],
    category: "Handi Specials"
  },
  {
    id: 56,
    name: "Mutton Handi",
    description: "Traditional spicy mutton curry cooked in a handi",
    price: 550,
    calories: 750,
    preparationTime: "35-40 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Portion",
    dietaryTags: ["Non-Vegetarian", "Handi", "Spicy"],
    addOns: [],
    category: "Handi Specials"
  },
  {
    id: 57,
    name: "Aalani Handi (Mutton)",
    description: "Light, soupy mutton curry with aromatic spices",
    price: 550,
    calories: 700,
    preparationTime: "35-40 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Portion",
    dietaryTags: ["Non-Vegetarian", "Handi", "Soupy"],
    addOns: [],
    category: "Handi Specials"
  },
  {
    id: 58,
    name: "Surmai Fry (Tawa Fry)",
    description: "Kingfish shallow-fried with spices",
    price: 350,
    calories: 450,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "250g",
    dietaryTags: ["Non-Vegetarian", "Seafood", "Fish", "Fry"],
    addOns: [
      { name: "Extra Rice", price: 20 },
      { name: "Roti", price: 15 },
    ],
    category: "Fish Fry Specials"
  },
  {
    id: 59,
    name: "Pomfret Fry",
    description: "Whole pomfret fish fried with masala",
    price: 300,
    calories: 400,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "250g",
    dietaryTags: ["Non-Vegetarian", "Seafood", "Fish", "Fry"],
    addOns: [
      { name: "Extra Rice", price: 20 },
      { name: "Roti", price: 15 },
    ],
    category: "Fish Fry Specials"
  },
  {
    id: 60,
    name: "Prawns Fry",
    description: "Marinated prawns shallow-fried",
    price: 350,
    calories: 380,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Non-Vegetarian", "Seafood", "Prawns", "Fry"],
    addOns: [
      { name: "Extra Rice", price: 20 },
      { name: "Roti", price: 15 },
    ],
    category: "Fish Fry Specials"
  },
  {
    id: 61,
    name: "Bangda Fry (Mackerel Fry)",
    description: "Traditional mackerel fry",
    price: 200,
    calories: 350,
    preparationTime: "15-20 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "200g",
    dietaryTags: ["Non-Vegetarian", "Seafood", "Fish", "Fry"],
    addOns: [
      { name: "Extra Rice", price: 20 },
      { name: "Roti", price: 15 },
    ],
    category: "Fish Fry Specials"
  },
  {
    id: 62,
    name: "Crab Fry",
    description: "Spiced crab pan-fried",
    price: 350,
    calories: 420,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    servingSize: "250g",
    dietaryTags: ["Non-Vegetarian", "Seafood", "Crab", "Fry"],
    addOns: [
      { name: "Extra Rice", price: 20 },
      { name: "Roti", price: 15 },
    ],
    category: "Fish Fry Specials"
  },
  {
    id: 63,
    name: "Tandoori",
    description: "Classic tandoori grilled chicken",
    price: 300,
    calories: 450,
    preparationTime: "25-30 min",
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80",
    servingSize: "Half Portion",
    dietaryTags: ["Non-Vegetarian", "Tandoori", "Grilled"],
    addOns: [],
    category: "Non-Veg Starters"
  },
  {
    id: 64,
    name: "Chicken Crispy",
    description: "Crispy fried chicken with spices",
    price: 280,
    calories: 480,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=800&q=80",
    servingSize: "250g",
    dietaryTags: ["Non-Vegetarian", "Chicken", "Crispy"],
    addOns: [],
    category: "Non-Veg Starters"
  },
  {
    id: 65,
    name: "Chicken Chilli",
    description: "Spicy Indo-Chinese style chicken with chillies",
    price: 260,
    calories: 420,
    preparationTime: "20-25 min",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    servingSize: "250g",
    dietaryTags: ["Non-Vegetarian", "Chicken", "Indo-Chinese", "Spicy"],
    addOns: [],
    category: "Non-Veg Starters"
  },
  {
    id: 66,
    name: "Egg Bhurji",
    description: "Indian-style scrambled eggs with spices",
    price: 60,
    calories: 200,
    preparationTime: "10-15 min",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80",
    servingSize: "150g",
    dietaryTags: ["Non-Vegetarian", "Egg"],
    addOns: [],
    category: "Non-Veg Starters"
  },
  {
    id: 67,
    name: "Boiled Egg",
    description: "Simple hard-boiled egg",
    price: 30,
    calories: 80,
    preparationTime: "10 min",
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80",
    servingSize: "1 piece",
    dietaryTags: ["Non-Vegetarian", "Egg"],
    addOns: [],
    category: "Non-Veg Starters"
  }
];

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('MenuProvider: Initializing with', initialMenuItems.length, 'items');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  console.log('MenuProvider: Current menuItems state:', menuItems.length, 'items');

  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [...prev, {
      ...item,
      id: Math.max(...prev.map(item => item.id)) + 1
    }]);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems(prev =>
      prev.map(menuItem =>
        menuItem.id === item.id ? item : menuItem
      )
    );
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, updateMenuItem, deleteMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
}; 