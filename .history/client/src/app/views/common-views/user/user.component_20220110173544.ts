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
  id!: any;
  ngOnInit(): void {
   this.id = localStorage.getItem('USER_ID');
    this.userService.getUser(this.id).subscribe((res) => {
      this.user = res.user;
  }
}
