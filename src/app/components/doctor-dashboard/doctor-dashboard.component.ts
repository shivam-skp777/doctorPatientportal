import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/provider/admin.service';
import { AfterLoginService } from 'src/app/provider/after-login.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  reportList = new Array();
  constructor(public adminService: AdminService,public afterLoginService: AfterLoginService) { }

  ngOnInit() {
    this.getReportList();
  }

  // Get Report List Assigned 
  getReportList(){
    this.adminService.showSpinner();
    this.afterLoginService.getAssignedReportList().subscribe(res=>{
      console.log('Response --->',res);
      this.adminService.hideSpinner();
      if(res.status == '200'){
        this.reportList = res['data'];
      }else{
        this.adminService.showWarning(res['message'],'Report List');
      }
    },err=>{
      this.adminService.hideSpinner();
      console.log('Error---->',err);
      this.adminService.showError(err['message'],'Report List');
    })
  }

  // Download Report Functionality
  downloadReportFunc(reportUrl){
    // window.location.href=reportUrl;
    window.open(reportUrl,"_blank");
  //  this.adminService.downloadFile(reportUrl).subscribe(res=>{
  //    console.log("Report Response--->",res)
  //    if(res){
  //     saveAs(res,'report.pdf')
  //    }
  //  },err=>{
  //    console.log('Report Error--->',err)
  //  });
  }

}
