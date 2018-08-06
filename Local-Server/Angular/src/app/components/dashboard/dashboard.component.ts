import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import {TxnsService} from '../../services/txns.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users:any;
  response:any;
  

  constructor(private router: Router,private USER: UsersService,private TXN:TxnsService
  ) { }

  ngOnInit() {
    if (this.USER.isLoggedIn()) {
      //this.router.navigate(["/"]);
      this.users = JSON.parse(localStorage.getItem('user'));
    console.log(this.users);
      
    }
    else {
      this.router.navigate(["/login"])
    }
  }

  goto(rp){
    this.router.navigate(['/'+rp])
  }
}
