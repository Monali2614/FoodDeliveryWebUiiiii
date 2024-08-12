import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { MenuService } from 'src/app/service/menu.service';
import { Restaurant } from 'src/app/models/restaurant';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  @Input() restaurant: Restaurant | null = null;

  cuisineInput: string = '';
  menuItemInput: Menu = new Menu();

  editIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const restaurantId = Number(params.get('id'));
      if (restaurantId) {
        this.restaurantService.getRestaurantById(restaurantId).subscribe(
          (data: Restaurant) => {
            this.restaurant = data;
          },
          (error: any) => {
            console.error('Error fetching restaurant', error);
            alert(`Error fetching restaurant: ${error}`);          }
        );
      }
    });
  }

  saveRestaurant(): void {
    if (this.restaurant) {
      this.restaurantService.updateRestaurant(this.restaurant).subscribe(
        () => {
          alert('Data saved successfully!');
          this.router.navigate(['/admin-panel']);
        },
        (error: any) => {
          console.error('Error updating restaurant', error);
          alert(`Error updating restaurant: ${error}`);        }
      );
    } else {
      alert('No restaurant data available to save.');
    }
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

  addMenuItem(): void {
    if (this.restaurant) {
      const newMenuItem: Menu = new Menu(
        0, // Placeholder for new items
        this.menuItemInput.itemName || '',
        this.menuItemInput.description || '',
        this.menuItemInput.price || 0,
        this.menuItemInput.image || '', // Ensure image is handled if needed
        { id: this.restaurant.restaurantId, name: this.restaurant.restaurantName }
      );

      console.log('Adding new menu item:', newMenuItem);

      this.menuService.addMenu(this.restaurant.restaurantId, newMenuItem).subscribe(
        (menu: Menu) => {
          if (this.restaurant) {
            this.restaurant.menus.push(menu);
            this.menuItemInput = new Menu(); // Reset input
            console.log('Menu item added successfully:', menu);
          }
        },
        (error: any) => {
          console.error('Error adding menu item', error);
          alert(`Error adding menu item: ${error}`);        }
      );
    } else {
      alert('No restaurant data available to add menu item.');
    }
  }

  startEditMenuItem(index: number): void {
    if (this.restaurant && this.restaurant.menus[index]) {
      this.editIndex = index;
      const menu = this.restaurant.menus[index];
      this.menuItemInput = new Menu(
        menu.menuId,
        menu.itemName,
        menu.description,
        menu.price,
        menu.image,
        { id: this.restaurant.restaurantId, name: this.restaurant.restaurantName }
      );
      console.log('Starting to edit menu item at index:', index, 'Menu item:', menu);
    } else {
      alert('No restaurant data available to edit menu item.');
    }
  }

  updateMenuItem(): void {
    if (this.restaurant && this.editIndex !== null) {
      const itemName = this.menuItemInput.itemName;
      if (itemName) {
        const updatedMenuItem: Menu = new Menu(
          this.menuItemInput.menuId,
          this.menuItemInput.itemName || '',
          this.menuItemInput.description || '',
          this.menuItemInput.price || 0,
          this.menuItemInput.image || '', // Ensure image is handled if needed
          { id: this.restaurant.restaurantId, name: this.restaurant.restaurantName }
        );

        console.log('Updating menu item:', updatedMenuItem);

        this.menuService.updateMenuForRestaurant(this.restaurant.restaurantId, itemName, updatedMenuItem).subscribe(
          (updatedMenu: Menu) => {
            if (this.restaurant && this.editIndex !== null) {
              this.restaurant.menus[this.editIndex] = updatedMenu;
              console.log('Menu item updated successfully:', updatedMenu);
              this.cancelEdit();
            }
          },
          (error: any) => {
            console.error('Error updating menu item', error);
            alert(`Error updating menu item: ${error}`);          }
        );
      } else {
        alert('Item name is required to update menu item.');
      }
    } else {
      alert('No restaurant data available to update menu item.');
    }
  }

  cancelEdit(): void {
    this.editIndex = null;
    this.menuItemInput = new Menu();
  }

  deleteMenuItem(index: number): void {
    if (this.restaurant && this.restaurant.menus[index]) {
      const menuId = this.restaurant.menus[index].menuId;
      console.log('Deleting menu item with ID:', menuId);
      this.menuService.deleteMenu(menuId).subscribe(
        () => {
          if (this.restaurant) {
            this.restaurant.menus.splice(index, 1);
            console.log('Menu item deleted successfully with ID:', menuId);
          }
        },
        (error: any) => {
          console.error('Error deleting menu item', error);
          alert(`Error deleting menu item: ${error}`);       }
      );
    } else {
      alert('No menu item found to delete.');
    }
  }

  navigateToAdminPanel(): void {
    this.router.navigate(['/admin-panel']);
  }
}