import { Component } from '@angular/core';
import { UserService, PasswordResetRequest } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
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

  constructor(
    private userService: UserService, 
    private router: Router, 
    private sharedDataService: SharedDataService, 
    private route: ActivatedRoute
  ) {}

  requestReset() {
    this.userService.forgotPassword(this.email).subscribe(
      response => {
        // Set the success message
        this.message = 'Password reset link has been sent to your email.';

        // Log the response for debugging
        console.log('This is a request for reset', response);

        // Redirect 
        this.router.navigate(['verifyotpreset']);
        
      }, 
      error => {
        // Set the error message if something goes wrong
        
        console.error('Error occurred while sending reset instructions', error);
      }
    );
     setTimeout(() => {
          this.router.navigate(['verifyotpreset']);
        }, 6000); 
  }
}
