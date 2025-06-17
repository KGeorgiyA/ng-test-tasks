import { Routes } from '@angular/router';
import { SidenavComponent } from '../shared/layouts/sidenav/sidenav.component';
import { RoutesComponent } from '../../projects/table-routes/src/lib/routes.component';

export const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'table-routes',
        component: RoutesComponent,
        loadChildren: () => import("../../projects/table-routes/src/lib/routes-module").then(m => m.RoutesModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
