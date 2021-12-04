import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  httpOptions!: any;
  private apiUrl = environment.serverUrl;

  dataProfile!: any;
  subjectProfile = new Subject<boolean>();
  public isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private spinner: NgxSpinnerService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getDataProfile(): void {
    this.spinner.show();
    this.getProfile().subscribe(
      (res) => {
        if (res) {
          this.dataProfile = res;
          if (res) {
            // const id = res.id;
            // const firstName = res.firstName;
            // const lastName = res.lastName;
            // const phoneNumber = res.phoneNumber;
            // const email = res.email;
            // const avatar = res.avatar;
            // const apiKey = res.apiKey;
            // const secretKey = res.secretKey;
            // const userRoleId = res.userRoleId;
            const lang = this.cookie.get('LANG');

            if (lang) {
              this.cookie.set('LANG', lang);
            } else {
              this.cookie.set('LANG', 'en');
            }
          }

          this.subjectProfile.next(true);
          if (!this.isReady.value) {
            this.isReady.next(true);
          }
        }
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  loginBtbManager(email: String, password: String): void {
    this.logBtbManager(email, password).subscribe();
  }

  public logBtbManager(email: String, password: String): Observable<any> {
    const data = {
      login_email: email,
      password: password,
    };
    const options = {
      observe: 'response' as 'body',
    };

    return this.http.post<any>(
      `${this.apiUrl}/public/auth/login`,
      data,
      options
    );
  }

  clearDataProfile(): void {
    if (
      this.dataProfile &&
      Object.getOwnPropertyNames(this.dataProfile).length
    ) {
      this.dataProfile = {};
    }
  }

  public getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/get_profile`);
  }

  public updateProfile(user: User): any {
    return this.http.post<User>(
      `${this.apiUrl}/user/update_profile`,
      user,
      this.httpOptions
    );
  }
}