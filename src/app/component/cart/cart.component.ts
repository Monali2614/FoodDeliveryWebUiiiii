import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { OrderItem } from 'src/app/models/order-item';
import { MenuService } from 'src/app/service/menu.service';
import { OrderItemService } from 'src/app/service/orderitem.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderItems: OrderItem[] = [];

  constructor(
    private orderItemService: OrderItemService, 
    private router: Router, 
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Load all order items from the service
  loadCartItems(): void {
    this.orderItemService.getAllOrderItems().subscribe(
      (data: OrderItem[]) => {
        this.orderItems = data;
        this.orderItems.forEach(item => {
          this.fetchImage(item);  // Fetch image for each order item
        });
      },
      (error) => {
        console.error('Error fetching order items', error);
      }
    );
  }

  updateQuantity(id: number, quantity: number): void {
    const orderItem = this.orderItems.find(item => item.id === id);
    if (orderItem) {
      const price = orderItem.price ?? 0;
      const finalGst = quantity * price;
      const gstAmount = this.calculateGst(finalGst); 
      const updatedOrderItem = {
        ...orderItem,
        quantity: quantity,
        totalPrice: quantity * price,
      };

      this.orderItemService.updateOrderItem(id, updatedOrderItem).subscribe(
        (updatedItem) => {
          console.log('Item updated', updatedItem);
          this.loadCartItems();
        },
        (error) => {
          console.error('Error updating item', error);
        }
      );
    }
  }

  private calculateGst(price: number): number {
    const gstRate = 0.18; 
    return price * gstRate;
  }

  deleteItem(id: number): void {
    this.orderItemService.deleteOrderItem(id).subscribe(
      () => {
        console.log('Item deleted');
        this.loadCartItems();
      },
      (error) => {
        console.error('Error deleting item', error);
      }
    );
  }

  fetchImage(item: OrderItem) {
    this.menuService.getMenuById(item.menuId).subscribe(
      (menu: Menu) => {
        if (menu && menu.images && menu.images.length > 0) {
          item.image = `data:image/jpeg;base64,${menu.images[0]}`; // Construct the base64 data URL
          item.menuDescription = menu.description || 'No description available'; 
        } else {
          item.image = 'assets/default-image.png'; // Default image if none found
        }
      },
      (error: any) => {
        console.error('Error fetching menu:', error);
        item.image = 'assets/default-image.png'; // Default image on error
      }
    );
  }
  
  
  

  checkout(): void {
    this.router.navigate(['/checkout'], { state: { orderItems: this.orderItems } });
  }
}