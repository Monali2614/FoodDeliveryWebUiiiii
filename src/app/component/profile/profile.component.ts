import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  selectedFile: File | null = null;
  userData: any = null;
  profilePictureUrl: SafeUrl | undefined;
  isUpdating: boolean = false;  // Flag to differentiate between upload and update
  imageUrl: SafeUrl | undefined;

  constructor(
    private sharedDataService: SharedDataService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.userData = this.sharedDataService.getUserData();
    if (this.userData) {
      this.fetchProfilePicture(this.userData.id);
  
    }
    this.userData = this.sharedDataService.getUserData();
    this.userService.getUserById(this.userData.id).subscribe(
      (response) => {
        this.userData = response;
        this.convertBlobOrBase64ToImage(this.userData.profilePicture);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  convertBlobOrBase64ToImage(data: any): void {
    if (data instanceof Blob) {
      const blobUrl = URL.createObjectURL(data);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
    } else if (typeof data === 'string' && data.startsWith('data:image')) {
      // If it's already a data URL (base64)
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(data);
    } else if (typeof data === 'string') {
      // If it's a base64 string without the data URL prefix
this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${data}`);   
 } else {
      console.error('Unexpected profile picture format.');
    }
    
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile && this.userData) {
      const formData = new FormData();
      formData.append('profilePicture', this.selectedFile, this.selectedFile.name);

      if (this.isUpdating) {
        // Update existing profile picture
        this.userService.updateUserProfilePicture(this.userData.id, formData).subscribe(
          (response) => {
            console.log('Profile picture updated:', response);
            this.handleSuccess();
          },
          (error) => {
            console.error('Error updating profile picture', error);
            alert('Error updating profile picture');
          }
        );
      } else {
        // Upload new profile picture
        this.userService.uploadUserProfilePicture(formData, this.userData.id).subscribe(
          (response) => {
            console.log('Profile picture uploaded:', response);
            this.handleSuccess();
          },
          (error) => {
            console.error('Error uploading profile picture', error);
            alert('Error uploading profile picture');
          }
        );
      }
    } else {
      alert('No file selected or user data missing');
    }
  }

  fetchProfilePicture(userId: number): void {
    this.userService.getUserProfilePicture(userId).subscribe(
      (response) => {
        const url = URL.createObjectURL(new Blob([response], { type: 'image/jpeg' }));
        this.profilePictureUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      (error) => {
        console.error('Error fetching profile picture', error);
      }
    );
  }

  handleSuccess(): void {
    // Optionally, update the profile picture URL and shared data
    if (this.selectedFile) {
      const url = URL.createObjectURL(this.selectedFile);
      this.profilePictureUrl = this.sanitizer.bypassSecurityTrustUrl(url);

      // Update the shared data service
      this.userData.profilePictureUrl = this.profilePictureUrl;
      this.sharedDataService.setUserData(this.userData);

      alert('Profile picture updated successfully!');
    }
  }

  // Call this method when the user is updating their picture
  startUpdating(): void {
    this.isUpdating = true;
  }

  // Call this method when the user is uploading a new picture
  startUploading(): void {
    this.isUpdating = false;
  }
}

