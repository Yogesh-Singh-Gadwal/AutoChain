import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-update-passwd',
  templateUrl: './update-passwd.component.html',
  styleUrls: ['./update-passwd.component.css']
})
export class UpdatePasswdComponent implements OnInit {

  Password: String;
  username: String;
  reNewPassword: String;
  newPassword: String;
  output: String;
  response: String;


  constructor(private USER: UsersService, private router: Router) { }

  ngOnInit() {
  }

  upPass() {
    if (this.newPassword == this.reNewPassword) {
      this.output = 'Matched'
    }
    else {
      this.output = 'not Matched'
    }
  }

  updatePasswd() {
    let body = {
      username: this.username,
      password: this.Password,
      newPasswd: this.newPassword
    }
    this.USER.onUpdatePasswd(body).subscribe(res => {
      if (res.success) {
        this.response = "Password updated successfully"
        console.log(res.msg);
      }
      else {
        this.response = "Error updating password"
        console.log(res.msg);
      }
    })
  }
}

