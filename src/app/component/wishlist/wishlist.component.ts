import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MenuService } from 'src/app/service/menu.service';
import { UserService } from 'src/app/service/user.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  loading: boolean = true;
  totalPrice: number = 0;

  constructor(
    private wishlistService: WishlistService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private menuService:MenuService
  ) {}

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlist = this.wishlistService.getWishlist();
    this.wishlist.forEach(item => item.quantity = 1); // Initialize quantity to 1
    this.updateTotalPrice();  // Calculate initial total price
    this.loading = false;
  }

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);  // Redirect to login if not authenticated
      return false;
    }
  }

  removeFromWishlist(item: any) {
    this.wishlistService.removeFromWishlist(item);
    // Ensure the local wishlist is updated
    this.wishlist = this.wishlist.filter(i => i !== item);
    this.updateTotalPrice();  // Update total price after removing item
  }

  checkout() {
    this.router.navigate(['/checkout'], { state: { wishlist: this.wishlist } });
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateTotalPrice();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotalPrice();
    }
  }

  updateTotalPrice() {
    this.totalPrice = this.wishlist.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
  fetchImage(item: any) {
    this.menuService.getMenuPicture(item.menuId).subscribe(
      (imageBlob: Blob) => {
        let reader = new FileReader();
        reader.readAsDataURL(imageBlob); 
        reader.onloadend = () => {
          item.image = reader.result as string; // Convert Blob to base64 string and assign it to item.image
        }
      },
      (error: any) => {
        console.error('Error fetching image:', error);
        item.image = 'assets/default-image.png'; // Use a default image on error
      }
    );
  }
}