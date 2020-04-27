import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpHeaders,HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrl:string='http://ec2-52-71-54-175.compute-1.amazonaws.com:5000/insurex/v1/';
  constructor(private toastr: ToastrService,private ngxSpinner: NgxSpinnerService, private http: HttpClient) { }

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
 
  /******** Get Headers For The Api **********/
  public getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    // this.authToken = this.localStorage.localStorageGet('authToken');
    let headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.authToken,
      'Content-Type': 'application/json',
    });
    return { headers: headers };
  }
  
  /***************** Api's Base Structure Start *************************/
 // Get Api Base Structure 
 public getService(url, header): Observable<any> {
 let baseUrl = this.baseUrl+url;
  return this.http.get(baseUrl, header)
      .pipe(catchError(err => this.handleError(err)));
}

//  Post Api Base Structure 
public postService(url, postObj, header): Observable<any> {
  let baseUrl = this.baseUrl+url;
  return this.http.post(baseUrl, postObj, header)
      .pipe(catchError(err => this.handleError(err)));
}

//  Put Api Base Structure 
public putService(url, postObj, header): Observable<any> {
  let baseUrl = this.baseUrl+url;
  return this.http.put(baseUrl, postObj, header)
      .pipe(catchError(err => this.handleError(err)));
}

//  Delete Api Base Structure 
public deleteService(url, header): Observable<any> {
  let baseUrl = this.baseUrl+url;
  return this.http.delete(baseUrl, header)
      .pipe(catchError(err => this.handleError(err)));
}

public handleError(error: Response | any) {
  console.error(error);
  let httpErrorCode = error.status;
  // switch (httpErrorCode) {
  //   case httpStatus.UNAUTHORIZED:
  //     this.showError("You don't access", "Unauthorized");
  //   //  this.localStorage.localStorageClearAll();
  //    // this.router.navigateByUrl("/login");
  //     break;
  //   case httpStatus.FORBIDDEN:
  //     this.showError(error.message, 'Forbidden');
  //     break;
  //   case httpStatus.BAD_REQUEST:
  //     this.showError(error.message, 'Bad Request');
  //     break;
  //   default:
  //     this.showError('Please try again!', 'message');
  // }
  return Observable.throw(error);
}
  /***************** Api's Base Structure End **************/
}
