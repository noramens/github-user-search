import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  userNameForm: any;
  githubData$: any[] = [];
  errorStatus: any;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private githubService: GithubService
  ) {
    this.userNameForm = formBuilder.group({ userName: '' });
  }

  ngOnInit(): void {}

  fetchGitData(userName: string): void {
    this.githubService
      .getGithub(userName)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.githubData$ = [data];
        },
        error: (error) => {
          this.errorStatus = error.status;
          throw error;
        },
      });
  }

  handleClose(): void {
    this.userNameForm.reset();
  }

  onSubmit(userNameForm: { userName: string }): void {
    this.githubData$ = [];
    this.errorStatus = '';
    const userName: string = userNameForm?.userName;
    if (userName) {
      this.loading = true;
      this.fetchGitData(userName);
    }
  }
}
