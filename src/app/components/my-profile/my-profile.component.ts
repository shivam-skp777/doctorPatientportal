import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/provider/admin.service';
import { AfterLoginService } from 'src/app/provider/after-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  userDetail:any={};
  constructor(public adminService:AdminService,public afterLogin: AfterLoginService, public router:Router) { }

  ngOnInit() {
    this.getMyProfileFunc();
  }
  
  // Get My Profile Data
  getMyProfileFunc(){
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
      this.adminService.showError(err['message'],'Get Profile');
    })
  }
}
