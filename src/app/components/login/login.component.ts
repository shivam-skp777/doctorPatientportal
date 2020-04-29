import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/provider/auth.service';
import { AdminService } from 'src/app/provider/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  rememberMeFlag: boolean;
  constructor(public authService: AuthService,public adminService: AdminService,public router: Router) {
    this.loginForm = new FormGroup({
      email : new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      remember: new FormControl(false)
    })
   }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.loginForm.patchValue({
        email:localStorage.getItem('email'),
        password:localStorage.getItem('password'),
        remember:true
      })
      
    }
  }

  // Login Functionality
  loginFunc(){
    console.log("Login Form Function---->>>>",this.loginForm);
    let apiReq = {
      'email':this.loginForm.value.email,
      'password':this.loginForm.value.password
    }
    this.adminService.showSpinner();
    this.authService.loginApiFunction(apiReq).subscribe(res=>{
      console.log('Res of Login---->>',res);
      this.adminService.hideSpinner();
      if(res.status == '200'){
      this.adminService.showSuccess(res['message'],'Login');
      if(this.rememberMeFlag){
        localStorage.setItem('email',this.loginForm.value.email);
        localStorage.setItem('password',this.loginForm.value.password);
      }else{
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      localStorage.setItem('authToken',res.data['accessToken']);
      localStorage.setItem('userId',res.data['responseData']['_id']);
       this.router.navigate(['/home'])
    }else{
        this.adminService.showWarning(res['message'],'Login');
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
