// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${NAV_URL}/api/users/user/login/${username}/${password}`, { username, password })
      .pipe(
        tap(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.setCurrentUser(user);
        }),
        catchError(error => {
          console.error('Login failed', error);
          return throwError(error);
        })
      );
  }

  setCurrentUser(user: User | null) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateUserDetails(user: User): Observable<User> {
    return this.http.put<User>(`${NAV_URL}/api/users/user/update/${user.id}`, user);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    return !!user && JSON.parse(user) !== null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.setCurrentUser(null);
  }

  private getUserFromLocalStorage(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
