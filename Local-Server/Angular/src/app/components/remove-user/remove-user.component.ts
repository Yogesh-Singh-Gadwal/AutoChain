import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UsersService } from '../../services/users.service'


@Component({
  selector: 'app-del-device',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {

  output: String;
  username: String;
  password: String;
  repassword: String;

  constructor(private USER: UsersService, private route: Router) { }

  ngOnInit() {
  }

  passchk() {
    if (this.password == this.repassword) {
      this.output = 'Matched'
    }
    else {
      this.output = 'Not Matched'
    }
  }

  delAcc(route) {
    let body = {
      username: this.username,
      password: this.password
    }
    this.USER.onDel(body).subscribe(res => {
      if (res.success) {
        this.route.navigate(['/' + route]);
      }
      else {
        this.output = 'Error Deleting'
      }
    });

  }
}
