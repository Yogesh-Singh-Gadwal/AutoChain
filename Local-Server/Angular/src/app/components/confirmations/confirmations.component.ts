import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TxnsService} from '../../services/txns.service'

@Component({
  selector: 'app-confirmations',
  templateUrl: './confirmations.component.html',
  styleUrls: ['./confirmations.component.css']
})
export class ConfirmationsComponent implements OnInit {
  
  requests: Object;
  response: String;
  user:any;

  constructor(private router:Router,private TXN:TxnsService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.TXN.getAcceptedConfirmationsFromLocal().subscribe(res=>{
      console.log(res);  
      if (res.success) {
        this.requests = res.msg;
        this.response="These are the confirmed requests till date."
      }
      else {
        this.response = "Error fetching requests"
      }
    })
  }

  
  getConfirmations(){
    let body = {
      from:this.user.username
    }
    this.TXN.getConfirmationsFromCloud(body).subscribe(res=>{
      if(res.success){
      this.response="Confirmations sucessfully downloaded"
      this.ngOnInit()
      }
      else
      this.response="Error fetching confirmations"
    })
  }

}
