import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { Menu } from 'src/app/models/menu';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  restaurantName!: string;
  menuItems: Menu[] = [];
  filteredMenuItems: Menu[] = [];
  cartItems: any[] = [];

  showVeg: boolean = false;
  showNonVeg: boolean = false;

  constructor(
    private menuService: MenuService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAllMenus();
    this.loadCart();
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

    const userIdString = this.sharedDataService.getUserId();
    const userId = Number(userIdString);
 if (!userId) {
      // User is not logged in
      alert('You must be logged in to add items to the cart.');
      this.router.navigate(['/login']);
      return;
    }
    const cartItem = {
      menuId: item.menuId,
      userId: userId,
      quantity: 1,
      price: item.price,
      image: item.image,
      menuName: item.itemName,
      menuDescription: item.description,
    };

    this.cartItems.push(cartItem);
    this.saveCart();
    alert("Item added to cart successfully!");
  }

  saveCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  loadCart(): void {
    const cartData = localStorage.getItem('cartItems');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
  }
}
