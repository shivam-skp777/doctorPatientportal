import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestComponent } from './components/request/request.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AllUserComponent } from './components/all-user/all-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';


const routes: Routes = [
{path:'', redirectTo:'login' , pathMatch:'full'},
{path:'login' , component: LoginComponent},
{path:'forgot' , component:ForgotPasswordComponent},
{path:'reset',component:ResetPasswordComponent},
{path:'home',component:DashboardComponent},
{path:'request',component:RequestComponent},
{path:'add-user',component:AddUserComponent},
{path:'all-user',component:AllUserComponent},
{path:'edit-user',component:EditUserComponent},
{path:'my-profile',component:MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
