import { Component } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';
import { UserService, PasswordResetRequest } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ActivatedRoute, } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
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

   // Method to register a temporary user
   registerUser() {
    if(this.otpVerificationNeeded){

      this.router.navigate(['/verifiyotpregister']);
    }
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
   
    this.isOtpRequired = true;
    this.otpVerificationNeeded = true; // Show OTP verification form
    this.message = 'Registration details submitted. Please verify OTP.';
    this.userService.tempRegisterUser(this.user).subscribe(
      response => {
        console.log('User registered successfully:', response);
        this.message = 'Registration successful. Please verify your OTP.';
        this.router.navigate(['verifyotpregister']);
        // Handle successful registration, e.g., show a success message or redirect
      },
      error => {
        console.error('Error registering user:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }

}
