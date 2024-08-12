import { Component } from '@angular/core';
import { UserService, PasswordResetRequest } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ActivatedRoute, } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  userEmail: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  email: string = '';
  message: string = '';
  otp: string = '';
  confirmPassword: string = '';
  user?: any = {};
  otpEmail: any;
  otpMessage: any;
  otpErrorMessage: any;
  isOtpRequired: boolean | undefined;
  otpVerificationNeeded: any;
  otpVerified: boolean = false; 
  constructor(private userService: UserService, private router: Router, private sharedDataService: SharedDataService, private route: ActivatedRoute,) { }

  
 
  resetPassword() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match. Please try again.';
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
        this.errorMessage = ''; // Clear any previous error messages
        // Optionally redirect the user to the login page
        this.router.navigate(['login']);
      },
      error => {
        console.error('Error resetting password:', error);
        this.errorMessage = 'An error occurred while resetting the password. Please try again.'; // Show error message
        this.message = ''; // Clear any previous success messages
      }
    );
  }

}
