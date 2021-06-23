import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {LogService} from '../services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userId = '1';
  constructor(private userService: UserService,
              private logService: LogService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logIn(username: string, password: string): void {
    // this.errorMessage = "";
    // const user: User = {username, password};
    this.userService.logIn(username, password)
      .subscribe(userId => sessionStorage.setItem('id', userId[userId.length - 1]));
    // sessionStorage.setItem('id', this.userId);
    console.log('session id in login comp ' + sessionStorage.getItem('id'));
    if (sessionStorage.getItem('id') !== '0') {
      this.router.navigate(['/homepage']);
    }
      // .subscribe(response => console.log(response));
    // console.log('returned in login component');
  }
}
