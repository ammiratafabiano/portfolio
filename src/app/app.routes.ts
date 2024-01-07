import { Routes } from '@angular/router';
import { Section } from './enums/section';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.page').then( m => m.ProjectsPage)
  },
  {
    path: 'project-detail/:id',
    loadComponent: () => import('./pages/project-detail/project-detail.page').then( m => m.ProjectDetailPage)
  }
];
