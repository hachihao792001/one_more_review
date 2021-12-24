import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FilterResultComponent } from './filter-result/filter-result.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'authenticate',
    component: AuthenticateComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'filter-result',
    component: FilterResultComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonViewsRoutingModule {}
