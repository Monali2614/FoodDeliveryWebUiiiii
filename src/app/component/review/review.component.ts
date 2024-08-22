import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { forkJoin, map, of } from 'rxjs';
import { Menu, Restaurant, ReviewService } from 'src/app/service/review.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  restaurants: Restaurant[] = [];
  menus: Menu[] = [];
  reviews: Review[] = [];
  selectedRestaurantId!: number;
  selectedMenuId!: number;
  reviewType: 'restaurant' | 'menu' = 'restaurant'; // Default to 'restaurant'
  stars: number[] = [1, 2, 3, 4, 5];
  review: Review = {
    rating: 0, comment: '', reviewDate: '', review_type: '', user: { id: 0 },
    restaurantAddress: undefined
  };
  id: number = 0; // Setting current user id

  constructor(private reviewService: ReviewService, private sharedDataService: SharedDataService, private router: Router) { }

  ngOnInit(): void {
    this.loadRestaurants();
    this.loadMenus();

    const userIdString = this.sharedDataService.getUserId(); // Get userId as string
    this.id = Number(userIdString); // Convert string to number
    console.log('User ID:', this.id);
    this.review.user.id = this.id; // Set the user ID in the nested user object

    // Load initial reviews based on the default review type and selection
    this.loadReviews();
  }

  setRating(rating: number): void {
    this.review.rating = rating;
  }

  loadRestaurants(): void {
    this.reviewService.getAllRestaurants().subscribe(
      data => {
        this.restaurants = data;
      },
      error => {
        console.error('Error loading restaurants:', error);
      }
    );
  }

  loadMenus(): void {
    this.reviewService.getAllMenus().subscribe(
      data => {
        this.menus = data;
      },
      error => {
        console.error('Error loading menus:', error);
      }
    );
  }

  loadReviews(): void {
    if (this.reviewType === 'restaurant' && this.selectedRestaurantId) {
      this.loadRestaurantReviews();
    } else if (this.reviewType === 'menu' && this.selectedMenuId) {
      this.loadMenuReviews();
    } else {
      this.loadAllReviews();
    }
  }

  loadRestaurantReviews(): void {
    if (this.selectedRestaurantId) {
      this.reviewService.getReviewsByRestaurantId(this.selectedRestaurantId).subscribe(
        (reviews: Review[]) => {
          this.reviews = reviews;
          console.log('Loaded restaurant reviews:', reviews);
        },
        error => {
          console.error('Error loading restaurant reviews:', error);
        }
      );
    }
  }

  loadMenuReviews(): void {
    if (this.selectedMenuId && this.menus.length > 0) {
      console.log('Loading reviews for selected menu...');
      this.reviewService.getReviewsByMenuId(this.selectedMenuId).subscribe(
        (reviews: Review[]) => {
          this.reviews = reviews;
          console.log('Loaded menu reviews:', reviews);
        },
        error => {
          console.error('Error loading menu reviews:', error);
        }
      );
    } else {
      console.warn('No menus available or no menu selected.');
    }
  }

  loadAllReviews(): void {
    this.reviewService.getAllReviews().subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;
        console.log('Loaded all reviews:', reviews);
      },
      error => {
        console.error('Error loading all reviews:', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.id !== 0; // Assumes that a valid user ID is not 0
  }

  submitReview(): void {
    if (!this.isLoggedIn()) {
      window.alert('Please log in to submit a review.'); // Simple alert popup
      this.router.navigate(['/login']); // Redirect to the login page
      return;
    }

    this.review.user.id = this.id;
    this.review.review_type = this.reviewType;
    this.review.reviewDate = new Date().toISOString().split('T')[0];
    console.log('Review before submission:', this.review);

    if (this.reviewType === 'restaurant' && this.selectedRestaurantId) {
      this.review.restaurantId = this.selectedRestaurantId;
      this.reviewService.addRestaurantReview(this.selectedRestaurantId, this.review).subscribe(
        data => {
          console.log('Restaurant review submitted:', data);
          this.loadReviews(); 
          window.alert('Restaurant review added successfully!');
        },
        error => {
          console.error('Error submitting restaurant review:', error);
        }
      );
    } else if (this.reviewType === 'menu' && this.selectedMenuId) {
      this.review.menuId = this.selectedMenuId;
      this.review.restaurantId = this.selectedRestaurantId;
      this.reviewService.addMenuReview(this.selectedMenuId, this.selectedRestaurantId ,this.review).subscribe(
        data => {
          console.log('Menu review submitted:', data);
          this.loadReviews(); 
          window.alert('Menu item review added successfully!');
        },
        error => {
          console.error('Error submitting menu review:', error);
        }
      );
    }
  }
}