import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TaskService } from './task.service';
import { ITask } from './task';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../../../../src/shared/components/dialogs/yes-no-dialog.component';

@Component({
  selector: 'td-list',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    MatIcon,
    MatCardFooter,
    MatNavList,
    MatListItem,
    MatIconButton,
    MatCheckbox,
    MatTooltip,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    AsyncPipe,
  ],
  providers: [],
  template: `
    <a mat-raised-button href="https://drive.google.com/file/d/1a60gP58vE-tmlZ5ZC2u6Rf33GV0tx4oe/view?usp=sharing" target="_blank" style="margin-bottom: 8px">Ознакомиться с заданием</a>
    <mat-card>
      <mat-card-header style="margin: 0 auto"><h2>Список дел</h2></mat-card-header>
      <mat-card-content>
        <mat-nav-list>
          @for (task of taskService.tasks$ | async; track $index) {
            <mat-list-item matTooltip="Подробнее">
              <div class="item">
                <mat-checkbox [ngModel]="task.status" (click)="this.taskService.changeStatus(task)"></mat-checkbox>
                <button mat-button [routerLink]="[task.id]">
                  <span [ngClass]="task.status ? 'completed' : ''">{{ task.title }}</span>
                </button>
                <div class="controls">
                  <button color="primary" matTooltip="Изменить" mat-icon-button [routerLink]="[task.id, 'edit']">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button color="warn" matTooltip="Удалить" mat-icon-button (click)="openDialog(task)">
                    <mat-icon>remove</mat-icon>
                  </button>
                </div>
              </div>
            </mat-list-item>
          }
        </mat-nav-list>
      </mat-card-content>
      <mat-card-footer>
        <button color="primary" matTooltip="Добавить" mat-flat-button [routerLink]="['add']">
          <mat-icon>add</mat-icon>
          Добавить задачу
        </button>
      </mat-card-footer>
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
      max-width: 900px;
      max-height: calc(100vh - 32px);

      mat-card-content {
        overflow: auto;
        margin: 10px;

        mat-nav-list {
          mat-list-item {
            height: 50px;

            .item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              overflow: hidden;

              button {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                min-width: 40px;

                .completed {
                  overflow: hidden;
                  white-space: nowrap;
                  text-decoration: line-through;
                }
              }

              .controls {
                display: flex;
                width: fit-content;
              }
            }
          }
        }
      }

      mat-card-footer {
        display: flex;

        button {
          margin: 0 auto;
        }
      }
    }
  `,
})
export class ToDoListComponent {
  public taskService = inject(TaskService);

  private readonly dialog = inject(MatDialog);

  protected openDialog(task: ITask) {
    const info = 'Вы уверены, что хотите удалить задачу?';
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: { info },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.taskService.delete(task.id);
      }
    });
  }
}
