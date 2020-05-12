import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/provider/admin.service';
import { AfterLoginService } from 'src/app/provider/after-login.service';
import { ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {
selectedReport = new Object();
  selectedId: string = '';
  constructor(public adminService:AdminService,public afterLogin: AfterLoginService,public route: ActivatedRoute) {
    this.route.queryParams.subscribe(res=>{
      this.selectedId = res['reportID'];
    })
   }

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
        let completeReportList = res['data'].filter(x=>(x._id == this.selectedId));
        this.selectedReport = JSON.parse(completeReportList[0].result);
        console.log('Selected Report--->',JSON.stringify(this.selectedReport));
      }else{
        this.adminService.showWarning(res['message'],'Complete Report');
      }
    },err=>{
      this.adminService.hideSpinner();
      this.adminService.showError(err['message'],'Complete Report');
    })
  }

  // Download As Pdf 
  downloadAsPdf(){
    let data = document.getElementById('report');  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('report.pdf');   
    }); 
  }

}
