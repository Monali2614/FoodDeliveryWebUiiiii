import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const NAV_URL= environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  constructor(private http: HttpClient) { }

  
  createTransaction(totalPrice: number): Observable<any> {
    return this.http.get<any>(`${NAV_URL}/createtransaction/${totalPrice}`).pipe(
      catchError(error => {
        console.error('Error creating transaction', error);
        return throwError(error);
      })
    );
  }
}

