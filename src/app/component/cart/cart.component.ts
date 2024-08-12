import { Component } from '@angular/core';
import { FoodItem } from 'src/app/models/food-item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  items: FoodItem[];

  constructor(private cartService: CartService) {
    this.items = [];
  }

  ngOnInit(): void {
    // Add temporary hardcoded values to the cart
    const sampleItems: FoodItem[] = [
      new FoodItem(1, './assets/pizza.jpg', 'Pizza', 299, 1),
      new FoodItem(2, './assets/burger.jpg', 'Burger', 149, 2),
      new FoodItem(3, './assets/pasta.jpg', 'Pasta', 199, 1)
    ];

    sampleItems.forEach(item => this.cartService.addItem(item));
    this.items = this.cartService.getItems();
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
    this.items = this.cartService.getItems();
  }

  incrementQuantity(itemId: number): void {
    const item = this.items.find(cartItem => cartItem.id === itemId);
    if (item) {
      this.updateQuantity(itemId, item.quantity + 1);
    }
  }

  decrementQuantity(itemId: number): void {
    const item = this.items.find(cartItem => cartItem.id === itemId);
    if (item && item.quantity > 1) {
      this.updateQuantity(itemId, item.quantity - 1);
    }
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId);
    this.items = this.cartService.getItems();
  }

  proceedToCheckout(): void {
    // Navigate to the checkout page
    console.log('Proceed to checkout');
  }

  addMoreItems(): void {
    // Navigate to the items page
    console.log('Add more items');
  }
}


