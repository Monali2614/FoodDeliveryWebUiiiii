import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-show-restaurant',
  templateUrl: './show-restaurant.component.html',
  styleUrls: ['./show-restaurant.component.css']
})
export class ShowRestaurantComponent {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      (data: Restaurant[]) => this.restaurants = data,
      error => console.error('Error loading restaurants', error)
    );
  }

  // viewMenu(restaurantId: number): void {
  //   this.router.navigate(['/restaurant-menu', restaurantId]);
  // }
  viewMenu(restaurantName: string): void {
    console.log("*****",restaurantName)
    this.router.navigate(['/menu',restaurantName]);
  }
}

