import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';
import { Restaurant } from '../models/restaurant';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // Add a new menu item
  addMenu(restaurantId: number, menuItem: Menu): Observable<Menu> {
    const url = `${NAV_URL}/api/menus/menu/save/${restaurantId}`;
    console.log('Sending menu item:', menuItem);
    return this.http.post<Menu>(url, menuItem, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Get all menu items
  getAllMenus(): Observable<Menu[]> {
    const url = `${NAV_URL}/api/menus/menu/getAllMenus`;
    return this.http.get<Menu[]>(url)
      .pipe(catchError(this.handleError));
  }

  // Get restaurants by menu item
  getRestaurantsByMenu(itemName: string): Observable<Restaurant[]> {
    const url = `${NAV_URL}/api/menus/menu/by-menu/${encodeURIComponent(itemName)}`;
    return this.http.get<Restaurant[]>(url)
      .pipe(catchError(this.handleError));
  }

  // Get menu items by restaurant name
  getMenusByRestaurantName(restaurantName: string): Observable<Menu[]> {
    const url = `${NAV_URL}/api/menus/menu/items-by-restaurant/${encodeURIComponent(restaurantName)}`;
    return this.http.get<Menu[]>(url)
      .pipe(catchError(this.handleError));
  }

  // Get menu items by restaurant ID
  getMenusByRestaurant(restaurantId: number): Observable<Menu[]> {
    const url = `${NAV_URL}/api/menus/menu/by-restaurant/${restaurantId}`;
    return this.http.get<Menu[]>(url)
      .pipe(catchError(this.handleError));
  }

  // Update a menu item for a specific restaurant
  updateMenuForRestaurant(restaurantId: number, itemName: string, menuItem: Menu): Observable<Menu> {
    const url = `${NAV_URL}/api/menus/menu/update/${restaurantId}/${encodeURIComponent(itemName)}`;
    console.log('Updating menu for restaurant. URL:', url, 'Menu item:', menuItem);
    return this.http.put<Menu>(url, menuItem, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Delete a menu item by its ID
  deleteMenu(menuId: number): Observable<void> {
    const url = `${NAV_URL}/api/menus/menu/delete/${menuId}`;
    console.log('Deleting menu item with ID:', menuId);
    return this.http.delete<void>(url)
      .pipe(catchError(this.handleError));
  }

  // Search for restaurants by menu item name
  searchMenuItem(itemName: string): Observable<Restaurant[]> {
    const url = `${NAV_URL}/api/menus/menu/by-menu/${encodeURIComponent(itemName)}`;
    return this.http.get<Restaurant[]>(url)
      .pipe(catchError(this.handleError));
  }

  // Fetch menu image URL by menu ID
  getMenuImageById(menuId: number): Observable<string> {
    const url = `${NAV_URL}/api/profile_pictures/getMenuPicture/${menuId}`;
    return this.http.get(url, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // Fetch menu image as a Blob (useful for displaying images)
  getMenuPicture(menuId: number): Observable<Blob> {
    const url = `${NAV_URL}/api/profile_pictures/getMenuPicture/${menuId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  // Centralized error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      errorMessage = `Backend error: ${error.status}, message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}