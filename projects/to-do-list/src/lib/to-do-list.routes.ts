import { Routes } from '@angular/router';
import { ToDoListComponent } from './to-do-list.component';
import { TaskFormComponent } from './task-form.component';
import { TaskComponent } from './task.component';

export const routes: Routes = [
  { path: '', component: ToDoListComponent },
  { path: 'add', component: TaskFormComponent },
  { path: ':taskId/edit', component: TaskFormComponent },
  { path: ':taskId', component: TaskComponent },
];
