// src/app/models/menu.ts
export class Menu {
  menuId: number; // Update to match your existing code
  itemName: string;
  description: string;
  price: number;
  image?: string; // This is likely a single image URL
  restaurant: {
    id: number;
    name: string;
  };
  category: string;
  imageUrl?: string; // An additional image URL (optional)
  images: string[]; // Array of base64 encoded images

  constructor(
    menuId: number = 0, // Update parameter name to match the property
    itemName: string = '',
    description: string = '',
    price: number = 0,
    image?: string,
    restaurant: { id: number; name: string } = { id: 0, name: '' },
    category: string = '',
    imageUrl?: string,
    images: string[] = [] // Initialize as an empty array by default
  ) {
    this.menuId = menuId; // Update assignment to match the property
    this.itemName = itemName;
    this.description = description;
    this.price = price;
    this.image = image;
    this.restaurant = restaurant;
    this.category = category;
    this.imageUrl = imageUrl;
    this.images = images; // Assign the images array
  }
}
