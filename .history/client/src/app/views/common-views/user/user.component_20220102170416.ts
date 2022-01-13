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
  }
}
