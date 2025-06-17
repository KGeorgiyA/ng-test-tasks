import { Component, inject } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatListItem, MatNavList } from '@angular/material/list';
import { mockTasks, ITask } from '../../mocks/mock.tasks';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [
    MatTab,
    MatTabGroup,
    MatNavList,
    MatListItem,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  public tasks = mockTasks;
  public taskService = inject(TaskService);
  private router = inject(Router);

  public onTask(task: ITask) {
    this.taskService.activeTaskId.set(task.id);
    this.router.navigate([task.route]).then();
  }
}
