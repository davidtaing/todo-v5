import { Todo } from "../../types";
import { DeleteTodoButton } from "./DeleteTodoButton";

interface TodoItemProps {
  todo: Todo;
  onClick: () => void;
  onDeleteClick: () => void;
}

export const TodoItem = ({ todo, onClick, onDeleteClick }: TodoItemProps) => {
  return (
    <li key={todo.id} aria-label="todo-item">
      <div onClick={onClick} aria-label="todo-item body">
        {todo.title}
      </div>

      {todo.completed ? (
        <DeleteTodoButton onDeleteClick={onDeleteClick} />
      ) : null}
    </li>
  );
};
