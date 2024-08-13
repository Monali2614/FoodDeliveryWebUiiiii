import { Component } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';
import { UserService, PasswordResetRequest } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ActivatedRoute, } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
 
  errorMessage: string = '';
  message: string = '';
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.mobileNumberValidator]],
      address: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      termsAndConditions: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  mobileNumberValidator(control: any) {
    if (control.value && (control.value.length !== 10 || isNaN(control.value))) {
      return { invalidMobileNumber: true };
    }
    return null;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  registerUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.userService.tempRegisterUser(this.userForm.value).subscribe(
      response => {
        console.log('User registered successfully:', response);
        this.message = 'Registration successful. Please verify your OTP.';
        this.router.navigate(['verifyotpregister']);
      },
      error => {
        console.error('Error registering user:', error);
        this.errorMessage = 'Error registering user. Please try again.';
      }
    );
  }
}