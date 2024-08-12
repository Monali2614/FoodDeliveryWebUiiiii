import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/service/menu.service';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  restaurantId: number = 0;
  newItemName: string = '';
  newDescription: string = '';
  newPrice: number = 0;
  newCategory: string = 'veg'; // Default category
  newPicture: File | null = null; // Store the selected file

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = Number(params.get('id')) || 0;
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.newPicture = event.target.files[0];
    }
  }

  addMenuItem(): void {
    if (this.restaurantId > 0 && this.newPicture) {
      // Convert the image file to a base64 string or binary form
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMenuItem = new Menu(
          0,
          this.newItemName,
          this.newDescription,
          this.newPrice,
          reader.result as string, // Base64 string or binary data
          { id: this.restaurantId, name: '' } // Assuming restaurant name is not required
        );

        this.menuService.addMenu(this.restaurantId, newMenuItem).subscribe(
          (menu: Menu) => {
            this.router.navigate(['/admin-panel']);
          },
          (error: any) => {
            console.error('Error adding menu item', error);
            alert(`Error adding menu item: ${error}`);
          }
        );
      };
      reader.readAsDataURL(this.newPicture); // Read the file as base64
    } else {
      alert('Invalid restaurant ID or no picture selected');
    }
  }
}