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
    if (this.userData) {
      this.loadProfilePicture(this.userData.id);
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