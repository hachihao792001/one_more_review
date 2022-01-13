import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;
  reviews!: Review[];


  constructor() { 
    this.user =  {
    age: 20,
	country: "Vietnam",
	gender: true,
	image: "https://pbs.twimg.com/profile_images/1366571540549038081/ZjKB_X-y_400x400.jpg",
	isAdmin: false,
      name: "Luc Binh Minh",
      email: "xinchaocacbanyeucuakem@gmail.com"
    }


    this.reviews = [
      {_id: "1234531  5243356",
        name: "Spider man - no way home", 
        date: "1/1/2022", 
        rating: 4, 
          author: "12323123"

      },
      {
        _id: "1234531  522143356",
        name: "eternals", 
        date: "21/9/2021", 
        rating: 5, 
          author: "12323123"
      }
    ]
  }


  getUser() {
    
    return this.user;
  }

  getUserReviews() {
    return this.reviews;
  }
}
