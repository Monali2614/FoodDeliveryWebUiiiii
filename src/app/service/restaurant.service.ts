import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant';
import { Menu } from '../models/menu';
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // Add a restaurant using FormData
  addRestaurant(formData: FormData): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${NAV_URL}/api/restaurants/restaurant/save`, formData, {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data' // Not necessary as FormData sets the content type
      })
    }).pipe(catchError(this.handleError));
  }

  // Get all restaurants
  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${NAV_URL}/api/restaurants/restaurant/findAll`)
      .pipe(catchError(this.handleError));
  }

  // Search for restaurants by query
  searchRestaurants(query: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${NAV_URL}/api/restaurants/restaurant/find/${query}`)
      .pipe(catchError(this.handleError));
  }

  // Get a restaurant by ID
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${NAV_URL}/api/restaurants/restaurant/find/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Update a restaurant using FormData
updateRestaurant(restaurantId: number, formData: FormData): Observable<Restaurant> {
  const url = `${NAV_URL}/api/restaurants/restaurant/update/${restaurantId}`;
  return this.http.put<Restaurant>(url, formData)
    .pipe(catchError(this.handleError));
}



  // Delete a restaurant by ID
  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${NAV_URL}/api/restaurants/restaurant/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

