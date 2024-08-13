import { Component, OnInit } from '@angular/core';
import { UserService, PasswordResetRequest } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: string = '';
  otp: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  message: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Retrieve email and OTP from query parameters
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.otp = params['otp'] || '';
    });
  }

  resetPassword(): void {
    // Basic form validation
    if (!this.email || !this.otp || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const request: PasswordResetRequest = {
      password: this.password,
      confirmPassword: this.confirmPassword,
      otp: this.otp
    };

    this.userService.resetPassword(this.email, request).subscribe(
      response => {
        this.message = 'Password reset successfully. You can now log in with your new password.';
        this.errorMessage = '';

        // Display an alert to the user
        window.alert('Password changed successfully.');

        // Redirect the user to the login page
        this.router.navigate(['login']);
      },
      error => {
        console.error('Error resetting password:', error);
        this.errorMessage = 'An error occurred while resetting the password. Please try again.';
        this.message = '';
      }
    );
  }
}
