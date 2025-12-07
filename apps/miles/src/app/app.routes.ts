import { Routes } from '@angular/router';
import { Detail } from './views/detail';
import { Overview } from './views/overview';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'miles',
    pathMatch: 'full'
  },
  {
    path: 'miles',
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: Overview
      },
      {
        path: 'detail/:id',
        component: Detail
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
