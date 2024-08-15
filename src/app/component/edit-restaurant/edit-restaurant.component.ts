import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/service/menu.service';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  @Input() restaurant: Restaurant | null = null;
  cuisineInput: string = '';
  menuItemInput: Menu = new Menu();
  menuItemImage: File | null = null;
  editIndex: number | null = null;
  categories: string[] = ['VEG', 'NON_VEG'];

  constructor(
    private menuService: MenuService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize or fetch any necessary data here
  }

  updateRestaurantDetails(): void {
    if (this.restaurant) {
      const formData = new FormData();
      formData.append('restaurant', new Blob([JSON.stringify(this.restaurant)], { type: 'application/json' }));
  
      this.restaurantService.updateRestaurant(this.restaurant.restaurantId, formData).subscribe(
        (updatedRestaurant: Restaurant) => {
          this.restaurant = updatedRestaurant;
          alert('Restaurant details updated successfully!');
        },
        (error: any) => {
          console.error('Error updating restaurant details', error);
          alert(`Error updating restaurant details: ${error}`);
        }
      );
    } else {
      alert('No restaurant data available to update.');
    }
  }
  
  

  saveRestaurant(): void {
    this.updateRestaurantDetails(); // Reuse method for saving
  }

  addCuisine(): void {
    if (this.cuisineInput.trim() && this.restaurant) {
      this.restaurant.cuisines.push(this.cuisineInput.trim());
      this.cuisineInput = '';
    } else {
      alert('No restaurant data available to add cuisine.');
    }
  }

  removeCuisine(index: number): void {
    if (this.restaurant) {
      this.restaurant.cuisines.splice(index, 1);
    } else {
      alert('No restaurant data available to remove cuisine.');
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.menuItemImage = event.target.files[0];
    }
  }

  addMenuItem(): void {
    if (this.restaurant && this.menuItemInput.itemName && this.menuItemInput.price) {
      const formData = new FormData();
      formData.append('menu', new Blob([JSON.stringify(this.menuItemInput)], { type: 'application/json' }));

      if (this.menuItemImage) {
        formData.append('images', this.menuItemImage);
      }

      this.menuService.addMenu(this.restaurant.restaurantId, formData).subscribe(
        (newMenu: Menu) => {
          if (this.restaurant) {
            this.restaurant.menus.push(newMenu);
          }
          this.menuItemInput = new Menu();
          this.menuItemImage = null;
        },
        (error: any) => {
          console.error('Error adding menu item', error);
          alert(`Error adding menu item: ${error}`);
        }
      );
    } else {
      alert('Please fill in all fields before adding a menu item.');
    }
  }

  startEditMenuItem(index: number): void {
    if (this.restaurant && this.restaurant.menus[index]) {
      this.menuItemInput = { ...this.restaurant.menus[index] };
      this.editIndex = index;
    } else {
      alert('No restaurant or menu item data available to edit.');
    }
  }

  cancelEdit(): void {
    this.menuItemInput = new Menu();
    this.editIndex = null;
    this.menuItemImage = null;
  }

  updateMenuItem(): void {
    if (this.restaurant && this.editIndex !== null) {
      const formData = new FormData();
      formData.append('menu', new Blob([JSON.stringify(this.menuItemInput)], { type: 'application/json' }));

      if (this.menuItemImage) {
        formData.append('images', this.menuItemImage);
      }

      this.menuService.updateMenuForRestaurant(
        this.restaurant.restaurantId,
        this.menuItemInput.itemName,
        formData
      ).subscribe(
        (menu: Menu) => {
          if (this.restaurant && this.editIndex !== null) {
            this.restaurant.menus[this.editIndex] = menu;
          }
          this.cancelEdit();
        },
        (error: any) => {
          console.error('Error updating menu item', error);
          alert(`Error updating menu item: ${error}`);
        }
      );
    } else {
      alert('No menu item data available to update.');
    }
  }

  deleteMenuItem(index: number): void {
    if (this.restaurant && this.restaurant.menus[index]) {
      const menuItemId = this.restaurant.menus[index].menuId;

      this.menuService.deleteMenu(menuItemId).subscribe(
        () => {
          if (this.restaurant) {
            this.restaurant.menus.splice(index, 1);
          }
        },
        (error: any) => {
          alert(` deleted menu item: ${menuItemId}`);
        }
      );
    } else {
      alert('No restaurant or menu item data available to delete.');
    }
  }

  navigateToAdminPanel(): void {
    this.router.navigate(['/admin-panel']).then(success => {
      if (success) {
        console.log('Navigation to Admin Panel succeeded');
      } else {
        console.error('Navigation to Admin Panel failed');
      }
    });
  }
}
