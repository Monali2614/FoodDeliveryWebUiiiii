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
  newCategory: string = 'VEG'; // Default category
  newPicture: File | null = null; // Store the selected file
  successMessage: string = '';
  errorMessage: string = '';

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
    if (this.isFormValid()) {
      const formData = new FormData();
      formData.append('menu', new Blob([JSON.stringify({
        itemName: this.newItemName,
        description: this.newDescription,
        price: this.newPrice,
        category: this.newCategory
      })], { type: 'application/json' }));

      if (this.newPicture) {
        formData.append('images', this.newPicture);
      }

      this.menuService.addMenu(this.restaurantId, formData).subscribe(
        (menu: Menu) => {
          this.successMessage = 'Menu item added successfully!';
          this.errorMessage = '';
          // Clear form fields
          this.restaurantId = 0;
          this.newItemName = '';
          this.newDescription = '';
          this.newPrice = 0;
          this.newCategory = 'VEG';
          this.newPicture = null;
          setTimeout(() => this.router.navigate(['/admin-panel']), 2000); // Redirect after 2 seconds
        },
        (error: any) => {
          console.error('Error adding menu item', error);
          this.errorMessage = `Error adding menu item: ${error.message || 'Unknown error'}`;
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields!';
      this.successMessage = '';
    }
  }

  isFormValid(): boolean {
    return this.restaurantId > 0 &&
           this.newItemName.trim() !== '' &&
           this.newDescription.trim() !== '' &&
           this.newPrice > 0 &&
           !!this.newPicture;
  }
}
