export interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  created: Date;
}

export interface GetTodoResponse {
  todos: Todo[];
}
