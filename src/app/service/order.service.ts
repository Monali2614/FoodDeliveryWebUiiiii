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
  
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${NAV_URL}/api/orders/order/getAllOrders`);
  }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${NAV_URL}/api/orders/order/byUserId/${userId}`);
  }

  getOrderByOrderId(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${NAV_URL}/api/orders/order/byOrderId/${orderId}`);
  }

  updateOrder(orderId: number, orders: Order): Observable<Order> {
    return this.http.put<Order>(`${NAV_URL}/api/orders/order/update/${orderId}`, orders);
  }

  cancelOrder(orderId: number, userId: number): Observable<Order> {
    return this.http.post<Order>(`${NAV_URL}/api/orders/order/cancel/${orderId}/${userId}`, {});
  }

  saveOrder(orders: Order): Observable<Order> {
    return this.http.post<Order>(`${NAV_URL}/api/orders/order/save`, orders);
  }
}
