import { Component } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { MenuService } from 'src/app/service/menu.service';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-searchrestaurantbyitem',
  templateUrl: './searchrestaurantbyitem.component.html',
  styleUrls: ['./searchrestaurantbyitem.component.css']
})
export class SearchrestaurantbyitemComponent {
  itemName: string = '';
  restaurants: Restaurant[] = [];

  constructor(private menuItemService: MenuService, private httpClient: HttpClient
    , private sharedDataService : SharedDataService, private router : Router
  ) {}

  search() {
    if (this.itemName.trim() !== '') {
      this.menuItemService.searchMenuItem(this.itemName).subscribe(
        (data: Restaurant[]) => {
          this.restaurants = data;
        },
        (error) => {
          console.error('Error fetching restaurants', error);
        }
      );
    }
  }

 
  ngOnInit(): void {
    this.sharedDataService.currentRestaurantData.subscribe(data => {
      this.restaurants = data;
    });
  }

  viewMenu(restaurantName: string): void {
    console.log("*************",restaurantName)
    this.router.navigate(['/menu',restaurantName]);
  }
}

