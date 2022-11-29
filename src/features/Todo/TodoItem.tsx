import { Todo } from "../../types";
import { DeleteTodoButton } from "./DeleteTodoButton";

interface TodoItemProps {
  todo: Todo;
  onClick: () => void;
}

export const TodoItem = ({ todo, onClick }: TodoItemProps) => {
  return (
    <li key={todo.id} aria-label="todo-item">
      <div onClick={onClick} aria-label="todo-item body">
        {todo.title}
      </div>

      {todo.completed ? <DeleteTodoButton /> : null}
    </li>
  );
};
