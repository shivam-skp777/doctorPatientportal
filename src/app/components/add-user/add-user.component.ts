import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/provider/auth.service';
import { AdminService } from 'src/app/provider/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm:FormGroup;
  constructor(public adminService:AdminService,public authService:AuthService,public router:Router) {
    this.initializeForm();
   }

  ngOnInit() {
  }

  initializeForm(){
    this.userForm = new FormGroup({
      firstName: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]*$')]),
      lastName: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]*$')]),
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,16}$')]),
      contact: new FormControl(null,[Validators.required,Validators.pattern('^[0-9]*$')]),
      userType: new FormControl('0',Validators.required)
      // file: new FormControl(''),
    })
  }

  addUserFunc(){
   console.log('userForm value---->',this.userForm);
   let apiReq = {
    "email":this.userForm.value.email,
    "password":this.userForm.value.password,
    "role":this.userForm.value.userType,
    "firstName":this.userForm.value.firstName,
    "lastName":this.userForm.value.lastName,
    "mobileNumber":"+91"+this.userForm.value.contact
  }
  this.adminService.showSpinner();
  this.authService.registrationFunctionality(apiReq).subscribe(res=>{
    this.adminService.hideSpinner();
    if(res.status){
      this.adminService.showSuccess('User Created Successfully',"Registration")
      this.router.navigate(['/all-user']);
    }else{
      this.adminService.showWarning(res.message,'Registration');
    }
  },err=>{
    this.adminService.hideSpinner();
    this.adminService.showError(err['message'],'Registration');
  })
  }
}
