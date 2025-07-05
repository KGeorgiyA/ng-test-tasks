import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 't-routes-root',
  imports: [
    RouterOutlet,
  ],
  template: `<div class="container"><router-outlet /></div>`,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      margin: 16px;
    }
  `,
})
export class RoutesComponent {
}
