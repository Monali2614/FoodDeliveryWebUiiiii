import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { Menu } from 'src/app/models/menu';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  restaurantName!: string;
  menuItems: Menu[] = [];
  filteredMenuItems: Menu[] = [];
  isVegSelected: boolean = false;
  isNonVegSelected: boolean = false;

  constructor(
    private menuService: MenuService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    this.getMenus(); // Fetch all menus when the component initializes
  }

  getMenus(): void {
    this.menuService.getAllMenus(1).subscribe(
      (data: Menu[]) => {
        this.menuItems = data;
        this.filteredMenuItems = data; // Initialize with all menu items

        // Fetch images for each menu item
        this.filteredMenuItems.forEach(menu => {
          this.menuService.getMenuPicture(menu.menuId).subscribe(
            (imageBlob: Blob) => {
              let reader = new FileReader();
              reader.readAsDataURL(imageBlob); 
              reader.onloadend = () => {
                menu.image = reader.result as string; // Assign the base64 image string to menu image
              }
            },
            (error: any) => console.error(`Error fetching image for menu ID ${menu.menuId}`, error)
          );
        });
      },
      (error: any) => console.error('Error fetching menu data', error)
    );
  }

  onToggleChange(event: any): void {
    this.isVegSelected = event.target.checked;
    this.isNonVegSelected = !event.target.checked;
    this.filterByCategory(this.isVegSelected ? 'VEG' : 'NON_VEG');
  }

  filterByCategory(category: string): void {
    if (category === 'VEG' && this.isVegSelected) {
      this.filteredMenuItems = this.menuItems.filter(item => item.category === 'VEG');
    } else if (category === 'NON_VEG' && this.isNonVegSelected) {
      this.filteredMenuItems = this.menuItems.filter(item => item.category === 'NON_VEG');
    } else {
      this.filteredMenuItems = this.menuItems;
    }
  }

  showAll(): void {
    this.filteredMenuItems = this.menuItems;
  }

  addToCart(item: Menu): void {
    this.wishlistService.addToWishlist(item);
    console.log('Added to cart:', item);
    alert("Item added Successfully");
  }
}
