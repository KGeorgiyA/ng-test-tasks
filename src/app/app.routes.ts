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
        loadChildren: () => import("../../projects/table-routes/src/lib/table-routes.routes").then(m => m.routes),
      },
      {
        path: 'to-do-list',
        component: RoutesComponent,
        loadChildren: () => import("../../projects/to-do-list/src/lib/to-do-list.routes").then(m => m.routes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
