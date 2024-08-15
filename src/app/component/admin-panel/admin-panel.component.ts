import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { Restaurant } from '../../models/restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  searchQuery: string = '';
  filteredRestaurants: Restaurant[] = [];
  restaurants: Restaurant[] = [];
  activeComponent: string = 'view-restaurants'; // Default active component
  selectedRestaurant: Restaurant | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      (data: Restaurant[]) => {
        this.restaurants = data;
        this.filteredRestaurants = data; // Initialize filteredRestaurants
      },
      error => {
        console.error('Error fetching restaurants', error);
      }
    );
  }

  searchRestaurant(event: Event): void {
    event.preventDefault();
    this.filterRestaurants();
  }

  onSearchChange(): void {
    this.filterRestaurants();
  }

  filterRestaurants(): void {
    if (this.searchQuery) {
      this.filteredRestaurants = this.restaurants.filter(restaurant =>
        restaurant.restaurantName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredRestaurants = this.restaurants;
    }
  }

  setActiveComponent(component: string): void {
    this.activeComponent = component;
  }

  onEditRestaurant(restaurant: Restaurant): void {
    this.selectedRestaurant = restaurant;
    this.setActiveComponent('edit-restaurant');
  }

  selectRestaurant(restaurant: Restaurant): void {
    this.filteredRestaurants = [];
    this.searchQuery = restaurant.restaurantName;
    this.onEditRestaurant(restaurant);
  }

  navigateToShowRestaurants(): void {
    this.router.navigate(['/show-restaurants']).then(success => {
      if (success) {
        console.log('Navigation to Show Restaurants succeeded');
      } else {
        console.error('Navigation to Show Restaurants failed');
      }
    });
  }

  logout(): void {
    // Implement your logout logic here
    this.router.navigate(['/admin-login']).then(success => {
      if (success) {
        console.log('Logged out and redirected to login page');
      } else {
        console.error('Logout failed or navigation to login page failed');
      }
    });
  }

  updateRestaurant(restaurant: Restaurant): void {
    const formData = new FormData();
    formData.append('restaurantName', restaurant.restaurantName);
    formData.append('restaurantAddress', restaurant.restaurantAddress);
    formData.append('rating', restaurant.rating.toString());
    formData.append('cuisines', JSON.stringify(restaurant.cuisines));
    formData.append('menus', JSON.stringify(restaurant.menus));
    formData.append('restaurantContactInfo', restaurant.restaurantContactInfo);
    formData.append('category', JSON.stringify(restaurant.category));
  
    if (restaurant.restaurantId) {
      this.restaurantService.updateRestaurant(restaurant.restaurantId, formData).subscribe(
        (updatedRestaurant: Restaurant) => {
          console.log('Restaurant updated successfully:', updatedRestaurant);
          // Handle successful update, e.g., refresh the list or show a message
          this.fetchRestaurants(); // Refresh the restaurant list after update
          this.setActiveComponent('view-restaurants'); // Switch back to the view-restaurants component
        },
        (error: any) => {
          console.error('Error updating restaurant:', error);
          // Handle error, e.g., show an error message
        }
      );
    } else {
      console.error('Restaurant ID is missing.');
    }
  }
}  