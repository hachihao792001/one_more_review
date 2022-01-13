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

  resetPasswordSubmitted = false;
  resetPasswordNotification: String = '';

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

    // xac thuc digit code cac kieu :v
    this.confirmEmailForm = this.formBuilder.group({
      digitCode: ['', [Validators.required, Validators.maxLength(4)]],
    });

    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: [Validation.match('password', 'confirmPassword')] }
    );
  }

  //   fc là form confirm email, fr là form reset password
  get fc(): { [key: string]: AbstractControl } {
    return this.confirmEmailForm.controls;
  }

  get fr(): { [key: string]: AbstractControl } {
    return this.resetPasswordForm.controls;
  }

  onResetPasswordSubmit(): void {
    this.resetPasswordNotification = '';
    this.resetPasswordSubmitted = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }
    const getValue = this.resetPasswordForm.getRawValue();
    const data = { password: getValue.password, confirmPassword: getValue.confirmPassword };
    console.log(data);
  }

  onConfirmEmailSubmit(): void {
    this.confirmEmailNotification = '';
    this.confirmEmailSubmitted = true;
    if (this.confirmEmailForm.invalid) {
      return;
    }
    const getValue = this.confirmEmailForm.getRawValue();
    const data = { digitCode: getValue.digitCode };
    console.log(data);
  }

  togglePoster(confirmResult: boolean): void {
    if (confirmResult)
      $('.poster').toggleClass('left');
    else
      return;
  }
}