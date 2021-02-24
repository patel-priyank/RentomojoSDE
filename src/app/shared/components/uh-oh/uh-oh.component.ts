import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uh-oh',
  templateUrl: './uh-oh.component.html',
  styles: []
})
export class UhOhComponent implements OnInit {
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
}
