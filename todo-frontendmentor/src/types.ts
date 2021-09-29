export interface Todo {
  _id: string;
  task: string;
  active: boolean;
  order: number;
}

export enum FilterStatus {
  ALL,
  ACTIVE,
  COMPLETED,
}
