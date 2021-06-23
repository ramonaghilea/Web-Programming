import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Log} from '../models/log';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private url = 'https://localhost:44313/Main';

  private getNumberLogsURL = this.url + `/getNumberLogs`;
  private getNumberLogsFilteredURL = this.url + `/getNumberLogsFiltered`;
  private getNumberLogsForUserURL = this.url + `/getNumberLogsForUser`;
  private getLogByIdURL = this.url + `/getLogById`;
  private getLogsPaginatedURL = this.url + `/getAllLogsPaginated`;
  private getLogsPaginatedForUserURL = this.url + `/getLogsForUserPaginated`;
  private updateLogURL = this.url + `/updateLog`;
  private addLogURL = this.url + `/addLog`;
  private deleteLogURL = this.url + `/deleteLog`;
  private getFilteredLogsURL = this.url + `/getLogsWithTypeAndSeverity`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getNumberLogs(): Observable<number> {
    return this.http.get<number>(this.getNumberLogsURL, {withCredentials: true});
  }

  getNumberLogsFiltered(type: string, severity: string): Observable<number> {
    return this.http.get<number>(this.getNumberLogsFilteredURL + `?type=${type}` + `&severity=${severity}`,
      {withCredentials: true});
  }

  getNumberLogsForUser(): Observable<number> {
    return this.http.get<number>(this.getNumberLogsForUserURL, {withCredentials: true});
  }

  getLogById(logId: number): Observable<Log> {
    return this.http.get<Log>(this.getLogByIdURL +
      `?logId=${logId}`, {withCredentials: true});
  }

  getLogsPaginated(pageSize: number, pageNumber: number): Observable<Log[]> {
    return this.http.get<Log[]>(this.getLogsPaginatedURL +
      `?pageSize=${pageSize}&pageNumber=${pageNumber}`, {withCredentials: true});
  }

  getLogsPaginatedForUser(pageSize: number, pageNumber: number): Observable<Log[]> {
    return this.http.get<Log[]>(this.getLogsPaginatedForUserURL +
      `?pageSize=${pageSize}&pageNumber=${pageNumber}`, {withCredentials: true});
  }

  filterLogs(type: string, severity: string, pageSize: number, pageNumber: number): Observable<Log[]> {
    return this.http.get<Log[]>(this.getFilteredLogsURL + `?type=${type}` + `&severity=${severity}` +
      `&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      {withCredentials: true});
  }

  addLog(type: string, severity: string, date: string, message: string): Observable<string> {
    return this.http.get(this.addLogURL + `?type=${type}` + `&severity=${severity}` +
      `&dateOfLog=${date}` + `&message=${message}`,
      {responseType: 'text', withCredentials: true})
      .pipe(catchError(this.handleError<string>('addLog', '')));
  }

  // tslint:disable-next-line:max-line-length
  updateLog(logId: number | undefined, type: string | undefined, severity: string | undefined, date: string | undefined, message: string | undefined): Observable<string> {
    return this.http.get(this.updateLogURL + `?logId=${logId}` + `&type=${type}` + `&severity=${severity}` +
      `&dateOfLog=${date}` + `&message=${message}`,
      {responseType: 'text', withCredentials: true})
      .pipe(catchError(this.handleError<string>('updateLog', '')));
  }

  deleteLog(logId: number): Observable<string> {
    return this.http.get(this.deleteLogURL + `?logId=${logId}`,
      {responseType: 'text', withCredentials: true})
      .pipe(catchError(this.handleError<string>('deleteLog', '')));
  }
  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
