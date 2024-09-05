// src/app/components/checkout/checkout.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  order: Order | null = null;
  orderId: number | null = null;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the order ID from the route parameters
    this.route.params.subscribe(params => {
      this.orderId = +params['orderId']; 
      console.log('this is orderid ',this.orderId)
      if (this.orderId) {
        this.fetchOrderDetails(this.orderId);
      }
    });
  }

  fetchOrderDetails(orderId: number): void {
    this.cartService.getOrderById(orderId).subscribe(
      (order: Order) => {
        this.order = order;
        console.log('Order details:', this.order);
      },
      (error) => {
        console.error('Error fetching order details:', error);
        alert('Failed to retrieve order details. Please try again.');
      }
    );
  }
  
  proceedToPayment(): void {
    if (this.order) {
      // Navigate to the payment page with grandTotalPrice and orderId
      this.router.navigate(['/payment',this.order.grandTotalPrice], { state: { grandTotalPrice: this.order.grandTotalPrice, orderId: this.order.id } });
    }
  }
  
  
}
