import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookie: CookieService, private router: Router) {}

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  token: any;

  public isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public isAuthenticated(): boolean {
    const accessTokenPayload: any = this.cookie.get(this.ACCESS_TOKEN);

    if (accessTokenPayload && accessTokenPayload !== '') {
			return true
		} else {
			return false;
		}
  }

  signOut(): void {
    this.cookie.deleteAll();
    this.router.navigate(['authenticate']);
  }
}
