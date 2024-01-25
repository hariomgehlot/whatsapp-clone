import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    data: {},
    component: HomeComponent,
  },
  {
    path: 'login',
    canActivate: [],
    data: {},
    component: SigninComponent,
  },
  {
    path: '**',
    data: {},
    redirectTo: '/login',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppRoutingModule {}
