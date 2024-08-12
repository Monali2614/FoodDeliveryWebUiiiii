import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: any;

  constructor(private sharedDataService: SharedDataService, private router: Router, private restaurantService:RestaurantService) { }

  ngOnInit(): void {

    this.restaurantService.getAllRestaurants().subscribe(
      (data: Restaurant[]) => {
        this.restaurants = data;
      },
      error => {
        console.error('Error fetching restaurants', error);
        // Optionally show a user-friendly error message
      }
    );
  
    this.sharedDataService.currentRestaurantData.subscribe(data => {
      this.restaurants = data;
    });
  }

  

  viewMenu(restaurantName: string): void {
    console.log("*************",restaurantName)
    this.router.navigate(['/menu',restaurantName]);
  }
}
