import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  getGrandTotal(): any {
    throw new Error('Method not implemented.');
  }

  private userData: any = null;
  private userId: string = '';
  private restaurantData = new BehaviorSubject<any>([]);
  currentRestaurantData = this.restaurantData.asObservable();
  private totalPrice: number = 0;
  private order!: Order;
  private transactionDetails: any;
  private gstAmount: number = 0;
  private deliveryCharge: number = 0;
  private platformCharge: number = 0;
  private subscription: Subscription | null = null;

  constructor() { }


  setSubscription(subscription: Subscription): void {
    this.subscription = subscription;
  }

  getSubscription(): Subscription | null {
    return this.subscription;
  }

  setSubscriptionTotalPrice(price: number): void {
    this.totalPrice = price;
  }

  // Get the subscription total price
  getSubscriptionTotalPrice(): number {
    return this.totalPrice;
  }

  setGstAmount(gst: number): void {
    this.gstAmount = gst;
  }

  getGstAmount(): number {
    return this.gstAmount;
  }

  setDeliveryCharge(charge: number): void {
    this.deliveryCharge = charge;
  }

  getDeliveryCharge(): number {
    return this.deliveryCharge;
  }

  setPlatformCharge(charge: number): void {
    this.platformCharge = charge;
  }

  getPlatformCharge(): number {
    return this.platformCharge;
  }

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }
  
  setRestaurantData(data: any) {
    this.restaurantData.next(data);
  }

  getRestaurantData(): Observable<any> {
    return this.restaurantData.asObservable();
  }
  
  setUserData(userData: any) {
    this.userData = userData;
    localStorage.setItem('currentUser', JSON.stringify(userData)); // Optionally sync with localStorage
  }

  getUserData() {
    return this.userData;
  }

  setTotalPrice(price: number): void {
    this.totalPrice = price;
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

  setOrder(order: Order): void {
    this.order = order;
  }

  getOrder(): Order {
    return this.order;
  }

  setTransactionDetails(details: any): void {
    this.transactionDetails = details;
  }

  getTransactionDetails(): any {
    return this.transactionDetails;
  }
  clearUserData(): void {
    this.userData = null;
  }
}