import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {LogService} from '../services/log.service';
import {Log} from '../models/log';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  logs: Array<string[]> = [];
  allLogs: Array<string[]> = [];
  // pageCount = Math.ceil(this.allLogs.length / 4);
  pageCount = 1;
  page = 0;
  showNext = false;
  showPrevious = false;

  constructor(private userService: UserService, private logService: LogService) { }

  ngOnInit(): void {
    console.log('ngOnInit called for homepage');
    // this.getAllLogs();
    this.loadTable();
    this.getAllLogs();
    // this.getPageLogs();
  }

  getAllLogs(): void {
    this.logService.getAllLogs()
      .subscribe(logsRes => this.allLogs = logsRes);
  }

  loadTable(page = 1): void {
    this.logService.getLogsPaginated(4, page)
      .subscribe(logsRes => this.logs = logsRes);
    this.page = page;
    this.showNext = false;
    this.showPrevious = false;
    if (this.pageCount > 0 && page < this.pageCount + 1) {
      this.showNext = true;
    }
    if (page > 1) {
      this.showPrevious = true;
    }
  }

  goToPreviousPage(): void {
    if (this.page > 1) {
      this.loadTable(this.page - 1);
    }
  }

  goToNextPage(): void {
    if (this.page < this.pageCount + 1) {
      this.loadTable(this.page + 1);
    }
  }

}
