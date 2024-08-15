import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
  }

  // Register User
  public registerUser(user: User): Observable<any> {
    return this.http.post<any>(`${NAV_URL}/api/users/user/register`, user);
  }

  // Login User
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${NAV_URL}/api/users/user/login/${username}/${password}`, { username, password });
  }

  // Logout User
  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  // Forgot Password
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${NAV_URL}/api/users/user/verifyMail/${email}`, {});
  }

  // Verify OTP
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${NAV_URL}/api/users/user/verifyOtpToRegister/`,{ email, otp });
  }

  // Reset Password after OTP verification
  resetPassword(userEmail: string, passwordResetRequest: PasswordResetRequest): Observable<string> {
    const url = `${NAV_URL}/api/users/user/resetPassword/${userEmail}`;
    return this.http.post<string>(url, passwordResetRequest, { responseType: 'text' as 'json' });
  }

  // Update User Details
  updateUser(userId: number, user: any): Observable<any> {
    return this.http.put(`${NAV_URL}/api/users/user/update/${userId}`, user);
  }

  // Get User By ID
  getUserById(userId: number): Observable<any> {
    return this.http.get(`${NAV_URL}/api/users/user/getUserById/${userId}`);
  }

  // Temporary Register User
  tempRegisterUser(user: TemporaryUser): Observable<string> {
    return this.http.post<string>(`${NAV_URL}/api/users/user/register`, user, { responseType: 'text' as 'json' });
  }



  // Verify User to Complete Registration
  verifyUser(email: string, otp: any): Observable<string> {
    const url = `${NAV_URL}/api/users/user/verifyOtpToRegister?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`;
    return this.http.post<string>(url, {}, this.getHttpOptions());
  }

  // Verify OTP to Complete password reset
  validateOtp(otp: string, userEmail: string): Observable<string> {
    const url = `${NAV_URL}/api/users/user/verifyForgotPasswordOtp`;
    const params = { otp, userEmail };
    return this.http.post<string>(url, null, { params, responseType: 'text' as 'json' });
  }


  updateUserDetails(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${NAV_URL}/api/users/user/update/${userId}`, user);
  }

  uploadUserProfilePicture(formData: FormData, userId: number): Observable<any> {
    return this.http.post(`${NAV_URL}/api/profile_pictures/uploadUserPicture/${userId}`, formData, {
      responseType: 'text'  // Expecting a plain text response
    });
  }

  getUserProfilePicture(userId: number): Observable<Blob> {
    return this.http.get(`${NAV_URL}/api/users/user/getUserById/${userId}`, { responseType: 'blob' });
  }

  updateUserProfilePicture(userId: number, formData: FormData): Observable<any> {
    return this.http.put(`${NAV_URL}/api/profile_pictures/updateUserPicture/${userId}`, formData, {
      responseType: 'text'
    });
  }

  // Helper method to set HTTP headers
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}

// Define the interface for the password reset request body
export interface PasswordResetRequest {
  password: string;
  confirmPassword: string;
  otp: string;
}

export interface TemporaryUser {
  name: string;
  email: string;
  gender: string;
  mobileNo: string;
  address: string;
  username: string;
  password: string;
  confirmPassword: string;
  otp?: string; // OTP is optional
  otpExpiry?: string; // OTP expiry is optional

}