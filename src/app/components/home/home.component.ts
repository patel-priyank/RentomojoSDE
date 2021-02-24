import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  //#region Variables

  public allUsers: any; // to store user data from API
  public showUhOh: boolean; // show uh-oh screen when API fails
  public searchText: string; // search text
  public isOffline: boolean; // check offline status
  public listView: boolean; // to toggle views

  //#endregion

  //#region Constructor

  constructor(public appService: AppService, private router: Router) {}

  //#endregion

  //#region Angular methods

  ngOnInit(): void {
    this.initVariables();
    this.checkOffline();
    this.fetchUsers();
  }

  //#endregion

  //#region Private methods

  // initialize local variables
  private initVariables(): void {
    this.allUsers = null;
    this.showUhOh = false;
    this.isOffline = false;
    this.listView = true;
  }

  // check offline status
  private checkOffline(): void {
    this.isOffline = !navigator.onLine;
  }

  // fetch user list
  private async fetchUsers(): Promise<void> {
    await this.appService.fetchUsers().subscribe((r) => {
      if (r) {
        this.allUsers = r;
      } else {
        this.showUhOh = true;
      }
    });
  }

  //#endregion

  //#region Public methods

  // toggle between list view and cards view
  public toggleView(): void {
    this.listView = !this.listView;
  }

  // navigate to user screen
  public navigateToUser(user: any) {
    this.router.navigate(['user', user.id]);
  }

  //#endregion
}
