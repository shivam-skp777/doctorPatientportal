import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/provider/auth.service';
import { AdminService } from 'src/app/provider/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  rememberMeFlag: boolean;
  constructor(public authService: AuthService,public adminService: AdminService) {
    this.loginForm = new FormGroup({
      email : new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
   }

  ngOnInit() {
  }

  // Login Functionality
  loginFunc(){
    console.log("Login Form Function---->>>>",this.loginForm);
    let apiReq = {
      'username':this.loginForm.value.email,
      'password':this.loginForm.value.password
    }
    this.adminService.showSpinner();
    this.authService.loginApiFunction(apiReq).subscribe(res=>{
      console.log('Res of Login---->>',res);
      this.adminService.hideSpinner();
      if(res){
      this.adminService.showSuccess('Success','Login')
      }
    },err=>{
      console.log("Err of Login",err);
      this.adminService.hideSpinner();
      this.adminService.showError('Error','Login');
    })
  }

  // Remember Me Flag Value Check
  rememberMeFunc(){
    this.rememberMeFlag = !this.rememberMeFlag;
    console.log("Remember Me Flag ---->",this.rememberMeFlag);
  }
} 
