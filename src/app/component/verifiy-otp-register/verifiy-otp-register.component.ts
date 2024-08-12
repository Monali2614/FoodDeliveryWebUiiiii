import { Component } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';
import { UserService, PasswordResetRequest } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ActivatedRoute, } from '@angular/router';
@Component({
  selector: 'app-verifiy-otp-register',
  templateUrl: './verifiy-otp-register.component.html',
  styleUrls: ['./verifiy-otp-register.component.css']
})
export class VerifiyOtpRegisterComponent {
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
  otpValid: boolean = false;
termsAndConditionsChecked: any;
userform: any;

  constructor(private userService: UserService, private router: Router, private sharedDataService: SharedDataService, private route: ActivatedRoute,) { }
  // Method to verify OTP
  verifyUser() {
    if (this.otp) {
      this.otpValid = true; // Simulate successful OTP verification
      this.message = 'OTP verified successfully.';
      this.router.navigate(['login']); // Redirect to login or another route
    } else {
      this.errorMessage = 'Invalid OTP.';
    }
    this.userService.verifyUser(this.otpEmail, this.otp).subscribe(
      response => {
        console.log(response)
        this.otpMessage = 'User verified successfully';
        this.otpErrorMessage = null;
        // Handle successful OTP verification, e.g., redirect or show success message
      },
      error => {
        this.otpErrorMessage = 'Error verifying user';
        this.otpMessage = null;
        console.error('Error verifying user:', error);
        // Handle OTP verification error
      }
    );
  }
}
