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
        this.userDetails$ = [data];
        const twitterHandle = this.userDetails$[0]?.twitter_username;
        this.twitterLink =
          twitterHandle && `https://twitter.com/${twitterHandle}`;
      });

    this.userName &&
      this.getReposService.getRepos(this.userName).subscribe((data) => {
        this.repos$ = data;
      });
  }
}
