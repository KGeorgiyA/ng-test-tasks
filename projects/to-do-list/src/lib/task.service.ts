import { Injectable } from '@angular/core';
import { ITask } from './task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public tasks$ = new BehaviorSubject<ITask[]>([]);

  public get(id: number) {
    return this.tasks$.value.find(task => task.id === id);
  }

  public changeStatus(task: ITask) {
    const tasks = this.tasks$.value;
    const index = tasks.findIndex(t => t.id === task.id);

    tasks[index].status = !task.status;

    this.tasks$.next(tasks);
  }

  public add(task: ITask) {
    const tasks = this.tasks$.value;
    tasks.unshift(task);

    this.tasks$.next(tasks);
  }

  public edit(task: ITask) {
    const tasks = this.tasks$.value;
    const index = tasks.findIndex(t => t.id === task.id);

    tasks[index] = task;
    this.tasks$.next(tasks);
  }

  public delete(id: number) {
    const tasks = this.tasks$.value;
    const index = tasks.findIndex(t => t.id === id);

    tasks.splice(index, 1);

    this.tasks$.next(tasks);
  }

  public genId(tasks: ITask[]) {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
}
