import { useRouter } from "next/router";
import { Todo } from "../../types";

import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
}

export const TodoList = ({ todos, onDeleteTodo }: TodoListProps) => {
  const router = useRouter();

  const onTodoItemClick = (id: string) => {
    router.push(`/todos/${id}`);
  };

  return (
    <ul>
      {todos.map((item: Todo) => (
        <TodoItem
          key={item.id}
          onClick={() => onTodoItemClick(item.id)}
          onDeleteClick={() => onDeleteTodo(item.id)}
          todo={item}
        />
      ))}
    </ul>
  );
};
