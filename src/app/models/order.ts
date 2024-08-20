import { OrderItem } from "./order-item";
import { Restaurant } from "./restaurant";
import { User } from "./user";


  export class Order {
    orderId: number;
    orderStatus: string; // Adjust based on your OrderStatus enum
    user: User;
    restaurant: Restaurant;
    orderItems: OrderItem[];
    orderDateAndTime: string; // Assuming LocalDateTime is serialized as ISO string
  
    constructor(
      orderId: number,
      orderStatus: string,
      user: User,
      restaurant: Restaurant,
      orderItems: OrderItem[],
      orderDateAndTime: string
    ) {
      this.orderId = orderId;
      this.orderStatus = orderStatus;
      this.user = user;
      this.restaurant = restaurant;
      this.orderItems = orderItems;
      this.orderDateAndTime = orderDateAndTime;
    }
  
    // Example method to calculate the total price of the order
    getTotalPrice(): number {
      return this.orderItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
    }
  }

  