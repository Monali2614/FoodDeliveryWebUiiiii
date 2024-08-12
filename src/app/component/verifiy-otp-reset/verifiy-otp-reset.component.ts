import { Component } from '@angular/core';
import { UserService, PasswordResetRequest } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ActivatedRoute, } from '@angular/router';

@Component({
  selector: 'app-verifiy-otp-reset',
  templateUrl: './verifiy-otp-reset.component.html',
  styleUrls: ['./verifiy-otp-reset.component.css']
})
export class VerifiyOtpResetComponent {

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

   // Verify OTP for resetting the password
   verifyOtp() {
    this.userService.validateOtp(this.otp, this.email).subscribe(
      response => {
        this.otpVerified = true; // OTP verification successful, show reset password form
        this.message = 'OTP verified successfully. Please reset your password.';
        this.errorMessage = ''; // Clear any previous error messages
        this.router.navigate(['resetpassword']);
      },
      error => {
        console.error('Error validating OTP:', error);
        this.otpVerified = false; // OTP verification failed, hide reset password form
        this.errorMessage = 'Invalid OTP. Please try again.'; // Show error message
        this.message = ''; // Clear any previous success messages
      }
    );
  }
}
