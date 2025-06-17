import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatFormField, MatHint } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteService } from '../../../route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRoute } from '../../../route';
import { interfaces } from '../../../mocks/mock.interfaces';
import { map, take } from 'rxjs';

@Component({
  selector: 't-routes-route-form',
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
  ],
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.css',
})
export class RouteFormComponent implements OnInit {
  public routeService = inject(RouteService);
  private readonly snackBar = new MatSnackBar();
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  public form = this.fb.group({
    address: ['', [
      Validators.required,
      Validators.pattern(/^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\/(3[0-2]|[0-2]?\d)$/),
    ]],
    mask: ['', [
      Validators.required,
      Validators.pattern(/^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.|$)){4}$/),
    ]],
    gateway: ['', [
      Validators.required,
      Validators.pattern(/^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.|$)){4}$/),
    ]],
    interface: ['', Validators.required],
  });

  public ngOnInit() {
    const params = this.route.snapshot.params;

    this.routeService.routes$.pipe(
      map(routes => routes.find(r => r.uuid === params['routeId'])),
      take(1)
    ).subscribe(route => {
      if (route) {
        this.form.patchValue({
          address: route.address,
          mask: route.mask,
          gateway: route.gateway,
          interface: route.interface,
        });
      }
    });
  }

  public save() {
    if (this.form.valid) {
      this.form.disable();
      setTimeout(() => {
        const params = this.route.snapshot.params;

        const route: IRoute = {
          uuid: params['routeId'] ? params['routeId'] : '',
          address: this.form.value.address as string,
          mask: this.form.value.mask as string,
          gateway: this.form.value.gateway as string,
          interface: this.form.value.interface as string,
        };
        if (this.routeService.action() == 'edit') {
          this.routeService.edit(route);
        } else if (this.routeService.action() == 'add') {
          this.routeService.add(route);
        }

        this.form.enable();
        this.router.navigate(['/table-routes']).then();
        this.openSnackBar(this.routeService.message$.value);
      }, 500);
    }
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Скрыть', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }

  protected readonly interfaces = interfaces;
}
