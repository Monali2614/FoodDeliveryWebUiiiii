import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { OrderItem } from 'src/app/models/order-item';
import { OrderItemService } from 'src/app/service/orderitem.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderItems: OrderItem[] = [];
  
  newOrderItem: Partial<OrderItem> = { 
    quantity: 1, 
    price: 0, 
    menu: {} as Menu 
  }; 
  
  userId: number = 1; // Example user ID
  menuId: number = 1; // Example menu ID

  constructor(private orderItemService: OrderItemService) {}

  ngOnInit(): void {
    this.loadOrderItems();
  }

  loadOrderItems(): void {
    this.orderItemService.getAllOrders().subscribe(
      (items) => {
        this.orderItems = items;
        console.log('Loaded order items:', this.orderItems);
      },
      (error) => console.error('Error loading order items', error)
    );
  }

  addOrderItem(): void {
    const orderItem = new OrderItem({
      quantity: this.newOrderItem.quantity ?? 1,
      price: this.newOrderItem.price ?? 0,
      menu: this.newOrderItem.menu ?? {} as Menu,
      gst: this.newOrderItem.gst ?? 0,
      deliveryCharge: this.newOrderItem.deliveryCharge ?? 0,
      platformCharge: this.newOrderItem.platformCharge ?? 0,
      grandTotalPrice: (this.newOrderItem.price ?? 0) * (this.newOrderItem.quantity ?? 1)
    });
  
    console.log('Order item to be saved:', orderItem);
  
    this.orderItemService.saveOrder(this.userId, this.menuId, orderItem).subscribe(
      (newOrderItem) => {
        this.orderItems.push(newOrderItem);
        console.log('Order item added successfully', newOrderItem);
      },
      (error) => console.error('Error adding order item', error)
    );
  }

  updateOrderItem(orderItem: OrderItem): void {
    if (orderItem.id) {
      orderItem.totalPrice = orderItem.price * orderItem.quantity;
      this.orderItemService.updateOrder(orderItem.id, orderItem).subscribe(
        (updatedOrderItem) => {
          const index = this.orderItems.findIndex(item => item.id === updatedOrderItem.id);
          if (index !== -1) {
            this.orderItems[index] = updatedOrderItem;
          }
          console.log('Order item updated successfully', updatedOrderItem);
        },
        (error) => console.error('Error updating order item', error)
      );
    }
  }

  deleteOrderItem(id: number): void {
    this.orderItemService.deleteOrder(id).subscribe(
      () => {
        this.orderItems = this.orderItems.filter(item => item.id !== id);
        console.log('Order item deleted successfully');
      },
      (error) => console.error('Error deleting order item', error)
    );
  }

  calculateGrandTotal(): number {
    return this.orderItems.reduce((total, item) => total + (item.grandTotalPrice || 0), 0);
  }
}
