import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public isOpened = signal(true);

  public toggleSidenav() {
    this.isOpened.set(!this.isOpened());
  }
}
