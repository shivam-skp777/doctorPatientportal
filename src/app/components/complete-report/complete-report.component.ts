import { Component, OnInit } from '@angular/core';
import { AfterLoginService } from 'src/app/provider/after-login.service';
import { AdminService } from 'src/app/provider/admin.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-complete-report',
  templateUrl: './complete-report.component.html',
  styleUrls: ['./complete-report.component.css']
})
export class CompleteReportComponent implements OnInit {
  completeReportList = new Array();
  constructor(public afterLogin: AfterLoginService,public adminService: AdminService,public route: Router) { }

  ngOnInit() {
    this.getCompleteReportList();
  }

  // Get Completed Report List
  getCompleteReportList(){
    this.adminService.showSpinner();
    this.afterLogin.getCompleteReportList().subscribe(res=>{
      console.log('Complete Report List',res);
      this.adminService.hideSpinner();
      if(res.status == '200'){
        this.completeReportList = res['data'];
      }else{
        this.adminService.showWarning(res['message'],'Complete Report');
      }
    },err=>{
      this.adminService.hideSpinner();
      this.adminService.showError(err['message'],'Complete Report');
    })
  }
  
  // View Analysed Report
  viewReport(reportId){
    console.log('Report Id--->',reportId)
    let reportData: NavigationExtras = {
      queryParams: {
          reportID: reportId
      }
   };
   this.route.navigate(['/paticular-report'],reportData);
  }
}
