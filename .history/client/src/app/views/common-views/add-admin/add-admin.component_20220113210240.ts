import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  name: string = '';
  email: string = '';
  id: string = '';
  user!: User;
  isSubmited: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private router: Router
  ) {}


 
    
  ngOnInit(): void {
    this.spinner.hide().then();
    const id = localStorage.getItem('USER_ID') || '';
    this.userService.getUser(id).subscribe((res) => {
      if (!res.user.isAdmin) this.router.navigate(['/']);
    });
  }

  onSubmit(): void {
    this.isSubmited = true;
    this.userService.getUser(this.id).subscribe((res) => {
      this.user = res.user;
      this.spinner.hide().then();
      if (!this.user.isAdmin) this.router.navigate(['/']);
    });
    if (this.user.username !== this.email) {
      alert('Add admin failed! Email or ID is incorrect!');
      return;
    }
    this.user.isAdmin = true;
    this.userService.updateUser(this.user, this.id).subscribe();
    console.log(this.user);
    alert('Add admin Successful!y');
  }

  onCancel() {
    this.isSubmited = false;
    this.name = '';
    this.email = '';
    this.id = '';
  }
}
