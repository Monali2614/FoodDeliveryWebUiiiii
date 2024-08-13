import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sharedDataService: SharedDataService, private router: Router) {}

  canActivate(): boolean {
    if (this.sharedDataService.getUserData()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}