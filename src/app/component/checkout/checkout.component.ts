import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  wishlist: any[] = [];
  totalPrice: number = 0;
  address: string = '';
  
   //Payment details fields
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVV: string = '';
  upiID: string = '';

  existingAddresses: string[] = [
    '12 Main St, Rajapeth, Amravati',
    '45 Square Shop, Rajkamal, Amravati'
  ];

  paymentMethods: string[] = ['Credit Card', 'Debit Card', 'UPI'];

  constructor(private wishlistService: WishlistService, private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.wishlist = navigation.extras.state['wishlist'] || [];
    } else {
      this.wishlist = this.wishlistService.getWishlist();
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalPrice = this.wishlist.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  completeOrder(): void {
    if (!this.address) {
      alert('Please provide an address.');
      return;
    }

    // Set the totalPrice in the shared service
    this.sharedDataService.setTotalPrice(this.totalPrice);

    // Navigate to the payment page
    this.router.navigate(['/payment']);
  }
}