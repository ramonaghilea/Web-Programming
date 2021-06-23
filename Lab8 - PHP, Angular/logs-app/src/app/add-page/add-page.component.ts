import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {LogService} from '../services/log.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  logs: Array<string[]> = [];
  pageCount = 10;
  page = 0;
  showNext = false;
  showPrevious = false;

  constructor(private userService: UserService, private logService: LogService) { }

  ngOnInit(): void {
    console.log('ngOnInit called for addPage');
    this.loadTable();
  }

  getAllLogs(): void {
    this.logService.getAllLogs().subscribe(logs => this.logs = logs);
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

  addLog(type: string, severity: string, date: string, message: string): void {
    this.logService.addLog(type, severity, date, message)
      .subscribe(response => console.log(response));
}

}
