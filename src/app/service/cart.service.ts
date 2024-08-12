import { Injectable } from '@angular/core';
import { FoodItem } from '../models/food-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: FoodItem[] = [];

  getItems(): FoodItem[] {
    return this.items;
  }

  addItem(item: FoodItem): void {
    this.items.push(item);
  }

  updateQuantity(itemId: number, quantity: number): void {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  }

   removeItem(itemId: number): void {
    this.items = this.items.filter(item => item.id !== itemId);
  }
}


