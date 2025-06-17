import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 't-routes-yes-no-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
  template: `
    <h2 mat-dialog-title>Подтвердите действие</h2>
    <mat-dialog-content>
      {{ data.info }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Нет</button>
      <button (click)="onYes()" color="warn" mat-button mat-dialog-close>Да</button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class YesNoDialogComponent {
  public data: { info: string } = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<YesNoDialogComponent>);

  public onYes() {
    this.dialogRef.close(true);
  }
}
