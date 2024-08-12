import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/service/transaction.service';
import { CheckoutComponent } from '../checkout/checkout.component';
import { SharedDataService } from 'src/app/service/shared-data.service';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  totalPrice: number = 0;
  transactionDetails: any;
    
    constructor(private transactionService: TransactionService, private sharedDataService: SharedDataService , private router: Router) { }
  
    ngOnInit(): void {
      // Get the totalPrice from the shared service
      this.totalPrice = this.sharedDataService.getTotalPrice();
      
      console.log(this.totalPrice);
      this.makePayment(this.totalPrice); // Call makePayment with the totalPrice
    }
  
    makePayment(amount: number) {
      this.transactionService.createTransaction(amount).subscribe(
        (transactionDetails) => {
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
        name: 'online food delivery',
        description: 'Payment of online shopping',
        handler: () => {
          alert("Payment Successful");
          console.log("Payment successful");
          console.log( transactionDetails.orderId);
          console.log( transactionDetails.amount );
          console.log(transactionDetails.currency);
          console.log( typeof(transactionDetails.amount))
          
        },
        prefill: {
          name: "Monali Gawargur",
          email: "monalig1426@gmail.com",
          contact: "9970567579"
        },
        theme: {
          color: "#3399cc"
        },
        method: {
          netbanking: true,
          card: true,
          upi: true,
          wallet: true,
          paylater: true
        },
        modal: {
          ondismiss: function() {
            alert("Payment popup closed");
          }
        }
      };
  
      const rzp = new Razorpay(options);
      rzp.open();
    }
  }