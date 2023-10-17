import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './pages/home/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PostInfoComponent } from './pages/home/post-info/post-info.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnauthGuard } from './shared/guards/unauth.guard';
import { LogInComponent } from './pages/log-in/log-in.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signUp', component: SignUpComponent, canActivate: [UnauthGuard] },
  { path: 'login', component: LogInComponent, canActivate: [UnauthGuard] },
  { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] },
  {
    path: 'r/:id',
    component: PostInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/user/:username',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  //this one needs to be the final path
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
