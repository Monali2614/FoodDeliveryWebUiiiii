import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const NAV_URL = 'http://localhost:8080'; // Replace with your actual URL

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  uploadRestaurantImage(restaurantId: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('profilePicture', image);
    return this.http.post(`${NAV_URL}/api/profile_pictures/uploadRestaurantPicture/${restaurantId}`, formData, {      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  uploadMenuImage(menuId: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('profilePicture', image);
    return this.http.post(`${NAV_URL}/api/profile_pictures/uploadMenuPicture/${menuId}`, formData, {      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }
}