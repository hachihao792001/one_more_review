import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}

  email!: any;
  name!: any;
  gender!: any;
  age!: any;
  time!: any;
  country!: any;
  avatar!: any;

  ngOnInit(): void {
    this.spinner.hide();
    this.email = "hello@gmail.com";
    this.name = "Luc binh minh";
    this.gender = "Female";
    this.age = 20;
    this.time = "20/11/2001";
    this.country = "vietnam";
    this.avatar = "https://pbs.twimg.com/profile_images/1366571540549038081/ZjKB_X-y_400x400.jpg"
  }
}
