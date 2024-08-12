export class Menu {
  menuId: number;
  itemName: string;
  description: string;
  price: number;
  image?: string;  // Image property to store the URL or base64 string
  restaurant: {
    id: number;
    name: string;
  };
  category: string;
  imageUrl?: string; // Image URL after sanitization

  constructor(
    menuId: number = 0,
    itemName: string = '',
    description: string = '',
    price: number = 0,
    image?: string, 
    restaurant: { id: number; name: string } = { id: 0, name: '' },
    category: string = '',
    imageUrl?: string // Initialize imageUrl
  ) {
    this.menuId = menuId;
    this.itemName = itemName;
    this.description = description;
    this.price = price;
    this.image = image;
    this.restaurant = restaurant;
    this.category = category;
    this.imageUrl = imageUrl;
  }
}
