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
 userCount:any={'client':0 , 'doctor': 0, 'pending':0 , 'deleted':0}
 reportList= new Array();
  constructor(public router:Router, public adminService: AdminService, public afterLoginService: AfterLoginService) { }

  ngOnInit() {
    this.getCountFunct();
    this.getAllReportFunc();
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
        this.userCount['client'] = res.data['client'][0].client;
        this.userCount['doctor'] = res.data['doctor'][0].doctor;
        // this.userCount['pending'] = res.data['pending'][0].pending;
        // this.userCount['deleted'] = res.data['deleted'][0].deleted;
      }else{
        this.adminService.showWarning(res['message'],'Dashboard')
      }
    },err=>{
      this.adminService.showError(err['message'],'Dashboard')
    })
  }

  // Get All The Report Present
  getAllReportFunc(){
    this.adminService.showSpinner();
    this.afterLoginService.getAllClientReport().subscribe(res=>{
      console.log('Response ---->>>',res);
      this.adminService.hideSpinner();
      if(res.status == '200'){
       this.reportList  = res.data.filter(x=>(x.status != 'PENDING'));
      }else{
        this.adminService.showWarning(res['message'],'Report List')
      }
    },err=>{
      console.log('Err=>',err);
      this.adminService.hideSpinner();
      this.adminService.showError(err['message'],'Report List')
    })
  }

}
