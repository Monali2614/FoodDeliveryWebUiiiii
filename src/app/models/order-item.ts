// src/app/models/order-item.ts
import { Menu } from './menu';
import { Order } from './order';
import { User } from './user';

export class OrderItem {
  id?: number;
  menu?: Menu; // This indicates that `menu` can be null or undefined
  order?: Order;
  user?: User;
  quantity: number = 0;
  price: number = 0;
  totalPrice?: number;
  gst: number = 0;
  deliveryCharge: number = 0;
  platformCharge: number = 0;
  grandTotalPrice?: number;

  constructor(init: Partial<OrderItem>) {
    Object.assign(this, init);
    this.calculatePrices();
  }

  calculatePrices(): void {
    this.totalPrice = this.calculateTotalPrice();
    this.grandTotalPrice = this.calculateGrandTotal();
  }

  private calculateTotalPrice(): number {
    return (this.quantity || 0) * (this.price || 0);
  }

  private calculateGrandTotal(): number {
    return (
      (this.totalPrice || 0) +
      (this.gst || 0) +
      (this.deliveryCharge || 0) +
      (this.platformCharge || 0)
    );
  }
}
