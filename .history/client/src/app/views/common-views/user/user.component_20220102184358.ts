import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService,
              private userService: UserService) { }

  user!: User;

  email!: any;
  name!: any;
  gender!: any;
  age!: any;
  time!: any;
  country!: any;
  avatar!: any;
  description!: any;

  ngOnInit(): void {
    this.spinner.hide();
    this.email = "hello@gmail.com";
    this.name = "Luc Binh Minh";
    this.gender = "Female";
    this.age = 20;
    this.time = "20/11/2001";
    this.country = "Vietnam";
    this.description = "hello moij nguoi!";
  }
}
