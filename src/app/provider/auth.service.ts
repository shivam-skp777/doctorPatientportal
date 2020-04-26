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
}
