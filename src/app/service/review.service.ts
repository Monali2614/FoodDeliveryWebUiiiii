import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { Review } from '../models/review.model';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
 
    private apiUrl = 'http://localhost:8080/api/reviews/Review';


    constructor(private http: HttpClient) { }

    getAllMenus(): Observable<Menu[]> {
        const url = `http://localhost:8080/api/menus/menu/getAllMenus`; return this.http.get<Menu[]>(url)
            .pipe(catchError(this.handleError));
    }

    // Get all restaurants
    getAllRestaurants(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]> (`http://localhost:8080/api/restaurants/restaurant/findAll`).pipe(catchError(this.handleError));
    }
    // Add a review for a menu
    addMenuReview(menuId: number, review: Review): Observable<Review> {
        return this.http.post<Review>(`${this.apiUrl}/menu/save/${menuId}`, review)
            .pipe(
                catchError(this.handleError)
            );
    }


    // Add a review for a restaurant
    addRestaurantReview(restaurantId: number, review: Review): Observable<Review> {
        return this.http.post<Review>(`${this.apiUrl}/restaurant/save/${restaurantId}`, review)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get review by ID
    getReviewById(reviewId: number): Observable<Review> {
        return this.http.get<Review>(`${this.apiUrl}/find/${reviewId}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get all reviews
    getAllReviews(): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.apiUrl}/findAll`)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get reviews by restaurant ID
    getReviewsByRestaurantId(restaurantId: number): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.apiUrl}/findByRestaurant/${restaurantId}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get reviews by user ID
    getReviewsByUserId(userId: number): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.apiUrl}/findByUser/${userId}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get a restaurant by its ID
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`http://localhost:8080/api/restaurants/restaurant/find/${id}`)      .pipe(catchError(this.handleError));
  }
  getMenuById(menuId: number): Observable<Menu> {
    return this.http.get<Menu>(`http://localhost:8080/api/menus/find/${menuId}`);
  }
    // Get reviews by menu ID
    getReviewsByMenuId(menuId: number): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.apiUrl}/findByMenu/${menuId}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Update a review
    updateReview(reviewId: number, review: Review): Observable<Review> {
        return this.http.put<Review>(`${this.apiUrl}/update/${reviewId}`, review)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Delete a review
    deleteReview(reviewId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${reviewId}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Error handling method
    private handleError(error: any) {
        // Extracting status and message from the error response
        const errorStatus = error.status || 'Unknown Status';
        const errorMessage = error.message || 'An unknown error occurred';

        // Logging detailed error information to the console
        console.error('An error occurred:', {
            status: errorStatus,
            message: errorMessage,
            error: error.error || error // Additional error details if available
        });

        // Returning a user-friendly error message
        return throwError(() => new Error(`An error occurred: ${errorMessage}`));
    }
}

export interface Menu {
    menuId: number;
    itemName: string;
    description: string;
    price: number;
    restaurant?: Restaurant; // Optional if not always needed
    // category?: Category; // Optional if not always needed
    // profilePicture?: ProfilePicture; // Optional if not always needed
    reviews?: Review[]; // Optional if not always needed
}


export interface Restaurant {
    restaurantId: number;
    restaurantName: string;
    restaurantAddress: string;
    restaurantContactInfo: string;
    cuisines: string[];
    // category: Category[];
     menus?: Menu[]; // Optional if not always needed
    // orders?: Order[]; // Optional if not always needed
    // profilePicture?: ProfilePicture; // Optional if not always needed
    reviews?: Review[]; // Optional if not always needed
  }

