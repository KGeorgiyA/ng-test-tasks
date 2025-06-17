import { Component, inject, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SidenavService } from '../../../../../shared/layouts/sidenav/sidenav.service';
import { TaskService } from '../../task.service';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-content',
  imports: [
    MatIcon,
    MatIconButton,
    RouterOutlet,
  ],
  templateUrl: './content-component.html',
  styleUrl: './content-component.scss',
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
