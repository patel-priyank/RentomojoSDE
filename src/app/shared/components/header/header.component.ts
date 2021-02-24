import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ThemeService } from 'ng-bootstrap-darkmode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  constructor(private themeService: ThemeService, private appService: AppService) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.appService.switchColors();
    });
  }
}
