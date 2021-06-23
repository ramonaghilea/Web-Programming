import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {LogService} from '../services/log.service';
import {Log} from '../models/log';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.css']
})
export class DeletePageComponent implements OnInit {

  logs: Log[] = [];
  pageCount = 10;
  pageNumber = 1;
  pageSize = 4;
  showNext = false;
  showPrevious = false;
  usernameOnSession = '';

  constructor(private userService: UserService,
              private logService: LogService,
              private router: Router) { }

  ngOnInit(): void {
    console.log('ngOnInit called for deletePage');

    this.getUsernameOnSession();
    this.isLoggedIn();

    this.pageNumber = 1;
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
      .subscribe(res => this.usernameOnSession = res);
  }

  getNumberLogs(): void {
    this.logService.getNumberLogsForUser()
      .subscribe(nr => this.pageCount = Math.ceil(nr / this.pageSize));
  }

  loadTable(): void {
    this.getNumberLogs();
    this.logService.getLogsPaginatedForUser(this.pageSize, this.pageNumber)
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

  deleteLog(logId: number): void {
    const confirmation = confirm('Are you sure you want to delete?');
    if (confirmation) {
      this.logService.deleteLog(logId)
        .subscribe(
          response => console.log(response),
          error => alert('You cannot delete this log!'),
          () => this.loadTable()
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
