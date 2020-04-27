import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/provider/auth.service';
import { AdminService } from 'src/app/provider/admin.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
forgotPasswordForm:FormGroup;
otpFlag:boolean=false;
  constructor(public router:Router,public authService: AuthService,public adminService: AdminService) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      otp : new FormControl('',)
    })
   }

  ngOnInit() {
  }

  // Forgot Password Functionality
  forgotPasswordFunc(){
    console.log('forgot Password Form---->>',this.forgotPasswordForm);
    if(this.forgotPasswordForm.controls['email'].status=='INVALID' && this.forgotPasswordForm.controls['email'].touched){
      this.adminService.showError('Invalid Email Id',"Email");
    }else{
      let apiReq= {
        email: this.forgotPasswordForm.value.email
      }
      this.adminService.showSpinner();
      this.authService.forgotPasswordApiFunction(apiReq).subscribe(res=>{
        console.log("Forgot Pasword Res-->",res);
        this.adminService.hideSpinner();
        if(res.status == '200'){
          this.adminService.showSuccess(res['message'],'Forgot Password');
          this.otpFlag = true;
        }else{
          this.adminService.showWarning(res['message'],'Forgot Password');
        }
      },err=>{
        this.adminService.hideSpinner();
        this.adminService.showError(err['message'],'Forgot Password');
      })
    }   
  }

  // Verify Otp Functionality
  verifyOtpFunc(){
      let apiReq = {
        email: this.forgotPasswordForm.value.email,
        otp:this.forgotPasswordForm.value.otp
      }
      this.adminService.showSpinner();
      this.authService.verifyOtpApiFunction(apiReq).subscribe(res=>{
        console.log('res--->>',JSON.stringify(res));
        this.adminService.hideSpinner();
        if(res.status == '200'){
          let accountDetail: NavigationExtras = {
            queryParams:  {
              email: this.forgotPasswordForm.value.email,
              otp:this.forgotPasswordForm.value.otp
            }
        };
        this.adminService.showSuccess(res['message'],'OTP');
          this.router.navigate(['/reset'],accountDetail);
        }else{
        this.adminService.showWarning(res['message'],'OTP');
        }
      },err=>{
        this.adminService.hideSpinner();
        this.adminService.showError(err['message'],'OTP');
      })   
  }
}
