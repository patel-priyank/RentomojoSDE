import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ThemeService } from 'ng-bootstrap-darkmode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  //#region Constructor

  constructor(private themeService: ThemeService, private appService: AppService, private router: Router) {}

  //#endregion

  //#region Angular methods

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.appService.switchColors();
    });
  }

  //#endregion

  //#region Public methods

  // navigate to home page
  public navigateToHome(): void {
    this.router.navigate(['']);
  }

  //#endregion
}
