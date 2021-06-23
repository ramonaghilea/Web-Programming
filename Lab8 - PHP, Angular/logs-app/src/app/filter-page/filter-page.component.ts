import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {LogService} from '../services/log.service';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.css']
})
export class FilterPageComponent implements OnInit {

  logs: Array<string[]> | undefined;

  constructor(private userService: UserService, private logService: LogService) { }

  ngOnInit(): void {
    console.log('ngOnInit called for filterPage');
    // this.getAllLogs();
  }

  // getAllLogs(): void {
  //   this.logService.getAllLogs().subscribe(logs => this.logs = logs);
  // }

  loadTable(type: string, severity: string): void {
    this.logService.filterLogs(type, severity)
      .subscribe(filteredLogs => this.logs = filteredLogs);
}

}
