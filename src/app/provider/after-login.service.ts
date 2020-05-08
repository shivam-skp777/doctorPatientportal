import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService {
myProfileValue = new BehaviorSubject('');
myProfileObserve = this.myProfileValue.asObservable();
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

  // Detect The Change Of UserProfile
  detectProfileChange(profileValue){
    this.myProfileValue.next(profileValue);
  }

  // Upload Image Api 
  uploadImageApi(reqBody){
    return this.adminService.postFormService('util/upload_media',reqBody);
  }

  // Add Report Functionality
  addReportFunction(reqBody){
    return this.adminService.postService('client/add_report',reqBody,this.adminService.getRequestHeaders())
  }

  // Get All Client Report Api Function
  getAllReportOfClient(){
    return this.adminService.getService('client/get_client_reports',this.adminService.getRequestHeaders());
  }

  // Assign Doctor to the client
  assignDoctor(reqBody){
    return this.adminService.postService('client/assign_doctor',reqBody,this.adminService.getRequestHeaders());
  }

  // Get All Assigned Report To Doctor
  getAssignedReportList(){
    return this.adminService.getService('client/get_all_assigned_reports',this.adminService.getRequestHeaders());
  }

  // Get Doctor List
  getDoctorList(){
    return this.adminService.getService('auth/get_doctor_list',this.adminService.getRequestHeaders());
  }

  // Get All Client's Report
  getAllClientReport(){
    return this.adminService.getService('client/get_all_client_reports',this.adminService.getRequestHeaders());
  }

}
