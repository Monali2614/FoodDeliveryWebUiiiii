import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userData: any = null;

constructor(private sharedDataService: SharedDataService) { }

ngOnInit(): void {
  this.userData = this.sharedDataService.getUserData();
}
}

