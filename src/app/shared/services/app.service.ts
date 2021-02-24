import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from 'ng-bootstrap-darkmode';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //#region Constructor

  constructor(
    @Inject('apiUrl') private _apiUrl: string,
    private http: HttpClient,
    private themeService: ThemeService
  ) {}

  //#endregion

  //#region Public methods

  // fetch user list in the home page
  public fetchUsers(): any {
    return this.http.get(this._apiUrl + `users`);
  }

  // fetch user details (for user name) in the user page
  public fetchUserDetails(userID: number): any {
    return this.http.get(this._apiUrl + `users/${userID}`);
  }

  // fetch user posts
  public fetchUserPosts(userID: number): any {
    return this.http.get(this._apiUrl + `posts?userId=${userID}`);
  }

  // fetch post details
  public fetchPostDetails(postID: number): any {
    return this.http.get(this._apiUrl + `posts/${postID}`);
  }

  // fetch post comments
  public fetchPostComments(postID: number): any {
    return this.http.get(this._apiUrl + `comments?postId=${postID}`);
  }

  // delete a post
  public deletePost(postID: number): any {
    return this.http.delete(this._apiUrl + `posts/${postID}`);
  }

  // switch colors of elements not covered by npm package
  public switchColors(): void {
    switch (this.themeService.savedTheme) {
      case 'light':
        // navbar
        if (document.getElementById('header')) {
          document.getElementById('header').classList.remove('navbar-dark');
          document.getElementById('header').classList.remove('bg-dark');
          document.getElementById('header').classList.add('navbar-light');
          document.getElementById('header').classList.add('bg-light');
        }

        // home page card shadows
        if (Array.from(document.getElementsByClassName('user-card')).length > 0) {
          var cards = Array.from(document.getElementsByClassName('user-card'));

          cards.forEach((card) => {
            card.classList.remove('user-card-shadow-dark');
            card.classList.add('user-card-shadow-light');
          });
        }

        break;

      case 'dark':
        // navbar
        if (document.getElementById('header')) {
          document.getElementById('header').classList.remove('navbar-light');
          document.getElementById('header').classList.remove('bg-light');
          document.getElementById('header').classList.add('navbar-dark');
          document.getElementById('header').classList.add('bg-dark');
        }

        // home page card shadows
        if (Array.from(document.getElementsByClassName('user-card')).length > 0) {
          var cards = Array.from(document.getElementsByClassName('user-card'));

          cards.forEach((card) => {
            card.classList.remove('user-card-shadow-light');
            card.classList.add('user-card-shadow-dark');
          });
        }

        break;
    }
  }

  //#endregion
}
