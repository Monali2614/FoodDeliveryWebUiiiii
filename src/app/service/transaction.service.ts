import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const NAV_URL= environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  constructor(private http: HttpClient) { }

  
  createTransaction(totalPrice: number): Observable<any> {
    return this.http.get<any>(`${NAV_URL}/createtransaction/${totalPrice}`).pipe(
      catchError(error => {
        console.error('Error creating transaction', error);
        return throwError(error);
      })
    );
  }
  updateOrderStatus(orderId: string, paymentSuccess: boolean): Observable<any> {
    const url = `http://localhost:8080/api/orders/order/updateStatus/${orderId}/${paymentSuccess}`;
    return this.http.put<any>(url, {});
  }

  generateInvoice(orderId: string): Observable<any> {
    const url = `http://localhost:8080/api/invoices/invoice/generate/${orderId}`;
    return this.http.post<any>(url, {});
  }
  getInvoice(invoiceId: string) {
    return this.http.get(`http://localhost:8080/api/invoices/invoice/getInvoiceById/${invoiceId}`,{ responseType: 'text' });
  }
  cancelOrder(orderId: string): Observable<any> {
    const url = `${NAV_URL}api/orders/order/cancel/${orderId}`;
    return this.http.put<any>(url, {});
}
}