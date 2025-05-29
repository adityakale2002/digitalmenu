export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  region: string;
  servesCount: string;
  cookingInstructions: string[];
  recipe: string[];
  nutritionalInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  preparationTime: string;
  tasteIndicators?: {
    spicy: number;
    sweet: number;
    sour: number;
    salty: number;
  };
} 