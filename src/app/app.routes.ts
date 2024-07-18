import { Routes } from '@angular/router';
import { ComponentDetailsComponent } from './pages/home/components/component-details/component-details.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'company/:id',
    component: HomeComponent,
    children: [
      {
        path: 'component/:componentId',
        component: ComponentDetailsComponent
      }
    ]
  }
];
