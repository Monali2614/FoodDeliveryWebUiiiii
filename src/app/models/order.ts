import { Restaurant } from "./restaurant";
import { User } from "./user";
import { Menu } from "./menu";
import { OrderItem } from "./order-item";

export interface Order {
totalAmount: any;
  id:number;
  orderId: number;
  orderStatus: OrderStatus;
  user: User;
  restaurant: Restaurant;
  menu:Menu;
  orderItems: OrderItem[];
  dateAndTime: Date;
  deliveryAddress: string; // New field for the delivery address
  grandTotalPrice:number
  platformCharge:number
  deliveryCharge:number
  gst:number;
 
  
  }
  



export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  PAID='PAID'
}