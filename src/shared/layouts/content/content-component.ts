import { Component, inject, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SidenavService } from '../sidenav/sidenav.service';
import { TaskService } from '../../../users/components/tasks/task.service';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-content',
  imports: [
    MatIcon,
    MatIconButton,
    RouterOutlet,
  ],
  template: `
    <button (click)="onMenu()" class="btn-menu" mat-icon-button>
      @if (sidenavService.isOpened()) {
        <mat-icon>arrow_back</mat-icon>
      } @else {
        <mat-icon>menu</mat-icon>
      }
    </button>
    <router-outlet />
  `,
  styles: `
    .btn-menu {
      display: none;
    }
    @media (max-width: 925px) {
      .btn-menu {
        display: flex;
        margin-right: 8px;
      }
    }
  `,
})
export class ContentComponent implements OnInit {
  public taskService = inject(TaskService);
  public sidenavService = inject(SidenavService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public ngOnInit() {
    this.taskService.activeTaskId.set(+this.route.snapshot.params['taskId']);
  }

  public onMenu() {
    this.sidenavService.toggleSidenav();

    if (window.innerWidth <= 600) {
      this.taskService.activeTaskId.set(0);
      this.router.navigate(['../']).then();
    }
  }
}
