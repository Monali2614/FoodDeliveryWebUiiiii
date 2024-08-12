import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
 

  constructor(private http: HttpClient) {}

  addMenuReview(menuId: number, review: Review): Observable<Review> {
    return this.http.post<Review>(`${NAV_URL}/api/reviews/Review/menu/save/${menuId}`, review);
  }

  addRestaurantReview(restaurantId: number, review: Review): Observable<Review> {
    return this.http.post<Review>(`${NAV_URL}/api/reviews/Review/restaurant/save/${restaurantId}`, review);
  }

  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${NAV_URL}/api/reviews/Review/find/${id}`);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${NAV_URL}/api/reviews/Review/findAll`);
  }

  getReviewsByRestaurantId(restaurantId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${NAV_URL}/api/reviews/Review/findByRestaurant/${restaurantId}`);
  }

  getReviewsByUserId(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${NAV_URL}/api/reviews/Review/findByUser/${userId}`);
  }

  getReviewsByMenuId(menuId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${NAV_URL}/api/reviews/Review/findByMenu/${menuId}`);
  }

  updateReview(id: number, review: Review): Observable<Review> {
    return this.http.put<Review>(`${NAV_URL}/api/reviews/Review/update/${id}`, review);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${NAV_URL}/api/reviews/Review/delete/${id}`);
  }
}