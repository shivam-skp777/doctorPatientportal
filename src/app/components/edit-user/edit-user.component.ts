import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/provider/admin.service';
import { AuthService } from 'src/app/provider/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AfterLoginService } from 'src/app/provider/after-login.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm:FormGroup;
  selectedUserId: string;
  constructor(public adminService:AdminService,public afterLoginService:AfterLoginService,public router:Router,public route: ActivatedRoute) {
    this.initializeForm();
    this.route.queryParams.subscribe(param=>{
      this.selectedUserId = param.userId;
    })
   }

  ngOnInit() {
    this.getSelectedUserData();
  }

  initializeForm(){
    this.editUserForm = new FormGroup({
      firstName: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]*$')]),
      lastName: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]*$')]),
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      // password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,16}$')]),
      contact: new FormControl(null,[Validators.required,Validators.pattern('^[0-9]*$')]),
      userType: new FormControl('0',Validators.required)
    })
  }


  getSelectedUserData(){
    let apiReq = {
      "_id":this.selectedUserId
    }
    let userDetail = {};
    this.adminService.showSpinner();
    this.afterLoginService.getDataOfSelectedUser(apiReq).subscribe(res=>{
      this.adminService.hideSpinner();
      if(res.status == '200'){
        userDetail = res.data[0];
        this.editUserForm.patchValue({
          'firstName':userDetail['firstName'],
          'lastName':userDetail['lastName'],
          'email': userDetail['email'],
          'contact':userDetail['mobileNumber'],
          'userType': userDetail['role']
        })
      }else{
        this.adminService.showWarning(res.message,'UserDetail')
      }
    },err=>{
      this.adminService.hideSpinner();
      this.adminService.showError(err.message,'UserDetail')
    })
  }

  editUserFunc(){
    console.log('editUserForm value---->',this.editUserForm);
    let apiReq = {
     "email":this.editUserForm.value.email,
     "_id": this.selectedUserId,
    //  "password":this.editUserForm.value.password,
     "role":this.editUserForm.value.userType,
     "firstName":this.editUserForm.value.firstName,
     "lastName":this.editUserForm.value.lastName,
     "mobileNumber":this.editUserForm.value.contact
   }
   this.adminService.showSpinner();
   this.afterLoginService.updateUserApiFunc(apiReq).subscribe(res=>{
     this.adminService.hideSpinner();
     if(res.status){
       this.adminService.showSuccess('User Data Updated Successfully',"Edit User")
       this.router.navigate(['/all-user']);
     }else{
       this.adminService.showWarning(res.message,'Edit User');
     }
   },err=>{
     this.adminService.hideSpinner();
     this.adminService.showError(err['message'],'Edit User');
   })
  }

}
