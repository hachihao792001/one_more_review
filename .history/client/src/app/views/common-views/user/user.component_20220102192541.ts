import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService,
    private userService: UserService)
  { }

  user!: User;
  myReviews!: Review[];


  email!: any;
  name!: any;
  gender!: any;
  age!: any;
  time!: any;
  country!: any;
  avatar!: any;
  description!: any;

  createRange(number:number){
    // var items: number[] = [];
    // for(var i = 1; i <= number; i++){
    //   items.push(i);
    // }
    // return items;
    return new Array(number);
  }
  ngOnInit(): void {
    this.spinner.hide();
    this.user = this.userService.getUser(); // lay thong tin user
    this.myReviews = this.userService.getUserReviews(); // lay 1 mang gom cac bai review cua user nay
  }
}
