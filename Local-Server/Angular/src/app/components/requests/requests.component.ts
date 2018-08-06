import { Component, OnInit } from '@angular/core';
import { TxnsService} from '../../services/txns.service';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  user:any;
  requests:Object;
  response:String;
  clickedRequest:any;
  item:Object;

  constructor(private router:Router,private TXN:TxnsService,private USER:UsersService) { }

  ngOnInit() {
    this.user  = JSON.parse(localStorage.getItem('user'));
    this.TXN.getRequestFromLocal().subscribe(res=>{
      
      this.requests = res.msg;
      console.log(this.requests);
    })
  }

  onAccept(body){
    console.log(body);
    this.TXN.onAccepting(body).subscribe(res=>{
      if(res.success){
       // this.clickedRequest = res.msg
        this.response = "You have Accepted the request, Its now in the accepted list.";
        this.ngOnInit();
      }
    })
  }

  onReject(body){
    this.TXN.onRejecting(body).subscribe(res=>{
      if(res.success){
       // this.clickedRequest = res.msg
        this.response = "You have rejected the request.";
        this.ngOnInit();
      }
      else{
        this.response="Error Discarding request"
      }
    })
  }

  getRequests(){
    let body = {
      to:this.user.username
    }
    this.TXN.getRequestsFromCloud(body).subscribe(res=>{
      if(res.success){
      this.response="Requests downloaded successfully"
      this.ngOnInit()
      }else
      this.response="Error fetching requests"
    })
  }
}
