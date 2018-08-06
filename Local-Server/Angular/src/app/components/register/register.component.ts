import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private USER:UsersService, private router:Router) { }

  ngOnInit() {
  }

  shopname:String;
  username:String;
  password:String;
  repassword:String;
  output:String;
  retailer:String;

  chPass(){
    if(this.password==this.repassword){
      this.output='Password  matched.!';
    }
    else{
      this.output='Password not matched.!'
    }
  }

  register(rp){
    let user={
      shopname:this.shopname,
      username:this.username,
      password:this.password,
      retailer:this.retailer
    }

    this.USER.onRegister(user).subscribe(res =>{
      console.log(res);
      if(res.success){
      this.router.navigate(['/'+rp]);
      }
    })
  }
}
