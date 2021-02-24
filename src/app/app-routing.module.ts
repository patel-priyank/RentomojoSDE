import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':userID', component: UserComponent },
  { path: ':userID/:postID', component: PostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
