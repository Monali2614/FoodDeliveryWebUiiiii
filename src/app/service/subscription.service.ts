import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }
  
createSubscription(subscriptionData: any): Observable<any> {
  return this.http.post<any>(`${NAV_URL}/api/subscriptions/create`, subscriptionData);}

  getSubscriptionsByRestaurantAndUser(restaurantId: number, userId: number): Observable<any[]> {
    const url = `${NAV_URL}/api/subscriptions/restaurant/${restaurantId}/user/${userId}`;
    return this.http.get<any[]>(url);
  }
}