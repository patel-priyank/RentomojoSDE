import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  private userID: number;
  public userPosts: any;
  public userDetails: any;
  public skip: number = 0;
  public limit: number = 10;

  constructor(public appService: AppService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.userID = Number(this.activatedRoute.snapshot.paramMap.get('userID'));

    this.fetchUserDetails();
    this.fetchUserPosts();
  }

  private async fetchUserDetails(): Promise<void> {
    await this.appService.fetchUserDetails(this.userID).subscribe((r) => {
      this.userDetails = r;
    });
  }

  private async fetchUserPosts(): Promise<void> {
    await this.appService.fetchUserPosts(this.userID, this.skip, this.limit).subscribe((r) => {
      this.userPosts = r;
    });
  }
}
