import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';

declare var $: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: []
})
export class PostComponent implements OnInit {
  //#region Variables

  private userID: number; // current userID
  private postID: number; // current postID
  public postDetails: any; // to store post details data from API
  public postComments: any; // to store post comments data from API
  public commentsBtnText: string; // text for comments button
  public showComments: boolean; // flag variable to show comments
  public isDeleted: boolean; // to show confirmation message after deletion success
  public isNotDeleted: boolean; // to show confirmation message after deletion failed
  public showPostUhOh: boolean; // show uh-oh screen when API fails
  public showCommentsUhOh: boolean; // show uh-oh screen when API fails
  public searchText: string; // search text
  public isOffline: boolean; // check offline status

  //#endregion

  //#region Constructor

  constructor(public appService: AppService, private activatedRoute: ActivatedRoute, private router: Router) {}

  //#endregion

  //#region Angular Methods

  ngOnInit(): void {
    this.initVariables();
    this.checkOffline();
    this.fetchPostDetails();
  }

  //#endregion

  //#region Private Methods

  // initialize local variables
  private initVariables(): void {
    this.userID = Number(this.activatedRoute.snapshot.paramMap.get('userID'));
    this.postID = Number(this.activatedRoute.snapshot.paramMap.get('postID'));

    if (!Number.isInteger(this.userID) || !Number.isInteger(this.postID)) {
      this.router.navigate(['404']);
    }

    this.postDetails = null;
    this.postComments = null;
    this.commentsBtnText = 'Show Comments';
    this.showComments = false;
    this.isDeleted = false;
    this.isNotDeleted = false;
    this.showPostUhOh = false;
    this.showCommentsUhOh = false;
  }

  // check offline status
  private checkOffline(): void {
    this.isOffline = !navigator.onLine;
  }

  // fetch post details
  private async fetchPostDetails(): Promise<void> {
    await this.appService.fetchPostDetails(this.postID).subscribe(
      (r) => {
        if (r) {
          this.postDetails = r;
        } else {
          this.showPostUhOh = true;
        }
      },
      () => {
        this.showPostUhOh = true;
      }
    );
  }

  // fetch post comments
  private async fetchComments(): Promise<void> {
    await this.appService.fetchPostComments(this.postID).subscribe(
      (r) => {
        if (r) {
          this.postComments = r;
        } else {
          this.showCommentsUhOh = true;
        }
      },
      () => {
        this.showCommentsUhOh = true;
      }
    );
  }

  //#endregion

  //#region Public Methods

  // show or hide comments section
  public toggleComments(): void {
    this.showComments = !this.showComments;

    if (this.showComments) {
      this.commentsBtnText = 'Hide Comments';

      if (!this.postComments) {
        this.fetchComments();
      }
    } else {
      this.commentsBtnText = 'Show Comments';
      this.showCommentsUhOh = false;
    }
  }

  // delete post
  public async deletePost(): Promise<void> {
    this.showComments = false;
    this.postDetails = null;
    $('#deleteModal').modal('hide');

    await this.appService.deletePost(this.postID).subscribe((r) => {
      if (r === false) {
        // this will never hit with the JsonPlaceholder fake API
        this.isNotDeleted = true;
      } else {
        this.isDeleted = true;
      }

      setTimeout(() => {
        if (this.isDeleted) {
          this.router.navigate(['user', this.userID]);
        }

        if (this.isNotDeleted) {
          this.isNotDeleted = !this.isNotDeleted;
          this.fetchPostDetails();
        }
      }, 3000);
    });
  }

  //#endregion
}
