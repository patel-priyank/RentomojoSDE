import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  public allUsers: any;

  constructor(public appService: AppService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  private async fetchUsers(): Promise<void> {
    await this.appService.fetchUsers().subscribe((r) => {
      this.allUsers = r;
    });
  }
}
