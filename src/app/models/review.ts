export class Review {
    id?: number;
    user?: any; // Replace with User model if available
    restaurant?: any; // Replace with Restaurant model if available
    menu?: any; // Replace with Menu model if available
    reviewType?: string;
    rating?: number;
    comment?: string;
    reviewDate?: string; // Use string (ISO format) or Date based on your needs
  
    constructor(
      id?: number,
      user?: any,
      restaurant?: any,
      menu?: any,
      reviewType?: string,
      rating?: number,
      comment?: string,
      reviewDate?: string
    ) {
      this.id = id;
      this.user = user;
      this.restaurant = restaurant;
      this.menu = menu;
      this.reviewType = reviewType;
      this.rating = rating;
      this.comment = comment;
      this.reviewDate = reviewDate;
    }
  }
  