import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';     
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.adminService.loginAdmin(username, password).subscribe(
        response => {
          alert('Admin logged in successfully!');
          console.log("Admin profile picture",response);
          this.router.navigate(['/admin-panel']); // Redirect to the admin dashboard
        },
        (error: HttpErrorResponse) => {
          console.error('Error logging in admin:', error);
          alert('Failed to log in. Please check your credentials and try again.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}