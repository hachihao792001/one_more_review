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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
})
export class AuthenticateComponent implements OnInit {
  signUpForm!: FormGroup;
  signInForm!: FormGroup;

  signInSubmitted = false;
  signInNotification: string = '';

  signUpSubmitted = false;
  signUpNotification: string = '';

  check!: any;

  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private service: ApiService,
    private router: Router,
    private cookie: CookieService,
    private profile: ProfileService,
    private toast: ToastrService
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

    this.spinner.show();

    const getValue = this.signUpForm.getRawValue();
    const data = { username: getValue.email, password: getValue.password };

    this.service.signUp(data).subscribe(
      (res) => {
        console.log(res);
        if (res && res.length !== 0) {
          this.cookie.set('ACCESS_TOKEN', res.token);
          this.cookie.set('USER_ID', res.user._id);
          this.router.navigate([`/`]);
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
				console.log(this.signUpForm);
        if (err && err.error && err.error.message && err.error.message !== '') {
          this.signUpNotification = err.error.message;
        } else {
          this.signUpNotification = 'Error';
        }
				this.toast.error(this.signUpNotification.toUpperCase());
				this.signUpSubmitted = false;
      }
    );
  }

  onLoginSubmit(): void {
    this.signInNotification = '';
    this.signInSubmitted = true;

    if (this.signInForm.invalid) {
      return;
    }

    this.spinner.show();

    const getValue = this.signInForm.getRawValue();
    const data = { username: getValue.email, password: getValue.password };

    this.service.signIn(data).subscribe(
      (res) => {
        if (res && res.length !== 0) {
          console.log(res);
          this.cookie.set('ACCESS_TOKEN', res.token);

          this.router.navigate([`/`]);
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        if (err && err.error && err.error.message && err.error.message !== '') {
          this.signInNotification = err.error.message;
        } else {
          this.signInNotification = 'Error';
        }
        this.toast.error(this.signInNotification.toUpperCase());
				this.signInSubmitted = false;
      }
    );
  }

  togglePoster(): void {
    $('.poster').toggleClass('left');
  }
}
