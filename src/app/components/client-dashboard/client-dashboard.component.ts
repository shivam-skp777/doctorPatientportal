import { Component, OnInit } from '@angular/core';
import { AfterLoginService } from 'src/app/provider/after-login.service';
import { AdminService } from 'src/app/provider/admin.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  idBase64: any;
  id: any;
  reportList = new Array();
  doctorList = new Array();
  
  constructor(public afterLogin: AfterLoginService, public adminService:AdminService) { }

  ngOnInit() {
    this.getAllClientReportFunc();
    this.getDoctorListFunction();
  }

  getImageData(event) {
    // this.IdURLs
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || (file.type === 'application/pdf')) {
        // if (file.size < 5000000) {
          // this.uploadingIdError['backId'] = { show: false, msg: '' };
          this.id= event.target.files[0];
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.idBase64= e.target.result;
          };
          reader.readAsDataURL(event.target.files[0]);
          let file = event.target.files;

          this.uploadImage(file.item(0));
        //}
      }
    }
  }
  uploadImage(imageData) {
    let fileData = new FormData();
    fileData.append('ref_file',imageData);
    fileData.append('media_type','3');
    this.adminService.showSpinner();
   this.afterLogin.uploadImageApi(fileData).subscribe(res=>{
     console.log('Image Res---->>>',res);
     this.adminService.hideSpinner();
     if(res.status == '200'){
       this.addReportFunc(res);
     }
   },err=>{
     this.adminService.hideSpinner();
    console.log('Image Err---->>>',err)
   })
  }

  // Add Report Functionality
  addReportFunc(response){
    let apiReq = {
      'reporturl':response.data['ref_link']
    };
    this.adminService.showSpinner();
    this.afterLogin.addReportFunction(apiReq).subscribe(res=>{
      console.log('Resss of Add Report--->>>>',res);
      this.adminService.hideSpinner();
      if(res.status == '200'){
        this.adminService.showSuccess('Report Uploaded','Upload Report');
        this.getAllClientReportFunc();
      }else{
        this.adminService.showWarning(res['message'],'Upload Report')
      }
    }, err=>{
      this.adminService.hideSpinner();
      this.adminService.showError(err['message'],'Upload Report')
    })
  }

  // Get All Client Report Function
  getAllClientReportFunc(){
    this.reportList = new Array();
    this.adminService.showSpinner();
    this.afterLogin.getAllReportOfClient().subscribe(res=>{
      this.adminService.hideSpinner();
      console.log('Response ---->',res);
      if(res.status == '200'){
      this.reportList = res.data;
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

  //  // Assigned Doctor To Report Functionality
  //  assignDoctor(event,reportObj){
  //    console.log('Doctor---->',event,reportObj);
  //    let doctorName = this.doctorList.filter(x=>(x._id == event.target.value))
  //    let clientName = localStorage.getItem('firstName')+" "+localStorage.getItem('lastName');
  //    let apiReq = {
  //     "_id":reportObj._id,"reporturl":reportObj.reporturl,"clientId":reportObj.clientId,"assignedDocterId":event.target.value, status:"Assigned",assignedDocterName: doctorName[0].firstName+" "+doctorName[0].lastName, clientName: clientName
  //     }
  //     this.adminService.showSpinner();
  //     this.afterLogin.assignDoctor(apiReq).subscribe(res=>{
  //       console.log('Response ---->',res);
  //       this.adminService.hideSpinner();
  //       if(res.status == '200'){
  //         this.getAllClientReportFunc();
  //       }else{
  //         this.adminService.showWarning(res['message'],'Assign Doctor');
  //       }
  //     },err=>{
  //       this.adminService.hideSpinner();
  //       console.log('err--->',err);
  //       this.adminService.showError(err['message'],'Assign Doctor');
  //     })
      
  //  }

    // Download Report Functionality
  downloadReportFunc(reportUrl){
    window.open(reportUrl,"_blank");
  }

}
