import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  goToUserList(){
   this.router.navigate(['/all-user'])
  }

}
