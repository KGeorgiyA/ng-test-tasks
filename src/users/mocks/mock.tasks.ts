export interface ITask {
  id: number;
  route: string;
  title: string;
  description: string;
}

export const mockTasks: ITask[] = [
  {
    id: 1,
    route: "table-routes",
    title: 'Таблица маршрутов',
    description: '',
  },
];
