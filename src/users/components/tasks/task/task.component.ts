import { Component, Input } from '@angular/core';
import { Task } from '../../../mocks/models/mock.Tasks';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() public task!: Task;
}
