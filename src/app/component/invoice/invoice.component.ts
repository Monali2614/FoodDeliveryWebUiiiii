import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceId!: string;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  invoiceDetails: any;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    // Retrieve query parameters
    this.invoiceId = this.route.snapshot.queryParamMap.get('id')!;
    this.paymentId = this.route.snapshot.queryParamMap.get('paymentId')!;
    this.orderId = this.route.snapshot.queryParamMap.get('orderId')!;
    this.signature = this.route.snapshot.queryParamMap.get('signature')!;
    console.log('Invoice ID:', this.invoiceId);
    console.log('Payment ID:', this.paymentId);
    console.log('Order ID:', this.orderId);
    console.log('Signature:', this.signature);
    this.getInvoiceDetails();
  }

  getInvoiceDetails(): void {
    this.transactionService.getInvoice(this.invoiceId).subscribe(
      (data) => {
        this.invoiceDetails = data;
        console.log('Invoice details:', this.invoiceDetails);
      },
      (error) => {
        console.error('Error fetching invoice details:', error);
      }
    );
  }
  
  printInvoice(): void {
    window.print();
  }
}


