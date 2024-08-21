import { Menu, Restaurant } from "../service/review.service";

// src/app/models/review.model.ts
export interface Review {

  restaurantId?: number ;
  menuId?: number ;
  rating: number;
  comment?: string;
  reviewDate: string;
  menu?: Menu;
  restaurant?: Restaurant;  
  restaurantName?: Restaurant;
  menuName?: Menu;
  review_type?: string;
  reviewType?: string;

    user: {
      id: number;
    };
  
}