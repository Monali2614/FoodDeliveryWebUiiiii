import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8080/api/users/user/register'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  // registerUser(user: any): Observable<string> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<string>(this.apiUrl, user, { headers })
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  newregisterUser(formData: FormData): Observable<string> {
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.http.post<string>(this.apiUrl, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }



  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
