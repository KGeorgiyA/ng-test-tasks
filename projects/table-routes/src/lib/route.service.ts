import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRoute } from './route';
import { mockRoutes } from './mocks/mock.routes';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  public action = signal('');
  public routes$ = new BehaviorSubject<IRoute[]>(mockRoutes);
  public message$ = new BehaviorSubject<string>('');

  public add(route: IRoute) {
    const routes = this.routes$.value;
    const maxUuid = routes.reduce((max, route) => route.uuid > max ? route.uuid : max, '');
    if (maxUuid === '') {
      route.uuid = '1';
    }  else {
      route.uuid = (+maxUuid + 1).toString();
    }

    routes.push(route);
    this.routes$.next(routes);
    this.message$.next('Успешно добавлено.');
  }

  public edit(route: IRoute) {
    const routes = this.routes$.value;
    const index = routes.findIndex(r => r.uuid === route.uuid);

    if (index !== -1) {
      routes[index] = route;
      this.routes$.next(routes);
      this.message$.next('Успешно изменено.');
    } else {
      this.message$.next('Не найден маршрут.');
    }
  }

  public delete(routeId: string) {
    const routes = this.routes$.value.filter(value => value.uuid !== routeId);
    this.routes$.next(routes);
  }
}
