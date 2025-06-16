import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public activeTaskId = signal(0);
}
