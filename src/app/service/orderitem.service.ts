// src/app/services/order-item.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderItem } from '../models/order-item';
import { User } from '../models/user';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  // Update with your backend URL

  private apiUrl = 'http://localhost:8080/api/orderItems'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  addToCart(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.apiUrl}/order/save/${orderItem.userId}/${orderItem.menuId}`, orderItem);  }

   updateOrderItem(id: number, orderItem: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.apiUrl}/order/update/${id}`, orderItem);
  }
 // Update an existing order item
//  updateOrderItem(id: number, orderItem: Partial<OrderItem>): Observable<OrderItem> {
//   return this.http.put<OrderItem>(${this.apiUrl}/order/update/${id}, orderItem);
// }
  deleteOrderItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/order/delete/${id}`, { responseType: 'text' });  }

  getOrderItemById(id: number): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${this.apiUrl}/order/${id}`);  }

  getAllOrderItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/orders`);  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getAllUsers`);  }
}