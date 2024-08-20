import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css']
})
export class AdminregisterComponent {

  registerForm: FormGroup;
  profilePicture: File | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: [null]
    });
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.profilePicture = event.target.files[0];
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('adminData', JSON.stringify(this.registerForm.value));
      if (this.profilePicture) {
        formData.append('profilePicture', this.profilePicture);
      }

      this.adminService.registerAdmin(formData).subscribe(
        response => {
          console.log(response); // This will print "Successfully registered Admin"
          alert(response); // This will show the message in an alert
          this.router.navigate(['/adminlogin']);

        },
        error => {
          console.error('Error registering admin:', error);
          alert('Failed to register admin.');
        }
      );
    }
  }
}      


