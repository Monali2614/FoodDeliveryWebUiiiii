import { Menu, Restaurant } from "../service/review.service";


// src/app/models/review.model.ts
export interface Review {

  id: number | null;
  restaurantId?: number ;
  menuId?: number ;
  rating: number;
  comment?: string;
  reviewDate: string;  // ISO date string
  menus?: Menu;  // Add this line
  restaurant?: Restaurant;  // Add this line
  restaurantName?: Restaurant;
  menuName?: Menu;
  review_type: 'restaurant' | 'menu';
  reviewType ?: Review

    user: {
      id: number;
    };
  
}