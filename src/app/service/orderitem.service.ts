// src/app/services/order-item.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderItem } from '../models/order-item';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  // Update with your backend URL

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  saveOrder(userId: number, menuId: number, orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${ NAV_URL}/api/orderItems/order/save/${userId}/${menuId}`, orderItem);
  }

  updateOrder(id: number, orderItem: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${NAV_URL}/api/orderItems/order/update/${id}`, orderItem, this.httpOptions);
  }

  deleteOrder(id: number): Observable<any> {  // Change to Observable<any>
    return this.http.delete<any>(`${NAV_URL}/api/orderItems/order/delete/${id}`, { responseType: 'text' as 'json' }); 
    // If the backend returns a non-JSON response, specify 'text'
  }
  

  getOrderById(id: number): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${NAV_URL}/api/orderItems/order/${id}`);
  }

  getAllOrders(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${NAV_URL}/api/orderItems/orders`);
  }
}
