import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistKey = 'wishlist';
  private wishlist: any[] = [];

  constructor() {
    this.loadWishlist();
  }

  getWishlist(): any[] {
    return this.wishlist;
  }

  addToWishlist(item: any): void {
    this.wishlist.push(item);
    this.saveWishlist();
  }

  removeFromWishlist(item: any): void {
    this.wishlist = this.wishlist.filter(w => w !== item);
    this.saveWishlist();
  }

  private saveWishlist(): void {
    localStorage.setItem(this.wishlistKey, JSON.stringify(this.wishlist));
  }

  private loadWishlist(): void {
    const storedWishlist = localStorage.getItem(this.wishlistKey);
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
  }

  
}