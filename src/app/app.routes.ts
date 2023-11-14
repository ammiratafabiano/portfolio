import { Routes } from '@angular/router';
import { Section } from './models/component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: Section.Overview,
    pathMatch: 'full',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  }
];
