import { Component, OnInit } from '@angular/core';
import {LogService} from '../services/log.service';
import {UserService} from '../services/user.service';
import {Log} from '../models/log';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {
  log: Log = new Log();
  usernameOnSession = '';

  constructor(private logService: LogService,
              private userService: UserService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    console.log('ngOnInit called for updatePage');
    this.getUsernameOnSession();
    this.isLoggedIn();
    this.getLog();
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

  getLog(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.logService.getLogById(id)
      .subscribe((log: Log) => this.log = log);
  }

  // tslint:disable-next-line:max-line-length
  validateParameters(type: string | undefined, severity: string | undefined, date: string | undefined, message: string | undefined): boolean {
    if (type === '' || severity === '' || date === '' || message === '') {
      return false;
    }
    return true;
  }

  updateLog(): void {
    const validParameters = this.validateParameters(this.log.type, this.log.severity, this.log.dateOfLog, this.log.message);
    if (!validParameters)
    {
      alert('At least one field is empty!');
    }
    else {
      this.logService.updateLog(this.log.logId, this.log.type, this.log.severity, this.log.dateOfLog, this.log.message)
        .subscribe(
          response => console.log(response),
          error => alert('You cannot update this log!'),
          () => this.router.navigate([`/deletePage`])
        );
    }
  }

  cancelUpdate(): void {
    const confirmation = confirm('Are you sure you want to cancel?');
    if (confirmation) {
      this.location.back();
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
