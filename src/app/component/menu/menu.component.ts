import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import { Menu } from 'src/app/models/menu';
import { WishlistService } from 'src/app/service/wishlist.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/models/order-item';
import { OrderItemService } from 'src/app/service/orderitem.service';

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
    private wishlistService: WishlistService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private orderItemService: OrderItemService,

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
    const userIdString = this.sharedDataService.getUserId();
     const userId=Number(userIdString);
    const gstAmount = this.calculateGst(item.price); // Calculate GST
    const deliveryCharge = 50; // Example fixed delivery charge
    const platformCharge = 10; // Example fixed platform charge

    const orderItem: OrderItem = {
      menuId: item.menuId,
      userId: userId,
      quantity: 1,
      price: item.price,
      totalPrice: item.price,
      gst: 0,
      deliveryCharge:0,
      platformCharge: 0,
      grandTotalPrice: 0,
      id: 0,
      image: item.image,
      menuName:'',
      menuDescription : '',
    };

    this.orderItemService.addToCart(orderItem).subscribe(
      (      response: any) => {
        console.log('Added to cart:', response);
        alert("Item added Successfully");
      },
      (      error: any) => {
        console.error('Error adding item to cart', error);
        alert("Failed to add item to cart ");
        alert("please login ");
        this.router.navigate(['/login']);
       

      }
    );
  }

  private calculateGst(price: number): number {
    const gstRate = 0.18; // 18% GST rate
    return price * gstRate;
  }
}
