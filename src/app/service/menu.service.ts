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

  // Method to add a new menu item with FormData
  addMenu(restaurantId: number, formData: FormData): Observable<Menu> {
    const url = `${NAV_URL}/api/menus/menu/save/${restaurantId}`;
    return this.http.post<Menu>(url, formData)
      .pipe(catchError(this.handleError));
  }

  // Method to get all menus
  getAllMenus(): Observable<Menu[]> {
    const url = `${NAV_URL}/api/menus/menu/getAllMenus`;
    return this.http.get<Menu[]>(url)
      .pipe(catchError(this.handleError));
  }

  // Method to get restaurants by menu item name
  getRestaurantsByMenu(itemName: string): Observable<Restaurant[]> {
    const url = `${NAV_URL}/api/menus/menu/by-menu/${encodeURIComponent(itemName)}`;
    return this.http.get<Restaurant[]>(url)
      .pipe(catchError(this.handleError));
  }

  // Method to get menus by restaurant name
  getMenusByRestaurantName(restaurantName: string): Observable<Menu[]> {
    const url = `${NAV_URL}/api/menus/menu/items-by-restaurant/${encodeURIComponent(restaurantName)}`;
    return this.http.get<Menu[]>(url)
      .pipe(catchError(this.handleError));
  }

  // Method to get menus by restaurant ID
  getMenusByRestaurant(restaurantId: number): Observable<Menu[]> {
    const url = `${NAV_URL}/api/menus/menu/by-restaurant/${restaurantId}`;
    return this.http.get<Menu[]>(url)
      .pipe(catchError(this.handleError));
  }

  // Method to update an existing menu item with FormData
  updateMenuForRestaurant(restaurantId: number, itemName: string, formData: FormData): Observable<Menu> {
    const url = `${NAV_URL}/api/menus/menu/update/${restaurantId}/${encodeURIComponent(itemName)}`;
    console.log('Updating menu:', restaurantId, itemName, formData); // Log to inspect what is being sent
    return this.http.put<Menu>(url, formData)
      .pipe(catchError(this.handleError));
  }
  

  // Method to delete a menu item
  deleteMenu(menuId: number): Observable<void> {
    const url = `${NAV_URL}/api/menus/menu/delete/${menuId}`;
    return this.http.delete<void>(url)
      .pipe(catchError(this.handleError));
  }

  // Method to get a menu image by ID (URL string)
  getMenuImageById(menuId: number): Observable<string> {
    const url = `${NAV_URL}/api/profile_pictures/getMenuPicture/${menuId}`;
    return this.http.get(url, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  // Method to get a menu image as a Blob
  getMenuPicture(menuId: number): Observable<Blob> {
    const url = `${NAV_URL}/api/profile_pictures/getMenuPicture/${menuId}`;
    return this.http.get(url, { responseType: 'blob' })
      .pipe(catchError(this.handleError));
  }

  // Method to search for menu items by name
  searchMenuItem(itemName: string): Observable<Restaurant[]> {
    const url = `${NAV_URL}/api/menus/menu/by-menu/${encodeURIComponent(itemName)}`;
    return this.http.get<Restaurant[]>(url)
      .pipe(catchError(this.handleError));
  }

  // Private method to handle errors
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

