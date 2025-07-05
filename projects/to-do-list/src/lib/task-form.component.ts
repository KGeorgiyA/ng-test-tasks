import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatError } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './task.service';
import { ITask } from './task';

@Component({
  selector: 'td-list-task-form',
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatFormField,
  ],
  template: `
    @if (route.snapshot.params['taskId']) {
      <h1>Редактирование задачи</h1>
    } @else {
      <h1>Добавление задачи</h1>
    }

    <form (ngSubmit)="save()" [formGroup]="form" class="form">
      <mat-form-field>
        <mat-label>Название</mat-label>
        <input formControlName="title" placeholder="Задача номер 1" matInput>
        @if (form.controls.title.hasError('required')) {
          <mat-error>Укажите название</mat-error>
        }
      </mat-form-field>
      <br>
      <mat-form-field>
        <mat-label>Описание</mat-label>
        <input formControlName="description" placeholder="Что надо сделать?" matInput>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Статус</mat-label>
        <mat-select formControlName="status">
          <mat-option  [value]="false">
            {{ 'Не выполнено' }}
          </mat-option>
          <mat-option  [value]="true">
            {{ 'Выполнено' }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <br>
      <button [disabled]="form.disabled||form.invalid" color="primary" mat-raised-button>Сохранить</button>
    </form>
  `,
  styles: `
    .form {
      min-width: 150px;
      max-width: 500px;

      mat-form-field {
        margin-bottom: 4px;
        width: 100%;
      }

      button {
        margin-top: 4px;
      }
    }
  `,
})
export class TaskFormComponent implements OnInit {
  public taskService = inject(TaskService);
  public route = inject(ActivatedRoute);

  private taskId: string | undefined = this.route.snapshot.params['taskId'];
  private readonly snackBar = new MatSnackBar();
  private router = inject(Router);
  private fb = inject(FormBuilder);

  public form = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    status: [false],
  });

  public ngOnInit() {
    if (this.taskId) {
      const task = this.taskService.get(+this.taskId);
      if (task) {
        this.form.controls.title.setValue(task.title);
        this.form.controls.description.setValue(task.description);
        this.form.controls.status.setValue(task.status);
      } else {
        this.router.navigate(['/to-do-list']).then(() => this.openSnackBar('Задача не найдена.'));
      }
    }
  }

  public save() {
    if (this.form.valid) {
      this.form.disable();
      setTimeout(() => {
        const id = this.taskId ? +this.taskId : this.taskService.genId(this.taskService.tasks$.value);
        const task: ITask = {
          id: id,
          title: this.form.value.title as string,
          description: this.form.value.description as string,
          status: this.form.value.status as boolean,
        };

        if (this.taskId) {
          this.taskService.edit(task);
        } else {
          this.taskService.add(task);
        }

      }, 500);

      this.router.navigate(['/to-do-list']).then(() => this.openSnackBar('Задача добавлена'));
    }
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 1000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
