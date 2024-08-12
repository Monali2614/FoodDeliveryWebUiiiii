import { Component } from '@angular/core';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  review: Review = new Review();
  reviews: Review[] = [];
  menuId: number | undefined;
  restaurantId: number | undefined;
  reviewId: number | undefined;
  userId: number | undefined; // For getting reviews by userId

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    // Optionally, fetch reviews on component initialization
    this.getAllReviews();
  }

  addMenuReview(): void {
    if (this.menuId && this.review) {
      this.reviewService.addMenuReview(this.menuId, this.review).subscribe(
        response => {
          console.log('Menu review added successfully', response);
          this.review = new Review(); // Reset form
          this.getReviewsByMenuId(); // Refresh list
        },
        error => {
          console.error('Error adding menu review', error);
        }
      );
    } else {
      console.error('Menu ID or review is missing');
    }
  }

  addRestaurantReview(): void {
    if (this.restaurantId && this.review) {
      this.reviewService.addRestaurantReview(this.restaurantId, this.review).subscribe(
        response => {
          console.log('Restaurant review added successfully', response);
          this.review = new Review(); // Reset form
          this.getReviewsByRestaurantId(); // Refresh list
        },
        error => {
          console.error('Error adding restaurant review', error);
        }
      );
    } else {
      console.error('Restaurant ID or review is missing');
    }
  }

  getReviewById(): void {
    if (this.reviewId) {
      this.reviewService.getReviewById(this.reviewId).subscribe(
        response => {
          console.log('Review fetched successfully', response);
          this.review = response;
        },
        error => {
          console.error('Error fetching review', error);
        }
      );
    } else {
      console.error('Review ID is missing');
    }
  }

  getAllReviews(): void {
    this.reviewService.getAllReviews().subscribe(
      response => {
        console.log('All reviews fetched successfully', response);
        this.reviews = response;
      },
      error => {
        console.error('Error fetching reviews', error);
      }
    );
  }

  getReviewsByRestaurantId(): void {
    if (this.restaurantId) {
      this.reviewService.getReviewsByRestaurantId(this.restaurantId).subscribe(
        response => {
          console.log('Reviews by restaurant ID fetched successfully', response);
          this.reviews = response;
        },
        error => {
          console.error('Error fetching reviews by restaurant ID', error);
        }
      );
    } else {
      console.error('Restaurant ID is missing');
    }
  }

  getReviewsByUserId(): void {
    if (this.userId) {
      this.reviewService.getReviewsByUserId(this.userId).subscribe(
        response => {
          console.log('Reviews by user ID fetched successfully', response);
          this.reviews = response;
        },
        error => {
          console.error('Error fetching reviews by user ID', error);
        }
      );
    } else {
      console.error('User ID is missing');
    }
  }

  getReviewsByMenuId(): void {
    if (this.menuId) {
      this.reviewService.getReviewsByMenuId(this.menuId).subscribe(
        response => {
          console.log('Reviews by menu ID fetched successfully', response);
          this.reviews = response;
        },
        error => {
          console.error('Error fetching reviews by menu ID', error);
        }
      );
    } else {
      console.error('Menu ID is missing');
    }
  }

  updateReview(): void {
    if (this.reviewId && this.review) {
      this.reviewService.updateReview(this.reviewId, this.review).subscribe(
        response => {
          console.log('Review updated successfully', response);
        },
        error => {
          console.error('Error updating review', error);
        }
      );
    } else {
      console.error('Review ID or review is missing');
    }
  }

  deleteReview(): void {
    if (this.reviewId) {
      this.reviewService.deleteReview(this.reviewId).subscribe(
        () => {
          console.log('Review deleted successfully');
          this.getAllReviews(); // Refresh list
        },
        error => {
          console.error('Error deleting review', error);
        }
      );
    } else {
      console.error('Review ID is missing');
    }
  }
}