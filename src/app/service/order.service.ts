import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

const NAV_URL = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }


  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${NAV_URL}/api/orders/order/byUserId/${userId}`);
  }
  cancelOrder(orderId: string): Observable<any> {
    const url = `${NAV_URL}api/orders/order/cancel/${orderId}`;
    return this.http.put<any>(url, {});
  }
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${NAV_URL}/api/orders/byOrderId/${orderId}`);
  }
}
