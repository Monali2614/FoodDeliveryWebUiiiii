import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private orderItemService: OrderItemService,private router: Router,private menuService:MenuService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Load all order items from the service
  loadCartItems(): void {
    this.orderItemService.getAllOrderItems().subscribe(
      (data: OrderItem[]) => {
        this.orderItems = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching order items', error);
      }
    );
  }


  updateQuantity(id: number, quantity: number): void {
    const orderItem = this.orderItems.find(item => item.id === id);
    if (orderItem) {
      // Ensure only the required fields are sent
      const price = orderItem.price ?? 0;
      const finalGst = quantity * price ?? 0;
      const gstAmount = this.calculateGst(finalGst); // Calculate GST
      const updatedOrderItem = {
        id: orderItem.id,
        menuId: orderItem.menuId,
        userId: orderItem.userId,
        menuName:'',
        quantity: quantity,
        price: orderItem.price,
        totalPrice: quantity * price, // Calculate total price
        
        //grandTotalPrice: (quantity * price) + (gstAmount) + (orderItem.deliveryCharge ?? 0) + (orderItem.platformCharge ?? 0)
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
    const gstRate = 0.18; // 18% GST rate
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

  fetchImage(item: any) {
    this.menuService.getMenuPicture(item.menuId).subscribe(
      (imageBlob: Blob) => {
        let reader = new FileReader();
        reader.readAsDataURL(imageBlob); 
        reader.onloadend = () => {
          item.image = reader.result as string; // Convert Blob to base64 string and assign it to item.image
        }
      },
      (error: any) => {
        console.error('Error fetching image:', error);
        item.image = 'assets/default-image.png'; // Use a default image on error
      }
    );
  }

  checkout(): void {
    this.router.navigate(['/checkout'], { state: { orderItems: this.orderItems } });
  }
}