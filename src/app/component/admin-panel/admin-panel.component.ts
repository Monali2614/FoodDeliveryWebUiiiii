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
}