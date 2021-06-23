import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {LogService} from '../services/log.service';
import {Log} from '../models/log';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.css']
})
export class FilterPageComponent implements OnInit {

  logs: Log[] = [];
  pageCount = 10;
  pageNumber = 1;
  pageSize = 4;
  showNext = false;
  showPrevious = false;
  type = '';
  severity = '';
  usernameOnSession = '';

  constructor(private userService: UserService,
              private logService: LogService,
              private router: Router) { }

  ngOnInit(): void {
    console.log('ngOnInit called for filterPage');
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

  getNumberLogs(): void {
    this.logService.getNumberLogsFiltered(this.type, this.severity)
      .subscribe(nr => this.pageCount = Math.ceil(nr / this.pageSize));
  }

  changeFilters(type: string, severity: string): void {
    this.type = type;
    this.severity = severity;
    this.pageNumber = 1;
    this.loadTable();
  }

  loadTable(): void {
    this.getNumberLogs();

    this.logService.filterLogs(this.type, this.severity, this.pageSize, this.pageNumber)
      .subscribe(filteredLogs => this.logs = filteredLogs);
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
