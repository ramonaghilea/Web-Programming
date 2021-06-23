import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {LogService} from '../services/log.service';
import {Log} from '../models/log';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // logs: Array<Log[]> = [];
  // allLogs: Array<Log[]> = [];
  logs: Log[] = [];
  // pageCount = Math.ceil(this.allLogs.length / 4);
  pageCount = 10;
  pageNumber = 1;
  pageSize = 4;
  showNext = false;
  showPrevious = false;
  usernameOnSession: string | undefined;

  constructor(private userService: UserService,
              private logService: LogService,
              private router: Router) { }

  ngOnInit(): void {
    console.log('ngOnInit called for homepage');
    this.getUsernameOnSession();
    this.isLoggedIn();
    console.log('username session: ');
    console.log(this.usernameOnSession);
    // if (this.usernameOnSession === '') {
    //   this.router.navigate([`/login`]);
    // }
    this.loadTable();
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
      .subscribe(value => this.usernameOnSession = value);
      // .subscribe(res => this.usernameOnSession = res,
      //   error => alert(error),
      //   () => console.log(this.usernameOnSession));

    // if (this.usernameOnSession === '') {
    //   this.router.navigate([`/login`]);
    // }
    // console.log(this.usernameOnSession);
  }

  getNumberLogs(): void {
    console.log('nr logs: ', this.usernameOnSession);
    this.logService.getNumberLogs()
      .subscribe(nr => this.pageCount = Math.ceil(nr / this.pageSize));
  }

  loadTable(): void {
    this.getNumberLogs();
    console.log('load table: ', this.usernameOnSession);
    this.logService.getLogsPaginated(this.pageSize, this.pageNumber)
      .subscribe(logsRes => this.logs = logsRes);
    this.showNext = false;
    this.showPrevious = false;
    if (this.pageCount > 0 && this.pageNumber < this.pageCount) {
      this.showNext = true;
    }
    if (this.pageNumber > 1) {
      this.showPrevious = true;
    }
  }

  goToPreviousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
      this.loadTable();
    }
  }

  goToNextPage(): void {
    if (this.pageNumber < this.pageCount) {
      this.pageNumber = this.pageNumber + 1;
      this.loadTable();
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
