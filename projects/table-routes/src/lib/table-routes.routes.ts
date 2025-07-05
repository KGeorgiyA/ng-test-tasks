import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { RouteFormComponent } from './components/forms/route-form/route-form.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'add', component: RouteFormComponent },
  { path: ':routeId/edit', component: RouteFormComponent },
];
