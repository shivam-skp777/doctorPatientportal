import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfterLoginService } from 'src/app/provider/after-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router:Router,public afterLogin: AfterLoginService) {
    // this.afterLogin.myProfileObserve.subscribe(res=>{
    //   if(res){
    //     console.log('Updated Profile Value',res);
    //   }
    // })  
   }

  ngOnInit() {
  }

  logoutFunc(){
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName')
    this.router.navigate(['/login'])
  }

}
