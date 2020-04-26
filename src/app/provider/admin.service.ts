import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private toastr: ToastrService,private ngxSpinner: NgxSpinnerService) { }

  /**** Toaster Related Function Start******/
  showSuccess(message, title) {
    this.toastr.success(message, title);
  }

  showError(message, title) {
    this.toastr.error(message, title);
  }

  showInfo(message, title) {
    this.toastr.info(message, title);
  }

  showWarning(message, title) {
    this.toastr.warning(message, title);
  }
  /**** Toaster Related Function End******/

  /**** Spinner Related Function Start******/
  showSpinner(){
  this.ngxSpinner.show();
  }

  hideSpinner(){
  this.ngxSpinner.hide();
  }
  /**** Spinner Related Function End******/


}
