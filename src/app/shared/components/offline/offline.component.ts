import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styles: []
})
export class OfflineComponent implements OnInit {
  //#region Constructor

  constructor(private router: Router) {}

  //#endregion

  //#region Angular methods

  ngOnInit(): void {}

  //#endregion

  //#region Public methods

  // refresh the page
  public refresh(): void {
    location = location;
  }

  //#endregion
}
