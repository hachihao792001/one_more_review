import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  name!: string;
  email!: string;
  id!: string;
  success: boolean = false;
  failed: boolean = false;
  user!:User;
  constructor(private spinner: NgxSpinnerService,
  private userService:UserService) { 
    
  }

  ngOnInit(): void {
    this.spinner.hide().then();

  }
  onSubmit(): void{
    this.userService.getUser(this.id).subscribe((res) => {
      this.user = res.user;
			this.spinner.hide().then();
    });
    if (this.user.username !== this.email) {
      return; this.failed = true;
    }

    this.user.isAdmin = true;
    this.userService.updateUser(this.user, this.id).subscribe();
    this.success = true;
  }
}
