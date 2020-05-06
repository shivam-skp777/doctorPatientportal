import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminService } from './provider/admin.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './provider/auth.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RequestComponent } from './components/request/request.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AllUserComponent } from './components/all-user/all-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    SidemenuComponent,
    HeaderComponent,
    FooterComponent,
    RequestComponent,
    AddUserComponent,
    AllUserComponent,
    EditUserComponent,
    MyProfileComponent,
    DoctorDashboardComponent,
    ClientDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AdminService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
