import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TxnsService } from '../../services/txns.service'
import {UsersService} from '../../services/users.service'

@Component({
  selector: 'app-acccepts',
  templateUrl: './acccepts.component.html',
  styleUrls: ['./acccepts.component.css']
})
export class AccceptsComponent implements OnInit {

  requests: Object;
  user:any;
  response: String;
  item:Object;

  constructor(private USER:UsersService,private router: Router, private TXN: TxnsService) { }

  ngOnInit() {
    this.user  = JSON.parse(localStorage.getItem('user'));
    this.TXN.getAcceptedRequestFromLocal().subscribe(res => {
      if (res.success) {
        this.requests = res.msg;
        console.log(this.requests);
        this.response="These are the accepted requests till date."
      }
      else {
        this.response = "Error fetching requests"
      }
    });
  }

}
