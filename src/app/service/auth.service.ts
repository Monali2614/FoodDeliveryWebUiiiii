import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const NAV_URL= environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<any>(`${NAV_URL}/api/users/user/login/${username}/${password}`, { username, password });
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateUserDetails(user: User): Observable<User> {
    return this.http.put<User>(`${NAV_URL}/api/users/user/update/${user.id}`, user);
  }
  isLoggedIn(): boolean {
    // Replace this with your actual login status check
    const user = localStorage.getItem('currentUser');
    return !!user;
  }

  // getCurrentUser() {
  //   // Implement this method to return the current user
  //   return JSON.parse(localStorage.getItem('currentUser') || '{}');
  // }
}

