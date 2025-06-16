import { Routes } from '@angular/router';
import { SidenavComponent } from '../shared/layouts/sidenav/sidenav.component';
import { ContentComponent } from '../users/components/tasks/task/content/content-component';

export const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'tasks/:taskId',
        component: ContentComponent,
      },

    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
