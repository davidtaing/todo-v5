export interface Todo {
  id: number;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  created: Date;
}
