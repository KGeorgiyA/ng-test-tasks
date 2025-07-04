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
  template: `
    <mat-tab-group>
      <mat-tab label="Тестовые задания">
        <mat-nav-list>
          @for (task of tasks; track $index) {
            <mat-list-item (click)="onTask(task)"
                           [class.active]="task.id === taskService.activeTaskId()">
              <span class="title">{{ task.title }}</span>
            </mat-list-item>
          }
        </mat-nav-list>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    mat-tab-group {
      height: 100%;
    }
    .active {
      background-color: rgb(223, 223, 223) !important;
    }
  `,
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
