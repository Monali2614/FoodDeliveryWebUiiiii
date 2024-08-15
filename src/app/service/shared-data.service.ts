import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private userData: any = null;
  private userId: string = '';
  private restaurantData = new BehaviorSubject<any>([]);
  private totalPriceSubject = new BehaviorSubject<number>(0); // Add BehaviorSubject for totalPrice
  currentRestaurantData = this.restaurantData.asObservable();
  
  currentTotalPrice = this.totalPriceSubject.asObservable(); // Expose totalPrice observable
  private transactionDetails = new BehaviorSubject<any>(null);
  currentTransactionDetails = this.transactionDetails.asObservable();

  constructor() { }

  setRestaurantData(data: any) {
    this.restaurantData.next(data);
  }

  setUserData(data: any) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }

  setTotalPrice(price: number) {
    this.totalPriceSubject.next(price); // Set totalPrice
  }

  getTotalPrice() {
    return this.totalPriceSubject.value; // Get current totalPrice value
  }
  setTransactionDetails(data: any) {
    this.transactionDetails.next(data);
  }

  getTransactionDetails() {
    return this.transactionDetails.value;
  }
  clearUserData(): void {
    this.userData = null;
  }

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }

  
}