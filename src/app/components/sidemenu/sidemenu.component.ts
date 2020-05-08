import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  currentUrl:string='/home';
  userType: number;
  constructor(public router:Router) {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
         this.currentUrl= value.url;         
      }
    });
    if (localStorage.getItem('userType')) {
      this.userType = Number(localStorage.getItem('userType'));
    }
   }

  ngOnInit() {
  }

}
