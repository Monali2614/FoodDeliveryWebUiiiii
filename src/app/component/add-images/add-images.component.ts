import { Component } from '@angular/core';
import { ImageUploadService } from 'src/app/service/image-upload.service';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent {
  restaurantId: number | null = null;
  menuId: number | null = null;
  selectedRestaurantImage: File | null = null;
  selectedMenuImage: File | null = null;

  constructor(private imageUploadService: ImageUploadService) {}

  onRestaurantImageSelect(event: any): void {
    this.selectedRestaurantImage = event.target.files[0];
  }

  onMenuImageSelect(event: any): void {
    this.selectedMenuImage = event.target.files[0];
  }

  uploadRestaurantImage(): void {
    if (!this.selectedRestaurantImage || this.restaurantId === null) {
      alert('Please provide a restaurant image and valid restaurant ID.');
      return;
    }

    this.imageUploadService.uploadRestaurantImage(this.restaurantId, this.selectedRestaurantImage).subscribe(
      response => {
        console.log('Restaurant image uploaded successfully', response);
        this.resetRestaurantForm();
      },
      error => {
        console.error('Error uploading restaurant image', error);
        alert('Failed to upload restaurant image. Please try again.');
      }
    );
  }

  uploadMenuImage(): void {
    if (!this.selectedMenuImage || this.menuId === null) {
      alert('Please provide a menu image and valid menu ID.');
      return;
    }

    this.imageUploadService.uploadMenuImage(this.menuId, this.selectedMenuImage).subscribe(
      response => {
        console.log('Menu image uploaded successfully', response);
        this.resetMenuForm();
      },
      error => {
        console.error('Error uploading menu image', error);
        alert('Failed to upload menu image. Please try again.');
      }
    );
  }

  resetRestaurantForm(): void {
    this.selectedRestaurantImage = null;
    this.restaurantId = null;
  }

  resetMenuForm(): void {
    this.selectedMenuImage = null;
    this.menuId = null;
  }

  resetAll(): void {
    this.resetRestaurantForm();
    this.resetMenuForm();
  }
}