import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: []
})
export class PostComponent implements OnInit {
  private userID: number;
  private postID: number;
  public postDetails: any;
  public postComments: any;
  public showComments: boolean;

  constructor(public appService: AppService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userID = Number(this.activatedRoute.snapshot.paramMap.get('userID'));
    this.postID = Number(this.activatedRoute.snapshot.paramMap.get('postID'));

    this.fetchPostDetails();
  }

  private async fetchPostDetails(): Promise<void> {
    await this.appService.fetchPostDetails(this.postID).subscribe((r) => {
      this.postDetails = r;
    });
  }

  public async fetchComments(): Promise<void> {
    this.showComments = true;

    await this.appService.fetchPostComments(this.postID).subscribe((r) => {
      this.postComments = r;
    });
  }

  public async deletePost(): Promise<void> {
    this.showComments = false;
    this.postDetails.title = 'deleting...';
    this.postDetails.body = null;

    await this.appService.deletePost(this.postID).subscribe(() => {
      this.router.navigate([this.userID]);
    });
  }
}
