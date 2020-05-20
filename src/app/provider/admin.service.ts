import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpHeaders,HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
public baseUrl:string='http://13.233.217.250:5000/insurex/v1/';
  authToken: string='';
  public reportKeywards =[
    "HAEMATOLOGY",
  "HAEMOGLOBIN",
  "TOTAL LEUCOCYTE COUNT (WBC)",
  "RED BLOOD CELL COUNT",
  "PACKED CELL VOLUME( HEMATOCRIT)",
  "MEAN CORPUSCULAR VOLUME (MCV)",
  "MEAN CORPUSULAR HB (MCH)",
  "MEAN CORPUSULAR HB CONC (MCHC)",
  "PLATELET COUNT ",
  "ESR",
  "DIFFERENTIAL LEUCOCYTE COUNT",
  "NEUTROPHILS",
  "LYMPHOCYTES",
  "MONOCYTES",
  "EOSINOPHILS",
  "BASOPHILS",
  "RED CELL DISTRIBUTION WIDTH (RDW) ",
  "ERYTHROCYTE SEDIMENTATION RATE (E.S.R.)",
  "ABSOLUTE LEUCOCYTE COUNT",
  "NEUTROPHILS",
  "LYMPHOCYTES",
  "MONOCYTES",
  "EOSINOPHILS",
  "BASOPHILS",
  "LARGE UNSTAINED CELLS (LUC)",
  "BIOCHEMISTRY & IMMUNOTURBIMETRY",
  "AVG SUGAR",
  "BLOOD GLUCOSE (FASTING)",
  "MAGNESIUM",
  "CHOLESTEROL",
  "TRIGLYCERIDES",
  "H.D.L. CHOLESTEROL",
  "L.D.L. CHOLESTEROL (DIRECT)",
  "SERUM VLDL CHOLESTEROL",
  "NON H.D.L. CHOLESTEROL",
  "SERUM CHOLESTEROL-HDL RATIO",
  "UREA",
  "UREA NITROGEN (BUN)",
  "CREATININE, SERUM",
  "URIC ACID",
  "TOTAL CALCIUM",
  "SODIUM",
  "POTTASIUM",
  "CHLORIDE",
  "BILIRUBIN (TOTAL)",
  "BILIRUBIN (DIRECT)",
  "BILIRUBIN (INDIRECT)",
  "S.G.O.T.",
  "S.G.P.T.",
  "ALKALINE PHOSPHATASE",
  "G.G.T.P.",
  "SERUM TOTAL PROTEINS",
  "SERUM ALBUMIN",
  "SERUM GLOBULIN",
  "SERUM ALBUMIN/GLOBULIN",
  "PANCREATIC ALFA AMYLASE",
  "C.P.K.",
  "IRON STUDIES, SERUM",
  "IRON",
  "TOTAL IRON BINDING CAPACITY (TIBC)",
  "TRANSFERRIN SATURATION",
  "UNSATURATED IRON BINDING CAPACITY (UIBC)",
  "FERRITIN, SERUM",
  "FERRITIN, SERUM",
  "THYROID PROFILE",
  "FREE TRIJODOTHYRONINE [FT3],Serum",
  "FREE THYROXINE [FT4],Serum",
  "T.S.H.[ULTRASENSITIVE]",
  "SPECIAL CHEMISTRY",
  "TESTOSTERONE LEVEL (TOTAL)",
  "OTHER PROFILE",
  "ZINC, SERUM",
  "FOLIC ACID LEVEL",
  "HAEMOGLOBIN HBA1C",
  "MEAN PLASMA GLUCOSE",
  "VITAMIN B-12 LEVEL, SERUM(ECLIA)",
  "VITAMIN D-3 LEVEL, SERUM (ECLIA)",
  "GLUCOSE (Post Prandial), Plasma",
  "PHOSPHORIS, Serum",
  "Lipoprotein (a), Serum",
  "APOLIPOPROTEIN A-1(APO A-1)",
  "APOLIPOPROTEIN B (APO-B)",
  "APO-A1/APO-B",
  "HOMOCYSTEIN LEVEL, Serum",
  "C-REACTIVE PROTEINS (High Sensitivity), Serum",
  "IONIZED CALCIUM",
  "PROSTATIC SPECIFIC ANTIGEN, Serum",
  "HAEMOGLOBIN HBA1C",
  "BLOOD GLUCOSE (FASTING)",
  "HAEMOGLOBIN HBA1C"      
    ]
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
    this.authToken =localStorage.getItem('authToken');
    if(this.authToken){
    let headers = new HttpHeaders({
      'access_token': this.authToken,
      'Content-Type': 'application/json',
    });
    return { headers: headers };
  }else{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return { headers: headers };
  }
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

  /***************** Form Data Based Api **********************/ 
  public postFormService(url, postObj): Observable<any> {
    let baseUrl = 'http://13.233.217.250:5000/insurex/v1/'+url;
    return this.http.post(baseUrl, postObj)
        .pipe(catchError(err => this.handleError(err)));
  }

  /**************** Download Image Functionality ********************/
  downloadFile(fileUrl){
    return this.http.get(fileUrl, 
      {responseType: 'blob'});
  }

  /************* Report Analysis Api Functionality **************/
  public reportAnalysisFunc(postObj,headers): Observable<any> {
    let baseUrl = 'http://13.232.111.180/process.php';
    return this.http.post(baseUrl, postObj,headers)
        .pipe(catchError(err => this.handleError(err)));
  }
}
