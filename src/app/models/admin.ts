// src/app/models/admin.model.ts

export class Admin {
    id?: number;
    name: string;
    mobileNo: string;
    username: string;
    password: string;
    email: string;
    profilePicture?: Uint8Array; // Using Uint8Array for binary data
  
    constructor(
      name: string,
      mobileNo: string,
      username: string,
      password: string,
      email: string,
      profilePicture?: Uint8Array,
      id?: number
    ) {
      this.name = name;
      this.mobileNo = mobileNo;
      this.username = username;
      this.password = password;
      this.email = email;
      this.profilePicture = profilePicture;
      this.id = id;
    }
  }
  