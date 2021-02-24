import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: []
})
export class NotFoundComponent implements OnInit {
  //#region Constructor

  constructor(private router: Router) {}

  //#endregion

  //#region Angular methods

  ngOnInit(): void {}

  //#endregion

  //#region Public methods

  // navigate to home page
  public navigateToHome(): void {
    this.router.navigate(['']);
  }

  //#endregion
}
