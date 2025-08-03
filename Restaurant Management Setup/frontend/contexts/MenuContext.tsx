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
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80",
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
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

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