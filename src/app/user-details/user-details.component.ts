import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private getReposService: GetReposService
  ) {}

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName');
    this.userName &&
      this.githubService.getGithub(this.userName).subscribe((data) => {
        console.log('data: ', data);
        this.userDetails$ = [data];
        this.twitterLink =
          this.userDetails$.twitter_username &&
          `https://twitter.com/${this.userDetails$.twitter_username}`;
      });

    this.userName &&
      this.getReposService.getRepos(this.userName).subscribe((data) => {
        console.log('repos: ', data);
        this.repos$ = data;
      });
  }
}
