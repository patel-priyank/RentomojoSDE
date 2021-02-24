import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //#region Constructor

  constructor(@Inject('apiUrl') private _apiUrl: string, private http: HttpClient) {}

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

  //#endregion
}
