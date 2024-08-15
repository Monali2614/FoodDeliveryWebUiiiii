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
  selectedFile: File | null = null;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private registerService: RegisterService,
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  registerUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
  
    const formData = new FormData();
    formData.append('userData', JSON.stringify(this.userForm.value));
    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }
  
    this.registerService.newregisterUser(formData).subscribe(
      response => {
        console.log('User registered successfully:', response);
        this.message = 'Registration successful. Please verify your OTP.';
        
      },
      error => {
        console.error('user registered');
        this.router.navigate(['verifyotpregister']);
      }
    );
  }
  
}