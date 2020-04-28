import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public adminService: AdminService) { }

  /******* Login Api Functionality */
  loginApiFunction(reqBody){
    return this.adminService.postService('auth/login',reqBody,this.adminService.getRequestHeaders());
  }

  /******* Forgot Password Api Functionality  */
  forgotPasswordApiFunction(reqBody){
    return this.adminService.postService('auth/forgot',reqBody,this.adminService.getRequestHeaders());
  }

  /********* Verify OTP Api Functionality */
  verifyOtpApiFunction(reqBody){
    return this.adminService.postService('auth/verify-otp',reqBody,this.adminService.getRequestHeaders());
  }

  /******** Reset Password Api Functionality */
  resetPasswordApiFunction(reqBody){
    return this.adminService.postService('auth/reset-password',reqBody,this.adminService.getRequestHeaders());
  }
}
