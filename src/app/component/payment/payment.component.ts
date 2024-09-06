import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/service/transaction.service';
import { environment } from 'src/environments/environment';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  grandTotalPrice: number | null = null;
  orderId!: string;
  transactionDetails: any;
  razorpayResponse: any;  // Store the Razorpay response

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    // Retrieve the grandTotalPrice and orderId from the router state
    this.grandTotalPrice = history.state.grandTotalPrice;
    this.orderId = history.state.orderId;
    console.log('Grand Total Price:', this.grandTotalPrice);
    console.log('Order ID:', this.orderId);
  }

  initiatePayment(): void {
    if (this.grandTotalPrice && this.orderId) {
      this.transactionService.createTransaction(this.grandTotalPrice).subscribe(
        (data) => {
          this.transactionDetails = data;
          console.log('Transaction initiated successfully:', this.transactionDetails);
          this.payWithRazorpay();
        },
        (error) => {
          console.error('Error initiating transaction:', error);
        }
      );
    } else {
      alert('Order ID or amount is invalid.');
    }
  }
  cancelPayment(): void {
    this.verifyPaymentAndUpdateStatus(false); // Mark the payment as failed
    alert('Payment was canceled.');
    this.router.navigate(['/orders']); // Redirect to the orders page or any other page
  }
  payWithRazorpay(): void {
    const options = {
      key: environment.razorpayKey,
      amount: this.transactionDetails.amount,
      currency: this.transactionDetails.currency,
      name: 'Your Company Name',
      description: 'Order Payment',
      image: 'https://yourlogo.com/logo.png',
      order_id: this.transactionDetails.orderId,
      handler: (response: any) => {
        this.razorpayResponse = response;  // Store the Razorpay response
        console.log('Razorpay Payment ID:', response.razorpay_payment_id);
        console.log('Razorpay Order ID:', response.razorpay_order_id);
        console.log('Razorpay Signature:', response.razorpay_signature);
        this.verifyPaymentAndUpdateStatus(true);
      },
      modal: {
        ondismiss: () => {
          this.cancelPayment(); // Handle modal close
        }
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      notes: {
        address: 'Your Company Address'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  verifyPaymentAndUpdateStatus(paymentSuccess: boolean): void {
    if (this.orderId) {
      const orderIdStr = this.orderId!.toString();
      this.transactionService.updateOrderStatus(orderIdStr, paymentSuccess).subscribe(
        (response) => {
          console.log('Order status updated successfully:', response);
          this.generateInvoice(orderIdStr);
        },
        (error) => {
          console.error('Error updating order status:', error);
        }
      );
    } else {
      console.error('Order ID is missing for verification.');
    }
  }

  generateInvoice(orderId: string): void {
    this.transactionService.generateInvoice(orderId).subscribe(
      (response: any) => {
        console.log('Invoice generated successfully:', response);
        // Navigate to invoice page with query parameters
        this.router.navigate(['/invoice',response.id], { queryParams: { 
          id: response.id,
          paymentId: this.razorpayResponse?.razorpay_payment_id,
          orderId: this.razorpayResponse?.razorpay_order_id,
          signature: this.razorpayResponse?.razorpay_signature
        }});
      },
      (error) => {
        console.error('Error generating invoice:', error);
      }
    );
  }
}
