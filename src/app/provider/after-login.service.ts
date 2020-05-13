import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

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

  // Accept The assigned report by doctor
  acceptAssignedReportApiFunc(reqBody){
    return this.adminService.postService('client/confirmation_assign_request_by_doctor',reqBody,this.adminService.getRequestHeaders());
  }

     // Deny The assigned report by doctor
  denyAssignedReportApiFunc(reqBody){
    return this.adminService.postService('client/denied_assign_request_by_doctor',reqBody,this.adminService.getRequestHeaders());
  }

  // Report Analysis Api Functionality
  reportAnalyseApiFunc(reqBody){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.adminService.reportAnalysisFunc(reqBody,headers);
  }

  // Save Report Analysis Api Function
  saveAnalysedReportFunc(reqBody){
    return this.adminService.postService('client/save_report_result',reqBody,this.adminService.getRequestHeaders());
  }

  // Get Complete Report List 
  getCompleteReportList(){
    return this.adminService.getService('client/get_all_complerte_report',this.adminService.getRequestHeaders());
  }

  // Get Notification List
  getNotificationList(){
    return this.adminService.getService('client/get_all_notification',this.adminService.getRequestHeaders());
  }

  // Mark As Read Functionality
  markAsRead(reqBody){
    return this.adminService.postService('client/read_notification',reqBody,this.adminService.getRequestHeaders());
  }

  // Change Password Functionality
  changeFunc(reqBody){
    return this.adminService.postService('auth/change_password',reqBody,this.adminService.getRequestHeaders());
  }
}
