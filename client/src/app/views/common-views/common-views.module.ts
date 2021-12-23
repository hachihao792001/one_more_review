import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonViewsRoutingModule } from './common-views-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserComponent } from './user/user.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DropdownModule } from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    HomePageComponent,
    DashboardComponent,
    UserComponent,
    ReviewPageComponent,
    AuthenticateComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CommonViewsRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
		CarouselModule,
  ],
})
export class CommonViewsModule {}
