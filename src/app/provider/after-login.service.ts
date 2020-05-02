import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService {

  constructor(public adminService: AdminService) { }

  // Get Count Regarding Roles Api Functionality
  getCountApiFunct(){
    return this.adminService.getService('auth/get_user_count',this.adminService.getRequestHeaders());
  }

  // Get All User List Functionality
  getAllUserList(){
    return this.adminService.getService('auth/get_all_user',this.adminService.getRequestHeaders());
  }

  //Get Data of Selected User
  getDataOfSelectedUser(reqBody){
    return this.adminService.postService('auth/get_my_detail',reqBody,this.adminService.getRequestHeaders());
  }

  // Update User Data Api Function
  updateUserApiFunc(reqBody){
    return this.adminService.postService('auth/edit_user',reqBody,this.adminService.getRequestHeaders());
  }

  // Delete The Selected User Function
  deleteUserFunctionality(reqBody){
    return this.adminService.postService('auth/delete_user',reqBody,this.adminService.getRequestHeaders());
  }

  // User Profile Api Function
  getUserProfile(){
    return this.adminService.getService('auth/get_my_profile',this.adminService.getRequestHeaders());
  }
}
