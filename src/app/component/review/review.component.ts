import { Component, OnInit } from '@angular/core';


import { Review } from 'src/app/models/review.model';




import { forkJoin, map, of } from 'rxjs';
import { Menu, Restaurant, ReviewService } from 'src/app/service/review.service';
import { SharedDataService } from 'src/app/service/shared-data.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  restaurants: Restaurant[] = [];
  menus: Menu[] = [];
  reviews: Review[] = [];
  restaurantReviews: Review[] = [];
  selectedRestaurantId!: number;
  reviewType: 'restaurant' | 'menu' = 'restaurant';
  selectedMenuId!: number;
  stars: number[] = [1, 2, 3, 4, 5];
  review: Review = {
    rating: 0, comment: '', reviewDate: '', review_type: 'restaurant', user: { id: 0 },
    id: null
  };
  id: number = 0;
  editMode: boolean = false; // To toggle between create and update mode
  currentReviewId: number | null = null;
   error: string | null = null;
  
  constructor(private reviewService: ReviewService, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.loadRestaurants();
    this.loadMenus();
    this.loadReviews();

    const userIdString = this.sharedDataService.getUserId(); // Get userId as string
    this.id = Number(userIdString); // Convert string to number
    console.log('User ID:', this.id);
    this.review.user.id = this.id; // Set the user ID in the nested user object
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
    this.reviewService.getAllReviews().subscribe(
      reviews => {
        const requests = reviews.map(review => {
          if (review.review_type === 'restaurant' && review.restaurantId) {
            return this.reviewService.getRestaurantById(review.restaurantId).pipe(
              map(restaurant => ({ ...review, restaurant }))
            );
          } else if (review.review_type === 'menu' && review.menuId) {
            return this.reviewService.getMenuById(review.menuId).pipe(
              map(menu => ({ ...review, menu }))
            );
          } else {
            return of(review);
          }
        });

        forkJoin(requests).subscribe(
          (fullReviews: Review[]) => {
            this.reviews = fullReviews;
          },
          error => {
            console.error('Error loading detailed reviews:', error);
          }
        );
      },
      error => {
        console.error('Error loading reviews:', error);
      }
    );
  }

  
  

  submitReview(): void {
    if (this.id === null) {
      console.error('User ID is not available. Review cannot be submitted.');
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
        },
        error => {
          console.error('Error submitting restaurant review:', error);
        }
      );
    } else if (this.reviewType === 'menu' && this.selectedMenuId) {
      this.review.menuId = this.selectedMenuId;
      this.reviewService.addMenuReview(this.selectedMenuId, this.review).subscribe(
        data => {
          console.log('Menu review submitted:', data);
          this.loadReviews();
        },
        error => {
          console.error('Error submitting menu review:', error);
        }
      );
    }
  }
  // editReview(review: Review): void {
  //   // Ensure review.user is initialized
  //   if (!review.user) {
  //     review.user = { id: 0 };
  //   }
  
  //   this.review = { 
  //     ...review, 
  //     reviewDate: review.reviewDate ? new Date(review.reviewDate).toISOString().split('T')[0] : '',
  //     user: { id: review.user?.id || 0 } // Use optional chaining to safely access user.id
  //   };
  //   this.currentReviewId = review.id ?? null; // Use nullish coalescing for safety
  //   this.editMode = true;
  // }
  

//  deleteReview(reviewId: number): void {
//   if (reviewId === null || reviewId === undefined) {
//     console.error('Invalid review ID');
//     return;
//   }

//   this.reviewService.deleteReview(reviewId).subscribe(
//     () => {
//       console.log('Review deleted');
//       this.loadReviews();
//       this.loadRestaurantReviews();
//     },
//     error => console.error('Error deleting review:', error)
//   );
// }

  
  // resetForm(): void {
  //   this.review = { id: null, rating: 0, comment: '', reviewDate: '', review_type: 'restaurant', user: { id: 0 } };
  //   this.selectedRestaurantId = 0;
  //   this.selectedMenuId = 0;
  //   this.editMode = false;
  //   this.currentReviewId = null;
  // }
}