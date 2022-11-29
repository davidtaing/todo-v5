import { Todo } from "../../types";
import { DeleteTodoButton } from "./DeleteTodoButton";

interface TodoItemProps {
  todo: Todo;
  onClick: () => void;
}

export const TodoItem = ({ todo, onClick }: TodoItemProps) => {
  return (
    <li key={todo.id} aria-label="todo-item" onClick={onClick}>
      {todo.title}

      {todo.completed ? <DeleteTodoButton /> : null}
    </li>
  );
};
