import { Component } from '@angular/core';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { Restaurant } from '../../models/restaurant'; 

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {
  restaurantName: string = '';
  restaurantAddress: string = '';
  rating: number = 0;
  cuisines: string = ''; 
  restaurantContactInfo: string = ''; 
  category: string[] = [];  // Array for categories
  restaurantImage: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private restaurantService: RestaurantService) {}

  addRestaurant(): void {
    if (this.isFormValid()) {
      const formData = new FormData();
      formData.append('restaurant', new Blob([JSON.stringify({
        restaurantName: this.restaurantName,
        restaurantAddress: this.restaurantAddress,
        rating: this.rating,
        cuisines: this.cuisines.split(',').map(cuisine => cuisine.trim()),
        restaurantContactInfo: this.restaurantContactInfo,
        category: this.category
      })], { type: 'application/json' }));

      if (this.restaurantImage) {
        formData.append('images', this.restaurantImage);
      }

      console.log('Sending the following data to the backend:', formData);  // Log the data

      this.restaurantService.addRestaurant(formData).subscribe(
        response => {
          console.log('Restaurant added successfully', response);
          this.successMessage = 'Restaurant added successfully!';
          this.errorMessage = '';
          // Reset form fields
          this.restaurantName = '';
          this.restaurantAddress = '';
          this.rating = 0;
          this.cuisines = ''; 
          this.restaurantContactInfo = '';  
          this.category = [];  
          this.restaurantImage = null;
          setTimeout(() => this.successMessage = '', 5000); // Hide success message after 5 seconds
        },
        error => {
          console.error('Error adding restaurant', error);
          this.errorMessage = `Error adding restaurant: ${error.message || 'Unknown error'}`;
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields!';
      this.successMessage = '';
    }
  }
    
  onCategoryChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.category.push(value);
    } else {
      const index = this.category.indexOf(value);
      if (index > -1) {
        this.category.splice(index, 1);
      }
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.restaurantImage = event.target.files[0];
    }
  }

  isFormValid(): boolean {
    return this.restaurantName.trim() !== '' &&
           this.restaurantAddress.trim() !== '' &&
           this.restaurantContactInfo.trim() !== '' &&
           this.cuisines.trim() !== '' &&
           this.category.length > 0 &&
           !!this.restaurantImage;
  }
}
