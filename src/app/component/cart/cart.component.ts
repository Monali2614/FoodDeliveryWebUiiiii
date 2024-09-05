import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  restaurantName: string = ''; // Optionally use this if needed

  constructor(
    private cartService: CartService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.calculateTotal();
  }

  loadCart(): void {
    const cartData = localStorage.getItem('cartItems');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
      this.cartItems.forEach(item => this.cartService.addItem(item.menuId, item.quantity)); // Populate CartService
    }
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeFromCart(menuId: number): void {
    this.cartItems = this.cartItems.filter(item => item.menuId !== menuId);
    this.saveCart();
    this.cartService.removeItem(menuId); // Update CartService
    this.calculateTotal();
  }

  updateQuantity(menuId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.menuId === menuId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
      this.cartService.updateQuantity(menuId, quantity); // Update CartService
      this.calculateTotal();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    this.totalAmount = 0;
  }
  checkout(): void {
    const userIdString = this.sharedDataService.getUserId();
    const userId = Number(userIdString); // Ensure userId is a number
  
    if (isNaN(userId)) {
      alert('You must be logged in to proceed to checkout.');
      this.router.navigate(['/login']);
      return;
    }
  
    const restaurantId = 1; // Replace with actual restaurant ID logic
  
    this.cartService.createOrder(userId, restaurantId).subscribe(
      (order: Order) => {
        console.log('Order created successfully:', order); // Debug: Print the whole order object
        console.log('Order ID:', order.id); // Debug: Print the order ID
        
        this.clearCart(); // Clear the cart upon successful order creation
        this.router.navigate(['/checkout', order.id]); // Redirect to checkout with order ID
      },
      (error: any) => {
        console.error('Error creating order', error);
        alert('Failed to create order');
      }
    );
  }
  

  private saveCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
