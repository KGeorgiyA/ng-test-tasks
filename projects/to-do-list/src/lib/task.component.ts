import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from './task.service';

@Component({
  selector: 'td-list-task',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
  ],
  template: `
    <mat-card>
      <mat-card-header style="margin: 0 auto"><h2>{{ task?.title }}</h2></mat-card-header>
      <mat-card-content>
        <span><b>Статус:</b> {{ task?.status ? 'Выполнено' : 'Не выполнено' }}</span>
        <span><b>Описание:</b> {{ task?.description }}</span>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');

    h2, h3, p, span {
      font-family: "Caveat", cursive;
    }
    h2 {
      font-weight: 500;
      font-size: 3rem;
    }
    h3 {
      font-weight: 500;
      font-size: 2.4rem;
    }
    p, span {
      font-size: 2rem;
    }

    mat-card {
      padding: 32px;
      min-width: 320px;
      max-width: 600px;
      max-height: calc(100vh - 32px);

      mat-card-content {
        display: flex;
        flex-direction: column;
        overflow: auto;
        margin: 10px;

        span {
          margin: 8px 0;
        }
      }
    }
  `,
})
export class TaskComponent {
  public route = inject(ActivatedRoute);
  public taskService = inject(TaskService);
  public task = this.taskService.get(+this.route.snapshot.params['taskId']);
}
