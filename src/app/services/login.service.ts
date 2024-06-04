import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    private api: ApiService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private commonService: CommonService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.api
      .post<any>(`login_check`, { username, password })
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            this.localStorageService.set('jwt_token', response.token);
          }
        })
      )
  }

  getToken(): any {
    const token = this.localStorageService.get('jwt_token');
    return token;
  }

  logout(): void {
    this.localStorageService.remove('jwt_token');
    this.router.navigate(['/login']);

  }

  isLoggedIn(): boolean {
    const token = this.localStorageService.get('jwt_token');
    return this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    if (!token) return false;
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return expiry * 1000 > Date.now();
  }

  isAuthenticated(): Observable<boolean> {
    const isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedIn())
    return isLoggedIn.asObservable();
  }
}