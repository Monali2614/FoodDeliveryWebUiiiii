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

  showVeg: boolean = false;
  showNonVeg: boolean = false;

  constructor(
    private menuService: MenuService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    this.getMenus();
    this.loadAllMenus();
  }

  loadAllMenus(): void {
    this.menuService.getAllMenus().subscribe(
      (menu: Menu[]) => {
        this.menuItems = this.transformMenuItems(menu);
        this.filteredMenuItems = [...this.menuItems];
      },
      (error: any) => console.error('Error fetching all menu items', error)
    );
  }

  transformMenuItems(menuItems: Menu[]): Menu[] {
    return menuItems.map(item => {
      if (item.images && item.images.length > 0) {
        item.image = `data:image/jpeg;base64,${item.images[0]}`;
      }
      return item;
    });
  }

  getMenus(): void {
    this.menuService.getAllMenus().subscribe(
      (data: Menu[]) => {
        this.menuItems = data;
        this.filteredMenuItems = data;

        this.filteredMenuItems.forEach(menu => {
          this.menuService.getMenuPicture(menu.menuId).subscribe(
            (imageBlob: Blob) => {
              let reader = new FileReader();
              reader.readAsDataURL(imageBlob);
              reader.onloadend = () => {
                menu.image = reader.result as string;
              }
            },
            (error: any) => console.error(`Error fetching image for menu ID ${menu.menuId}`, error)
          );
        });
      },
      (error: any) => console.error('Error fetching menu data', error)
    );
  }

  filterMenu(): void {
    if (this.showVeg && !this.showNonVeg) {
      this.filteredMenuItems = this.menuItems.filter(item => item.category === 'VEG');
    } else if (!this.showVeg && this.showNonVeg) {
      this.filteredMenuItems = this.menuItems.filter(item => item.category === 'NON_VEG');
    } else {
      this.filteredMenuItems = this.menuItems;
    }
  }

  addToCart(item: Menu): void {
    const cartItem = {
      ...item,
      quantity: 1,
      totalPrice: item.price
    };

    this.wishlistService.addToWishlist(cartItem);
    console.log('Added to cart:', cartItem);
    alert("Item added Successfully");
  }
}
