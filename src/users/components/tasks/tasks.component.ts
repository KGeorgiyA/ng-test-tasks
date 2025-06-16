import { Component, inject } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatListItem, MatNavList } from '@angular/material/list';
import { TaskComponent } from './task/task.component';
import { mockTasks, Task } from '../../mocks/models/mock.Tasks';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [
    MatTab,
    MatTabGroup,
    MatNavList,
    MatListItem,
    TaskComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  public tasks = mockTasks;
  public taskService = inject(TaskService);
  private router = inject(Router);

  public onTask(task: Task) {
    this.taskService.activeTaskId.set(task.id);
    this.router.navigate(['tasks', task.id]).then();
  }
}
