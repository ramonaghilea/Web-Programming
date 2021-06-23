import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost/lab/Lab8/PHP/login.php';
  private getUsersURL = 'http://localhost/lab/Lab8/PHP/getUsers.php';
  userId = '1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  // setUserId(id: string): void {
  //   this.userId = id;
  // }
  logIn(username: string, password: string): Observable<string> {
    // @ts-ignore
    // const response =  this.http.post<User>(this.userUrl, user, {responseType: 'text'})
    //   .pipe(catchError(this.handleError<User>('login')));
    return this.http.get(this.userUrl + `?username=${username}` +
      `&password=${password}`, {responseType: 'text'})
      // .subscribe(response => console.log(response));
      .pipe(catchError(this.handleError<string>('logIn', '')));
      // .subscribe(response => this.userId = response);

    // console.log('session id in user service' + this.userId);
    // sessionStorage.setItem('id', this.userId);

    // console.log('returned in service');

    // @ts-ignore
    // sessionStorage.setItem('id', response);
    // return response;
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUsersURL)
      .pipe(catchError(this.handleError<User[]>('fetchStudents', []))
      );
  }
}
