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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  confirmEmailForm!: FormGroup;

  confirmEmailSubmitted = false;
  confirmEmailNotification: String = '';

  forgotPasswordSubmitted = false;
  forgotPasswordNotification: String = '';

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

    this.confirmEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.resetPasswordForm = this.formBuilder.group(
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
    return this.confirmEmailForm.controls;
  }

  get fr(): { [key: string]: AbstractControl } {
    return this.resetPasswordForm.controls;
  }

  onResetPasswordSubmit(): void {
    this.forgotPasswordNotification = '';
    this.forgotPasswordSubmitted = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }

    //this.spinner.show();

    const getValue = this.resetPasswordForm.getRawValue();
    const data = { email: getValue.email, password: getValue.password };

    console.log(data);

    // xử lý API sign up
  }

  onConfirmEmailSubmit(): void {
    this.confirmEmailNotification = '';
    this.confirmEmailSubmitted = true;

    if (this.confirmEmailForm.invalid) {
      return;
    }

    //this.spinner.show();

    const getValue = this.confirmEmailForm.getRawValue();
    const data = { email: getValue.email, password: getValue.password };

    console.log(data);

    // xử lý API sign in

    // this.service.confirmEmail(data).subscribe(
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
