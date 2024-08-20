import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  constructor(private http: HttpClient) { }

  registerAdmin(formData: FormData): Observable<any> {
    return this.http.post(`${NAV_URL}/api/admin/register`, formData, { responseType: 'text' });
  }
  

  loginAdmin(username: string, password: string): Observable<any> {
    // Create HttpParams object
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(`${NAV_URL}/api/admin/login`, null, { params, responseType: 'text' });
  }
}
