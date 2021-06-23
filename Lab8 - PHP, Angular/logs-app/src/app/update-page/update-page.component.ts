import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {LogService} from '../services/log.service';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {

  logs: Array<string[]> = [];
  pageCount = 10;
  page = 0;
  showNext = false;
  showPrevious = false;

  constructor(private userService: UserService, private logService: LogService) { }

  ngOnInit(): void {
    console.log('ngOnInit called for updatePage');
    this.loadTable();
  }

  getAllLogs(): void {
    this.logService.getAllLogs().subscribe(logs => this.logs = logs);
  }
  loadTable(page = 1): void {
    this.logService.getLogsPaginatedForUser(4, page)
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
  updateLog(logId: string, type: string, severity: string, date: string, message: string): void {
    this.logService.updateLog(logId, type, severity, date, message)
      .subscribe(response => console.log(response));
  }

}
