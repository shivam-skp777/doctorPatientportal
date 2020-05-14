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
      this.adminService.showError('Something Went Wrong','Get Profile');
    })
  }

  // Upload Profile Image Functionality
  
  getImageData(event) {
    // this.IdURLs
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || (file.type === 'application/pdf')) {
        if (file.size < 5000000) {
          // this.uploadingIdError['backId'] = { show: false, msg: '' };
          // this.id= event.target.files[0];
          const reader = new FileReader();
          reader.onload = (e: any) => {
            // this.idBase64= e.target.result;
          };
          reader.readAsDataURL(event.target.files[0]);
          let file = event.target.files;

          this.uploadImage(file.item(0));
        }
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
      //  this.addReportFunc(res);
      //  this.reportUrl = res['data']['ref_link'];
     }
   },err=>{
     this.adminService.hideSpinner();
    console.log('Image Err---->>>',err)
   })
  }
}
