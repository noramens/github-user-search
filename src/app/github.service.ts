import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getGithub(userNameForm: { userName: string }): Observable<Object> {
    const userName: string = userNameForm?.userName;
    return this.http.get<Object>(`https://api.github.com/users/${userName}`);
  }
}
