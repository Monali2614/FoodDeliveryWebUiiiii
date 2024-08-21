import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/service/transaction.service';
import { SharedDataService } from 'src/app/service/shared-data.service';


import { RestaurantService } from 'src/app/service/restaurant.service'; 
import { Restaurant } from 'src/app/models/restaurant';
import { Order } from 'src/app/models/order';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalPrice: number = 0;
  transactionDetails: any;
  orderStatus: string = 'PENDING';
  order!: Order;
  deliveryCharge: number = 0;
  platformCharge: number = 0;
  grandTotal: any;
  gst:number=0.18;
  user:any
  restaurants: Restaurant[] = [];
  errorMessage: string | undefined;


  constructor(
    private transactionService: TransactionService,
    private sharedDataService: SharedDataService,
    
    private restaurantService: RestaurantService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.deliveryCharge = this.sharedDataService.getDeliveryCharge();
    this.platformCharge = this.sharedDataService.getPlatformCharge();
    this.order = this.sharedDataService.getOrder();
    this.totalPrice = this.sharedDataService.getTotalPrice();
    this.order = this.sharedDataService.getOrder();
    this.user=this.sharedDataService. getUserData();
    console.log('this is user',this.user)
    console.log('this is restaurant',this.restaurants)
    this.makePayment(this.totalPrice);
  }
  // fetchRestaurantsByMenuItem(itemName: string): void {
  //   this.restaurantService.findRestaurantsByMenuItem(itemName).subscribe(
  //     (data: any[]) => {
  //       this.restaurants = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching restaurants:', error);
  //       this.errorMessage = 'Failed to load restaurants. Please try again later.';
  //     }
  //   );
  // }
  calculateGST(totall:number): number {
    const total = totall
    return total * this.gst;
  }
  makePayment(amount: number) {
    this.transactionService.createTransaction(amount).subscribe(
      (transactionDetails) => {
        this.transactionDetails = transactionDetails;
        this.sharedDataService.setTransactionDetails(transactionDetails);
        this.payWithRazorpay(transactionDetails);
      },
      (error) => {
        console.error('Error creating transaction', error);
      }
    );
  }

  payWithRazorpay(transactionDetails: any) {
    const options = {
      key: transactionDetails.key,
      amount: transactionDetails.amount,
      currency: transactionDetails.currency,
      order_id: transactionDetails.orderId,
      createdAt:transactionDetails.createdAt,
      status:transactionDetails.status,
      name: 'Online Food Delivery',
      description: 'Payment for your order',
      handler: (response: any) => {
        alert('Payment Successful');
        this.showTransactionDetails(transactionDetails);
        this.generateInvoice();
      },
      prefill: {
        name: this.user?.name,  // Use user data
        email: this.user?.email,  // Use user data
        contact: this.user?.mobileNo
      },
      theme: {
        color: '#3399cc'
      },
      method: {
        netbanking: true,
        card: true,
        upi: true,
        wallet: true,
        paylater: true
      },
      modal: {
        ondismiss: function () {
          alert('Payment popup closed');
           
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
  showTransactionDetails(transactionDetails: any) {
  this.transactionDetails = transactionDetails;  // Show transaction details after payment
  
  }
  
  generateInvoice(): void {
    // Check if transactionDetails is available
    if (!this.transactionDetails) {
      console.error('Transaction details are not available.');
      return;
    }
  
    const invoiceHtml = `
      <html>
      <head>
        <title>Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .invoice-container { max-width: 800px; margin: auto; padding: 20px; border: 1px solid #ddd; }
          h2 { text-align: center; }
          .details, .items { margin-bottom: 20px; }
          .details p, .items p { margin: 5px 0; }
          table { width: 100%; border-collapse: collapse; }
          table, th, td { border: 1px solid #ddd; }
          th, td { padding: 10px; text-align: left; }
          th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <h2>Invoice</h2>
          <div class="details">
            <p><strong>Name:</strong> ${this.user?.name || 'N/A'}</p>
            <p><strong>Email:</strong> ${this.user?.email || 'N/A'}</p>
            <p><strong>Address:</strong> ${this.user?.address || 'N/A'}</p>
            <p><strong>Restauarnt Name:</strong>Monali Restaurant </p>
            <p><strong> Restauarnt Address:</strong>pune</p>
            <p><strong>Restauarnt Contact:</strong>9970567579</p>
            <p><strong>Date and Time:</strong>${this.transactionDetails.createdAt}</p>
            <p><strong>Order Status:</strong>${this.order.orderStatus}</p>
            <p><strong>Transaction ID:</strong>${this.transactionDetails.orderId}</p>
            <p><strong>Transaction Amount:</strong> ₹${this.transactionDetails.amount / 100}</p> <!-- Assuming amount is in paise -->
            <p><strong>Transaction Currency:</strong> ${this.transactionDetails.currency}</p>
            <p><strong>Transaction Status:</strong> ${this.transactionDetails.status}</p>
          </div>
          <div class="items">
            <h3>Order Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Menu Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                  <th>GST (18%)</th>
                </tr>
              </thead>
              <tbody>
                ${this.order.orderItems.map(item => `
                  <tr>
                    <td>${item.menuName}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price}</td>
                    <td>₹${item.totalPrice}</td>
                    <td>₹${this.calculateGST(item.totalPrice)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p><strong>Delivery Charge:</strong> ₹${this.deliveryCharge}</p>
            <p><strong>Platform Charge:</strong> ₹${this.platformCharge}</p>
            <p><strong>Grand Total:</strong> ₹${this.totalPrice}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  
    
    const blob = new Blob([invoiceHtml], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice.html';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  
}