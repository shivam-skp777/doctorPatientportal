import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterLoginService } from 'src/app/provider/after-login.service';
import { AdminService } from 'src/app/provider/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notificationList = new Array();
  constructor(public router:Router,public afterLogin: AfterLoginService,public adminService:AdminService) { 
   }

  ngOnInit() {
    this.getNotificationList();
  }

  logoutFunc(){
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName')
    this.router.navigate(['/login'])
  }

  // Get Notification List
  getNotificationList(){
    this.adminService.showSpinner();
    this.afterLogin.getNotificationList().subscribe(res=>{
      console.log('Res--->',res);
      this.adminService.hideSpinner();
      if(res.status == '200'){
        this.notificationList = res.data.filter(x=>(x.status != 'OLD'));
      }else{
        this.adminService.showWarning(res['message'],'Notification List')
      }
    },err=>{
      console.log('Err--->',err);
      this.adminService.hideSpinner();
      this.adminService.showError(err['message'],'Notification List')
    })
  }
  

  // Mark Read Notification
  markAsRead(notification){
    console.log('Notification---->>>',notification);
    notification['status'] = 'OLD';
    this.adminService.showSpinner();
    this.afterLogin.markAsRead(notification).subscribe(res=>{
      this.adminService.hideSpinner();
      if(res.status == '200'){
        this.getNotificationList();
      }else{
        this.adminService.showWarning(res['message'],'Read Notification');
      }
    },err=>{
      this.adminService.hideSpinner();
      this.adminService.showError(err['message'],'Read Notification');
    })
  }
}
