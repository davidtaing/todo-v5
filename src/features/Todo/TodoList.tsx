import { Todo } from "../../types";

import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onToggleClick: (todo: Todo) => void;
}

export const TodoList = ({
  todos,
  onDeleteTodo,
  onToggleClick,
}: TodoListProps) => {
  return (
    <ul>
      {todos.map((item: Todo) => (
        <TodoItem
          key={item.id}
          onDeleteClick={() => onDeleteTodo(item.id)}
          onToggleClick={() => onToggleClick(item)}
          todo={item}
        />
      ))}
    </ul>
  );
};
