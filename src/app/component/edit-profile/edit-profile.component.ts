import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sharedDataService: SharedDataService,
    private userService: UserService
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
        id: userData.id, // Make sure to patch the id value
        name: userData.name,
        username: userData.username,
        email: userData.email,
        gender: userData.gender,
        mobileNo: userData.mobileNo,
        address: userData.address,
        password: userData.password,
        confirmPassword: userData.confirmPassword

      });
    }
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      this.userService.updateUserDetails(this.editProfileForm.value).subscribe(
        (response) => {
          console.log('User data saved:', response);
          this.sharedDataService.setUserData(response);
          
          alert('Data saved successfully!');
        },
      )
      // Handle form submission, for example, update user data
      console.log('Form Submitted', this.editProfileForm.value);
    }
  }
}