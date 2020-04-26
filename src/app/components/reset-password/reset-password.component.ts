import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
resetPasswordForm:FormGroup;
  constructor() {
    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl('',[Validators.required,Validators.pattern('')]),
      confirmPassword: new FormControl('',Validators.required)
    })
   }

  ngOnInit() {
  }

  // Reset Password Functionality
  resetPasswordFunc(){
    console.log('reset Password Function',this.resetPasswordForm);
  }

}
