import { Component } from '@angular/core';
import { AdminService } from './provider/admin.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doctorPatient';

  constructor(public service:AdminService){
   this.service.showSpinner();
   setTimeout(()=>{
     this.service.hideSpinner();
   },2000)
  }

}
