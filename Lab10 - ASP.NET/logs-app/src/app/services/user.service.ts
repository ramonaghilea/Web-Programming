import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, Subscription} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private usernameOnSession = '';
  private url = 'https://localhost:44313/Main';

  private userLogInUrl = this.url + `/logIn`;
  private userLogOutUrl = this.url + `/logOut`;
  private getUsernameUrl = this.url + `/getUsernameOnSession`;
  private isLoggedInUrl = this.url + `/isLoggedIn`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient,
              private router: Router) { }

  getUsername(): Observable<string> {
    return this.http.get(this.getUsernameUrl,
      {responseType: 'text', withCredentials: true});
  }

  loggedIn(): Observable<number> {
    return this.http.get<number>(this.isLoggedInUrl,
      {withCredentials: true});
  }

  logIn(username: string, password: string): Observable<string> {
    // @ts-ignore
    // const response =  this.http.post<User>(this.userUrl, user, {responseType: 'text'})
    //   .pipe(catchError(this.handleError<User>('login')));
    return this.http.get(this.userLogInUrl + `?usernameString=${username}` +
      `&passwordString=${password}`, {responseType: 'text', withCredentials: true});
      // .subscribe(
      //   response => console.log(response),
      //   error => alert(error),
      //   () => this.router.navigate([`/homepage`])
      // );
      // .pipe(catchError(this.handleError<string>('logIn', '')));
      // .subscribe(response => this.userId = response);

    // console.log('session id in user service' + this.userId);
    // sessionStorage.setItem('id', this.userId);

    // console.log('returned in service');

    // @ts-ignore
    // sessionStorage.setItem('id', response);
    // return response;
  }

  logOut(): Observable<string> {
    return this.http.get(this.userLogOutUrl, {responseType: 'text', withCredentials: true});
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.getUsersURL)
  //     .pipe(catchError(this.handleError<User[]>('fetchStudents', []))
  //     );
  // }
}
