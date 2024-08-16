import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private sharedDataService: SharedDataService,
    private userService: UserService,
    private router: Router
  ) {
    this.editProfileForm = this.fb.group({
      id: [''], // Add the id field to the form
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      mobileNo: ['', Validators.required],
      address: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userData = this.sharedDataService.getUserData();
    if (userData) {
      this.editProfileForm.patchValue({
        id: userData.id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        gender: userData.gender,
        mobileNo: userData.mobileNo,
        address: userData.address,
        password: userData.password,
        confirmPassword: userData.confirmPassword
      });

      // Disable the username field
      this.editProfileForm.get('username')?.disable();
    }
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const userId = this.editProfileForm.value.id; // Get user ID from the form
      const user: User = this.editProfileForm.getRawValue(); // Use getRawValue() to get the form values including disabled fields

      this.userService.updateUserDetails(userId, user, this.selectedFile).subscribe(
        (response: User) => { // Explicitly type the response
          console.log('User data saved:', response);
          this.sharedDataService.setUserData(response);
          alert('Data saved successfully!');
        },
        error => {
          console.error('Error saving user data:', error);
          alert('Error saving data. Please try again.');
        }
      );
    }
  }

  navigateHome(): void {
    this.router.navigate(['/']); // Navigate to home or another route
  }
}
