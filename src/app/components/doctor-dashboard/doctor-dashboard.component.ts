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
  selectedReport = new Object();
  medicalKeyward = new Array();
  constructor(public adminService: AdminService,public afterLoginService: AfterLoginService) {
    this.medicalKeyward = this.adminService.reportKeywards;
   }

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
 
  // Accept The Assigned Report
  acceptReport(report){
    let apiReq = {
      "_id":report._id,"reporturl":report.reporturl,"clientId":report.clientId,"assignedDocterId":report.assignedDocterId , "status":"IN PROGRESS"
      }
      this.adminService.showSpinner();
      this.afterLoginService.acceptAssignedReportApiFunc(apiReq).subscribe(res=>{
        console.log("Response of accept",res);
        this.adminService.hideSpinner();
        if(res.status == '200'){
          this.getReportList();
        }else{
          this.adminService.showWarning(res['message'],'Accept Report');
        }
      },err=>{
        this.adminService.hideSpinner();
        this.adminService.showError(err['message'],'Accept Report')
      })
  }

   // Deny The Assigned Report
   denyReport(report){
    let apiReq = {
      "_id":report._id,"reporturl":report.reporturl,"clientId":report.clientId,"assignedDocterId":report.assignedDocterId , "status":"PENDING","assignedDocterName":report.assignedDocterName,"clientName":report.clientName      
      }
      this.adminService.showSpinner();
      this.afterLoginService.denyAssignedReportApiFunc(apiReq).subscribe(res=>{
        console.log("Response of deny",res);
        this.adminService.hideSpinner();
        if(res.status == '200'){
          this.getReportList();
        }else{
          this.adminService.showWarning(res['message'],'Deny Report');
        }
      },err=>{
        this.adminService.hideSpinner();
        this.adminService.showError(err['message'],'Deny Report')
      })
  }

  // Analyse The Selected Report Func
  analyseFunc(report){
    this.selectedReport = report;
    let apiReq = {
      "pdf_url":report.reporturl,
      "keywords_list": this.medicalKeyward    
    }
    this.adminService.showSpinner();
    this.afterLoginService.reportAnalyseApiFunc(apiReq).subscribe(res=>{
      console.log('report analysis res---->',res);
      this.adminService.hideSpinner();
      if(res.status == '200'){
     this.saveAnalysedReportFunc(res['Result']);
      }else{
       this.adminService.showWarning(res['message'],'Report Analysis')
      }
    },err=>{
      console.log('report analysis err---->',err);
      this.adminService.hideSpinner();
      this.adminService.showError(err['message'],'Report Analysis')
    })
  }

  // Saved Analysed Report Function
  saveAnalysedReportFunc(analysedReport){
    let apiReq = {
      "_id":this.selectedReport['_id'],"reporturl":this.selectedReport['reporturl'],"clientId":this.selectedReport['clientId'],"assignedDocterName":this.selectedReport['assignedDoctorName'],"clientName":this.selectedReport['clientName'],"assignedDocterId":this.selectedReport['assignedDoctorId'] , "status":this.selectedReport['status'],"result":JSON.stringify(analysedReport)
    }
    this.adminService.showSpinner();
    this.afterLoginService.saveAnalysedReportFunc(apiReq).subscribe(res=>{
      console.log('saved report analysis res---->',res);
      this.adminService.hideSpinner();
      if(res.status == '200'){
     
      }else{
       this.adminService.showWarning(res['message'],'Report Analysis')
      }
    },err=>{
      console.log('saved report analysis err---->',err);
      this.adminService.hideSpinner();
      this.adminService.showError(err['message'],'Report Analysis')
    })
  }
}
