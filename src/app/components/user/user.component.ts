import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  //#region Variables

  private userID: number; // current userID
  public userDetails: any; // to store user details data from API
  public userPosts: any; // to store user posts data from API
  public userPostsToDisplay: any; // to display user posts
  public skip: number; // number of posts to skip
  public limit: number; // number of posts to limit
  public showUhOh: boolean; // show uh-oh screen when API fails
  public searchText: string; // search text
  public collectionSize: number; // number of user posts (for pagination)
  public pageSize: number; // number of items in a page (for pagination)
  public currentPage: number; // current page
  public isOffline: boolean; // check offline status

  //#endregion

  //#region Constructor

  constructor(public appService: AppService, private activatedRoute: ActivatedRoute, private router: Router) {}

  //#endregion

  //#region Angular Methods

  ngOnInit(): void {
    this.initVariables();
    this.checkOffline();
    this.fetchUserDetails();
    this.fetchUserPosts();
  }

  //#endregion

  //#region Private Methods

  // initialize local variables
  private initVariables(): void {
    this.userID = Number(this.activatedRoute.snapshot.paramMap.get('userID'));

    if (!Number.isInteger(this.userID)) {
      this.router.navigate(['404']);
    }

    this.userDetails = null;
    this.userPosts = null;
    this.userPostsToDisplay = null;
    this.skip = 0;
    this.limit = 10;
    this.showUhOh = false;
  }

  // check offline status
  private checkOffline(): void {
    this.isOffline = !navigator.onLine;
  }

  // fetch user details
  private async fetchUserDetails(): Promise<void> {
    await this.appService.fetchUserDetails(this.userID).subscribe((r) => {
      if (r) {
        this.userDetails = r;
      } else {
        this.showUhOh = true;
      }
    });
  }

  // fetch user posts
  private async fetchUserPosts(): Promise<void> {
    await this.appService.fetchUserPosts(this.userID).subscribe((r) => {
      if (r) {
        this.userPosts = r;

        this.collectionSize = this.userPosts.length;
        this.pageSize = this.calculateDefaultPageSize(this.collectionSize);
        this.currentPage = 1;

        this.pageChange(1);

        for (let i = 0; i < this.collectionSize; ++i) {
          this.userPosts[i].index = i;
        }

        var posts = [];

        for (let i = 0; i < this.collectionSize; ++i) {
          if (this.userPosts[i].index >= this.skip && this.userPosts[i].index < this.limit) {
            posts.push(this.userPosts[i]);
          }
        }

        this.userPostsToDisplay = posts;
      } else {
        this.showUhOh = true;
      }
    });
  }

  // calculate default page size
  private calculateDefaultPageSize(totalSize: number): number {
    if (totalSize <= 50) {
      return 5;
    } else if (totalSize <= 100) {
      return 10;
    } else {
      return 20;
    }
  }

  //#endregion

  //#region Public Methods

  // page change event for pagination
  public pageChange(page): void {
    this.currentPage = page;

    this.skip = this.currentPage * this.pageSize - (this.currentPage * this.pageSize) / this.currentPage;
    this.limit = this.currentPage * this.pageSize;

    var posts = [];

    for (let i = 0; i < this.collectionSize; ++i) {
      if (this.userPosts[i].index >= this.skip && this.userPosts[i].index < this.limit) {
        posts.push(this.userPosts[i]);
      }
    }

    this.userPostsToDisplay = posts;
  }

  // navigate to post screen
  public navigateToPost(post: any): void {
    this.router.navigate(['user', this.userID, 'post', post.id]);
  }

  //#endregion
}
