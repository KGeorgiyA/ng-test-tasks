export interface ITask {
  id: number;
  route: string;
  title: string;
}

export const mockTasks: ITask[] = [
  {
    id: 1,
    route: "table-routes",
    title: 'Таблица маршрутов',
  },
  {
    id: 2,
    route: "to-do-list",
    title: 'Список дел',
  },
];
