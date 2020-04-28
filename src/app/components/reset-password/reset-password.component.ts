import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/provider/admin.service';
import { AuthService } from 'src/app/provider/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
resetPasswordForm:FormGroup;
email:string;
otp:string;
  constructor(public route:ActivatedRoute,public router:Router,public adminService: AdminService,public authService: AuthService) {
    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl('',[Validators.required,Validators.pattern('')]),
      confirmPassword: new FormControl('',Validators.required)
    })
    this.route.queryParams.subscribe(param=>{
      this.email = param.email;
      this.otp = param.otp;
    })
   }

  ngOnInit() {
  }

  // Reset Password Functionality
  resetPasswordFunc(){
    console.log('reset Password Function',this.resetPasswordForm);
    if(this.resetPasswordForm.controls['newPassword'].status=='INVALID' && this.resetPasswordForm.controls['newPassword'].touched){
      this.adminService.showError('Invalid New Password','New Password');
    }else if(this.resetPasswordForm.value.newPassword != this.resetPasswordForm.value.confirmPassword){
      this.adminService.showError('New password doesnot match with confirm password','Confirm Password');
     }
    else{
      let apiReq = {
        email:this.email,
        // otp:this.otp,
        password: this.resetPasswordForm.value.newPassword
      }
      this.adminService.showSpinner();
      this.authService.resetPasswordApiFunction(apiReq).subscribe(res=>{
        console.log('Reset--->',res);
        this.adminService.hideSpinner();
        if(res['status']=='200'){
          this.adminService.showSuccess(res['message'],'Reset Password');
          this.router.navigate(['/login']);
        }else{
          this.adminService.showWarning(res['message'],'Reset Password');
        }
      },err=>{
        this.adminService.hideSpinner();
        this.adminService.showError(err['message'],'Reset Password');
      })
    }    
  }

}
