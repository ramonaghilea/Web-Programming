import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {LogService} from '../services/log.service';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.css']
})
export class DeletePageComponent implements OnInit {

  logs: Array<string[]> = [];
  pageCount = 10;
  page = 0;
  showNext = false;
  showPrevious = false;

  constructor(private userService: UserService, private logService: LogService) { }

  ngOnInit(): void {
    console.log('ngOnInit called for deletePage');
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
  deleteLog(logId: string): void {
    this.logService.deleteLog(logId)
      .subscribe(response => console.log(response));
  }

}
