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

  constructor(private restaurantService: RestaurantService) {}

  addRestaurant(): void {
    const newRestaurant: Restaurant = {
      restaurantId: 0, 
      restaurantName: this.restaurantName,
      restaurantAddress: this.restaurantAddress,
      rating: this.rating,
      cuisines: this.cuisines.split(',').map(cuisine => cuisine.trim()),
      menus: [],
      restaurantContactInfo: this.restaurantContactInfo,
      category: this.category  // Array of categories
    };
  
    console.log('Sending the following data to the backend:', newRestaurant);  // Log the data
  
    this.restaurantService.addRestaurant(newRestaurant).subscribe(
      response => {
        console.log('Restaurant added successfully', response);
        // Reset form fields
        this.restaurantName = '';
        this.restaurantAddress = '';
        this.rating = 0;
        this.cuisines = ''; 
        this.restaurantContactInfo = '';  
        this.category = [];  
      },
      error => {
        console.error('Error adding restaurant', error);
      }
    );
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
}