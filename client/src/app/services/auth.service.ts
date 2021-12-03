import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookie: CookieService, private router: Router) {}

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  token: any;

  public isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isAuthenticated(): boolean {
    const accessTokenPayload: any = this.cookie.get(this.ACCESS_TOKEN);

    if (accessTokenPayload && accessTokenPayload !== '') {
      try {
        this.token = this.parseJwt(accessTokenPayload);
      } catch {
        return false;
      }

      const current = Math.floor(new Date().getTime() / 1000);
      if (this.token.exp < current) {
        this.signOut();
        return false;
      } else {
        const timeOut = (this.token.exp - current) * 1000;
        setTimeout(() => {
          this.signOut();
        }, timeOut);
      }
      if (!this.isReady.value) {
        this.isReady.next(true);
      }
      return true;
    }
    this.isReady.next(false);
    return false;
  }

  parseJwt(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  signOut(): void {
    this.cookie.deleteAll();
    this.router.navigate(['sign-in']);
  }
}
