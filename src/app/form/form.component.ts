import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  userNameForm: any;
  githubData$: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private githubService: GithubService
  ) {
    this.userNameForm = formBuilder.group({ userName: '' });
  }

  ngOnInit(): void {}

  onSubmit(userNameForm: { userName: string }) {
    const userName: string = userNameForm?.userName;
    userName &&
      this.githubService.getGithub(userName).subscribe((data) => {
        console.log('data: ', data);
        this.githubData$ = [data];
      });
    this.userNameForm.reset();
  }
}
