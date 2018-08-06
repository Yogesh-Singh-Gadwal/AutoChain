import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {TxnsService} from '../../services/txns.service';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.css']
})
export class MakeRequestComponent implements OnInit {
  
  response:String;
  items:Object;
  clickedItem:String;
  user:any;
  name:String;
  qty:String;
  to:String;

  constructor(private router:Router,private USER:UsersService,private TXN:TxnsService) { }

  ngOnInit() {
    this.user=this.USER.getStoredUser()
  }

  submit(){
    var body = {
      to:this.to,
      from:this.user.username,
      item:{
        productName:this.name,
        qty:this.qty
      }
    }
    this.TXN.makeRequest(body).subscribe(res=>{
      if(res.success)
      this.response=res.msg
      else
      this.response=res.msg
    });
  }
}

