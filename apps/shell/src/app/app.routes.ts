import { Routes } from '@angular/router';
import { HomeComponent } from '@flight-demo/shared/core';
import { integrateMfe } from '@flight-demo/shared/federation';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'booking',
    loadChildren: () => import('@flight-demo/domain/booking')
  },
  {
    path: 'checkin',
    loadChildren: () => import('@flight-demo/domain/checkin')
  },
  {
    path: 'boarding',
    loadChildren: () => import('@flight-demo/domain/boarding')
  },
  integrateMfe('miles'),
  integrateMfe('tickets'),
  {
    path: '**',
    redirectTo: 'home'
  }
];
