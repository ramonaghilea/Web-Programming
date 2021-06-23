import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {LogService} from '../services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService,
              private logService: LogService,
              private router: Router) { }

  ngOnInit(): void {
  }

  validateParameters(username: string, password: string): boolean {
    if (username === '' || password === '') {
      return false;
    }
    return true;
  }

  logIn(username: string, password: string): void {
    const validParameters = this.validateParameters(username, password);
    if (!validParameters)
    {
      alert('Username or password is empty!');
    }
    else {
      this.userService.logIn(username, password)
        .subscribe(
          response => console.log(response),
          error => alert('Invalid credentials'),
          () => {
            this.router.navigate([`/homepage`]);
          }
        );
    }
  }
}
