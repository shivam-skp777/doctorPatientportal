import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doctorPatient';
  commomComp: boolean = false;
  userType: string = '';
  constructor(public router: Router) {

    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        let url = value.url;       
        if (localStorage.getItem('authToken')) {
          if ((url == '/login') || (url == '/forgot') || (url.includes('reset'))) {
            this.commomComp = true;
            if(localStorage.getItem('userType') && (Number(localStorage.getItem('userType')) == 1))
            this.router.navigate(['/home']);
            else if(localStorage.getItem('userType') && (Number(localStorage.getItem('userType')) == 2))
            this.router.navigate(['/clientDashboard']);
            else if(localStorage.getItem('userType') && (Number(localStorage.getItem('userType')) == 3))
            this.router.navigate(['/doctorDashboard']);
          } else {
            this.commomComp = true;
          }
        } else {
          if (!((url == '/login') || (url == '/forgot') || (url.includes('reset')))) {
            this.commomComp = false;
            this.router.navigate(['/login'])
          } else {
            this.commomComp = false;
          }
        }
      }
    });
  }

}
