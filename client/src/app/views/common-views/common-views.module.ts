import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonViewsRoutingModule } from './common-views-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserComponent } from './user/user.component';
import { ReviewPageComponent } from './review-page/review-page.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    HomePageComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    UserComponent,
    ReviewPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CommonViewsRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CommonViewsModule {}
