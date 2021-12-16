import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './../../../services/api.service';
import { Router } from '@angular/router';
import Validation from '../../../utils/validation';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent implements OnInit {
  signUpForm!: FormGroup;
  signInForm!: FormGroup;

  signInSubmitted = false;
  signInNotification: String = '';

  signUpSubmitted = false;
  signUpNotification: String = '';

  check!: any;

  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private service: ApiService,
    private router: Router,
    private cookie: CookieService,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {
    this.spinner.hide().then();

    this.check = this.cookie.get('ACCESS_TOKEN');
    if (this.check) {
      this.router.navigateByUrl('');
    }

    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.signUpForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: [Validation.match('password', 'confirmPassword')] }
    );
  }

  //   fl là form login, fr là form register
  get fl(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }

  get fr(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

  onResigterSubmit(): void {
    this.signUpNotification = '';
    this.signUpSubmitted = true;

    if (this.signUpForm.invalid) {
      return;
    }

    //this.spinner.show();

    const getValue = this.signUpForm.getRawValue();
    const data = { email: getValue.email, password: getValue.password };

    console.log(data);

    // xử lý API sign up
  }

  onLoginSubmit(): void {
    this.signInNotification = '';
    this.signInSubmitted = true;

    if (this.signInForm.invalid) {
      return;
    }

    //this.spinner.show();

    const getValue = this.signInForm.getRawValue();
    const data = { email: getValue.email, password: getValue.password };

    console.log(data);

    // xử lý API sign in

    // this.service.signIn(data).subscribe(
    //   (res) => {
    //     if (res && res.length !== 0) {
    //       this.cookie.set('ACCESS_TOKEN', res.token);

    //       this.cookie.set('BTB_LOGIN_EMAIL', data.email);

    //       this.router.navigate([`dashboard`]);
    //     }
    //     this.spinner.hide();
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //     if (
    //       err &&
    //       err.error &&
    //       err.error.error.message &&
    //       err.error.error.message !== ''
    //     ) {
    //       this.notification = err.error.error.message;
    //     } else {
    //       this.notification = 'notMatch';
    //     }
    //   }
    // );
  }

  togglePoster(): void {
    $('.poster').toggleClass('left');
  }
}
