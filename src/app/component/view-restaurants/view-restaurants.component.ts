import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-view-restaurants',
  templateUrl: './view-restaurants.component.html',
  styleUrls: ['./view-restaurants.component.css']
})
export class ViewRestaurantsComponent implements OnInit {
  @Output() edit = new EventEmitter<Restaurant>();
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      (data: Restaurant[]) => {
        this.restaurants = data;
      },
      error => {
        console.error('Error fetching restaurants', error);
        // Optionally show a user-friendly error message
      }
    );
  }

  onEdit(restaurant: Restaurant): void {
    this.edit.emit(restaurant);
    // Optionally, navigate to an edit route if needed
    // this.router.navigate(['/edit-restaurant', restaurant.restaurantId]);
  }
}
