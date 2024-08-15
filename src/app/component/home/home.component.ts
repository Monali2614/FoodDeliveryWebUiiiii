import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/service/menu.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { interval, Subscription } from 'rxjs';
import { WishlistService } from 'src/app/service/wishlist.service';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  images = [
    '/assets/slider2img.avif',
    '/assets/foodimage.jpg',
    '/assets/imageslide1.jpg',
  ];

  activeSlideIndex = 0;
  popularMenus: Menu[] = [];
  menus: Menu[] = [];
  boxes = [
    { title: 'Maharashtrian Dish', category: 'Category1', image: '/assets/mahthali.jpeg' },
    { title: 'North Dish', category: 'Category2', image: '/assets/Gujrati.jpg' },
    { title: 'South Indian Dish', category: 'Category3', image: '/assets/South.jpeg' },
    { title: 'Punjabi Dish', category: 'Category4', image: '/assets/Punjabi-thali-WS.jpg' },
  ];
  private slideInterval$: Subscription = new Subscription();

  constructor(
    private menuService: MenuService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    this.getMenus();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.slideInterval$.unsubscribe();
  }

  getMenus(): void {
    this.menuService.getAllMenus(1).subscribe(
      (data: Menu[]) => {
        this.menus = data;
        this.filterPopularMenus();
      },
      error => console.error('Error fetching menu data', error)
    );
  }

  filterPopularMenus(): void {
    this.popularMenus = this.menus.filter(menu => menu.price > 50);
  }

  prevSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex > 0) ? this.activeSlideIndex - 1 : this.images.length - 1;
  }

  nextSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex < this.images.length - 1) ? this.activeSlideIndex + 1 : 0;
  }

  startAutoSlide(): void {
    this.slideInterval$ = interval(3500).subscribe(() => this.nextSlide());
  }

  onMenuClick(menu: Menu): void {
    this.menuService.getRestaurantsByMenu(menu.itemName).subscribe(
      (data: any) => {
        this.sharedDataService.setRestaurantData(data);
        this.router.navigate(['/restaurant-list']);
      },
      error => console.error('Error fetching restaurants by menu', error)
    );
  }

  toggleWishlist(menu: Menu): void {
    if (this.isInWishlist(menu)) {
      this.wishlistService.removeFromWishlist(menu);
    } else {
      this.wishlistService.addToWishlist(menu);
    }
  }

  isInWishlist(menu: Menu): boolean {
    return this.wishlistService.getWishlist().includes(menu);
  }

  onBoxClick(box: { title: string,  }): void {
    // Implement your logic to handle box click, e.g., filter menus by category
    console.log('Box clicked:', box);
    
    // Example: navigate to a different route
     this.router.navigate(['/menu'] );
  }
}
