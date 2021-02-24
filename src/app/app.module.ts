import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { getApiUrl } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { OfflineComponent } from './shared/components/offline/offline.component';
import { UhOhComponent } from './shared/components/uh-oh/uh-oh.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { PostComponent } from './components/post/post.component';
import { StringFilterPipe } from './shared/pipes/string-filter.pipe';
import { SearchFilterPipe } from './shared/pipes/search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    OfflineComponent,
    UhOhComponent,
    HomeComponent,
    UserComponent,
    PostComponent,
    StringFilterPipe,
    SearchFilterPipe
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule, FormsModule],
  providers: [
    {
      provide: 'apiUrl',
      useValue: getApiUrl()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
