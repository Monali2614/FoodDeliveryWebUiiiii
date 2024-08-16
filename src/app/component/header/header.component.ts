import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  imageUrl: SafeUrl | undefined;
  userData: any = null;
  profilePictureUrl: SafeUrl | null = null;

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.userData = this.sharedDataService.getUserData();
    console.log("This is user data",this.userData)
    if (this.userData) {
      this.loadProfilePicture(this.userData.id);
    }

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
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${data}`);    } else {
      console.error('Unexpected profile picture format.');
    }
    
  }



  onlogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.sharedDataService.clearUserData(); 
    console.log("logged out");
    this.router.navigate(['/login']); 
  }

  loadProfilePicture(userId: number): void {
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
}