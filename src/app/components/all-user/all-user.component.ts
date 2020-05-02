import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AdminService } from 'src/app/provider/admin.service';
import { AfterLoginService } from 'src/app/provider/after-login.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {
  userList:any=[];
  selectedUserId: string='';
  constructor(public router:Router, public adminService: AdminService, public afterLoginService: AfterLoginService) { }

  ngOnInit() {
    this.getUserListFunc();
  }

  // Get User List Api Func
  getUserListFunc(){
    this.adminService.showSpinner();
    this.afterLoginService.getAllUserList().subscribe(res=>{
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

  // Edit User Function
  editUserFunction(userId){
    this.selectedUserId = userId;
    let navigationExtras: NavigationExtras = {
      queryParams: {
          userId: userId
      }
   };
   this.router.navigate(['/edit-user'],navigationExtras);
  }

  // Delete User Function
  deleteUserFunction(userId){
    this.selectedUserId = userId;
    let apiReq = {
      "_id":this.selectedUserId
    }
    this.adminService.showSpinner();
    this.afterLoginService.deleteUserFunctionality(apiReq).subscribe(res=>{
      this.adminService.hideSpinner();
      if(res.status == '200'){
        this.adminService.showSuccess('User Deleted Successfully',"Delete User");
        this.getUserListFunc();
      }else{
        this.adminService.showWarning(res.message,'Delete User');
      }
    },err=>{
      this.adminService.hideSpinner();
      this.adminService.showError(err.message,'Delete User')
    })
  }

}
