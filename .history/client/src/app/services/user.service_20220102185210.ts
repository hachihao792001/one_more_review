import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;
  constructor() { 
    user: {
    age: 20;
	country: "Vietnam";
	gender: true;
	image: "https://pbs.twimg.com/profile_images/1366571540549038081/ZjKB_X-y_400x400.jpg";
	isAdmin: boolean;
	name: string;
    }
  }


  getUser() {
    
    return this.user;
  }

  getUserReviews() {
    
  }
}
