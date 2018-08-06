import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router:Router, private USER:UsersService) {}

  goto(route){
    this.router.navigate(["/"+route])
  }

  logout(route){
    localStorage.clear();
    this.router.navigate(["/"+route]);
  }


}