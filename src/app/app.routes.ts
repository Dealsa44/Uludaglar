import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: ':lang',
    component: AppComponent
  },
  {
    path: '',
    redirectTo: '/tr',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/tr',
  }
];
