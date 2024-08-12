import { Component } from '@angular/core';
import { UserService, PasswordResetRequest } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ActivatedRoute, } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
isLoginVisible: boolean = true; // Initially, the login modal is visible



  constructor(private userService: UserService, private router: Router, private sharedDataService: SharedDataService, private route: ActivatedRoute,) { }

  onLogin() {
    this.email = this.route.snapshot.queryParams['email'];
    this.userService.login(this.username, this.password).subscribe(response => {
      console.log('User data saved:', response);
      this.sharedDataService.setUserData(response);
      this.router.navigate(['/home']); // Navigate to the profile page after login
    }, error => {
      console.error('Error saving user data:', error);
      this.errorMessage = 'Invalid username or password';
    });
  }
  navigateToForgotPassword() {
    this.router.navigate(['forgotpassword']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const toggleIcon = document.getElementById('toggle-password')?.querySelector('img') as HTMLImageElement;

    if (this.showPassword) {
      passwordInput.type = 'text';
      toggleIcon.src = 'assets/eyeclose.jpeg';  // Path to the eye-close icon
      toggleIcon.alt = 'Hide password';
    } else {
      passwordInput.type = 'password';
      toggleIcon.src = 'assets/eyeopen.jpeg';  // Path to the eye-open icon
      toggleIcon.alt = 'Show password';
    }
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

  closeLogin() {
      this.isLoginVisible = false; // Hide the login modal
    
  }
}