import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/provider/admin.service';
import { AfterLoginService } from 'src/app/provider/after-login.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reportList = new Array();
  doctorList = new Array();
  userList = new Array();
  constructor(public adminService:AdminService,public afterLogin: AfterLoginService) { }

  ngOnInit() {
    this.getAllClientReportFunc();
    this.getDoctorListFunction();
    this.getClientListFunc();
  }

   // Get All Client Report Function
   getAllClientReportFunc(){
    this.reportList = new Array();
    this.adminService.showSpinner();
    this.afterLogin.getAllClientReport().subscribe(res=>{
      this.adminService.hideSpinner();
      console.log('Response ---->',res);
      if(res.status == '200'){
      this.reportList = res.data.filter(x=>(x.status == 'PENDING'));
      }else{
        this.adminService.showWarning(res['message'],'Report List');
      }
    },err=>{
      this.adminService.showError(err['message'],'Report List');
      this.adminService.hideSpinner();
       console.log("Error --->>>",err)
    })
   }

   // Get Doctor List Functionality
   getDoctorListFunction(){
     this.adminService.showSpinner();
     this.afterLogin.getDoctorList().subscribe(res=>{
       console.log('Res--->',res);
       this.adminService.hideSpinner();
       if(res.status == '200'){
         this.doctorList = res.data;
       }else{
         this.adminService.showWarning(res['message'],'Doctor List')
       }
     },err=>{
       console.log('Err--->',err);
       this.adminService.hideSpinner();
       this.adminService.showError(err['message'],'Doctor List')
     })
   }

   // Get List OF Client Functionality
  getClientListFunc(){
    this.adminService.showSpinner();
    this.afterLogin.getAllUserList().subscribe(res=>{
      console.log("Res--->>>",res);
      this.adminService.hideSpinner();
      if(res.status == '200'){
        this.userList = res['data'];
      }else{
        this.adminService.showWarning(res['message'],'User List');
      }
    },err=>{
      this.adminService.hideSpinner();
      this.adminService.showError(err['message'],'User List');
    })
  }

   // Assigned Doctor To Report Functionality
   assignDoctor(event,reportObj){
     console.log('Doctor---->',event,reportObj);
     let doctorName = this.doctorList.filter(x=>(x._id == event.target.value))
     let clientName = this.userList.filter(x=>(x._id == reportObj.clientId));
     let apiReq = {
      "_id":reportObj._id,"reporturl":reportObj.reporturl,"clientId":reportObj.clientId,"assignedDocterId":event.target.value, status:"Assigned",assignedDocterName: doctorName[0].firstName+" "+doctorName[0].lastName, clientName: clientName[0].firstName + " " + clientName[0].lastName
      }
      this.adminService.showSpinner();
      this.afterLogin.assignDoctor(apiReq).subscribe(res=>{
        console.log('Response ---->',res);
        this.adminService.hideSpinner();
        if(res.status == '200'){
          this.getAllClientReportFunc();
        }else{
          this.adminService.showWarning(res['message'],'Assign Doctor');
        }
      },err=>{
        this.adminService.hideSpinner();
        console.log('err--->',err);
        this.adminService.showError(err['message'],'Assign Doctor');
      })
      
   }

   // Download Report Functionality
  downloadReportFunc(reportUrl){
    window.open(reportUrl,"_blank");
  }

}
