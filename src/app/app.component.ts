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
        if (localStorage.getItem('userType')) {
          this.userType = localStorage.getItem('userType');
        }
        if (localStorage.getItem('authToken')) {
          if ((url == '/login') || (url == '/forgot') || (url.includes('reset'))) {
            this.commomComp = true;
            this.router.navigate(['/home'])
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
