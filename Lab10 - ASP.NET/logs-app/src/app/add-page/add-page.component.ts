import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {LogService} from '../services/log.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {
  usernameOnSession = '';

  constructor(private logService: LogService,
              private userService: UserService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    console.log('ngOnInit called for addPage');
    this.getUsernameOnSession();
    this.isLoggedIn();
  }

  isLoggedIn(): void {
    this.userService.loggedIn()
      .subscribe(value => {
        // tslint:disable-next-line:triple-equals
        if (value == 0) {
          this.router.navigate([`/login`]);
        }
      });
  }

  getUsernameOnSession(): void {
    this.userService.getUsername()
      .subscribe(res => this.usernameOnSession = res);
  }

  validateParameters(type: string, severity: string, date: string, message: string): boolean {
    if (type === '' || severity === '' || date === '' || message === '') {
      return false;
    }
    return true;
  }

  addLog(type: string, severity: string, date: string, message: string): void {
    const validParameters = this.validateParameters(type, severity, date, message);
    if (!validParameters)
    {
      alert('At least one field is empty!');
    }
    else {
      this.logService.addLog(type, severity, date, message)
        .subscribe(
          response => console.log(response),
          error => alert(error),
          () => this.router.navigate([`/deletePage`])
        );
    }
  }

  logOut(): void {
    this.userService.logOut()
      .subscribe(
        response => console.log(response),
        error => alert(error),
        () => this.router.navigate([`/login`])
      );
  }
}
