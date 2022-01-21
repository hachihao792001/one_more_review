import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Review } from 'src/app/models/review';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService,   private formBuilder: FormBuilder,
    private userService: UserService)
  { }
  editStatus: boolean = false;
  user!: User;
  id!: any;
  checkoutForm = this.formBuilder.group({
    edit_age: '',
    edit_country: '',
    edit_gender:''
  });

 

  ngOnInit(): void {
    this.id = localStorage.getItem('USER_ID');
    this.userService.getUser(this.id).subscribe((res) => {
      this.user = res.user;
			this.spinner.hide().then();
    });
  }

  onEditProfile(): void{
    this.editStatus = !this.editStatus;
  }

  onSave(): void {
    this.editStatus = !this.editStatus;
  }
  onSubmit(): void {
    this.user.age = parseInt(this.edit_age);
    this.user.country = this.edit_country;
    console.log(this.user);
  }
}