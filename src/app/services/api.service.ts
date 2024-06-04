import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(protected httpClient: HttpClient) {}

  public post<T>(
    path: string,
    body: unknown,
    options: { [param: string]: unknown } = {}
  ): Observable<T> {
    return this.httpClient.post<T>(
      `${environment.apiUrl}/api/${path}`,
      body,
      options
    );
  }

  public get<T>(
    path: string,
    options: { [param: string]: unknown } = {}
  ): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/${path}`, options);
  }

  public download<T>(
    path: string,
    options: { [param: string]: unknown } = {}
  ): Observable<any> {
    return this.httpClient.get(path, options);
  }
}
