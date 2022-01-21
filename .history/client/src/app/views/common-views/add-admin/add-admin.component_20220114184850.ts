import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
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
  isSubmitted: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService, private toast: ToastrService,
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
    this.isSubmitted = true;
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

    this.spinner.show();
    this.userService.updateUser(this.user, this.id).subscribe(
      (data : any) => {
      this.toast.success('Cập nhật profile thành công');
      this.spinner.hide();
    },
    (error) => {
      this.toast.error(`${'Cập nhật profile thất bại:'} ${error.message}`);
    });    console.log(this.user);
    
  }

  onCancel() {
    this.isSubmitted = false;
    this.name = '';
    this.email = '';
    this.id = '';
  }
  length(value: string): number {
    return value?.trim().length;
  }
}