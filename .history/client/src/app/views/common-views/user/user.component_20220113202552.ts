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
  edit_age!: string;
  edit_country!: string;
  edit_gender!: boolean;
  edit_name!: string;
  
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
    console.log(this.edit_age);    console.log(this.edit_name);
    console.log(this.edit_gender);
    console.log(this.edit_country);

    this.user.age = parseInt(this.edit_age) ||this.user.age ;
    this.user.country = this.edit_country || this.user.country ;
    this.user.name = this.edit_name || this.user.name;
    this.user.gender = this.edit_gender || this.user.gender;
    console.log(this.edit_gender);
    this.editStatus = !this.editStatus;
    this.userService.updateUser(this.user,this.id).subscribe();
    this.spinner.hide();
    //   window.location.reload();
  }
}
