import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { GetReposService } from '../get-repos.service';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userName: any;
  userDetails$: any;
  repos$: any = [];
  twitterLink: any;
  loadingUserDetails: boolean = false;
  errorLoadingUserDetails: boolean = false;
  loadingRepos: boolean = false;
  errorLoadingRepos: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private getReposService: GetReposService
  ) {}

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName');
    this.userDetails$ = [];
    this.errorLoadingUserDetails = false;
    this.errorLoadingRepos = false;

    if (this.userName) {
      this.loadingUserDetails = true;
      this.loadingRepos = true;

      this.fetchUserDetails();

      this.fetchRepos();
    }
  }

  fetchUserDetails(): void {
    this.githubService
      .getGithub(this.userName)
      .pipe(
        finalize(() => {
          this.loadingUserDetails = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.userDetails$ = [data];
          const twitterHandle = this.userDetails$[0]?.twitter_username;
          this.twitterLink =
            twitterHandle && `https://twitter.com/${twitterHandle}`;
        },
        error: (error) => {
          this.errorLoadingUserDetails = true;
          throw error;
        },
      });
  }

  fetchRepos(): void {
    this.getReposService
      .getRepos(this.userName)
      .pipe(
        finalize(() => {
          this.loadingRepos = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.repos$ = data;
        },
        error: (error) => {
          this.errorLoadingRepos = true;
          throw error;
        },
      });
  }
}
