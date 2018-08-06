import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password:String;
  username:String;
  response:String;
  ifLoginClicked:String;

  constructor(private USER:UsersService, private router:Router) { }

  ngOnInit() {
  }

  login(rp){

    let body={
      username:this.username,
      password:this.password
        }
    
    this.USER.onLogin(body).subscribe(res=>{
      console.log(res);
      if(res.success){
        console.log(res);

        this.USER.StoreLocal(res.msg);
        
        this.router.navigate(['/dashboard']);
        
      }else{
        this.response = res.msg
      }
    });
  }
}
