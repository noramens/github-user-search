import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetReposService {
  constructor(private http: HttpClient) {}

  getRepos(userName: string): Observable<Object> {
    return this.http.get(`https://api.github.com/users/${userName}/repos`);
  }
}
