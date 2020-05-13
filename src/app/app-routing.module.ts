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
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { CompleteReportComponent } from './components/complete-report/complete-report.component';
import { ViewReportComponent } from './components/view-report/view-report.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


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
{path:'my-profile',component:MyProfileComponent},
{path:'doctorDashboard',component:DoctorDashboardComponent},
{path:'clientDashboard',component:ClientDashboardComponent},
{path:'reportList', component:ReportListComponent},
{path:'complete-report', component:CompleteReportComponent},
{path:'paticular-report', component:ViewReportComponent},
{path:'change-password', component:ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
