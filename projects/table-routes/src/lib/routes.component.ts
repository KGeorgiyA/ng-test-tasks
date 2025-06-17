import { Component} from '@angular/core';

import { RoutesModule } from './routes-module';

@Component({
  selector: 't-routes-root',
  imports: [
    RoutesModule,
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
