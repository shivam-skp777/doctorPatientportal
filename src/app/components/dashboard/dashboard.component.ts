import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/provider/admin.service';
import { AfterLoginService } from 'src/app/provider/after-login.service';
declare var jQuery:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router:Router, public adminService: AdminService, public afterLoginService: AfterLoginService) { }

  ngOnInit() {
    this.getCountFunct();
  }

  goToUserList(){
   this.router.navigate(['/all-user'])
  }

  // Get Count Functionality
  getCountFunct(){
    this.adminService.showSpinner();
    this.afterLoginService.getCountApiFunct().subscribe(res=>{
      console.log("Dashboard--->",res);
      this.adminService.hideSpinner();
      if(res.status == '200'){

      }else{
        this.adminService.showWarning(res['message'],'Dashboard')
      }
    },err=>{
      this.adminService.showError(err['message'],'Dashboard')
    })
  }

}
