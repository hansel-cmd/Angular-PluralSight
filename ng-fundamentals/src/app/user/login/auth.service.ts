import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, first, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser!: User | undefined;

  constructor(private http: HttpClient) {}

  loginUser(userName: string, password: string) {
    let loginInfo = { username: userName, password: password };
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post('/api/login', loginInfo, options).pipe(
      tap((response: any) => {
        this.currentUser = <User>response['user'];
      }),
      catchError((err) => of(false))
    );
  }

  logout() {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.currentUser = undefined;
    return this.http.post('/api/logout', {}, options);
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthStatus() {
    this.http
      .get('/api/currentIdentity')
      .pipe(
        tap((response) => {
          if (response instanceof Object) {
            this.currentUser = <User>response;
          }
        })
      )
      .subscribe();
  }

  updateCurrentUser(firstName: string, lastName: string) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    if (this.currentUser) {
      this.currentUser.firstName = firstName;
      this.currentUser.lastName = lastName;
    }
    return this.http.put(
      `/api/users/${this.currentUser?.id}`,
      this.currentUser,
      options
    );
  }
}
