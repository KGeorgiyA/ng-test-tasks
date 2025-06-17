import { AfterViewChecked, Component, inject } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { TasksComponent } from '../../../users/components/tasks/tasks.component';
import { SidenavService } from './sidenav.service';
import { TaskService } from '../../../users/components/tasks/task.service';
import { ContentComponent } from '../../../users/components/tasks/task/content/content-component';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    TasksComponent,
    ContentComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements AfterViewChecked {
  public sidenavService = inject(SidenavService);
  private taskService = inject(TaskService);

  public ngAfterViewChecked() {
    const width = window.innerWidth;

    if (width > 920) {
      this.sidenavService.isOpened.set(true);
    } else {
      if (this.sidenavService.isOpened()) {
        if (width <= 600) {
          const activeChatId = this.taskService.activeTaskId();
          this.sidenavService.isOpened.set(activeChatId === 0);
        } else {
          this.sidenavService.isOpened.set(true);
        }
      }
    }
  }
}
