import { AfterViewInit, Component, inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { IRoute } from '../../route';
import { RouteService } from '../../route.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 't-routes-list',
  imports: [
    RouterLink,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderCell,
    MatIcon,
    MatIconButton,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatSort,
    MatPaginator,
    MatSortHeader,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  public dataSource: MatTableDataSource<IRoute> = new MatTableDataSource<IRoute>();
  public routeService = inject(RouteService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) private paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) private sort: MatSort = new MatSort();

  private subscription = new Subscription();

  public ngOnInit() {
    this.subscription.add(
      this.routeService.routes$.subscribe(routes => this.dataSource.data = routes)
    );
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onSortChange($event: Sort) {
    this.sort.active = $event.active;
    this.sort.direction = $event.direction;

    this.dataSource.sort = this.sort;
  }

  protected onPageChange($event: PageEvent) {
    this.dataSource.sort = this.sort;
    this.paginator.pageSize = $event.pageSize;
    this.paginator.pageIndex = $event.pageIndex;
    this.paginator.length = $event.length;

    if ($event.pageIndex < this.paginator.pageIndex) {
      this.paginator.previousPage();
    } else if ($event.pageIndex > this.paginator.pageIndex) {
      this.paginator.nextPage();
    }

    this.dataSource.paginator = this.paginator;
  }

  public openDialog(routeId: string) {
    const info = 'Вы уверены, что хотите удалить данный маршрут?';
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: { info },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete(routeId);
      }
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Скрыть', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }

  private delete(routeId: string) {
    this.routeService.delete(routeId);
    this.openSnackBar('Успешно удалено.');
  }
}
