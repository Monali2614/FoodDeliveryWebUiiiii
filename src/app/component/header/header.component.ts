import { Component } from '@angular/core';
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

  constructor(private router: Router, private sharedDataService: SharedDataService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.userData = this.sharedDataService.getUserData();
  }

  onlogin(): void {
    this.router.navigate(['/login']);
  }

  logout() {
    this.sharedDataService.clearUserData(); 
    console.log("logged out");
    this.router.navigate(['/login']); 
  }
}

