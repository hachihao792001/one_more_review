import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FilmService } from 'src/app/services/film.service';
import { FilterResultService } from 'src/app/services/filter-result.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userInfo!: User;
	items!: any[];

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private filterResultService: FilterResultService,
    private profileService: ProfileService,
    private cookie: CookieService,
    private toast: ToastrService,
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    const id = this.cookie.get('USER_ID');
    this.profileService.getProfile(id).subscribe(
      (res) => {
        if (res) {
          console.log(res.user);
          this.userInfo = res.user;

					if (this.userInfo.isAdmin) {
						this.items.push({
              label: 'Quản lý phim',
              icon: 'pi pi-user-plus',
            }) 
            this.items.push({
              label: 'Quản lý tài khoản',
              icon: 'pi pi-user-plus',
            });
					}
        }
      },
      (err) => {
        this.spinner.hide();
        this.toast.error('CÓ LỖI KHI KẾT NỐI ĐẾN SERVER');
      }
    );

		this.items = [
        {
            label: 'Tài khoản',
            icon: 'pi pi-user-edit',
						url: '/profile',
        },
        {
            label: 'Đăng xuất',
            icon: 'pi pi-sign-out',
						command: () => {this.authService.signOut();},
        }
    ];
  }

  signOut(): void {
    this.authService.signOut();
  }
}
