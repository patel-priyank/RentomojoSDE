import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uh-oh',
  templateUrl: './uh-oh.component.html',
  styles: []
})
export class UhOhComponent implements OnInit {
  //#region Variables

  public isOffline: boolean; // check offline status

  //#endregion

  //#region Constructor

  constructor(private router: Router) {}

  //#endregion

  //#region Angular methods

  ngOnInit(): void {
    this.isOffline = !navigator.onLine;
  }

  //#endregion

  //#region Public methods

  // refresh the page
  public refresh(): void {
    location = location;
  }
}
