import { Component } from '@angular/core';  
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent {
 

  user = new User();
  msg = '';
  termsAndConditionsChecked: boolean = false;
  isuseremailVal = false;
  userRegistrationAlertShown = false;

  constructor(private _router: Router, private userservice: UserService) { }

  ngOnInit(): void { }

  capitalizeFirstLetter() {
    if (this.user.username) {
      this.user.username = this.user.username.charAt(0).toUpperCase() + this.user.username.slice(1);
    }
  }

  showAlert1(message: string): void {
    if (!this.isuseremailVal) {
      alert(message);
      this.isuseremailVal = true;
    }
  }

  showAlert(message: string): void {
    if (!this.userRegistrationAlertShown) {
      alert(message);
      this.userRegistrationAlertShown = true;
    }
  }

  isuseremailValid() {
    if (!this.user.name || !this.user.username || !this.user.gender || !this.user.password || !this.user.email || !this.user.address || !this.user.mobileNo) {
      return false;
    } else {
      return true;
    }
  }

  isPasswordValid1(password: string): boolean {
    const minLength = 6;
    const minUpperCase = 1;
    const minLowerCase = 1;
    const minNumbers = 1;
    const minSpecialChars = 1;
    const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const upperCaseMatches = password.match(/[A-Z]/g);
    const lowerCaseMatches = password.match(/[a-z]/g);
    const numberMatches = password.match(/[0-9]/g);
    const specialCharMatches = password.match(specialCharsRegex);

    if (!password) {
      this.showAlert("Password cannot be null.");
      return false;
    }
    if (password.length < minLength) {
      this.showAlert("Password must be at least 6 characters long.");
      return false;
    }
    if (!upperCaseMatches || upperCaseMatches.length < minUpperCase) {
      this.showAlert("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!lowerCaseMatches || lowerCaseMatches.length < minLowerCase) {
      this.showAlert("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!numberMatches || numberMatches.length < minNumbers) {
      this.showAlert("Password must contain at least one number.");
      return false;
    }
    if (!specialCharMatches || specialCharMatches.length < minSpecialChars) {
      this.showAlert("Password must contain at least one special character.");
      return false;
    }
    return true;
  }

  registerUser(): void {
    if (!this.termsAndConditionsChecked) {
      this.showAlert("Please agree to the terms and conditions to register");
      console.log('Please agree to the terms and conditions to register.');
    } else if (!this.isPasswordValid1(this.user.password)) {
      this.showAlert("Please enter valid password");
      console.log('Please enter valid password.');
    } else if (!this.isuseremailValid()) {
      this.showAlert1("Enter all details");
      console.log('Please enter all details.');
    } else if (!this.ismobileNoValid(this.user.mobileNo)) {
      this.showAlert1("mobileNo number must be 10 digits");
      console.log('mobileNo number must be 10 digits.');
    } else {
      this.userservice.registerUser(this.user).subscribe(
        data => {
          console.log("Registration Success");
          sessionStorage.setItem("username", this.user.username);
          sessionStorage.setItem("gender", this.user.gender);
          alert('User registered successfully!');
          this._router.navigate(['/login']);
        },
        error => {
          console.log("Registration Failed");
          console.log(error.error);
          this.msg = "User with " + this.user.email + " already exists.";
        }
      );
      console.log(this.user);
      console.log('User registered successfully!');
    }
  }

  ismobileNoValid(mobileNo: string): boolean {
    const mobileNoPattern = /^[0-9]{10}$/;
    return mobileNoPattern.test(mobileNo);
  }

  validateNumber(event: KeyboardEvent) {
    const input = String.fromCharCode(event.keyCode);
    if (!/[0-9]/.test(input)) {
      event.preventDefault();
    }
  }

  enforceMaxLength() {
    if (this.user.mobileNo && this.user.mobileNo.length > 10) {
      this.user.mobileNo = this.user.mobileNo.slice(0, 10);
    }
  }
}