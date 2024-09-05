import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user.service';
import { Order } from 'src/app/models/order';
 
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  userId: number = 0;
  orders: Order[] = [];
  selectedOrder?: Order;
  errorMessage: string = '';
  successMessage: string = '';
  isOrderDetailsVisible: boolean = false;
 
  constructor(
    private orderService: OrdersService,  // Inject OrdersService
    private userService: UserService      // Inject UserService
  ) {}
 
  ngOnInit(): void {
    this.userService.getUserById(1).subscribe(
      user => {
        this.userId = user.id;
        this.fetchOrdersByUser();
      },
      error => {
        console.error('Error fetching user:', error);
        this.errorMessage = 'Error fetching user details.';
      }
    );
  }
 
  fetchOrdersByUser(): void {
    if (this.userId > 0) {
      this.orderService.getOrdersByUserId(this.userId).subscribe(
        data => {
          this.orders = data;
          this.errorMessage = '';
        },
        error => {
          console.error('Error fetching orders:', error);
          this.errorMessage = 'Error fetching orders.';
          this.orders = [];
        }
      );
    } else {
      this.errorMessage = 'Invalid User ID.';
    }
  }
 
  viewOrderDetails(orderId: number): void {
    this.orderService.getOrderById(orderId).subscribe(
      data => {
        this.selectedOrder = data;
        this.isOrderDetailsVisible = true;
 
        if (!this.selectedOrder?.restaurant) {
          console.warn('Restaurant data is missing in the order details.');
        }
      },
      error => {
        console.error('Error fetching order details:', error);
        this.errorMessage = 'Error fetching order details.';
      }
    );
  }
  

 
  closeOrderDetails(): void {
    this.isOrderDetailsVisible = false;
  }
 
  cancelOrder(orderId: any): void {
    const orderToCancel = this.orders.find(order => order.id === orderId);
    if (orderToCancel) {
      if (orderToCancel.orderStatus === 'PENDING' || orderToCancel.orderStatus === 'CONFIRMED') {
        if (this.userId > 0) {
          this.orderService.cancelOrder(orderId).subscribe(
            () => {
              console.log('Order canceled successfully');
              this.successMessage = 'Order has been canceled successfully.';
              this.fetchOrdersByUser();
 
              setTimeout(() => {
                this.successMessage = '';
              }, 3000);
            },
            error => {
              console.error('Error canceling order:', error);
              this.errorMessage = 'Sorry, you can\'t cancel the order.';
            }
          );
        } else {
          this.errorMessage = 'User ID is required to cancel the order.';
        }
      } else {
        this.errorMessage = 'Order cannot be canceled because it is not in the "Pending" or "Confirmed" status.';
      }
    } else {
      this.errorMessage = 'Order not found.';
    }
  }
}
 