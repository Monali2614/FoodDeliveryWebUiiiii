import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: { menuId: number, quantity: number }[] = [];

  constructor(private http: HttpClient) {}

  getItems(): { menuId: number, quantity: number }[] {
    return this.items;
  }

  addItem(menuId: number, quantity: number): void {
    const existingItem = this.items.find(item => item.menuId === menuId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ menuId, quantity });
    }
    this.saveCart(); // Save to localStorage or other persistence
  }

  updateQuantity(menuId: number, quantity: number): void {
    const item = this.items.find(item => item.menuId === menuId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  removeItem(menuId: number): void {
    this.items = this.items.filter(item => item.menuId !== menuId);
    this.saveCart();
  }

  createOrder(userId: number, restaurantId: number): Observable<Order> {
    const menuIds = this.items.map(item => item.menuId);
    const quantities = this.items.map(item => item.quantity);

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('restaurantId', restaurantId.toString())
      .set('menuIds', menuIds.join(','))
      .set('quantities', quantities.join(','));

    console.log('Creating order with params:', params.toString()); // Debugging output

    return this.http.post<Order>(`${NAV_URL}/api/orders/order/create`, {}, { params });
  }

  getMenuItemsByRestaurantName(restaurantName: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${NAV_URL}/api/menus/menu/items-by-restaurant/${restaurantName}`);
  }

  private saveCart(): void {
    // Implement saving items to localStorage or other persistence
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${NAV_URL}/api/orders/byOrderId/${orderId}`);
  }
}
