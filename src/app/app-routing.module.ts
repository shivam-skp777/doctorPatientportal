import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [{path:'', redirectTo:'login' , pathMatch:'full'},
{path:'login' , component: LoginComponent},
{path:'forgot' , component:ForgotPasswordComponent},
{path:'reset',component:ResetPasswordComponent},
{path:'home',component:DashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
