import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/provider/admin.service';
import { AfterLoginService } from 'src/app/provider/after-login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:FormGroup;
  userDetail = new Object();
    constructor(public router:Router,public adminService: AdminService,public afterLogin: AfterLoginService) {
      this.changePasswordForm = new FormGroup({
        newPassword: new FormControl('',[Validators.required,Validators.pattern('')]),
        confirmPassword: new FormControl('',Validators.required)
      })
     }
  
    ngOnInit() {
      this.getProfileData();
    }

    // Get Profile Data
    getProfileData(){
      this.adminService.showSpinner();
      this.afterLogin.getUserProfile().subscribe(res=>{
        console.log('Response of my profile---->>>',JSON.stringify(res));
        this.adminService.hideSpinner();
        if(res.status == '200'){
         this.userDetail = res.data[0];
        }else{
         this.adminService.showWarning(res['message'],'Get Profile');
        }
      },err=>{
        this.adminService.hideSpinner();
        this.adminService.showError('Something Went Wrong','Get Profile');
      })
    }
  
    // Change Password Functionality
    changePasswordFunc(){
      console.log('reset Password Function',this.changePasswordForm);
      if(this.changePasswordForm.controls['newPassword'].status=='INVALID' && this.changePasswordForm.controls['newPassword'].touched){
        this.adminService.showError('Invalid New Password','New Password');
      }else if(this.changePasswordForm.value.newPassword != this.changePasswordForm.value.confirmPassword){
        this.adminService.showError('New password doesnot match with confirm password','Confirm Password');
       }else if(this.changePasswordForm.value.newPassword == '' || this.changePasswordForm.value.confirmPassword == ''){
        this.adminService.showError('Please Enter The Password','Confirm Password');
       }
      else{
        let apiReq = {
          "email":this.userDetail['email'],
          "_id": this.userDetail['_id'],
          "password":this.changePasswordForm.value.newPassword,
          "role":this.userDetail['userType'],
          "firstName":this.userDetail['firstName'],
          "lastName":this.userDetail['lastName'],
          "mobileNumber":this.userDetail['contact']
        }
        this.adminService.showSpinner();
        this.afterLogin.changeFunc(apiReq).subscribe(res=>{
          this.adminService.hideSpinner();
          if(res.status){
            this.adminService.showSuccess('User Password Updated Successfully',"Change Password")
            this.router.navigate(['/my-profile']);
          }else{
            this.adminService.showWarning(res.message,'Change Password');
          }
        },err=>{
          this.adminService.hideSpinner();
          this.adminService.showError('Something Went Wrong','Change Password');
        })
      }    
    }
  
}
