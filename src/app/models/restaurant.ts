import { Menu } from './menu';


  export class Restaurant {
    restaurantId: number;
    restaurantName: string;
    restaurantAddress: string;
    rating: number;
    cuisines: string[];
    menus: Menu[];
    restaurantContactInfo: string;
    category: string[];
  
    constructor(
      restaurantId: number = 0,
      restaurantName: string = '',
      restaurantAddress: string = '',
      rating: number = 0,
      cuisines: string[] = [],
      menus: Menu[] = [],
      restaurantContactInfo: string = '',
      category: string[] = []
    ) {
      this.restaurantId = restaurantId;
      this.restaurantName = restaurantName;
      this.restaurantAddress = restaurantAddress;
      this.rating = rating;
      this.cuisines = cuisines;
      this.menus = menus;
      this.restaurantContactInfo = restaurantContactInfo;
      this.category = category;
    }
  }